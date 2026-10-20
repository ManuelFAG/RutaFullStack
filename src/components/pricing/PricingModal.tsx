import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext';
import { useAuth } from '../../contexts/AuthContext';
import { fireConfettiSuccess } from '../../utils/confetti';
import { playSuccessChime } from '../../utils/soundEffects';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal?: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onOpenAuthModal,
}) => {
  const { plans, isPro, subscribe } = useBilling();
  const { user } = useAuth();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = (planId: string) => {
    setErrorMessage(null);
    if (!user) {
      onClose();
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    setSelectedPlanForCheckout(planId);
  };

  const handleConfirmCheckout = async () => {
    if (!selectedPlanForCheckout) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await subscribe(selectedPlanForCheckout);
      if (res.success) {
        setCheckoutSuccess(true);
        fireConfettiSuccess();
        playSuccessChime();
        setTimeout(() => {
          setCheckoutSuccess(false);
          setSelectedPlanForCheckout(null);
          onClose();
        }, 2200);
      } else {
        setErrorMessage(res.error || 'Error al procesar el pago.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const proPlan = billingCycle === 'yearly'
    ? plans.find((p) => p.id === 'pro_anual') || plans[2]
    : plans.find((p) => p.id === 'pro_mensual') || plans[1];

  const lifetimePlan = plans.find((p) => p.id === 'vitalicio') || plans[3];
  const freePlan = plans.find((p) => p.id === 'gratis') || plans[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8 animate-scale-up">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-lg text-white">Desbloquea la Carrera Full Stack Completa</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Accede a los 8 módulos, backend Node.js, bases de datos PostgreSQL, DevOps y tu certificación profesional.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedPlanForCheckout(null);
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal de confirmación de pago simulado (Stripe Sandbox) */}
        {selectedPlanForCheckout ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-5 animate-fade-in">
            {checkoutSuccess ? (
              <div className="space-y-3 py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white">¡Bienvenido a RutaFullStack Pro!</h4>
                <p className="text-xs text-slate-300">
                  Tu suscripción ha sido confirmada en Supabase y los 8 módulos han sido desbloqueados para tu cuenta.
                </p>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CreditCard className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Confirmar Suscripción con Stripe</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Pasarela de pago segura encriptada con SSL y verificación en servidor.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Plan seleccionado:</span>
                    <span className="font-bold text-white capitalize">
                      {selectedPlanForCheckout.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Importe total:</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {selectedPlanForCheckout === 'pro_anual'
                        ? '$149.00 USD / año'
                        : selectedPlanForCheckout === 'pro_mensual'
                        ? '$19.00 USD / mes'
                        : '$299.00 USD (Pago único)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                    <span>Método de pago:</span>
                    <span className="font-mono text-slate-300">Stripe Sandbox (4242 ••••)</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanForCheckout(null)}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    Volver
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmCheckout}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-slate-950" />
                        <span>Confirmar y Desbloquear</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Toggle Mensual / Anual */}
            <div className="flex justify-center">
              <div className="p-1 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center gap-1 shadow-inner">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                    billingCycle === 'monthly'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    billingCycle === 'yearly'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Anual</span>
                  <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold uppercase">
                    Ahorra 35%
                  </span>
                </button>
              </div>
            </div>

            {/* Grid de los 3 Planes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Plan Free */}
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {freePlan.name}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      Gratis
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white">$0</div>
                  <p className="text-xs text-slate-400 mt-1">{freePlan.description}</p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {freePlan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-slate-800/60 text-slate-400 text-xs font-semibold cursor-default"
                >
                  {isPro ? 'Incluido' : 'Tu Plan Actual'}
                </button>
              </div>

              {/* 2. Plan Pro (Destacado) */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/50 flex flex-col justify-between space-y-4 relative shadow-xl shadow-emerald-500/10">
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                  Más Recomendado
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {proPlan.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      ${proPlan.priceCents / 100}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {billingCycle === 'yearly' ? 'año' : 'mes'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">{proPlan.description}</p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-200">
                    {proPlan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(proPlan.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  {isPro ? 'Suscripción Activa' : 'Desbloquear Carrera Pro'}
                </button>
              </div>

              {/* 3. Acceso Vitalicio */}
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      {lifetimePlan.name}
                    </span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                      Pago Único
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      ${lifetimePlan.priceCents / 100}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ para siempre</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{lifetimePlan.description}</p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {lifetimePlan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(lifetimePlan.id)}
                  className="w-full py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition active:scale-95"
                >
                  Obtener Acceso de por Vida
                </button>
              </div>
            </div>

            {/* Garantía y Confianza */}
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Garantía de Satisfacción 100%:</strong> Prueba el Plan Pro por 14 días. Si no estás encantado, te devolvemos el 100% de tu dinero.
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500 shrink-0">
                Cancelación en 1 clic
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
