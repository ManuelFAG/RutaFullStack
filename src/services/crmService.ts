import { supabase } from './supabaseClient';
import { UserRole, FunnelStatus } from '../types/auth';

export interface CRMTag {
  id: string;
  name: string;
  color: string;
}

export interface CRMNote {
  id: string;
  userId: string;
  authorId?: string;
  content: string;
  createdAt: string;
}

export interface CRMStudent {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  funnelStatus: FunnelStatus;
  objective?: string;
  experienceLevel?: string;
  isBlocked: boolean;
  marketingConsent: boolean;
  createdAt: string;
  lastSeenAt: string;
  // Métricas agregadas de progreso
  totalXP: number;
  level: number;
  streakDays: number;
  completedLessonsCount: number;
  completedExercisesCount: number;
  unlockedBadgesCount: number;
  currentLessonId?: string;
  // Relaciones
  tags: CRMTag[];
  notesCount: number;
}

export interface CRMStudentDetail extends CRMStudent {
  notes: CRMNote[];
  completedLessons: string[];
  unlockedBadges: string[];
}

export class CRMService {
  /**
   * Obtiene la lista completa de estudiantes para la tabla del CRM
   */
  async getStudents(): Promise<CRMStudent[]> {
    if (!supabase) return [];

    try {
      // 1. Obtener perfiles
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (pError || !profiles) {
        console.error('Error al cargar perfiles en CRM:', pError);
        return [];
      }

      // 2. Obtener progreso de todos los usuarios
      const { data: progressList } = await supabase.from('user_progress').select('*');
      const progressMap = new Map((progressList || []).map((p) => [p.user_id, p]));

      // 3. Obtener etiquetas asignadas
      const { data: userTags } = await supabase
        .from('user_tags')
        .select('user_id, tags:tag_id(id, name, color)');

      const tagsMap = new Map<string, CRMTag[]>();
      (userTags || []).forEach((ut: any) => {
        if (!ut.tags) return;
        const current = tagsMap.get(ut.user_id) || [];
        current.push({
          id: ut.tags.id,
          name: ut.tags.name,
          color: ut.tags.color || '#10b981',
        });
        tagsMap.set(ut.user_id, current);
      });

      // 4. Obtener conteo de notas por usuario
      const { data: notes } = await supabase.from('crm_notes').select('id, user_id');
      const notesCountMap = new Map<string, number>();
      (notes || []).forEach((n) => {
        notesCountMap.set(n.user_id, (notesCountMap.get(n.user_id) || 0) + 1);
      });

      return profiles.map((p) => {
        const prog = progressMap.get(p.id);
        const completedLessons = Array.isArray(prog?.completed_lessons) ? prog.completed_lessons : [];
        const completedExercises = Array.isArray(prog?.completed_exercises) ? prog.completed_exercises : [];
        const unlockedBadges = Array.isArray(prog?.unlocked_badges) ? prog.unlocked_badges : [];

        return {
          id: p.id,
          email: p.email,
          fullName: p.full_name || 'Sin nombre',
          avatarUrl: p.avatar_url,
          role: p.role,
          funnelStatus: p.funnel_status || 'nuevo',
          objective: p.objective,
          experienceLevel: p.experience_level,
          isBlocked: Boolean(p.is_blocked),
          marketingConsent: Boolean(p.marketing_consent),
          createdAt: p.created_at,
          lastSeenAt: p.last_seen_at || p.created_at,
          totalXP: prog?.total_xp || 0,
          level: prog?.level || 1,
          streakDays: prog?.streak_days || 0,
          completedLessonsCount: completedLessons.length,
          completedExercisesCount: completedExercises.length,
          unlockedBadgesCount: unlockedBadges.length,
          currentLessonId: prog?.current_lesson_id,
          tags: tagsMap.get(p.id) || [],
          notesCount: notesCountMap.get(p.id) || 0,
        };
      });
    } catch (err) {
      console.error('Fallo en CRMService.getStudents:', err);
      return [];
    }
  }

