import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { Search, BookOpen, Lightbulb, Code2, ArrowRight } from 'lucide-react';

interface GlossaryViewProps {
  onGoToLesson?: (lessonId: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onGoToLesson }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = [
    'Todos',
    'Fundamentos',
    'Lógica / Fundamentos',
    'Arquitectura Web',
    'Redes',
    'Backend / Redes',
    'Herramientas',
    'Bases de Datos',
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.analogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.technicalDefinition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todos' || item.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Encabezado */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Diccionario del Desarrollador</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Glosario de Conceptos con Analogías
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Cada término técnico explicado con una metáfora cotidiana de la vida real para que jamás lo olvides.
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por término (ej: API, Git, Frontend, Algoritmo, Variable...)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner"
          />
        </div>

        {/* Píldoras de Categoría */}
        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Términos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-lg hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-semibold">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">{item.term}</h3>

              {/* Analogía visual */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 text-xs sm:text-sm leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Analogía de la vida real:</span>
                </div>
                <p>{item.analogy}</p>
              </div>

              {/* Definición técnica formal */}
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-slate-200">Definición técnica: </strong>
                {item.technicalDefinition}
              </div>

              {/* Ejemplo de código opcional */}
              {item.codeExample && (
                <div className="pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Code2 className="w-3 h-3 text-sky-400" />
                    <span>Ejemplo en código:</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {item.codeExample}
                  </pre>
                </div>
              )}
            </div>

            {/* Enlace a la lección relacionada */}
            {item.relatedLessonId && onGoToLesson && (
              <div className="pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onGoToLesson(item.relatedLessonId!)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
                >
                  <span>Aprender más en la lección práctica</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center p-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No encontramos conceptos que coincidan con "{searchTerm}". Intenta con otro término o limpia los filtros.
        </div>
      )}
    </div>
  );
};
