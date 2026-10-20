-- ==============================================================================
-- RUTA FULLSTACK - FASE 2: ESQUEMA DE BASE DE DATOS Y SEGURIDAD RLS
-- Migración 001: Autenticación, Perfiles, Progreso y Roles
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE PERFILES (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'cliente_nuevo' CHECK (role IN ('cliente_nuevo', 'cliente', 'admin')),
  funnel_status TEXT NOT NULL DEFAULT 'nuevo' CHECK (funnel_status IN ('nuevo', 'activo', 'en_riesgo', 'inactivo', 'de_pago', 'cancelado')),
  objective TEXT DEFAULT '',
  experience_level TEXT DEFAULT 'principiante',
  is_blocked BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  privacy_accepted_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para búsqueda rápida en perfiles y CRM
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_funnel_status ON public.profiles(funnel_status);

-- 3. TABLA DE PROGRESO GLOBAL DEL USUARIO (user_progress)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  version TEXT DEFAULT '2.0.0',
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active_date TEXT DEFAULT CURRENT_DATE::text,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  completed_exercises JSONB DEFAULT '[]'::jsonb,
  quiz_scores JSONB DEFAULT '{}'::jsonb,
  unlocked_badges JSONB DEFAULT '[]'::jsonb,
  lesson_code_saves JSONB DEFAULT '{}'::jsonb,
  level_test_completed BOOLEAN DEFAULT false,
  recommended_module_id INTEGER DEFAULT 1,
  current_lesson_id TEXT DEFAULT 'm1-l1-como-funciona-internet',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);

-- 4. TABLA DE LECCIONES COMPLETADAS (lesson_completions - analítica CRM y ascensos de rol)
CREATE TABLE IF NOT EXISTS public.lesson_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 50,
  completed_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_user_lesson UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_completions_user ON public.lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_lesson ON public.lesson_completions(lesson_id);

-- 5. TABLA DE EJERCICIOS RESUELTOS (exercise_completions)
CREATE TABLE IF NOT EXISTS public.exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 15,
  completed_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_user_exercise UNIQUE(user_id, exercise_id)
);

-- 6. TABLA DE INSIGNIAS DESBLOQUEADAS (user_badges)
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_user_badge UNIQUE(user_id, badge_id)
);

-- ==============================================================================
-- 7. FUNCIONES Y TRIGGERS AUTOMÁTICOS
-- ==============================================================================

-- Función para verificar si el usuario conectado es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Función de trigger: Crea profile y user_progress automáticamente al registrarse en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  initial_role TEXT := 'cliente_nuevo';
  user_full_name TEXT := '';
BEGIN
  -- Extraer nombre completo de los metadatos si vienen de OAuth o formulario
  IF new.raw_user_meta_data IS NOT NULL THEN
    user_full_name := COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      ''
    );
  END IF;

  -- Insertar perfil
  INSERT INTO public.profiles (id, email, full_name, role, funnel_status)
  VALUES (
    new.id,
    COALESCE(new.email, ''),
    user_full_name,
    initial_role,
    'nuevo'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = CASE WHEN profiles.full_name = '' THEN EXCLUDED.full_name ELSE profiles.full_name END;

  -- Insertar registro inicial de progreso
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$;

-- Vincular trigger a auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Cuando un 'cliente_nuevo' completa su primera lección, asciende a 'cliente' activo
CREATE OR REPLACE FUNCTION public.handle_lesson_completed_promotion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET role = 'cliente',
      funnel_status = 'activo',
      updated_at = now()
  WHERE id = NEW.user_id AND role = 'cliente_nuevo';

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_promote_on_first_lesson ON public.lesson_completions;
CREATE TRIGGER tr_promote_on_first_lesson
  AFTER INSERT ON public.lesson_completions
  FOR EACH ROW EXECUTE FUNCTION public.handle_lesson_completed_promotion();

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS tr_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER tr_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==============================================================================
-- 8. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

-- Activar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Políticas para PROFILES
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

-- Política de inserción: un usuario solo puede crear su propio perfil y
-- únicamente con los valores por defecto (no puede autoasignarse rol ni estado de pago)
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND role = 'cliente_nuevo'
    AND funnel_status = 'nuevo'
    AND is_blocked = false
  );

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (
    public.is_admin()
    OR (
      auth.uid() = id
      AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
      AND funnel_status = (SELECT p.funnel_status FROM public.profiles p WHERE p.id = auth.uid())
      AND is_blocked = (SELECT p.is_blocked FROM public.profiles p WHERE p.id = auth.uid())
    )
  );

-- Políticas para USER_PROGRESS
DROP POLICY IF EXISTS "progress_select_own_or_admin" ON public.user_progress;
CREATE POLICY "progress_select_own_or_admin" ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "progress_insert_own" ON public.user_progress;
CREATE POLICY "progress_insert_own" ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_update_own" ON public.user_progress;
CREATE POLICY "progress_update_own" ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Políticas para LESSON_COMPLETIONS
DROP POLICY IF EXISTS "lesson_completions_all" ON public.lesson_completions;
CREATE POLICY "lesson_completions_all" ON public.lesson_completions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Políticas para EXERCISE_COMPLETIONS
DROP POLICY IF EXISTS "exercise_completions_all" ON public.exercise_completions;
CREATE POLICY "exercise_completions_all" ON public.exercise_completions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Políticas para USER_BADGES
DROP POLICY IF EXISTS "user_badges_all" ON public.user_badges;
CREATE POLICY "user_badges_all" ON public.user_badges
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());