  /**
   * Obtiene la ficha 360° detallada de un alumno
   */
  async getStudentDetail(studentId: string): Promise<CRMStudentDetail | null> {
    if (!supabase) return null;

    try {
      const students = await this.getStudents();
      const base = students.find((s) => s.id === studentId);
      if (!base) return null;

      // Obtener notas
      const { data: notesData } = await supabase
        .from('crm_notes')
        .select('*')
        .eq('user_id', studentId)
        .order('created_at', { ascending: false });

      const notes: CRMNote[] = (notesData || []).map((n) => ({
        id: n.id,
        userId: n.user_id,
        authorId: n.author_id,
        content: n.content,
        createdAt: n.created_at,
      }));

      // Obtener progreso detallado
      const { data: prog } = await supabase
        .from('user_progress')
        .select('completed_lessons, unlocked_badges')
        .eq('user_id', studentId)
        .maybeSingle();

      return {
        ...base,
        notes,
        completedLessons: Array.isArray(prog?.completed_lessons) ? prog.completed_lessons : [],
        unlockedBadges: Array.isArray(prog?.unlocked_badges) ? prog.unlocked_badges : [],
      };
    } catch (err) {
      console.error('Error en getStudentDetail:', err);
      return null;
    }
  }

  /**
   * Agrega una nota interna sobre un estudiante
   */
  async addNote(studentId: string, content: string): Promise<CRMNote | null> {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('crm_notes')
        .insert({
          user_id: studentId,
          content: content.trim(),
        })
        .select()
        .single();

      if (error || !data) {
        console.error('Error insertando nota CRM:', error);
        return null;
      }

      return {
        id: data.id,
        userId: data.user_id,
        content: data.content,
        createdAt: data.created_at,
      };
    } catch (err) {
      console.error('Error en addNote:', err);
      return null;
    }
  }

  /**
   * Elimina una nota
   */
  async deleteNote(noteId: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('crm_notes').delete().eq('id', noteId);
      return !error;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene todas las etiquetas del catálogo
   */
  async getAllTags(): Promise<CRMTag[]> {
    if (!supabase) return [];
    try {
      const { data } = await supabase.from('tags').select('*').order('name');
      return (data || []).map((t) => ({ id: t.id, name: t.name, color: t.color }));
    } catch {
      return [];
    }
  }

  /**
   * Crea una nueva etiqueta personalizada
   */
  async createTag(name: string, color: string): Promise<CRMTag | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert({ name: name.trim(), color: color || '#10b981' })
        .select()
        .single();

      if (error || !data) return null;
      return { id: data.id, name: data.name, color: data.color };
    } catch {
      return null;
    }
  }

  /**
   * Asigna una etiqueta a un alumno
   */
  async assignTag(studentId: string, tagId: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('user_tags').insert({
        user_id: studentId,
        tag_id: tagId,
      });
      return !error;
    } catch {
      return false;
    }
  }

  /**
   * Desasigna una etiqueta de un alumno
   */
  async removeTag(studentId: string, tagId: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('user_tags')
        .delete()
        .eq('user_id', studentId)
        .eq('tag_id', tagId);
      return !error;
    } catch {
      return false;
    }
  }

  /**
   * Actualiza el estado o rol de un estudiante
   */
  async updateStudent(
    studentId: string,
    updates: {
      role?: UserRole;
      funnelStatus?: FunnelStatus;
      isBlocked?: boolean;
    }
  ): Promise<boolean> {
    if (!supabase) return false;

    try {
      const payload: any = { updated_at: new Date().toISOString() };
      if (updates.role) payload.role = updates.role;
      if (updates.funnelStatus) payload.funnel_status = updates.funnelStatus;
      if (typeof updates.isBlocked === 'boolean') payload.is_blocked = updates.isBlocked;

      const { error } = await supabase.from('profiles').update(payload).eq('id', studentId);
      return !error;
    } catch {
      return false;
    }
  }

  /**
   * Exporta la lista de estudiantes a formato CSV y dispara la descarga en el navegador
   */
  exportToCSV(students: CRMStudent[]): void {
    const headers = [
      'ID',
      'Nombre',
      'Email',
      'Rol',
      'Estado Embudo',
      'Nivel',
      'Total XP',
      'Racha (días)',
      'Lecciones Completadas',
      'Insignias',
      'Etiquetas',
      'Fecha Registro',
    ];

    const rows = students.map((s) => [
      `"${s.id}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.role}"`,
      `"${s.funnelStatus}"`,
      s.level,
      s.totalXP,
      s.streakDays,
      s.completedLessonsCount,
      s.unlockedBadgesCount,
      `"${s.tags.map((t) => t.name).join(', ')}"`,
      `"${new Date(s.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `alumnos_rutafullstack_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const crmService = new CRMService();
