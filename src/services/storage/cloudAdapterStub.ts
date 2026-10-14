import type { IProgressRepository } from './types';
import type { UserProgress } from '../../types/progress';

/**
 * CloudProgressAdapterStub
 * 
 * Este adaptador representa el contrato de Fase 2 para conectar Supabase o Firebase.
 * Cuando se active la Fase 2:
 * 1. Se configura el cliente Supabase (createClient(SUPABASE_URL, SUPABASE_ANON_KEY)).
 * 2. Se reemplaza la persistencia local por consultas a las tablas 'user_progress', 'lesson_completions', etc.
 * 3. En 'progressService.ts', simplemente se reemplaza:
 *      new LocalStorageProgressAdapter() por new SupabaseProgressAdapter(supabaseClient)
 * ¡Ningún componente de React necesita modificarse!
 */
export class CloudProgressAdapterStub implements IProgressRepository {
  public userId?: string;

  constructor(userId?: string) {
    this.userId = userId;
  }

  async getProgress(): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2 (Supabase/Firebase). Usando LocalStorage.');
  }

  async saveProgress(_progress: UserProgress): Promise<void> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async markLessonCompleted(_lessonId: string, _xpEarned: number): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async saveQuizResult(_lessonId: string, _scorePercent: number, _xpEarned: number): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async markExerciseCompleted(_exerciseId: string, _xpEarned: number): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async saveCodeDraft(_key: string, _code: string): Promise<void> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async updateStreak(): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async unlockBadge(_badgeId: string): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async saveLevelTestResult(_recommendedModuleId: number): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async exportData(): Promise<string> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async importData(_jsonData: string): Promise<{ success: boolean; message: string; data?: UserProgress }> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }

  async resetProgress(): Promise<UserProgress> {
    throw new Error('Cloud adapter pendiente para Fase 2.');
  }
}
