import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { billingService, Plan, UserSubscription, FALLBACK_PLANS } from '../services/billingService';

interface BillingContextType {
  plans: Plan[];
  subscription: UserSubscription | null;
  loading: boolean;
  isPro: boolean;
  hasModuleAccess: (moduleId: number) => boolean;
  isPricingOpen: boolean;
  openPricing: () => void;
  closePricing: () => void;
  subscribe: (planId: string) => Promise<{ success: boolean; error?: string }>;
  refreshSubscription: () => Promise<void>;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, role, refreshProfile } = useAuth();
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const loadSubscription = useCallback(async (userId: string) => {
    try {
      const sub = await billingService.getUserSubscription(userId);
      setSubscription(sub);
    } catch {
      setSubscription(null);
    }
  }, []);

  useEffect(() => {
    // 1. Cargar planes
    billingService.getPlans().then(setPlans);

    // 2. Cargar suscripción si hay usuario
    if (user?.id) {
      loadSubscription(user.id).finally(() => setLoading(false));
    } else {
      setSubscription(null);
      setLoading(false);
    }

    // 3. Escuchar evento de actualización de suscripción
    const handleSubUpdated = () => {
      if (user?.id) {
        loadSubscription(user.id);
        refreshProfile();
      }
    };
    window.addEventListener('rutafullstack:subscription-updated', handleSubUpdated);
    return () => window.removeEventListener('rutafullstack:subscription-updated', handleSubUpdated);
  }, [user?.id, loadSubscription, refreshProfile]);

  const isPro =
    role === 'admin' ||
    profile?.funnelStatus === 'de_pago' ||
    subscription?.status === 'active';

  const hasModuleAccess = useCallback(
    (moduleId: number): boolean => {
      return billingService.checkModuleAccess(
        moduleId,
        role,
        profile?.funnelStatus,
        subscription
      );
    },
    [role, profile?.funnelStatus, subscription]
  );

  const subscribe = async (planId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user?.id) {
      return { success: false, error: 'Debes iniciar sesión para suscribirte.' };
    }

    const res = await billingService.activateSubscription(user.id, planId);
    if (res.success) {
      await loadSubscription(user.id);
      await refreshProfile();
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  return (
    <BillingContext.Provider
      value={{
        plans,
        subscription,
        loading,
        isPro,
        hasModuleAccess,
        isPricingOpen,
        openPricing: () => setIsPricingOpen(true),
        closePricing: () => setIsPricingOpen(false),
        subscribe,
        refreshSubscription: async () => {
          if (user?.id) await loadSubscription(user.id);
        },
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = (): BillingContextType => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling debe utilizarse dentro de un BillingProvider');
  }
  return context;
};
