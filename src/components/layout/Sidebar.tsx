import React, { useState } from 'react';
import { ALL_MODULES } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import { useBilling } from '../../contexts/BillingContext';
import {
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Lock,
  Compass,
  Layout,
  Server,
  Database,
  Smartphone,
  Cloud,
  Rocket,
  Briefcase,
} from 'lucide-react';

interface SidebarProps {
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  onSelectLesson,
  isOpen,
  onToggle,
}) => {
  const { progress } = useProgress();
  const { hasModuleAccess, openPricing } = useBilling();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  // Expandir automáticamente el módulo si la lección actual pertenece a él
  React.useEffect(() => {
    if (currentLessonId?.startsWith('m8-')) {
      setExpandedModules((prev) => ({ ...prev, 8: true }));
    } else if (currentLessonId?.startsWith('m7-')) {
      setExpandedModules((prev) => ({ ...prev, 7: true }));
    } else if (currentLessonId?.startsWith('m6-')) {
      setExpandedModules((prev) => ({ ...prev, 6: true }));
    } else if (currentLessonId?.startsWith('m5-')) {
      setExpandedModules((prev) => ({ ...prev, 5: true }));
    } else if (currentLessonId?.startsWith('m4-')) {
      setExpandedModules((prev) => ({ ...prev, 4: true }));
    } else if (currentLessonId?.startsWith('m3-')) {
      setExpandedModules((prev) => ({ ...prev, 3: true }));
    } else if (currentLessonId?.startsWith('m2-')) {
      setExpandedModules((prev) => ({ ...prev, 2: true }));
    } else if (currentLessonId?.startsWith('m1-')) {
      setExpandedModules((prev) => ({ ...prev, 1: true }));
    }
  }, [currentLessonId]);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Cloud': return <Cloud className="w-4 h-4" />;
      case 'Rocket': return <Rocket className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const toggleModule = (modId: number) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const filteredModules = ALL_MODULES.map((mod) => {
    if (!searchTerm.trim()) return mod;
    const matchingLessons = mod.lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.objective.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const modMatches = mod.title.toLowerCase().includes(searchTerm.toLowerCase());
    return {
      ...mod,
      lessons: modMatches ? mod.lessons : matchingLessons,
      hasMatch: modMatches || matchingLessons.length > 0,
    };
  }).filter((mod) => !searchTerm.trim() || mod.lessons.length > 0);

  return (
    <aside
      className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-slate-950/95 dark:bg-[#0a0d14] border-r border-slate-800/80 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-80 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-72'
      }`}
    >
      {/* Buscador de lecciones */}
      <div className="p-3.5 border-b border-slate-800/80">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar lecciones o conceptos..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Árbol de navegación de módulos */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredModules.map((module) => {
          const isExpanded = searchTerm ? true : !!expandedModules[module.id];
          const completedCount = module.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const isModuleLocked = !hasModuleAccess(module.id);

          return (
            <div
              key={module.id}
              className={`rounded-xl border overflow-hidden transition-all ${
                isModuleLocked
                  ? 'border-amber-500/20 bg-slate-900/30'
                  : 'border-slate-800/80 bg-slate-900/40'
              }`}
            >
              {/* Encabezado del Módulo */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isModuleLocked
                        ? 'bg-amber-500/10 text-amber-400'
                        : module.id === 1
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {getModuleIcon(module.icon)}
                  </span>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-200 truncate">{module.title}</h4>
                      {isModuleLocked && (
                        <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0">
                          PRO
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {isModuleLocked
                        ? 'Bloqueado • Requiere Plan Pro'
                        : `${completedCount}/${module.lessons.length} completadas`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {isModuleLocked ? (
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                  ) : isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Lista de lecciones del módulo */}
              {isExpanded && module.lessons.length > 0 && (
                <div className="px-2 pb-2 space-y-1 border-t border-slate-800/60 pt-1.5">
                  {module.lessons.map((lesson) => {
                    const isCompleted = progress.completedLessons.includes(lesson.id);
                    const isActive = currentLessonId === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (isModuleLocked) {
                            openPricing();
                          } else {
                            onSelectLesson(lesson.id);
                            if (window.innerWidth < 1024) onToggle();
                          }
                        }}
                        className={`w-full p-2 rounded-lg text-left text-xs transition-all flex items-start justify-between gap-2 ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                            : isModuleLocked
                            ? 'text-slate-400 hover:bg-amber-500/10 hover:text-amber-200'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <span className="font-mono text-[10px] text-slate-500 mt-0.5 shrink-0">
                            {lesson.order}.
                          </span>
                          <span className="truncate leading-tight">{lesson.title}</span>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 mt-0.5">
                          {isModuleLocked ? (
                            <Lock className="w-3 h-3 text-amber-400/80" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="text-[10px] font-mono text-slate-500">
                              {lesson.estimatedTime}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
