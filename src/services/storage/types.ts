import { UserProgress } from '../../types/progress';

export interface IProgressRepository {
  /** Carga el estado actual de progreso del usuario */
  getProgress(): Promise<UserProgress>;
  
  /** Guarda el estado completo de progreso */
  saveProgress(progress: UserProgress): Promise<void>;
  
  /** Marca una lección como completada y otorga XP */
  markLessonCompleted(lessonId: string, xpEarned: number): Promise<UserProgress>;
  
  /** Guarda el resultado de un mini quiz */
  saveQuizResult(lessonId: string, scorePercent: number, xpEarned: number): Promise<UserProgress>;
  
  /** Guarda un ejercicio resuelto */
  markExerciseCompleted(exerciseId: string, xpEarned: number): Promise<UserProgress>;
  
  /** Guarda el borrador de código de un ejercicio o lección */
  saveCodeDraft(key: string, code: string): Promise<void>;
  
  /** Actualiza la racha diaria del usuario */
  updateStreak(): Promise<UserProgress>;
  
  /** Desbloquea una insignia para el usuario */
  unlockBadge(badgeId: string): Promise<UserProgress>;
  
  /** Guarda el resultado del test de nivel inicial */
  saveLevelTestResult(recommendedModuleId: number): Promise<UserProgress>;
  
  /** Exporta todo el progreso del usuario como una cadena JSON */
  exportData(): Promise<string>;
  
  /** Importa un archivo JSON de progreso con validación de estructura */
  importData(jsonData: string): Promise<{ success: boolean; message: string; data?: UserProgress }>;
  
  /** Reinicia todo el progreso del usuario a los valores iniciales */
  resetProgress(): Promise<UserProgress>;
}
