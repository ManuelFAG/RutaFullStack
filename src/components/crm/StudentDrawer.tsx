import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Calendar,
  Tag,
  Plus,
  Trash2,
  Send,
  Loader2,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { CRMStudentDetail, CRMTag, crmService } from '../../services/crmService';
import { UserRole, FunnelStatus } from '../../types/auth';

interface StudentDrawerProps {
  studentId: string | null;
  onClose: () => void;
  onStudentUpdated: () => void;
}

export const StudentDrawer: React.FC<StudentDrawerProps> = ({
  studentId,
  onClose,
  onStudentUpdated,
}) => {
  const [student, setStudent] = useState<CRMStudentDetail | null>(null);
  const [allTags, setAllTags] = useState<CRMTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedTagToAdd, setSelectedTagToAdd] = useState('');

  const loadData = async () => {
    if (!studentId) return;
    setLoading(true);
    try {
      const [detail, tags] = await Promise.all([
        crmService.getStudentDetail(studentId),
        crmService.getAllTags(),
      ]);
      setStudent(detail);
      setAllTags(tags);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      loadData();
    }
  }, [studentId]);

  if (!studentId) return null;

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !student) return;
    setIsAddingNote(true);
    try {
      const added = await crmService.addNote(student.id, newNote);
      if (added) {
        setStudent({
          ...student,
          notes: [added, ...student.notes],
          notesCount: student.notesCount + 1,
        });
        setNewNote('');
        onStudentUpdated();
      }
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!student) return;
    const ok = await crmService.deleteNote(noteId);
    if (ok) {
      setStudent({
        ...student,
        notes: student.notes.filter((n) => n.id !== noteId),
        notesCount: Math.max(0, student.notesCount - 1),
      });
      onStudentUpdated();
    }
  };

  const handleAssignTag = async () => {
    if (!selectedTagToAdd || !student) return;
    const ok = await crmService.assignTag(student.id, selectedTagToAdd);
    if (ok) {
      const tagObj = allTags.find((t) => t.id === selectedTagToAdd);
      if (tagObj && !student.tags.some((t) => t.id === tagObj.id)) {
        setStudent({ ...student, tags: [...student.tags, tagObj] });
      }
      setSelectedTagToAdd('');
      onStudentUpdated();
    }
  };

  const handleRemoveTag = async (tagId: string) => {
    if (!student) return;
    const ok = await crmService.removeTag(student.id, tagId);
    if (ok) {
      setStudent({
        ...student,
        tags: student.tags.filter((t) => t.id !== tagId),
      });
      onStudentUpdated();
    }
  };

  const handleRoleChange = async (newRole: UserRole) => {
    if (!student) return;
    setIsUpdatingStatus(true);
    try {
      const ok = await crmService.updateStudent(student.id, { role: newRole });
      if (ok) {
        setStudent({ ...student, role: newRole });
        onStudentUpdated();
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleFunnelStatusChange = async (newStatus: FunnelStatus) => {
    if (!student) return;
    setIsUpdatingStatus(true);
    try {
      const ok = await crmService.updateStudent(student.id, { funnelStatus: newStatus });
      if (ok) {
        setStudent({ ...student, funnelStatus: newStatus });
        onStudentUpdated();
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const availableTagsToAdd = allTags.filter(
    (at) => !student?.tags.some((st) => st.id === at.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl text-slate-100 animate-slide-left">
        {/* Cabecera Drawer */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <User className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base text-white">Ficha 360° del Alumno</h3>
              <p className="text-[11px] text-slate-400 font-mono">ID: {studentId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            <span className="text-xs">Cargando expediente del estudiante...</span>
          </div>
        ) : !student ? (
          <div className="flex-1 p-8 text-center text-slate-400">
            No se encontró información del alumno.
          </div>
        ) : (
          <div className="p-5 space-y-6 flex-1">
            {/* Perfil Principal */}
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center font-bold text-lg text-white shrink-0 shadow-lg shadow-emerald-500/10">
                {student.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-base text-white truncate">{student.fullName}</h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Nivel {student.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono truncate">{student.email}</p>

                <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Registrado: {new Date(student.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Último acceso: {new Date(student.lastSeenAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Controles de Rol y Embudo de Conversión */}
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 space-y-3">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Gestión de Rol y Embudo
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Rol en Plataforma</label>
                  <select
                    disabled={isUpdatingStatus}
                    value={student.role}
                    onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="cliente_nuevo">🌱 Nuevo Alumno (Gratis)</option>
                    <option value="cliente">🚀 Alumno Activo / Pro</option>
                    <option value="admin">🛡️ Administrador CRM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Estado en Embudo</label>
                  <select
                    disabled={isUpdatingStatus}
                    value={student.funnelStatus}
                    onChange={(e) => handleFunnelStatusChange(e.target.value as FunnelStatus)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="nuevo">Nuevo Registro</option>
                    <option value="activo">Activo Estudiando</option>
                    <option value="de_pago">Suscrito (De Pago)</option>
                    <option value="en_riesgo">En Riesgo (Inactivo)</option>
                    <option value="inactivo">Inactivo Total</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Métricas de Progreso Académico */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Total XP</span>
                <span className="text-base font-extrabold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {student.totalXP}
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Lecciones</span>
                <span className="text-base font-extrabold text-sky-400 flex items-center justify-center gap-1 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {student.completedLessonsCount} / 40
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Racha</span>
                <span className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {student.streakDays}d
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Insignias</span>
                <span className="text-base font-extrabold text-purple-400 flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                  {student.unlockedBadgesCount}
                </span>
              </div>
            </div>

            {/* Etiquetas del Alumno */}
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" /> Etiquetas Asignadas
                </span>
                <span className="text-[10px] text-slate-500">Segmentación</span>
              </div>

              {/* Lista de tags activos */}
              <div className="flex flex-wrap gap-1.5">
                {student.tags.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">Sin etiquetas asignadas.</span>
                ) : (
                  student.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border"
                      style={{
                        backgroundColor: `${tag.color}15`,
                        borderColor: `${tag.color}40`,
                        color: tag.color,
                      }}
                    >
                      <span>{tag.name}</span>
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        className="hover:opacity-75 transition"
                        title="Quitar etiqueta"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Selector para agregar tag */}
              {availableTagsToAdd.length > 0 && (
                <div className="flex gap-2 pt-1">
                  <select
                    value={selectedTagToAdd}
                    onChange={(e) => setSelectedTagToAdd(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Seleccionar etiqueta para asignar...</option>
                    {availableTagsToAdd.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={!selectedTagToAdd}
                    onClick={handleAssignTag}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition disabled:opacity-40"
                  >
                    <Plus className="w-3.5 h-3.5 inline mr-1" />
                    Asignar
                  </button>
                </div>
              )}
            </div>

            {/* Notas Internas de CRM */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  Notas Internas de Seguimiento ({student.notes.length})
                </span>
                <span className="text-[10px] text-slate-500">Solo visible por admins</span>
              </div>

              {/* Formulario para agregar nota */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Escribe una observación privada sobre este estudiante..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none transition"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isAddingNote || !newNote.trim()}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-300 font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-40"
                  >
                    {isAddingNote ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                    <span>Agregar Nota</span>
                  </button>
                </div>
              </form>

              {/* Lista de notas */}
              <div className="space-y-2 pt-1">
                {student.notes.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 text-center text-xs text-slate-500">
                    No hay notas registradas para este alumno aún.
                  </div>
                ) : (
                  student.notes.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition"
                          title="Eliminar nota"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-slate-200 whitespace-pre-wrap">{n.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
