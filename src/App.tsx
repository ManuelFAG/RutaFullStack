import { useState, useEffect } from 'react';
import { Navbar, type ActiveView } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { LessonView } from './views/LessonView';
import { LevelTestView } from './views/LevelTestView';
import { GlossaryView } from './views/GlossaryView';
import { ResourcesView } from './views/ResourcesView';
import { getLessonById, ALL_MODULES } from './data/modules';
import { useProgress } from './hooks/useProgress';
import { Heart } from 'lucide-react';

export function App() {
  const { progress } = useProgress();
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [currentLessonId, setCurrentLessonId] = useState<string>(
    progress.currentLessonId || 'm1-l1-como-funciona-internet'
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sincronización con window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('lesson/')) {
        const id = hash.replace('lesson/', '');
        setCurrentLessonId(id);
        setCurrentView('lesson');
      } else if (['home', 'dashboard', 'test', 'glossary', 'resources'].includes(hash)) {
        setCurrentView(hash as ActiveView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToView = (view: ActiveView) => {
    setCurrentView(view);
    if (view === 'lesson') {
      window.location.hash = `lesson/${currentLessonId}`;
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCurrentView('lesson');
    window.location.hash = `lesson/${lessonId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRecommendedModule = (moduleId: number) => {
    const mod = ALL_MODULES.find((m) => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      handleSelectLesson(mod.lessons[0].id);
    } else {
      handleSelectLesson('m1-l1-como-funciona-internet');
    }
  };

  const activeLessonData = getLessonById(currentLessonId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark:bg-[#080b11] font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Barra de navegación global */}
      <Navbar currentView={currentView} onNavigate={navigateToView} />

      {/* Contenedor Principal */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Barra lateral visible en lecciones o con toggle */}
        {currentView === 'lesson' && (
          <Sidebar
            currentLessonId={currentLessonId}
            onSelectLesson={handleSelectLesson}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}

        {/* Zona de contenido principal */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 ${currentView === 'lesson' ? 'lg:pl-6' : ''}`}>
          {currentView === 'home' && (
            <HomeView
              onStartLesson={handleSelectLesson}
              onNavigateToTest={() => navigateToView('test')}
              onNavigateToDashboard={() => navigateToView('dashboard')}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              onContinueLesson={handleSelectLesson}
              onNavigateToTest={() => navigateToView('test')}
            />
          )}

          {currentView === 'lesson' && activeLessonData && (
            <LessonView
              lesson={activeLessonData.lesson}
              module={activeLessonData.module}
              onNavigateLesson={handleSelectLesson}
            />
          )}

          {currentView === 'test' && (
            <LevelTestView onStartRecommendedModule={handleStartRecommendedModule} />
          )}

          {currentView === 'glossary' && (
            <GlossaryView onGoToLesson={handleSelectLesson} />
          )}

          {currentView === 'resources' && <ResourcesView />}
        </main>
      </div>

      {/* Footer elegante */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300 tracking-tight">
              Ruta<span className="text-emerald-400">FullStack</span>
            </span>
            <span>— Plataforma educativa interactiva</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Construido con dedicación pedagógica</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para nuevos desarrolladores</span>
          </div>

          <div className="text-[11px] text-slate-600 font-mono">
            Fase 1: Motor local desacoplado (100% libre)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
