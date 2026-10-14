import { IProgressRepository } from './types';
import { UserProgress } from '../../types/progress';

const STORAGE_KEY = 'rutafullstack_progress_v1';

export const INITIAL_PROGRESS: UserProgress = {
  version: '1.0.0',
  userName: 'Desarrollador',
  totalXP: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  completedExercises: [],
  quizScores: {},
  unlockedBadges: [],
  lessonCodeSaves: {},
  levelTestCompleted: false,
  recommendedModuleId: 1,
  currentLessonId: 'm1-l1-como-funciona-internet',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export class LocalStorageProgressAdapter implements IProgressRepository {
  private cache: UserProgress | null = null;

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private calculateLevel(xp: number): number {
    // Curva de nivel: cada nivel requiere un incremento progresivo
    // Nivel 1: 0 - 99 XP
    // Nivel 2: 100 - 249 XP
    // Nivel 3: 250 - 449 XP, etc.
    return Math.max(1, Math.floor(Math.sqrt(xp / 25)) + 1);
  }

  public async getProgress(): Promise<UserProgress> {
    if (this.cache) return this.cache;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.cache = { ...INITIAL_PROGRESS };
        await this.saveProgress(this.cache);
        return this.cache;
      }
      const parsed = JSON.parse(raw) as UserProgress;
      // Mezclar con valores iniciales por si hay nuevos campos
      this.cache = { ...INITIAL_PROGRESS, ...parsed };
      return this.cache;
    } catch (e) {
      console.warn('Error leyendo localStorage, usando estado inicial:', e);
      this.cache = { ...INITIAL_PROGRESS };
      return this.cache;
    }
  }

  public async saveProgress(progress: UserProgress): Promise<void> {
    const updated = {
      ...progress,
      level: this.calculateLevel(progress.totalXP),
      updatedAt: new Date().toISOString(),
    };
    this.cache = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('rutafullstack:progress-updated', { detail: updated }));
  }

  public async markLessonCompleted(lessonId: string, xpEarned: number): Promise<UserProgress> {
    const current = await this.getProgress();
    const alreadyCompleted = current.completedLessons.includes(lessonId);

    const completedLessons = alreadyCompleted
      ? current.completedLessons
      : [...current.completedLessons, lessonId];

    const xpToAdd = alreadyCompleted ? 0 : xpEarned;
    const totalXP = current.totalXP + xpToAdd;

    // Verificar insignias automáticas
    const badges = [...current.unlockedBadges];
    if (!badges.includes('primeros-pasos') && completedLessons.length >= 1) {
      badges.push('primeros-pasos');
    }
    if (!badges.includes('explorador-fundamentos') && completedLessons.length >= 5) {
      badges.push('explorador-fundamentos');
    }
    const m2Lessons = ['m2-l1-html5-semantico', 'm2-l2-css3-flexbox-grid', 'm2-l3-javascript-es6-dom', 'm2-l4-apis-fetch-async-await', 'm2-l5-react-y-typescript'];
    const hasFinishedM2 = m2Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-2-maestro') && hasFinishedM2) {
      badges.push('modulo-2-maestro');
    }
    const m3Lessons = ['m3-l1-nodejs-event-loop', 'm3-l2-express-middlewares', 'm3-l3-apis-rest-y-codigos-http', 'm3-l4-autenticacion-jwt', 'm3-l5-validacion-hashing-seguridad'];
    const hasFinishedM3 = m3Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-3-maestro') && hasFinishedM3) {
      badges.push('modulo-3-maestro');
    }
    const m4Lessons = [
      'm4-l1-introduccion-bases-de-datos',
      'm4-l2-sql-consultas-fundamentales',
      'm4-l3-relaciones-y-joins',
      'm4-l4-mongodb-y-documentos',
      'm4-l5-prisma-orm-y-migraciones',
    ];
    const hasFinishedM4 = m4Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-4-maestro') && hasFinishedM4) {
      badges.push('modulo-4-maestro');
    }
    const m5Lessons = [
      'm5-l1-introduccion-multiplataforma-y-pwa',
      'm5-l2-react-native-y-expo',
      'm5-l3-sensores-y-hardware-movil',
      'm5-l4-apps-escritorio-electron-tauri',
      'm5-l5-arquitectura-unificada-monorepo',
    ];
    const hasFinishedM5 = m5Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-5-maestro') && hasFinishedM5) {
      badges.push('modulo-5-maestro');
    }
    const m6Lessons = [
      'm6-l1-variables-entorno-y-configuracion',
      'm6-l2-testing-unitario-e-integracion',
      'm6-l3-docker-y-contenedores',
      'm6-l4-ci-cd-con-github-actions',
      'm6-l5-despliegue-en-la-nube',
    ];
    const hasFinishedM6 = m6Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-6-maestro') && hasFinishedM6) {
      badges.push('modulo-6-maestro');
    }
    const m7Lessons = [
      'm7-l1-planificacion-arquitectura-y-modelo-de-datos',
      'm7-l2-backend-autenticacion-y-crud-robusto',
      'm7-l3-frontend-react-ui-y-consumo-de-api',
      'm7-l4-integracion-testing-e2e-y-seguridad',
      'm7-l5-despliegue-produccion-y-lanzamiento',
    ];
    const hasFinishedM7 = m7Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-7-maestro') && hasFinishedM7) {
      badges.push('modulo-7-maestro');
    }
    const m8Lessons = [
      'm8-l1-portafolio-tecnico-de-alto-impacto',
      'm8-l2-curriculum-vitae-y-linkedin-tech',
      'm8-l3-entrevistas-tecnicas-y-live-coding',
      'm8-l4-codigo-limpio-y-buenas-practicas',
      'm8-l5-mentalidad-full-stack-y-futuro',
    ];
    const hasFinishedM8 = m8Lessons.every((id) => completedLessons.includes(id));
    if (!badges.includes('modulo-8-maestro') && hasFinishedM8) {
      badges.push('modulo-8-maestro');
    }
    if (!badges.includes('arquitecto-fullstack-graduado') && completedLessons.length >= 40) {
      badges.push('arquitecto-fullstack-graduado');
    }

    const updated: UserProgress = {
      ...current,
      completedLessons,
      totalXP,
      unlockedBadges: badges,
      currentLessonId: lessonId,
    };

    await this.saveProgress(updated);
    return updated;
  }

  public async saveQuizResult(lessonId: string, scorePercent: number, xpEarned: number): Promise<UserProgress> {
    const current = await this.getProgress();
    const prevScore = current.quizScores[lessonId] || 0;
    const isFirstTimePass = !current.quizScores[lessonId] && scorePercent >= 70;

    const quizScores = {
      ...current.quizScores,
      [lessonId]: Math.max(prevScore, scorePercent),
    };

    const totalXP = current.totalXP + (isFirstTimePass ? xpEarned : 0);

    const updated: UserProgress = {
      ...current,
      quizScores,
      totalXP,
    };

    await this.saveProgress(updated);
    return updated;
  }

  public async markExerciseCompleted(exerciseId: string, xpEarned: number): Promise<UserProgress> {
    const current = await this.getProgress();
    if (current.completedExercises.includes(exerciseId)) {
      return current;
    }

    const completedExercises = [...current.completedExercises, exerciseId];
    const totalXP = current.totalXP + xpEarned;

    const badges = [...current.unlockedBadges];
    if (!badges.includes('primer-codigo') && completedExercises.length >= 1) {
      badges.push('primer-codigo');
    }
    if (!badges.includes('solucionador-nato') && completedExercises.length >= 10) {
      badges.push('solucionador-nato');
    }

    const updated: UserProgress = {
      ...current,
      completedExercises,
      totalXP,
      unlockedBadges: badges,
    };

    await this.saveProgress(updated);
    return updated;
  }

  public async saveCodeDraft(key: string, code: string): Promise<void> {
    const current = await this.getProgress();
    const lessonCodeSaves = {
      ...current.lessonCodeSaves,
      [key]: code,
    };
    await this.saveProgress({ ...current, lessonCodeSaves });
  }

  public async updateStreak(): Promise<UserProgress> {
    const current = await this.getProgress();
    const today = this.getTodayString();

    if (current.lastActiveDate === today) {
      return current; // Ya se registró actividad hoy
    }

    const lastDate = new Date(current.lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let streakDays = current.streakDays;

    if (diffDays === 1) {
      // Actividad consecutiva
      streakDays += 1;
    } else if (diffDays > 1) {
      // Racha interrumpida
      streakDays = 1;
    }

    const badges = [...current.unlockedBadges];
    if (streakDays >= 3 && !badges.includes('racha-3-dias')) {
      badges.push('racha-3-dias');
    }
    if (streakDays >= 7 && !badges.includes('racha-7-dias')) {
      badges.push('racha-7-dias');
    }

    const updated: UserProgress = {
      ...current,
      streakDays,
      lastActiveDate: today,
      unlockedBadges: badges,
    };

    await this.saveProgress(updated);
    return updated;
  }

  public async unlockBadge(badgeId: string): Promise<UserProgress> {
    const current = await this.getProgress();
    if (current.unlockedBadges.includes(badgeId)) {
      return current;
    }
    const updated: UserProgress = {
      ...current,
      unlockedBadges: [...current.unlockedBadges, badgeId],
      totalXP: current.totalXP + 100, // Bono por insignia
    };
    await this.saveProgress(updated);
    return updated;
  }

  public async saveLevelTestResult(recommendedModuleId: number): Promise<UserProgress> {
    const current = await this.getProgress();
    const updated: UserProgress = {
      ...current,
      levelTestCompleted: true,
      recommendedModuleId,
      totalXP: current.totalXP + 50,
    };
    await this.saveProgress(updated);
    return updated;
  }

  public async exportData(): Promise<string> {
    const current = await this.getProgress();
    return JSON.stringify(current, null, 2);
  }

  public async importData(jsonData: string): Promise<{ success: boolean; message: string; data?: UserProgress }> {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'El archivo no contiene un JSON válido.' };
      }
      if (!Array.isArray(parsed.completedLessons) || typeof parsed.totalXP !== 'number') {
        return { success: false, message: 'La estructura de los datos no corresponde a un respaldo de RutaFullStack.' };
      }

      const merged: UserProgress = {
        ...INITIAL_PROGRESS,
        ...parsed,
        updatedAt: new Date().toISOString(),
      };

      await this.saveProgress(merged);
      return { success: true, message: '¡Progreso importado con éxito!', data: merged };
    } catch (e) {
      return { success: false, message: 'Error al interpretar el archivo JSON: ' + (e as Error).message };
    }
  }

  public async resetProgress(): Promise<UserProgress> {
    this.cache = { ...INITIAL_PROGRESS, createdAt: new Date().toISOString() };
    await this.saveProgress(this.cache);
    return this.cache;
  }
}
