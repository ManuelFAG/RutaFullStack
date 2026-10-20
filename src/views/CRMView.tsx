import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Flame,
  Layers,
  ChevronRight,
  MessageSquare,
  Lock,
  UserCheck,
  Clock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CRMStudent, CRMTag, crmService } from '../services/crmService';
import { StudentDrawer } from '../components/crm/StudentDrawer';

export const CRMView: React.FC = () => {
  const { isAdmin, loginWithDemo } = useAuth();

  const [students, setStudents] = useState<CRMStudent[]>([]);
  const [tags, setTags] = useState<CRMTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [funnelFilter, setFunnelFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const fetchCRMData = async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [studentsData, tagsData] = await Promise.all([
        crmService.getStudents(),
        crmService.getAllTags(),
      ]);
      setStudents(studentsData);
      setTags(tagsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCRMData();
  }, [isAdmin]);

  // Filtrado reactivo en memoria
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'all' || s.role === roleFilter;
      const matchesFunnel = funnelFilter === 'all' || s.funnelStatus === funnelFilter;
      const matchesTag =
        tagFilter === 'all' || s.tags.some((t) => t.id === tagFilter);

      return matchesSearch && matchesRole && matchesFunnel && matchesTag;
    });
  }, [students, searchTerm, roleFilter, funnelFilter, tagFilter]);

  // Cálculos de métricas
  const metrics = useMemo(() => {
    const total = students.length;
    const nuevos = students.filter((s) => s.role === 'cliente_nuevo').length;
    const activos = students.filter((s) => s.role === 'cliente').length;
    const dePago = students.filter((s) => s.funnelStatus === 'de_pago').length;
    const totalXP = students.reduce((acc, s) => acc + s.totalXP, 0);
    const avgStreak =
      total > 0
        ? Math.round((students.reduce((acc, s) => acc + s.streakDays, 0) / total) * 10) / 10
        : 0;

    return { total, nuevos, activos, dePago, totalXP, avgStreak };
  }, [students]);

  // Si no es Administrador, mostrar tarjeta de acceso restringido
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 animate-fade-in text-center">
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 mb-4 shadow-lg shadow-purple-500/10">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">Panel CRM Exclusivo para Administradores</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Esta sección contiene la base de datos de estudiantes, fichas 360°, notas internas de seguimiento y métricas de conversión protegidas por PostgreSQL Row Level Security (RLS).
          </p>

          <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800/80 mb-6 text-left text-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Credenciales requeridas
            </span>
            <p className="text-slate-300">
              Para entrar a este panel, debes tener una sesión iniciada con un perfil que posea el rol <code className="bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">admin</code> en la base de datos.
            </p>
          </div>

          <button
            onClick={() => loginWithDemo('admin')}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Iniciar Sesión como Admin CRM (1-Clic)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Cabecera del Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Panel CRM & Estudiantes</h1>
              <p className="text-xs text-slate-400">
                Gestión integral, fichas 360°, notas internas y control de embudo en Supabase PostgreSQL.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => crmService.exportToCSV(filteredStudents)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition shadow-sm"
            title="Descargar lista de alumnos en formato CSV compatible con Excel"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar CSV ({filteredStudents.length})</span>
          </button>

          <button
            onClick={fetchCRMData}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Refrescar datos desde Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas Rápidas (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Estudiantes</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{metrics.total}</div>
          <span className="text-[10px] text-slate-500 font-mono">Registrados en plataforma</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Nuevos (Onboarding)</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{metrics.nuevos}</div>
          <span className="text-[10px] text-slate-500 font-mono">Rol cliente_nuevo</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Alumnos Activos</span>
            <UserCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400">{metrics.activos}</div>
          <span className="text-[10px] text-slate-500 font-mono">Han completado lecciones</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Alumnos de Pago (Pro)</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{metrics.dePago}</div>
          <span className="text-[10px] text-slate-500 font-mono">Plan Pro / Vitalicio</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>XP Global Generado</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{metrics.totalXP}</div>
          <span className="text-[10px] text-slate-500 font-mono">Racha prom: {metrics.avgStreak}d</span>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Buscador */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o correo electrónico..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Filtro por Rol */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Todos los Roles</option>
              <option value="cliente_nuevo">🌱 Nuevos Alumnos</option>
              <option value="cliente">🚀 Clientes / Pro</option>
              <option value="admin">🛡️ Admins</option>
            </select>
          </div>

          {/* Filtro por Embudo */}
          <select
            value={funnelFilter}
            onChange={(e) => setFunnelFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos los Estados</option>
            <option value="nuevo">Nuevo Registro</option>
            <option value="activo">Activo Estudiando</option>
            <option value="de_pago">Suscrito (De Pago)</option>
            <option value="en_riesgo">En Riesgo (Inactivo)</option>
          </select>

          {/* Filtro por Etiqueta */}
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todas las Etiquetas</option>
            {tags.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Estudiantes */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Estudiante</th>
                <th className="py-3 px-4">Rol & Embudo</th>
                <th className="py-3 px-4">Progreso Académico</th>
                <th className="py-3 px-4">Etiquetas</th>
                <th className="py-3 px-4">Notas</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    {loading ? 'Cargando listado de estudiantes...' : 'No se encontraron estudiantes con los filtros seleccionados.'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className="hover:bg-slate-800/40 cursor-pointer transition group"
                  >
                    {/* Estudiante info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm">
                          {s.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate group-hover:text-purple-300 transition-colors">
                            {s.fullName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono block truncate">{s.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Rol & Embudo */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-block w-fit px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            s.role === 'admin'
                              ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                              : s.role === 'cliente'
                              ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {s.role === 'admin' ? '🛡️ Admin' : s.role === 'cliente' ? '🚀 Cliente Pro' : '🌱 Nuevo'}
                        </span>
                        <span className="text-[10px] text-slate-400 capitalize">
                          Embudo: <span className="text-slate-300 font-medium">{s.funnelStatus.replace('_', ' ')}</span>
                        </span>
                      </div>
                    </td>

                    {/* Progreso */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="font-bold text-emerald-400">{s.totalXP} XP</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">{s.completedLessonsCount}/40 lecciones</span>
                          {s.streakDays > 0 && (
                            <>
                              <span className="text-slate-500">•</span>
                              <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                                <Flame className="w-3 h-3 fill-amber-400" />
                                {s.streakDays}d
                              </span>
                            </>
                          )}
                        </div>
                        {/* Barra de progreso */}
                        <div className="w-36 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.round((s.completedLessonsCount / 40) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Etiquetas */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {s.tags.length === 0 ? (
                          <span className="text-[10px] text-slate-500 italic">—</span>
                        ) : (
                          s.tags.map((t) => (
                            <span
                              key={t.id}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium border"
                              style={{
                                backgroundColor: `${t.color}15`,
                                borderColor: `${t.color}30`,
                                color: t.color,
                              }}
                            >
                              {t.name}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Notas */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{s.notesCount}</span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentId(s.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] border border-slate-700/80 transition"
                      >
                        <span>Ficha</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer 360° del Alumno */}
      <StudentDrawer
        studentId={selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
        onStudentUpdated={fetchCRMData}
      />
    </div>
  );
};
