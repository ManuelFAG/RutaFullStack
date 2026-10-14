import { Module } from '../../types/curriculum';
import { MODULE_1_FUNDAMENTOS } from './module1-fundamentos';
import { MODULE_2_FRONTEND } from './module2-frontend';
import { MODULE_3_BACKEND } from './module3-backend';
import { MODULE_4_DATABASES } from './module4-databases';
import { MODULE_5_MULTIPLATFORM } from './module5-multiplatform';
import { MODULE_6_DEVOPS } from './module6-devops';
import { MODULE_7_FINAL_PROJECT } from './module7-final-project';
import { MODULE_8_CAREER } from './module8-career';

export const ALL_MODULES: Module[] = [
  MODULE_1_FUNDAMENTOS,
  MODULE_2_FRONTEND,
  MODULE_3_BACKEND,
  MODULE_4_DATABASES,
  MODULE_5_MULTIPLATFORM,
  MODULE_6_DEVOPS,
  MODULE_7_FINAL_PROJECT,
  MODULE_8_CAREER,
];

export function getModuleById(id: number): Module | undefined {
  return ALL_MODULES.find((m) => m.id === id);
}

export function getLessonById(lessonId: string) {
  for (const mod of ALL_MODULES) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module: mod };
  }
  return null;
}

export function getAllLessons() {
  return ALL_MODULES.flatMap((m) => m.lessons);
}
