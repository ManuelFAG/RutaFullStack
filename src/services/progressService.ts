import { IProgressRepository } from './storage/types';
import { LocalStorageProgressAdapter } from './storage/localStorageAdapter';
import { UserProgress, UserStats } from '../types/progress';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progreso' | 'racha' | 'desafio' | 'modulo';
}

export const BADGE_CATALOGUE: BadgeDefinition[] = [
  {
    id: 'primeros-pasos',
    name: 'Primeros Pasos',
    description: 'Completaste tu primera lección en RutaFullStack',
    icon: 'Footprints',
    category: 'progreso',
  },
  {
    id: 'primer-codigo',
    name: '¡Hola, Mundo!',
    description: 'Resolviste tu primer ejercicio interactivo con éxito',
    icon: 'Code2',
    category: 'progreso',
  },
  {
    id: 'explorador-fundamentos',
    name: 'Explorador de Fundamentos',
    description: 'Completaste 5 lecciones de Fundamentos de programación',
    icon: 'Compass',
    category: 'modulo',
  },
  {
    id: 'racha-3-dias',
    name: 'Fuego Encendido',
    description: 'Mantuviste una racha de estudio durante 3 días consecutivos',
    icon: 'Flame',
    category: 'racha',
  },
  {
    id: 'racha-7-dias',
    name: 'Hábito de Acero',
    description: 'Alcanzaste una racha de 7 días continuos programando',
    icon: 'Zap',
    category: 'racha',
  },
  {
    id: 'solucionador-nato',
    name: 'Solucionador Nato',
    description: 'Completaste 10 ejercicios de código en la plataforma',
    icon: 'Award',
    category: 'desafio',
  },
  {
    id: 'modulo-1-maestro',
    name: 'Maestro de Fundamentos',
    description: 'Completaste todas las lecciones del Módulo 1',
    icon: 'Sparkles',
    category: 'modulo',
  },
  {
    id: 'modulo-2-maestro',
    name: 'Arquitecto Frontend',
    description: 'Completaste todas las lecciones del Módulo 2 de Frontend Moderno',
    icon: 'Palette',
    category: 'modulo',
  },
  {
    id: 'domador-del-dom',
    name: 'Domador del DOM',
    description: 'Dominaste los eventos, JavaScript ES6+ y React',
    icon: 'Zap',
    category: 'desafio',
  },
  {
    id: 'modulo-3-maestro',
    name: 'Ingeniero de Servidores',
    description: 'Completaste todas las lecciones del Módulo 3 de Backend y APIs REST',
    icon: 'ShieldCheck',
    category: 'modulo',
  },
  {
    id: 'guardian-del-token',
    name: 'Guardián del Token',
    description: 'Dominaste la autenticación segura con JWT y protección con Bcrypt',
    icon: 'Award',
    category: 'desafio',
  },
  {
    id: 'modulo-4-maestro',
    name: 'Guardián de Datos',
    description: 'Completaste todas las lecciones del Módulo 4 de Bases de Datos y ORMs',
    icon: 'HardDrive',
    category: 'modulo',
  },
  {
    id: 'maestro-de-las-queries',
    name: 'Maestro de las Consultas',
    description: 'Dominaste SQL, JOINs relacionales y el modelado tipado con Prisma ORM',
    icon: 'Database',
    category: 'desafio',
  },
  {
    id: 'modulo-5-maestro',
    name: 'Desarrollador Omnipresente',
    description: 'Completaste todas las lecciones del Módulo 5 de Desarrollo Multiplataforma',
    icon: 'Layers',
    category: 'modulo',
  },
  {
    id: 'conquistador-multiplataforma',
    name: 'Conquistador Multiplataforma',
    description: 'Dominaste PWAs, React Native con Expo y aplicaciones de escritorio con Tauri',
    icon: 'Smartphone',
    category: 'desafio',
  },
  {
    id: 'modulo-6-maestro',
    name: 'Capitán DevOps',
    description: 'Completaste todas las lecciones del Módulo 6 de DevOps y Despliegue en la Nube',
    icon: 'Cloud',
    category: 'modulo',
  },
  {
    id: 'maestro-del-pipeline',
    name: 'Maestro del Pipeline',
    description: 'Dominaste Docker, CI/CD con GitHub Actions y el monitoreo con Health Checks',
    icon: 'Terminal',
    category: 'desafio',
  },
  {
    id: 'modulo-7-maestro',
    name: 'Creador de Productos',
    description: 'Completaste la construcción y despliegue real del Proyecto Final Full Stack',
    icon: 'Rocket',
    category: 'modulo',
  },
  {
    id: 'arquitecto-fullstack-real',
    name: 'Arquitecto Full Stack Real',
    description: 'Conectaste Frontend React, Backend Express y PostgreSQL en producción con autenticación JWT',
    icon: 'Award',
    category: 'desafio',
  },
  {
    id: 'modulo-8-maestro',
    name: 'Programador Profesional',
    description: 'Completaste la preparación de carrera, CV técnico y simulacros de entrevistas técnicas',
    icon: 'Briefcase',
    category: 'modulo',
  },
  {
    id: 'arquitecto-fullstack-graduado',
    name: 'Maestro Full Stack Graduado',
    description: '¡Completaste con éxito los 8 módulos de RutaFullStack! Listo para el mercado laboral global',
    icon: 'Trophy',
    category: 'desafio',
  },
];

