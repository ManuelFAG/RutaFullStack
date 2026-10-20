import { supabase } from './supabaseClient';

export interface Plan {
  id: string; // 'gratis' | 'pro_mensual' | 'pro_anual' | 'vitalicio'
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  intervalType: 'month' | 'year' | 'one_time' | 'free';
  accessibleModules: number[];
  features: string[];
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export const FALLBACK_PLANS: Plan[] = [
  {
    id: 'gratis',
    name: 'Plan Free',
    description: 'Aprende los fundamentos web y frontend moderno sin costo.',
    priceCents: 0,
    currency: 'USD',
    intervalType: 'free',
    accessibleModules: [1, 2],
    features: [
      'Acceso completo a Módulos 1 y 2',
      'Laboratorios interactivos de código',
      'Quizzes y evaluaciones teóricas',
      'Persistencia en la nube con Supabase',
      'Sin tarjeta de crédito requerida',
    ],
    isActive: true,
  },
  {
    id: 'pro_mensual',
    name: 'Plan Pro Mensual',
    description: 'Acceso total e irrestricto a los 8 módulos, backend y bases de datos.',
    priceCents: 1900,
    currency: 'USD',
    intervalType: 'month',
    accessibleModules: [1, 2, 3, 4, 5, 6, 7, 8],
    features: [
      'Todos los 8 módulos completos',
      'Backend Node.js, Express y JWT',
      'PostgreSQL, SQL relacional y Prisma ORM',
      'DevOps, Docker, CI/CD y despliegue cloud',
      'Construcción y despliegue del Proyecto Final',
      'Certificado digital de graduado verificado',
      'Cancela en cualquier momento con 1 clic',
    ],
    isActive: true,
  },
  {
    id: 'pro_anual',
    name: 'Plan Pro Anual',
    description: 'El plan más elegido. Ahorra 35% y obtén 2 meses totalmente gratis.',
    priceCents: 14900,
    currency: 'USD',
    intervalType: 'year',
    accessibleModules: [1, 2, 3, 4, 5, 6, 7, 8],
    features: [
      'Todo lo incluido en el Plan Pro',
      'Ahorro directo de $79 al año',
      '2 meses totalmente gratis incluidos',
      'Simulacros de entrevistas técnicas en vivo',
      'Revisión personalizada de CV técnico y LinkedIn',
      'Insignia dorada "Estudiante Pro" en tu perfil',
      'Garantía de reembolso de 14 días',
    ],
    isActive: true,
  },
  {
    id: 'vitalicio',
    name: 'Acceso Vitalicio',
    description: 'Un solo pago. Acceso para siempre a todo el contenido actual y futuro.',
    priceCents: 29900,
    currency: 'USD',
    intervalType: 'one_time',
    accessibleModules: [1, 2, 3, 4, 5, 6, 7, 8],
    features: [
      'Acceso de por vida sin cuotas mensuales',
      'Todas las actualizaciones y nuevos módulos futuros',
      'Soporte prioritario 1 a 1 para resolver bugs',
      'Mención destacada en el directorio de talentos',
      'Acceso a repositorio privado de plantillas de producción',
    ],
    isActive: true,
  },
];

export class BillingService {
  /**
   * Obtiene la lista de planes desde Supabase (o fallback local)
   */
  async getPlans(): Promise<Plan[]> {
    if (!supabase) return FALLBACK_PLANS;

    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price_cents', { ascending: true });

      if (error || !data || data.length === 0) {
        return FALLBACK_PLANS;
      }

      return data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description || '',
        priceCents: p.price_cents,
        currency: p.currency || 'USD',
        intervalType: p.interval_type,
        accessibleModules: p.accessible_modules || [1, 2],
        features: Array.isArray(p.features) ? p.features : [],
        isActive: p.is_active,
      }));
    } catch {
      return FALLBACK_PLANS;
    }
  }

  /**
   * Obtiene la suscripción activa del usuario
   */
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        userId: data.user_id,
        planId: data.plan_id,
        status: data.status,
        currentPeriodStart: data.current_period_start,
        currentPeriodEnd: data.current_period_end,
        cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
      };
    } catch {
      return null;
    }
  }

  /**
   * Procesa la activación de una suscripción en Supabase
   * Ejecuta el procedimiento almacenado activate_subscription
   */
  async activateSubscription(
    userId: string,
    planId: string,
    _paymentMethod: string = 'stripe_test'
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    if (!supabase) return { success: false, error: 'Supabase no configurado' };

    try {
      const { error } = await supabase.rpc('activate_subscription', {
        p_user_id: userId,
        p_plan_id: planId,
        p_stripe_customer_id: `cus_${userId.slice(0, 8)}`,
        p_stripe_subscription_id: `sub_${planId}_${Date.now()}`,
      });

      if (error) {
        console.error('Error llamando activate_subscription:', error);
        return { success: false, error: error.message };
      }

      // Notificar reactivamente a la UI
      window.dispatchEvent(
        new CustomEvent('rutafullstack:subscription-updated', { detail: { planId, status: 'active' } })
      );

      return { success: true, message: '¡Plan Pro activado exitosamente!' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al procesar suscripción' };
    }
  }

  /**
   * Verifica si un usuario tiene acceso a un módulo específico
   */
  checkModuleAccess(
    moduleId: number,
    role?: string,
    funnelStatus?: string,
    subscription?: UserSubscription | null
  ): boolean {
    // 1. Módulos 1 y 2 son gratis para todos
    if (moduleId === 1 || moduleId === 2) return true;

    // 2. Administrador tiene acceso total
    if (role === 'admin') return true;

    // 3. Si tiene suscripción activa a plan pro o vitalicio
    if (subscription && subscription.status === 'active') {
      const plan = FALLBACK_PLANS.find((p) => p.id === subscription.planId);
      if (plan && plan.accessibleModules.includes(moduleId)) return true;
    }

    // 4. Si el funnelStatus es de_pago
    if (funnelStatus === 'de_pago') return true;

    return false;
  }
}

export const billingService = new BillingService();
