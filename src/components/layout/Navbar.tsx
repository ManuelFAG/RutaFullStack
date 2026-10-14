import React, { useState } from 'react';
import {
  Compass,
  LayoutDashboard,
  Flame,
  Zap,
  Sun,
  Moon,
  Database,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  FolderGit2,
  BookmarkCheck,
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useTheme } from '../../hooks/useTheme';
import { DataBackupModal } from '../common/DataBackupModal';

export type ActiveView = 'home' | 'dashboard' | 'lesson' | 'test' | 'glossary' | 'resources';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { stats } = useProgress();
  const { isDark, toggleTheme } = useTheme();
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: ActiveView; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Ruta de Módulos', icon: <Compass className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Mi Progreso', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'test', label: 'Test de Nivel', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'glossary', label: 'Glosario', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'resources', label: 'Recursos', icon: <FolderGit2 className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 dark:bg-[#080b11]/85 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo y Marca */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BookmarkCheck className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Ruta<span className="text-emerald-400">FullStack</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">De cero a programador profesional</p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Estadísticas de Gamificación & Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Racha con fuego */}
            <div
              title={`Racha activa: ${stats.streakDays} días consecutivos aprendiendo`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold"
            >
              <Flame className="w-4 h-4 fill-amber-400 animate-pulse text-amber-500" />
              <span>{stats.streakDays}d</span>
            </div>

            {/* Puntos de Experiencia (XP) */}
            <div
              onClick={() => onNavigate('dashboard')}
              title={`Nivel ${stats.level}: ${stats.rankTitle}. Tienes ${stats.totalXP} XP`}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{stats.totalXP} XP</span>
              <span className="hidden lg:inline text-[10px] text-slate-400 font-mono">
                (Nv.{stats.level})
              </span>
            </div>

            {/* Modal de Copia de Seguridad */}
            <button
              onClick={() => setIsBackupOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800 transition"
              title="Copia de seguridad y migración JSON"
            >
              <Database className="w-4 h-4 text-sky-400" />
            </button>

            {/* Selector de Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800 transition"
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Menú Móvil Botón */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1 animate-fade-in">
            {navLinks.map((link) => {
              const active = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Modal de Respaldo */}
      <DataBackupModal isOpen={isBackupOpen} onClose={() => setIsBackupOpen(false)} />
    </>
  );
};
