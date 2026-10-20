import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  Shield,
  Sparkles,
  ChevronDown,
  Layers,
  Settings,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

interface UserMenuProps {
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onNavigateCRM?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  onOpenAuth,
  onOpenProfile,
  onNavigateCRM,
}) => {
  const { user, profile, role, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={onOpenAuth}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 hover:from-emerald-500/30 hover:to-sky-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all shadow-sm"
      >
        <User className="w-3.5 h-3.5 text-emerald-400" />
        <span>Iniciar Sesión</span>
      </button>
    );
  }

  const getRoleBadge = (userRole: UserRole) => {
    switch (userRole) {
      case 'admin':
        return {
          label: 'Admin CRM',
          className: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: <Shield className="w-3 h-3 text-purple-400" />,
        };
      case 'cliente':
        return {
          label: 'Alumno Pro',
          className: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          icon: <Sparkles className="w-3 h-3 text-sky-400" />,
        };
      case 'cliente_nuevo':
      default:
        return {
          label: 'Nuevo Alumno',
          className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
        };
    }
  };

  const badge = getRoleBadge(role);
  const displayName = profile?.fullName || user.email?.split('@')[0] || 'Estudiante';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 transition shadow-sm"
      >
        {/* Avatar inicial */}
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
          {initial}
        </div>

        {/* Nombre y Rol */}
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[110px]">
            {displayName}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            {badge.label}
          </div>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-emerald-500/10 p-2 z-50 animate-scale-up text-slate-200">
          {/* Cabecera del usuario */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white truncate">{displayName}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.className}`}>
                {badge.icon}
                {badge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate font-mono">{user.email}</p>
            {role === 'cliente_nuevo' && (
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-400" /> Completa tu 1ª lección para subir a Cliente
              </p>
            )}
          </div>

          {/* Opciones del menú */}
          <div className="space-y-0.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenProfile();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Mi Perfil y Preferencias</span>
            </button>

            {isAdmin && onNavigateCRM && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateCRM();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:text-white hover:bg-purple-950/40 border border-purple-500/20 transition"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Panel CRM & Métricas</span>
              </button>
            )}

            <div className="border-t border-slate-800/80 my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
