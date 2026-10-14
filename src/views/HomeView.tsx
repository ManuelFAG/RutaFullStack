import React from 'react';
import { ALL_MODULES } from '../data/modules';
import { useProgress } from '../hooks/useProgress';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Code2,
  HelpCircle,
  Award,
  Layers,
  Terminal,
  Cpu,
} from 'lucide-react';

interface HomeViewProps {
  onStartLesson: (lessonId: string) => void;
  onNavigateToTest: () => void;
  onNavigateToDashboard: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartLesson,
  onNavigateToTest,
  onNavigateToDashboard,
}) => {
  const { progress, stats } = useProgress();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Glow de fondo decorativo */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Aprende desde cero absoluto hasta nivel profesional</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Domina el desarrollo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Full Stack</span> paso a paso.
          </h1>

          <p className="text-slate-300 sm:text-lg leading-relaxed">
            Sin jerga incomprensible. Cada concepto complejo te lo explicamos con una <strong className="text-white font-semibold">analogía de la vida real</strong>, laboratorios interactivos en vivo y retos progresivos directamente en tu navegador.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartLesson(progress.currentLessonId || 'm1-l1-como-funciona-internet')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <span>{progress.completedLessons.length > 0 ? 'Continuar mi ruta' : 'Empezar Módulo 1 (Gratis)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToTest}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/80 text-slate-200 text-sm font-semibold border border-slate-700 transition"
            >
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>¿No sabes por dónde empezar? Test de 3 min</span>
            </button>
          </div>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Tu Nivel Actual</span>
              <span className="text-base sm:text-lg font-bold text-white">Nv. {stats.level}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Racha de Estudio</span>
              <span className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" /> {stats.streakDays} días
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Lecciones Listas</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">
                {stats.totalLessonsCompleted} / {ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Experiencia Total</span>
              <span className="text-base sm:text-lg font-bold text-sky-400">{stats.totalXP} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares pedagógicos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Analogías Cotidianas</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Nada de explicaciones teóricas vacías. Aprende variables como cajas de zapatos, Git como máquinas del tiempo y servidores como restaurantes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Laboratorio en Vivo</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Editor de código y terminal interactiva integrados en el navegador. No necesitas instalar nada para empezar a programar hoy mismo.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Gamificación y Logros</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Gana puntos de experiencia, desbloquea insignias tecnológicas y mantén tu racha diaria encendida para convertirte en desarrollador con constancia.
          </p>
        </div>
      </section>

      {/* Mapa Visual de la Ruta de Módulos */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-emerald-400" />
              <span>Mapa Visual del Aprendizaje</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              8 módulos diseñados secuencialmente para llevarte de novato a desarrollador full stack profesional.
            </p>
          </div>

          <button
            onClick={onNavigateToDashboard}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
          >
            <span>Ver detalle en Mi Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_MODULES.map((module) => {
            const hasLessons = module.lessons.length > 0;
            const completedLessonsInMod = module.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const isCompleted = hasLessons && completedLessonsInMod === module.lessons.length;

            return (
              <div
                key={module.id}
                className={`relative rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  hasLessons
                    ? 'bg-slate-900/80 border-slate-700/80 hover:border-emerald-500/60 shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-70'
                }`}
              >
                {/* Header tarjeta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Módulo 0{module.id}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completado</span>
                      </span>
                    ) : hasLessons ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                        {completedLessonsInMod}/{module.lessons.length} Lecciones
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-medium">
                        <Lock className="w-3 h-3" />
                        <span>Próximo</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{module.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {module.description}
                  </p>
                </div>

                {/* Footer tarjeta */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  {hasLessons ? (
                    <button
                      onClick={() => onStartLesson(module.lessons[0].id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-bold transition-all border border-emerald-500/30"
                    >
                      <span>Entrar al Módulo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="text-[11px] text-center text-slate-500 font-medium py-1">
                      Módulo en preparación (Fase incremental)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
