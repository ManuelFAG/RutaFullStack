import React, { useState } from 'react';
import { Exercise } from '../../types/curriculum';
import { CodeMirrorWrapper } from '../editor/CodeMirrorWrapper';
import { validateExercise, LogEntry } from '../../utils/codeEvaluator';
import { fireConfettiSuccess } from '../../utils/confetti';
import { playSuccessChime, playErrorBuzz } from '../../utils/soundEffects';
import { Play, CheckCircle2, AlertCircle, HelpCircle, Eye, EyeOff, Award } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onComplete: (exerciseId: string, xpEarned: number) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, onComplete }) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    passed: boolean;
    message: string;
    logs: LogEntry[];
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const getDifficultyBadge = () => {
    switch (exercise.level) {
      case 'facil':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Nivel 1: Calentamiento
          </span>
        );
      case 'medio':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Nivel 2: Entrenamiento
          </span>
        );
      case 'reto':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Nivel 3: Reto Técnico
          </span>
        );
    }
  };

  const handleRunAndCheck = () => {
    setIsRunning(true);
    const result = validateExercise(code, exercise.testCheck);
    setIsRunning(false);

    setEvaluationResult({
      passed: result.passed,
      message: result.message,
      logs: result.outputLogs,
    });

    if (result.passed) {
      playSuccessChime();
      fireConfettiSuccess();
      if (!isCompleted) {
        onComplete(exercise.id, 20);
      }
    } else {
      playErrorBuzz();
    }
  };

  const handleResetCode = () => {
    setCode(exercise.starterCode);
    setEvaluationResult(null);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 dark:border-slate-800 bg-slate-900/60 dark:bg-dark-card/90 p-5 md:p-6 shadow-xl transition-all duration-200">
      {/* Encabezado del ejercicio */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          {getDifficultyBadge()}
          <h4 className="text-base font-bold text-slate-100">{exercise.title}</h4>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>¡Resuelto! (+20 XP)</span>
          </div>
        )}
      </div>

      {/* Instrucciones didácticas */}
      <p className="text-sm text-slate-300 dark:text-slate-300 mb-4 leading-relaxed font-sans bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/40">
        {exercise.instruction}
      </p>

      {/* Editor de código integrado */}
      <div className="mb-4">
        <CodeMirrorWrapper
          code={code}
          onChange={setCode}
          language="javascript"
          minHeight="180px"
          onReset={handleResetCode}
        />
      </div>

      {/* Botones de acción y comprobación */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAndCheck}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-150 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Comprobar Solución</span>
          </button>

          {/* Botón de pistas */}
          {exercise.hints.length > 0 && (
            <button
              onClick={() => setActiveHintIndex(activeHintIndex === null ? 0 : null)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeHintIndex !== null ? 'Ocultar Pistas' : `Pistas (${exercise.hints.length})`}</span>
            </button>
          )}
        </div>

        {/* Ver solución oculta */}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition underline underline-offset-4"
        >
          {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showSolution ? 'Ocultar Solución' : 'Ver Solución Oficial'}</span>
        </button>
      </div>

      {/* Desplegable de pistas */}
      {activeHintIndex !== null && (
        <div className="p-3.5 mb-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Pista {activeHintIndex + 1} de {exercise.hints.length}:</span>
          </div>
          <p className="leading-relaxed">{exercise.hints[activeHintIndex]}</p>
          {activeHintIndex < exercise.hints.length - 1 && (
            <button
              onClick={() => setActiveHintIndex(activeHintIndex + 1)}
              className="text-amber-400 underline font-semibold text-[11px]"
            >
              Ver siguiente pista ➔
            </button>
          )}
        </div>
      )}

      {/* Solución oficial revelada */}
      {showSolution && (
        <div className="p-4 mb-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-2">
          <div className="font-bold text-slate-200">💡 Solución Explicada por el Profesor:</div>
          <p className="text-slate-300">{exercise.solutionExplanation}</p>
          <pre className="p-2.5 rounded-lg bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
            {exercise.solutionCode}
          </pre>
        </div>
      )}

      {/* Retroalimentación de evaluación */}
      {evaluationResult && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
            evaluationResult.passed
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}
        >
          {evaluationResult.passed ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-semibold">{evaluationResult.message}</p>
            {evaluationResult.logs.length > 0 && (
              <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-700/50">
                <span className="text-slate-400">Salida de consola: </span>
                {evaluationResult.logs.map((l, i) => (
                  <span key={i} className="block text-slate-200">
                    {l.content}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