export const RANK_TIERS = [
  { level: 1, title: 'Novato del Teclado', minXP: 0 },
  { level: 2, title: 'Aprendiz de Código', minXP: 100 },
  { level: 3, title: 'Explorador de Terminal', minXP: 250 },
  { level: 4, title: 'Desarrollador Junior', minXP: 500 },
  { level: 5, title: 'Domador de Lógica', minXP: 800 },
  { level: 6, title: 'Constructor Frontend', minXP: 1200 },
  { level: 7, title: 'Ingeniero de Servidores', minXP: 1800 },
  { level: 8, title: 'Arquitecto de Datos', minXP: 2500 },
  { level: 9, title: 'Desarrollador Multiplataforma', minXP: 3500 },
  { level: 10, title: 'Arquitecto Full Stack Senior', minXP: 5000 },
];

class ProgressService {
  private repository: IProgressRepository;

  constructor(repo?: IProgressRepository) {
    // Por defecto usa LocalStorage (Fase 1).
    // En Fase 2, se puede inyectar SupabaseProgressAdapter aquí.
    this.repository = repo || new LocalStorageProgressAdapter();
  }

  public getRepository(): IProgressRepository {
    return this.repository;
  }

  public setRepository(newRepo: IProgressRepository): void {
    this.repository = newRepo;
  }

  public async getProgress(): Promise<UserProgress> {
    return this.repository.getProgress();
  }

  public async markLessonCompleted(lessonId: string, xpEarned: number = 50): Promise<UserProgress> {
    return this.repository.markLessonCompleted(lessonId, xpEarned);
  }

  public async saveQuizResult(lessonId: string, scorePercent: number, xpEarned: number = 30): Promise<UserProgress> {
    return this.repository.saveQuizResult(lessonId, scorePercent, xpEarned);
  }

  public async markExerciseCompleted(exerciseId: string, xpEarned: number = 15): Promise<UserProgress> {
    return this.repository.markExerciseCompleted(exerciseId, xpEarned);
  }

  public async saveCodeDraft(key: string, code: string): Promise<void> {
    return this.repository.saveCodeDraft(key, code);
  }

  public async updateStreak(): Promise<UserProgress> {
    return this.repository.updateStreak();
  }

  public async unlockBadge(badgeId: string): Promise<UserProgress> {
    return this.repository.unlockBadge(badgeId);
  }

  public async saveLevelTestResult(recommendedModuleId: number): Promise<UserProgress> {
    return this.repository.saveLevelTestResult(recommendedModuleId);
  }

  public async exportData(): Promise<string> {
    return this.repository.exportData();
  }

  public async importData(jsonData: string): Promise<{ success: boolean; message: string; data?: UserProgress }> {
    return this.repository.importData(jsonData);
  }

  public async resetProgress(): Promise<UserProgress> {
    return this.repository.resetProgress();
  }

  public calculateStats(progress: UserProgress): UserStats {
    const totalXP = progress.totalXP;
    
    // Hallar rango
    let currentTier = RANK_TIERS[0];
    let nextTier = RANK_TIERS[1];

    for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
      if (totalXP >= RANK_TIERS[i].minXP) {
        currentTier = RANK_TIERS[i];
        nextTier = RANK_TIERS[i + 1] || RANK_TIERS[i];
        break;
      }
    }

    const nextLevelXP = nextTier.minXP;
    const currentTierMin = currentTier.minXP;
    const span = Math.max(1, nextLevelXP - currentTierMin);
    const progressInTier = Math.max(0, totalXP - currentTierMin);
    const levelProgressPercent = Math.min(100, Math.round((progressInTier / span) * 100));

    return {
      totalLessonsCompleted: progress.completedLessons.length,
      totalExercisesCompleted: progress.completedExercises.length,
      totalBadgesUnlocked: progress.unlockedBadges.length,
      streakDays: progress.streakDays,
      totalXP,
      level: currentTier.level,
      rankTitle: currentTier.title,
      nextLevelXP,
      levelProgressPercent,
    };
  }
}

export const progressService = new ProgressService();
