import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, UserStats } from '../types/progress';
import { INITIAL_PROGRESS } from '../services/storage/localStorageAdapter';
import { progressService } from '../services/progressService';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [stats, setStats] = useState<UserStats>(progressService.calculateStats(INITIAL_PROGRESS));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProgress = useCallback(async () => {
    const data = await progressService.getProgress();
    setProgress(data);
    setStats(progressService.calculateStats(data));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshProgress();
    // Actualizar racha al iniciar
    progressService.updateStreak().then((updated) => {
      setProgress(updated);
      setStats(progressService.calculateStats(updated));
    });

    const handleProgressUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<UserProgress>;
      if (customEvent.detail) {
        setProgress(customEvent.detail);
        setStats(progressService.calculateStats(customEvent.detail));
      } else {
        refreshProgress();
      }
    };

    window.addEventListener('rutafullstack:progress-updated', handleProgressUpdated);
    return () => {
      window.removeEventListener('rutafullstack:progress-updated', handleProgressUpdated);
    };
  }, [refreshProgress]);

  const markLessonCompleted = async (lessonId: string, xpEarned?: number) => {
    const updated = await progressService.markLessonCompleted(lessonId, xpEarned);
    setProgress(updated);
    setStats(progressService.calculateStats(updated));
    return updated;
  };

  const saveQuizResult = async (lessonId: string, scorePercent: number, xpEarned?: number) => {
    const updated = await progressService.saveQuizResult(lessonId, scorePercent, xpEarned);
    setProgress(updated);
    setStats(progressService.calculateStats(updated));
    return updated;
  };

  const markExerciseCompleted = async (exerciseId: string, xpEarned?: number) => {
    const updated = await progressService.markExerciseCompleted(exerciseId, xpEarned);
    setProgress(updated);
    setStats(progressService.calculateStats(updated));
    return updated;
  };

  const saveCodeDraft = async (key: string, code: string) => {
    await progressService.saveCodeDraft(key, code);
  };

  const unlockBadge = async (badgeId: string) => {
    const updated = await progressService.unlockBadge(badgeId);
    setProgress(updated);
    setStats(progressService.calculateStats(updated));
    return updated;
  };

  const saveLevelTestResult = async (recommendedModuleId: number) => {
    const updated = await progressService.saveLevelTestResult(recommendedModuleId);
    setProgress(updated);
    setStats(progressService.calculateStats(updated));
    return updated;
  };

  const exportData = async () => {
    return progressService.exportData();
  };

  const importData = async (jsonString: string) => {
    const res = await progressService.importData(jsonString);
    if (res.success && res.data) {
      setProgress(res.data);
      setStats(progressService.calculateStats(res.data));
    }
    return res;
  };

  const resetProgress = async () => {
    const fresh = await progressService.resetProgress();
    setProgress(fresh);
    setStats(progressService.calculateStats(fresh));
    return fresh;
  };

  return {
    progress,
    stats,
    isLoading,
    markLessonCompleted,
    saveQuizResult,
    markExerciseCompleted,
    saveCodeDraft,
    unlockBadge,
    saveLevelTestResult,
    exportData,
    importData,
    resetProgress,
    refreshProgress,
  };
}
