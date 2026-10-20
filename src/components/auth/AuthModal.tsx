import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_ACCOUNTS } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
}) => {
  const { loginWithEmail, signUpWithEmail, loginWithDemo, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetFormState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabChange = (tab: 'login' | 'signup' | 'forgot') => {
    setActiveTab(tab);
    resetFormState();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        const res = await loginWithEmail(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Credenciales incorrectas o cuenta no encontrada.');
        } else {
          onClose();
        }
      } else if (activeTab === 'signup') {
        if (!termsAccepted) {
          setErrorMessage('Debes aceptar los términos y condiciones para crear tu cuenta.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
          setIsLoading(false);
          return;
        }

        const res = await signUpWithEmail(email, password, fullName, marketingConsent);
        if (!res.success) {
          setErrorMessage(res.error || 'Error al crear la cuenta.');
        } else {
          setSuccessMessage('¡Cuenta creada con éxito! Sincronizando tu progreso en la nube...');
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      } else if (activeTab === 'forgot') {
        const res = await resetPassword(email);
        if (!res.success) {
          setErrorMessage(res.error || 'Error al enviar el correo de recuperación.');
        } else {
          setSuccessMessage('Te hemos enviado un correo con instrucciones para restablecer tu contraseña.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoKey: 'admin' | 'pro' | 'novato') => {
    resetFormState();
    setIsLoading(true);
    try {
      const res = await loginWithDemo(demoKey);
      if (!res.success) {
        setErrorMessage(res.error || 'Error al iniciar sesión con cuenta demo.');
      } else {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden text-slate-100 animate-scale-up">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header con botón cerrar */}
        <div className="relative p-6 pb-4 flex items-center justify-between border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-lg text-white">
                {activeTab === 'login' && 'Iniciar Sesión'}
                {activeTab === 'signup' && 'Crear Cuenta Gratis'}
                {activeTab === 'forgot' && 'Recuperar Contraseña'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeTab === 'login' && 'Accede para sincronizar tu progreso en tiempo real.'}
              {activeTab === 'signup' && 'Comienza tu viaje a Desarrollador Full Stack profesional.'}
              {activeTab === 'forgot' && 'Ingresa tu email para restablecer tus credenciales.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de pestañas */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
              activeTab === 'login'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
              activeTab === 'signup'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Selector de Cuentas Demo Rápidas */}
        <div className="px-6 pt-4">
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Cuentas Demo (1-Clic)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Para pruebas</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {DEMO_ACCOUNTS.map((demo) => (
                <button
                  key={demo.key}
                  type="button"
                  onClick={() => handleDemoLogin(demo.key)}
                  disabled={isLoading}
                  className="flex flex-col items-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 text-left transition group"
                >
                  <span className="text-[11px] font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {demo.badge}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full text-center">
                    {demo.key === 'admin' ? 'CRM Admin' : demo.key === 'pro' ? '8 Módulos' : 'Rol Nuevo'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mensajes de Alerta / Éxito */}
        <div className="px-6 pt-3">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-3.5">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Alex Turner"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {activeTab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Contraseña</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleTabChange('forgot')}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          {activeTab === 'signup' && (
            <div className="space-y-2 pt-1 text-[11px] text-slate-400">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                />
                <span>
                  Acepto los <span className="text-slate-300 underline">Términos de Servicio</span> y la{' '}
                  <span className="text-slate-300 underline">Política de Privacidad</span> (RGPD).
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
                />
                <span>Deseo recibir correos con consejos técnicos y novedades de la ruta.</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {activeTab === 'login' && 'Entrar a mi cuenta'}
                  {activeTab === 'signup' && 'Comenzar mi aprendizaje'}
                  {activeTab === 'forgot' && 'Enviar enlace de recuperación'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer con información de seguridad */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Autenticación segura con Supabase
          </span>
          <span className="font-mono text-[10px]">PostgreSQL RLS</span>
        </div>
      </div>
    </div>
  );
};
