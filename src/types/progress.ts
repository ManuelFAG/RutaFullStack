export interface UserProgress {
  version: string;
  userName: string;
  totalXP: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // Formato YYYY-MM-DD
  completedLessons: string[]; // Lista de lesson IDs completadas
  completedExercises: string[]; // Lista de exercise IDs completados
  quizScores: Record<string, number>; // lessonId -> puntaje porcentaje (0-100)
  unlockedBadges: string[]; // Lista de badge IDs desbloqueados
  lessonCodeSaves: Record<string, string>; // exerciseId/lessonId -> borrador de código
  levelTestCompleted: boolean;
  recommendedModuleId?: number;
  currentLessonId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalBadgesUnlocked: number;
  streakDays: number;
  totalXP: number;
  level: number;
  rankTitle: string;
  nextLevelXP: number;
  levelProgressPercent: number;
}
