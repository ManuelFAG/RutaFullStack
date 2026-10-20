import type { IProgressRepository } from './types';
import type { UserProgress } from '../../types/progress';
import { SupabaseProgressAdapter } from './supabaseProgressAdapter';

/**
 * CloudProgressAdapterStub
 * En Fase 2 delega directamente a SupabaseProgressAdapter si hay un usuario autenticado.
 */
export class CloudProgressAdapterStub implements IProgressRepository {
  public userId?: string;
  private delegate?: SupabaseProgressAdapter;

  constructor(userId?: string) {
    this.userId = userId;
    if (userId) {
      this.delegate = new SupabaseProgressAdapter(userId);
    }
  }

  async getProgress(): Promise<UserProgress> {
    if (this.delegate) return this.delegate.getProgress();
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async saveProgress(progress: UserProgress): Promise<void> {
    if (this.delegate) return this.delegate.saveProgress(progress);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async markLessonCompleted(lessonId: string, xpEarned: number): Promise<UserProgress> {
    if (this.delegate) return this.delegate.markLessonCompleted(lessonId, xpEarned);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async saveQuizResult(lessonId: string, scorePercent: number, xpEarned: number): Promise<UserProgress> {
    if (this.delegate) return this.delegate.saveQuizResult(lessonId, scorePercent, xpEarned);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async markExerciseCompleted(exerciseId: string, xpEarned: number): Promise<UserProgress> {
    if (this.delegate) return this.delegate.markExerciseCompleted(exerciseId, xpEarned);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async saveCodeDraft(key: string, code: string): Promise<void> {
    if (this.delegate) return this.delegate.saveCodeDraft(key, code);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async updateStreak(): Promise<UserProgress> {
    if (this.delegate) return this.delegate.updateStreak();
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async unlockBadge(badgeId: string): Promise<UserProgress> {
    if (this.delegate) return this.delegate.unlockBadge(badgeId);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async saveLevelTestResult(recommendedModuleId: number): Promise<UserProgress> {
    if (this.delegate) return this.delegate.saveLevelTestResult(recommendedModuleId);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async exportData(): Promise<string> {
    if (this.delegate) return this.delegate.exportData();
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async importData(jsonData: string): Promise<{ success: boolean; message: string; data?: UserProgress }> {
    if (this.delegate) return this.delegate.importData(jsonData);
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }

  async resetProgress(): Promise<UserProgress> {
    if (this.delegate) return this.delegate.resetProgress();
    throw new Error('No hay usuario autenticado en el CloudProgressAdapter.');
  }
}
