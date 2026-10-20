-- ==============================================================================
-- RUTA FULLSTACK - FASE 2: PAGOS, STRIPE Y CONTROL DE ACCESO
-- Migración 003: Tabla payments, función has_module_access y activate_subscription
-- ==============================================================================

-- 1. TABLA DE PAGOS (payments)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id TEXT REFERENCES public.plans(id),
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  stripe_payment_intent_id TEXT DEFAULT '',
  stripe_invoice_id TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'succeeded' CHECK (status IN ('succeeded', 'pending', 'failed', 'refunded')),
  receipt_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_plan ON public.payments(plan_id);

-- Restricción única para suscripciones por plan
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_subscriptions_user_plan'
  ) THEN
    ALTER TABLE public.subscriptions ADD CONSTRAINT uq_subscriptions_user_plan UNIQUE (user_id, plan_id);
  END IF;
END $$;

-- 2. RLS PARA PAGOS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payments_own_or_admin" ON public.payments;
CREATE POLICY "payments_own_or_admin" ON public.payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "payments_insert_own_or_admin" ON public.payments;
CREATE POLICY "payments_insert_own_or_admin" ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- 3. FUNCIÓN DE SEGURIDAD EN SERVIDOR: has_module_access
-- Verifica si un usuario tiene permiso para acceder a las lecciones de un módulo
CREATE OR REPLACE FUNCTION public.has_module_access(p_user_id UUID, p_module_id INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_has_active_sub BOOLEAN;
BEGIN
  -- 1. Módulos 1 y 2 son 100% GRATIS para todos (incluso invitados)
  IF p_module_id IN (1, 2) THEN
    RETURN TRUE;
  END IF;

  -- 2. Si no hay usuario autenticado, módulos 3-8 están bloqueados
  IF p_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- 3. Si el usuario es 'admin', tiene acceso total irrestricto
  SELECT role INTO v_role FROM public.profiles WHERE id = p_user_id;
  IF v_role = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- 4. Si el usuario tiene suscripción activa a un plan que incluye el módulo
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.plans p ON s.plan_id = p.id
    WHERE s.user_id = p_user_id 
      AND s.status = 'active'
      AND p_module_id = ANY(p.accessible_modules)
  ) INTO v_has_active_sub;

  IF v_has_active_sub THEN
    RETURN TRUE;
  END IF;

  -- 5. Fallback por funnel_status 'de_pago'
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id AND funnel_status = 'de_pago') THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- 4. FUNCIÓN PARA ACTIVAR SUSCRIPCIÓN (Usable por Webhook de Stripe o Checkout de prueba)
CREATE OR REPLACE FUNCTION public.activate_subscription(
  p_user_id UUID,
  p_plan_id TEXT,
  p_stripe_customer_id TEXT DEFAULT 'cus_demo',
  p_stripe_subscription_id TEXT DEFAULT 'sub_demo'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan RECORD;
  v_period_end TIMESTAMPTZ;
  v_sub_id UUID;
BEGIN
  -- Autorización: solo puedes activar tu propia suscripción (o un admin por otro usuario)
  IF NOT (auth.uid() = p_user_id OR public.is_admin()) THEN
    RAISE EXCEPTION 'No autorizado para activar la suscripción del usuario %', p_user_id;
  END IF;

  -- Obtener información del plan
  SELECT * INTO v_plan FROM public.plans WHERE id = p_plan_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Plan no encontrado: %', p_plan_id;
  END IF;

  -- Calcular vencimiento según intervalo
  IF v_plan.interval_type = 'year' THEN
    v_period_end := now() + interval '1 year';
  ELSIF v_plan.interval_type = 'one_time' THEN
    v_period_end := now() + interval '100 years'; -- Vitalicio
  ELSE
    v_period_end := now() + interval '1 month';
  END IF;

  -- Insertar o actualizar suscripción
  INSERT INTO public.subscriptions (
    user_id,
    plan_id,
    stripe_customer_id,
    stripe_subscription_id,
    status,
    current_period_start,
    current_period_end,
    updated_at
  )
  VALUES (
    p_user_id,
    p_plan_id,
    p_stripe_customer_id,
    p_stripe_subscription_id,
    'active',
    now(),
    v_period_end,
    now()
  )
  ON CONFLICT (user_id, plan_id) DO UPDATE
  SET status = 'active',
      current_period_end = v_period_end,
      updated_at = now()
  RETURNING id INTO v_sub_id;

  -- Registrar pago
  INSERT INTO public.payments (
    user_id,
    plan_id,
    amount_cents,
    currency,
    stripe_payment_intent_id,
    status
  )
  VALUES (
    p_user_id,
    p_plan_id,
    v_plan.price_cents,
    v_plan.currency,
    'pi_' || substr(md5(random()::text), 1, 14),
    'succeeded'
  );

  -- Actualizar funnel_status en profiles a 'de_pago'
  UPDATE public.profiles
  SET funnel_status = 'de_pago',
      updated_at = now()
  WHERE id = p_user_id;

  -- Asignar tag 'Interesado en Pro' / 'Estudiante Destacado'
  INSERT INTO public.user_tags (user_id, tag_id)
  SELECT p_user_id, id FROM public.tags WHERE name = 'Interesado en Pro'
  ON CONFLICT DO NOTHING;

  -- Registrar log de actividad
  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (
    p_user_id,
    'subscription_activated',
    jsonb_build_object('plan_id', p_plan_id, 'amount_cents', v_plan.price_cents)
  );

  RETURN jsonb_build_object(
    'success', true,
    'plan_id', p_plan_id,
    'expires_at', v_period_end
  );
END;
$$;
