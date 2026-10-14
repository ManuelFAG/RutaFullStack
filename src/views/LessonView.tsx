import React, { useState } from 'react';
import type { Lesson, Module, ExplanationSection, Exercise } from '../types/curriculum';
import { useProgress } from '../hooks/useProgress';
import { CodeMirrorWrapper } from '../components/editor/CodeMirrorWrapper';
import { TerminalView } from '../components/editor/TerminalView';
import { ExerciseCard } from '../components/lesson/ExerciseCard';
import { QuizCard } from '../components/lesson/QuizCard';
import { executeJavaScript, LogEntry } from '../utils/codeEvaluator';
import { fireConfettiSuccess } from '../utils/confetti';
import { playSuccessChime } from '../utils/soundEffects';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Play,
  RotateCcw,
  AlertTriangle,
  BookmarkCheck,
  Code2,
  Terminal,
  FileCheck,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  module: Module;
  onNavigateLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  module,
  onNavigateLesson,
}) => {
  const { progress, markLessonCompleted, markExerciseCompleted, saveQuizResult } = useProgress();

  // Estado del Playground
  const [playgroundCode, setPlaygroundCode] = useState(lesson.interactivePlayground.initialCode);
  const [playgroundLogs, setPlaygroundLogs] = useState<LogEntry[]>([]);
  const [activeTabMobile, setActiveTabMobile] = useState<'teoria' | 'playground' | 'ejercicios' | 'quiz'>('teoria');

  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Ejecución en el playground interactivo
  const handleRunPlayground = () => {
    const res = executeJavaScript(playgroundCode);
    setPlaygroundLogs(res.logs);
    playSuccessChime();
  };

  const handleResetPlayground = () => {
    setPlaygroundCode(lesson.interactivePlayground.initialCode);
    setPlaygroundLogs([]);
  };

  const handleMarkAsCompleted = async () => {
    await markLessonCompleted(lesson.id, lesson.xpReward);
    playSuccessChime();
    fireConfettiSuccess();
  };

  // Navegación anterior / siguiente
  const currentIdx = module.lessons.findIndex((l: Lesson) => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? module.lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < module.lessons.length - 1 ? module.lessons[currentIdx + 1] : null;

  return (
    <div className="space-y-6 pb-20">
      {/* Barra superior de contexto de la lección */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-400 font-bold">{module.title}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Lección 0{lesson.order}</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{lesson.estimatedTime}</span>
          </span>

          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            {lesson.difficulty}
          </span>

          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Completada</span>
            </div>
          ) : (
            <button
              onClick={handleMarkAsCompleted}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Completar (+{lesson.xpReward} XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Selector de pestañas para móviles y tablets */}
      <div className="lg:hidden flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTabMobile('teoria')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition ${
            activeTabMobile === 'teoria'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Teoría & Analogía
        </button>
        <button
          onClick={() => setActiveTabMobile('playground')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition ${
            activeTabMobile === 'playground'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Laboratorio
        </button>
        <button
          onClick={() => setActiveTabMobile('ejercicios')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition ${
            activeTabMobile === 'ejercicios'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Ejercicios (3)
        </button>
        <button
          onClick={() => setActiveTabMobile('quiz')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition ${
            activeTabMobile === 'quiz'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          4. Mini Quiz
        </button>
      </div>

      {/* Grid Principal: 2 Columnas en Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Pedagogía, Analogía, Explicación y Resumen */}
        <div
          className={`lg:col-span-6 space-y-6 ${
            activeTabMobile !== 'teoria' ? 'hidden lg:block' : ''
          }`}
        >
          {/* Tarjeta de Objetivo */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
            <span className="font-bold text-white uppercase text-[11px] tracking-wider block mb-1">
              🎯 Objetivo pedagógico:
            </span>
            <p className="leading-relaxed">{lesson.objective}</p>
          </div>

          {/* Tarjeta de Analogía del Mundo Real */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-slate-900 border border-amber-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2.5 text-amber-400">
              <span className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 font-bold block">
                  Analogía de la vida real
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {lesson.realWorldAnalogy.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
              {lesson.realWorldAnalogy.analogy}
            </p>

            <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-300/90 font-medium">
              💡 <strong>Por qué importa:</strong> {lesson.realWorldAnalogy.whyItMatters}
            </div>
          </div>

          {/* Secciones de Explicación y Código */}
          <div className="space-y-5">
            {lesson.explanation.sections.map((sec: ExplanationSection, sIdx: number) => (
              <div
                key={sIdx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{sec.heading}</span>
                </h3>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {sec.callout && (
                  <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 text-sky-200 text-xs leading-relaxed flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>{sec.callout.text}</div>
                  </div>
                )}

                {sec.codeSnippet && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {sec.codeSnippet.description}
                    </span>
                    <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      {sec.codeSnippet.code}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Resumen Final y Errores Comunes (Botiquín del Novato) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Resumen "Para llevar en la mochila"</span>
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {lesson.summary.keyTakeaways.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <h4 className="text-xs sm:text-sm font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Errores comunes que debes evitar:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {lesson.summary.commonPitfalls.map((pitfall: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Laboratorio Interactivo, Ejercicios y Mini Quiz */}
        <div className="lg:col-span-6 space-y-6">
          {/* Bloque 1: Laboratorio Interactivo */}
          <div
            className={`space-y-3 ${
              activeTabMobile !== 'playground' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {lesson.interactivePlayground.mode === 'terminal' ? (
                  <Terminal className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Code2 className="w-4 h-4 text-sky-400" />
                )}
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lesson.interactivePlayground.mode === 'terminal'
                    ? 'Simulador de Terminal en Vivo'
                    : 'Laboratorio de Código en Vivo'}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {lesson.interactivePlayground.mode === 'terminal'
                  ? 'Prueba comandos Bash / Git'
                  : 'Modifica y ejecuta'}
              </span>
            </div>

            {lesson.interactivePlayground.mode === 'terminal' ? (
              <TerminalView initialCommand={lesson.interactivePlayground.initialCode} />
            ) : (
              <div className="space-y-3">
                <CodeMirrorWrapper
                  code={playgroundCode}
                  onChange={setPlaygroundCode}
                  language="javascript"
                  minHeight="200px"
                  onReset={handleResetPlayground}
                />

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleRunPlayground}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Ejecutar Código</span>
                  </button>

                  <button
                    onClick={handleResetPlayground}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar código inicial</span>
                  </button>
                </div>

                {/* Salida de consola del playground */}
                {playgroundLogs.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                      Salida de Consola:
                    </div>
                    {playgroundLogs.map((log: LogEntry, lIdx: number) => (
                      <div
                        key={lIdx}
                        className={
                          log.type === 'error'
                            ? 'text-rose-400'
                            : log.type === 'warn'
                            ? 'text-amber-400'
                            : 'text-emerald-300'
                        }
                      >
                        {log.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bloque 2: Los 3 Ejercicios de Dificultad Progresiva */}
          <div
            className={`space-y-4 ${
              activeTabMobile !== 'ejercicios' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span>Gimnasio de Ejercicios (3 Retos)</span>
              </h3>
              <span className="text-xs text-slate-400">Gana +20 XP por ejercicio</span>
            </div>

            <div className="space-y-4">
              {lesson.exercises.map((exercise: Exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isCompleted={progress.completedExercises.includes(exercise.id)}
                  onComplete={(exId: string, xp: number) => markExerciseCompleted(exId, xp)}
                />
              ))}
            </div>
          </div>

          {/* Bloque 3: Mini Quiz */}
          <div
            className={`space-y-4 ${
              activeTabMobile !== 'quiz' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="border-t border-slate-800 pt-6">
              <QuizCard
                questions={lesson.quiz}
                lessonId={lesson.id}
                savedScore={progress.quizScores[lesson.id]}
                onQuizCompleted={(score: number, xp: number) => saveQuizResult(lesson.id, score, xp)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegación Inferior (Anterior / Siguiente) */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior: {prevLesson.title}</span>
          </button>
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <button
              onClick={handleMarkAsCompleted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Marcar como completada</span>
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/20 active:scale-95 transition"
            >
              <span>Siguiente Lección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
