import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Shield,
  CheckCircle2,
  Calendar,
  Cloud,
  Save,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, updateProfile, role } = useAuth();

  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [objective, setObjective] = useState(profile?.objective || 'empleo');
  const [experienceLevel, setExperienceLevel] = useState(profile?.experienceLevel || 'principiante');
  const [marketingConsent, setMarketingConsent] = useState(Boolean(profile?.marketingConsent));

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setObjective(profile.objective || 'empleo');
      setExperienceLevel(profile.experienceLevel || 'principiante');
      setMarketingConsent(Boolean(profile.marketingConsent));
    }
  }, [profile]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await updateProfile({
        fullName,
        objective,
        experienceLevel,
        marketingConsent,
      });

      if (!res.success) {
        setSaveError(res.error || 'Error al guardar los cambios');
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden text-slate-100 animate-scale-up">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 pb-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center font-bold text-white text-base">
              {(fullName || user.email || 'E').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Mi Perfil y Cuenta</h3>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Insignia de Estado y Sincronización */}
        <div className="p-6 pt-4 pb-2">
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Rol Actual</span>
                <span className="font-semibold text-slate-200 capitalize">
                  {role === 'admin' ? 'Administrador CRM' : role === 'cliente' ? 'Alumno Pro' : 'Nuevo Alumno'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Sincronización</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Supabase Activo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSave} className="p-6 pt-2 space-y-4">
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Perfil actualizado correctamente en Supabase.</span>
            </div>
          )}

          {saveError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {saveError}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Mi Objetivo</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="empleo">Conseguir mi 1er empleo Tech</option>
                <option value="ascenso">Mejorar mi salario / Ascenso</option>
                <option value="startup">Construir mi propia Startup</option>
                <option value="curiosidad">Aprender por pasión / Hobby</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nivel Inicial</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="principiante">Principiante (Desde cero)</option>
                <option value="intermedio">Intermedio (Conocimientos previos)</option>
                <option value="avanzado">Avanzado (Desarrollador con experiencia)</option>
              </select>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-400">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span>Deseo recibir correos con consejos técnicos, tutoriales y novedades (RGPD).</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cerrar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Miembro desde:{' '}
            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Hoy'}
          </span>
          <span className="font-mono text-[10px]">ID: {user.id.slice(0, 8)}...</span>
        </div>
      </div>
    </div>
  );
};
