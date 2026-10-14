import React, { useState } from 'react';
import { LEVEL_TEST_QUESTIONS, calculateTestRecommendation } from '../data/levelTest';
import { useProgress } from '../hooks/useProgress';
import { fireConfettiLevelUp } from '../utils/confetti';
import { playSuccessChime } from '../utils/soundEffects';
import { HelpCircle, CheckCircle2, ArrowRight, RotateCcw, Sparkles, Award } from 'lucide-react';

interface LevelTestViewProps {
  onStartRecommendedModule: (moduleId: number) => void;
}

export const LevelTestView: React.FC<LevelTestViewProps> = ({ onStartRecommendedModule }) => {
  const { progress, saveLevelTestResult } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCalculate = async () => {
    const result = calculateTestRecommendation(selectedAnswers);
    setIsCalculated(true);
    await saveLevelTestResult(result.recommendedModuleId);
    playSuccessChime();
    fireConfettiLevelUp();
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsCalculated(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === LEVEL_TEST_QUESTIONS.length;
  const result = isCalculated ? calculateTestRecommendation(selectedAnswers) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Encabezado */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Evaluación Diagnóstica Inicial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Test de Nivel: ¿Por dónde empezar?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Responde estas 6 preguntas cortas. Te diremos con precisión qué módulo se adapta mejor a tu nivel actual para que no te aburras ni te sientas abrumado.
        </p>
      </div>

      {/* Resultado si ya se calculó */}
      {isCalculated && result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex items-center gap-3 text-emerald-400">
            <span className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                Diagnóstico Completado • {result.score} de {result.maxScore} aciertos ({result.percentage}%)
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {result.recommendationTitle}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {result.recommendationText}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onStartRecommendedModule(result.recommendedModuleId)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 active:scale-95 transition"
            >
              <span>Ir al Módulo {result.recommendedModuleId} Recomendado</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Test</span>
            </button>
          </div>
        </div>
      )}

      {/* Lista de Preguntas */}
      <div className="space-y-6">
        {LEVEL_TEST_QUESTIONS.map((q, idx) => {
          const selected = selectedAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-lg"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                {q.question}
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;

                  return (
                    <button
                      key={optIdx}
                      disabled={isCalculated}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-sky-500/15 border-sky-400 text-sky-200 font-semibold shadow-md'
                          : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón de calcular */}
      {!isCalculated && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Has respondido{' '}
            <strong className="text-white">
              {Object.keys(selectedAnswers).length} de {LEVEL_TEST_QUESTIONS.length}
            </strong>{' '}
            preguntas.
          </div>

          <button
            onClick={handleCalculate}
            disabled={!allAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-lg ${
              allAnswered
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-95 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Calcular mi nivel recomendado</span>
          </button>
        </div>
      )}
    </div>
  );
};
