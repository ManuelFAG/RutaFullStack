-- ==============================================================================
-- RUTA FULLSTACK - FASE 2: CRM, PLANES, SUSCRIPCIONES Y AUDITORÍA
-- Migración 002: Planes, Subscripciones, Notas CRM y Etiquetas
-- ==============================================================================

-- 1. TABLA DE PLANES (plans)
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY, -- 'gratis', 'pro_mensual', 'pro_anual', 'vitalicio'
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  interval_type TEXT DEFAULT 'month' CHECK (interval_type IN ('month', 'year', 'one_time', 'free')),
  stripe_price_id TEXT DEFAULT '',
  accessible_modules INTEGER[] DEFAULT ARRAY[1, 2], -- Módulos accesibles por defecto
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insertar planes iniciales
INSERT INTO public.plans (id, name, description, price_cents, interval_type, accessible_modules, features)
VALUES 
  ('gratis', 'Plan Free', 'Acceso completo a Módulos 1 y 2 con proyectos prácticos.', 0, 'free', ARRAY[1, 2], '["Acceso a Fundamentos y Frontend", "Ejercicios interactivos", "Comunidad de estudiantes", "Sin tarjeta de crédito"]'::jsonb),
  ('pro_mensual', 'Plan Pro Mensual', 'Acceso total a los 8 módulos, backend, bases de datos y DevOps.', 1900, 'month', ARRAY[1, 2, 3, 4, 5, 6, 7, 8], '["Los 8 módulos completos", "Acceso a proyectos reales de portfolio", "Certificado digital verificado", "Soporte y retroalimentación de código"]'::jsonb),
  ('pro_anual', 'Plan Pro Anual (2 meses gratis)', 'El paquete definitivo para convertirte en Full Stack con 35% de ahorro.', 14900, 'year', ARRAY[1, 2, 3, 4, 5, 6, 7, 8], '["Todo lo del Plan Pro", "Ahorro de $79 al año", "Simulacros de entrevistas técnicas", "Revisión personalizada de CV técnico"]'::jsonb),
  ('vitalicio', 'Acceso Vitalicio', 'Pago único con acceso para siempre a todo el contenido actual y futuro.', 29900, 'one_time', ARRAY[1, 2, 3, 4, 5, 6, 7, 8], '["Acceso ilimitado de por vida", "Todas las actualizaciones futuras", "Mención de honor en el directorio de graduados", "Soporte prioritario VIP"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 2. TABLA DE SUSCRIPCIONES (subscriptions)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.plans(id),
  stripe_customer_id TEXT DEFAULT '',
  stripe_subscription_id TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start TIMESTAMPTZ DEFAULT now(),
  current_period_end TIMESTAMPTZ DEFAULT (now() + interval '1 month'),
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON public.subscriptions(user_id);

-- 3. TABLA DE NOTAS CRM (crm_notes)
CREATE TABLE IF NOT EXISTS public.crm_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_notes_user ON public.crm_notes(user_id);

-- 4. TABLA DE ETIQUETAS (tags)
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#10b981',
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.tags (name, color)
VALUES 
  ('Estudiante Destacado', '#10b981'),
  ('Requiere Soporte', '#f59e0b'),
  ('Interesado en Pro', '#3b82f6'),
  ('Graduado', '#8b5cf6')
ON CONFLICT (name) DO NOTHING;

-- 5. RELACIÓN USUARIO - ETIQUETAS (user_tags)
CREATE TABLE IF NOT EXISTS public.user_tags (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tag_id)
);

-- 6. REGISTRO DE ACTIVIDAD (activity_logs)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON public.activity_logs(user_id);

-- RLS para nuevas tablas
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Plans: cualquiera puede leer planes activos
DROP POLICY IF EXISTS "plans_read_active" ON public.plans;
CREATE POLICY "plans_read_active" ON public.plans
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Subscriptions: usuario ve su propia suscripción, admin ve todas
DROP POLICY IF EXISTS "subscriptions_own_or_admin" ON public.subscriptions;
CREATE POLICY "subscriptions_own_or_admin" ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

-- CRM Notes, Tags, User_tags: Solo accesible por Admins
DROP POLICY IF EXISTS "crm_notes_admin_only" ON public.crm_notes;
CREATE POLICY "crm_notes_admin_only" ON public.crm_notes
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "tags_admin_only" ON public.tags;
CREATE POLICY "tags_admin_only" ON public.tags
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "user_tags_admin_only" ON public.user_tags;
CREATE POLICY "user_tags_admin_only" ON public.user_tags
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "activity_logs_own_insert" ON public.activity_logs;
CREATE POLICY "activity_logs_own_insert" ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "activity_logs_admin_read" ON public.activity_logs;
CREATE POLICY "activity_logs_admin_read" ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());
