import { IProgressRepository } from './types';
import { UserProgress } from '../../types/progress';
import { supabase } from '../supabaseClient';
import { INITIAL_PROGRESS } from './localStorageAdapter';

export class SupabaseProgressAdapter implements IProgressRepository {
  private userId: string;
  private cache: UserProgress | null = null;

  constructor(userId: string) {
    this.userId = userId;
  }

  private calculateLevel(xp: number): number {
    return Math.max(1, Math.floor(Math.sqrt(xp / 25)) + 1);
  }

  public async getProgress(): Promise<UserProgress> {
    if (this.cache) return this.cache;
    if (!supabase) return { ...INITIAL_PROGRESS };

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', this.userId)
        .maybeSingle();

      if (error) {
        console.warn('Error al obtener progreso de Supabase, usando inicial:', error);
        this.cache = { ...INITIAL_PROGRESS };
        return this.cache;
      }

      if (!data) {
        // Inicializar registro en Supabase
        const initial = { ...INITIAL_PROGRESS };
        await this.saveProgress(initial);
        this.cache = initial;
        return initial;
      }

      this.cache = {
        version: data.version || '2.0.0',
        userName: 'Estudiante',
        totalXP: data.total_xp || 0,
        level: data.level || this.calculateLevel(data.total_xp || 0),
        streakDays: data.streak_days || 0,
        lastActiveDate: data.last_active_date || new Date().toISOString().split('T')[0],
        completedLessons: Array.isArray(data.completed_lessons) ? data.completed_lessons : [],
        completedExercises: Array.isArray(data.completed_exercises) ? data.completed_exercises : [],
        quizScores: data.quiz_scores || {},
        unlockedBadges: Array.isArray(data.unlocked_badges) ? data.unlocked_badges : [],
        lessonCodeSaves: data.lesson_code_saves || {},
        levelTestCompleted: Boolean(data.level_test_completed),
        recommendedModuleId: data.recommended_module_id || 1,
        currentLessonId: data.current_lesson_id || 'm1-l1-como-funciona-internet',
        createdAt: data.created_at || new Date().toISOString(),
        updatedAt: data.updated_at || new Date().toISOString(),
      };

      return this.cache;
    } catch (err) {
      console.error('Fallo de red al conectar con Supabase:', err);
      return { ...INITIAL_PROGRESS };
    }
  }

  public async saveProgress(progress: UserProgress): Promise<void> {
    const updated: UserProgress = {
      ...progress,
      level: this.calculateLevel(progress.totalXP),
      updatedAt: new Date().toISOString(),
    };
    this.cache = updated;

    // Notificar reactivamente a la UI
    window.dispatchEvent(new CustomEvent('rutafullstack:progress-updated', { detail: updated }));

    if (!supabase) return;

    try {
      await supabase.from('user_progress').upsert(
        {
          user_id: this.userId,
          version: updated.version,
          total_xp: updated.totalXP,
          level: updated.level,
          streak_days: updated.streakDays,
          last_active_date: updated.lastActiveDate,
          completed_lessons: updated.completedLessons,
          completed_exercises: updated.completedExercises,
          quiz_scores: updated.quizScores,
          unlocked_badges: updated.unlockedBadges,
          lesson_code_saves: updated.lessonCodeSaves,
          level_test_completed: updated.levelTestCompleted,
          recommended_module_id: updated.recommendedModuleId,
          current_lesson_id: updated.currentLessonId,
          updated_at: updated.updatedAt,
        },
        { onConflict: 'user_id' }
      );
    } catch (err) {
      console.error('Error guardando progreso en Supabase:', err);
    }
  }

  public async markLessonCompleted(lessonId: string, xpEarned: number): Promise<UserProgress> {
    const current = await this.getProgress();
    const alreadyCompleted = current.completedLessons.includes(lessonId);

    const completedLessons = alreadyCompleted
      ? current.completedLessons
      : [...current.completedLessons, lessonId];

    const xpToAdd = alreadyCompleted ? 0 : xpEarned;
    const totalXP = current.totalXP + xpToAdd;

    // Calcular insignias
    const badges = [...current.unlockedBadges];
    if (!badges.includes('primeros-pasos') && completedLessons.length >= 1) {
      badges.push('primeros-pasos');
    }
    if (!badges.includes('explorador-fundamentos') && completedLessons.length >= 5) {
      badges.push('explorador-fundamentos');
    }

    const m2Lessons = ['m2-l1-html5-semantico', 'm2-l2-css3-flexbox-grid', 'm2-l3-javascript-es6-dom', 'm2-l4-apis-fetch-async-await', 'm2-l5-react-y-typescript'];
    if (!badges.includes('modulo-2-maestro') && m2Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-2-maestro');
    }

    const m3Lessons = ['m3-l1-nodejs-event-loop', 'm3-l2-express-middlewares', 'm3-l3-apis-rest-y-codigos-http', 'm3-l4-autenticacion-jwt', 'm3-l5-validacion-hashing-seguridad'];
    if (!badges.includes('modulo-3-maestro') && m3Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-3-maestro');
    }

    const m4Lessons = ['m4-l1-introduccion-bases-de-datos', 'm4-l2-sql-consultas-fundamentales', 'm4-l3-relaciones-y-joins', 'm4-l4-mongodb-y-documentos', 'm4-l5-prisma-orm-y-migraciones'];
    if (!badges.includes('modulo-4-maestro') && m4Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-4-maestro');
    }

    const m5Lessons = ['m5-l1-introduccion-multiplataforma-y-pwa', 'm5-l2-react-native-y-expo', 'm5-l3-sensores-y-hardware-movil', 'm5-l4-apps-escritorio-electron-tauri', 'm5-l5-arquitectura-unificada-monorepo'];
    if (!badges.includes('modulo-5-maestro') && m5Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-5-maestro');
    }

    const m6Lessons = ['m6-l1-variables-entorno-y-configuracion', 'm6-l2-testing-unitario-e-integracion', 'm6-l3-docker-y-contenedores', 'm6-l4-ci-cd-con-github-actions', 'm6-l5-despliegue-en-la-nube'];
    if (!badges.includes('modulo-6-maestro') && m6Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-6-maestro');
    }

    const m7Lessons = ['m7-l1-planificacion-arquitectura-y-modelo-de-datos', 'm7-l2-backend-autenticacion-y-crud-robusto', 'm7-l3-frontend-react-ui-y-consumo-de-api', 'm7-l4-integracion-testing-e2e-y-seguridad', 'm7-l5-despliegue-produccion-y-lanzamiento'];
    if (!badges.includes('modulo-7-maestro') && m7Lessons.every((id) => completedLessons.includes(id))) {
      badges.push('modulo-7-maestro');
    }

    const m8Lessons = ['m8-l1-portafolio-tecnico-de-alto-impacto', 'm8-l2-curriculum-vitae-y-linkedin-tech', 'm8-l3-entrevistas-tecnicas-y-live-coding', 'm8-l4-codigo-limpio-y-buenas-practicas', 'm8-l5-mentalidad-full-stack-y-futuro'];
    if (!badges.includes('modulo-8-maestro') && m8Lessons.every((id) => completedLessons.includes(id))) {
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

    // Guardar en tabla relacional lesson_completions (activa trigger de ascenso a 'cliente')
    if (supabase && !alreadyCompleted) {
      supabase
        .from('lesson_completions')
        .upsert(
          {
            user_id: this.userId,
            lesson_id: lessonId,
            xp_earned: xpEarned,
          },
          { onConflict: 'user_id,lesson_id', ignoreDuplicates: true }
        )
        .then();
    }

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
      totalXP: current.totalXP + xpEarned,
      unlockedBadges: badges,
    };

    await this.saveProgress(updated);

    if (supabase) {
      supabase
        .from('exercise_completions')
        .upsert(
          {
            user_id: this.userId,
            exercise_id: exerciseId,
            xp_earned: xpEarned,
          },
          { onConflict: 'user_id,exercise_id', ignoreDuplicates: true }
        )
        .then();
    }

    return updated;
  }

  public async saveCodeDraft(key: string, code: string): Promise<void> {
    const current = await this.getProgress();
    const updated: UserProgress = {
      ...current,
      lessonCodeSaves: {
        ...current.lessonCodeSaves,
        [key]: code,
      },
    };
    await this.saveProgress(updated);
  }

  public async updateStreak(): Promise<UserProgress> {
    const current = await this.getProgress();
    const today = new Date().toISOString().split('T')[0];
    if (current.lastActiveDate === today) return current;

    const last = new Date(current.lastActiveDate);
    const now = new Date(today);
    const diffTime = Math.abs(now.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let streakDays = current.streakDays;
    if (diffDays === 1) {
      streakDays += 1;
    } else if (diffDays > 1) {
      streakDays = 1;
    }

    const badges = [...current.unlockedBadges];
    if (!badges.includes('racha-3-dias') && streakDays >= 3) {
      badges.push('racha-3-dias');
    }
    if (!badges.includes('racha-7-dias') && streakDays >= 7) {
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
    if (current.unlockedBadges.includes(badgeId)) return current;

    const updated: UserProgress = {
      ...current,
      unlockedBadges: [...current.unlockedBadges, badgeId],
    };

    await this.saveProgress(updated);

    if (supabase) {
      supabase
        .from('user_badges')
        .upsert(
          {
            user_id: this.userId,
            badge_id: badgeId,
          },
          { onConflict: 'user_id,badge_id', ignoreDuplicates: true }
        )
        .then();
    }

    return updated;
  }

  public async saveLevelTestResult(recommendedModuleId: number): Promise<UserProgress> {
    const current = await this.getProgress();
    const updated: UserProgress = {
      ...current,
      levelTestCompleted: true,
      recommendedModuleId,
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
      if (!parsed.completedLessons || !Array.isArray(parsed.completedLessons)) {
        return { success: false, message: 'El archivo JSON no contiene un formato de progreso válido.' };
      }
      await this.saveProgress(parsed);
      return { success: true, message: 'Progreso sincronizado exitosamente.', data: parsed };
    } catch {
      return { success: false, message: 'Error al interpretar el JSON.' };
    }
  }

  public async resetProgress(): Promise<UserProgress> {
    const fresh = { ...INITIAL_PROGRESS, createdAt: new Date().toISOString() };
    await this.saveProgress(fresh);
    return fresh;
  }

  /**
   * Sincroniza y fusiona datos locales con la nube al iniciar sesión
   */
  public async syncFromLocal(localProgress: UserProgress): Promise<UserProgress> {
    const cloudProgress = await this.getProgress();

    const mergedLessons = Array.from(new Set([...cloudProgress.completedLessons, ...localProgress.completedLessons]));
    const mergedExercises = Array.from(new Set([...cloudProgress.completedExercises, ...localProgress.completedExercises]));
    const mergedBadges = Array.from(new Set([...cloudProgress.unlockedBadges, ...localProgress.unlockedBadges]));
    const mergedQuizScores = { ...cloudProgress.quizScores, ...localProgress.quizScores };
    const mergedDrafts = { ...cloudProgress.lessonCodeSaves, ...localProgress.lessonCodeSaves };
    const totalXP = Math.max(cloudProgress.totalXP, localProgress.totalXP);
    const streakDays = Math.max(cloudProgress.streakDays, localProgress.streakDays);

    const merged: UserProgress = {
      ...cloudProgress,
      completedLessons: mergedLessons,
      completedExercises: mergedExercises,
      unlockedBadges: mergedBadges,
      quizScores: mergedQuizScores,
      lessonCodeSaves: mergedDrafts,
      totalXP,
      streakDays,
      levelTestCompleted: cloudProgress.levelTestCompleted || localProgress.levelTestCompleted,
      recommendedModuleId: cloudProgress.recommendedModuleId || localProgress.recommendedModuleId,
      updatedAt: new Date().toISOString(),
    };

    await this.saveProgress(merged);
    return merged;
  }
}
