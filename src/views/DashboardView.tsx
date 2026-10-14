import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { BADGE_CATALOGUE } from '../services/progressService';
import { ALL_MODULES } from '../data/modules';
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  ShieldCheck,
  Code2,
  Sparkles,
  Footprints,
  Compass,
  Zap,
} from 'lucide-react';
import { DataBackupModal } from '../components/common/DataBackupModal';

interface DashboardViewProps {
  onContinueLesson: (lessonId: string) => void;
  onNavigateToTest: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onContinueLesson,
}) => {
  const { progress, stats } = useProgress();
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  const nextLessonId = progress.currentLessonId || 'm1-l1-como-funciona-internet';

  return (
    <div className="space-y-8 pb-16">
      {/* Header del Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Panel de Aprendizaje y Logros
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Rastrea tu evolución, tus puntos de experiencia y las insignias desbloqueadas en tu camino Full Stack.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBackupOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            <Database className="w-4 h-4 text-sky-400" />
            <span>Respaldar / Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* Tarjetas Principales de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Nivel y Rango */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Rango Actual</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold font-mono">
              Nv. {stats.level}
            </span>
          </div>
          <div className="text-lg font-bold text-white mb-2">{stats.rankTitle}</div>
          {/* Barra de progreso al siguiente nivel */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{stats.totalXP} XP</span>
              <span>Meta: {stats.nextLevelXP} XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${stats.levelProgressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Racha Diaria */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Racha de Estudio</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">
            {stats.streakDays} {stats.streakDays === 1 ? 'Día' : 'Días'}
          </div>
          <p className="text-xs text-slate-400">
            {stats.streakDays >= 3 ? '¡Fuego encendido! Hábito imparable.' : 'Entra a diario para multiplicar tu racha.'}
          </p>
        </div>

        {/* Lecciones Completadas */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Lecciones Terminadas</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            {stats.totalLessonsCompleted} <span className="text-xs text-slate-500 font-normal">/ {ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} disponibles</span>
          </div>
          <p className="text-xs text-emerald-400 font-medium">¡Ruta completa! Los 8 módulos activos e interactivos.</p>
        </div>

        {/* Ejercicios de Código */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Ejercicios Resueltos</span>
            <Code2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">
            {stats.totalExercisesCompleted}
          </div>
          <p className="text-xs text-slate-400">Código validado en la consola interactiva.</p>
        </div>
      </div>

      {/* Tarjeta de Próxima Acción */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            Reanudación Rápida
          </span>
          <h3 className="text-lg font-bold text-white">Continúa tu aprendizaje donde lo dejaste</h3>
          <p className="text-xs text-slate-300">
            El siguiente paso en tu camino te espera en el aula interactiva.
          </p>
        </div>

        <button
          onClick={() => onContinueLesson(nextLessonId)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition"
        >
          <span>Ir a la Lección</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Galería de Insignias y Logros */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Insignias de Desarrollador ({stats.totalBadgesUnlocked} / {BADGE_CATALOGUE.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Recompensas especiales que desbloqueas al completar hitos, ejercicios y rachas continuas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {BADGE_CATALOGUE.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-emerald-500/15 border-emerald-500/30 shadow-inner'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? getBadgeIcon(badge.icon) : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {badge.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500 uppercase text-[10px]">
                    {badge.category}
                  </span>
                  {isUnlocked ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Desbloqueada</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">Bloqueada</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Respaldo */}
      <DataBackupModal isOpen={isBackupOpen} onClose={() => setIsBackupOpen(false)} />
    </div>
  );
};
