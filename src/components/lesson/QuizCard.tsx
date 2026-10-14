import React, { useState } from 'react';
import { QuizQuestion } from '../../types/curriculum';
import { CheckCircle2, XCircle, Award, Sparkles, RotateCcw } from 'lucide-react';
import { playSuccessChime, playErrorBuzz } from '../../utils/soundEffects';
import { fireConfettiSuccess } from '../../utils/confetti';

interface QuizCardProps {
  questions: QuizQuestion[];
  lessonId: string;
  savedScore?: number;
  onQuizCompleted: (scorePercent: number, xpEarned: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  savedScore,
  onQuizCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (selectedAnswers[questionIdx] !== undefined) return; // Ya respondida

    const updated = { ...selectedAnswers, [questionIdx]: optionIdx };
    setSelectedAnswers(updated);

    const isCorrect = questions[questionIdx].correctIndex === optionIdx;
    if (isCorrect) {
      playSuccessChime();
    } else {
      playErrorBuzz();
    }

    // Si respondió todas las preguntas
    if (Object.keys(updated).length === questions.length) {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (updated[idx] === q.correctIndex) {
          correctCount += 1;
        }
      });
      const percent = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);

      const xp = percent >= 70 ? 30 : 10;
      if (percent >= 70) {
        fireConfettiSuccess();
      }
      onQuizCompleted(percent, xp);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const calculateCurrentScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percent: Math.round((correct / questions.length) * 100),
    };
  };

  const scoreInfo = calculateCurrentScore();

  return (
    <div className="rounded-2xl border border-slate-700/60 dark:border-slate-800 bg-slate-900/60 dark:bg-dark-card/90 p-5 md:p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-100">Mini Quiz de Afianzamiento</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pon a prueba lo aprendido. Recibirás explicaciones pedagógicas de cada respuesta.
          </p>
        </div>

        {savedScore !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mejor puntaje previo: {savedScore}%</span>
          </div>
        )}
      </div>

      {/* Lista de preguntas */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3"
            >
              <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                <span className="text-emerald-400 font-mono mr-2">#{qIdx + 1}</span>
                {q.question}
              </h4>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  let buttonStyle = 'border-slate-700/70 hover:bg-slate-700/50 hover:border-slate-600 text-slate-300';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                    } else if (optIdx === selected) {
                      buttonStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    } else {
                      buttonStyle = 'opacity-40 border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`text-left text-xs sm:text-sm p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${buttonStyle}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasAnswered && optIdx === selected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explicación didáctica inmediata */}
              {hasAnswered && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {isCorrect ? '✨ ¡Correcto!' : '💡 Explicación del Profesor:'}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen del Quiz si completó todas */}
      {isFinished && (
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>
                Puntaje final: {scoreInfo.correct} de {scoreInfo.total} ({scoreInfo.percent}%)
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {scoreInfo.percent >= 70
                ? '¡Extraordinario dominio conceptual! Has obtenido los puntos de experiencia de esta lección.'
                : 'Buen intento. Recuerda repasar las explicaciones arriba para consolidar tu aprendizaje.'}
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
