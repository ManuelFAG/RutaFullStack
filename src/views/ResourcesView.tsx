import React from 'react';
import { RECOMMENDED_RESOURCES } from '../data/resources';
import { ExternalLink, BookMarked, FileText, Wrench, BookOpen } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'doc': return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'cheatsheet': return <BookMarked className="w-5 h-5 text-amber-400" />;
      case 'tool': return <Wrench className="w-5 h-5 text-sky-400" />;
      case 'book': return <BookOpen className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Encabezado */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Biblioteca Curada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Recursos y Documentación Recomendada
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Las mejores fuentes oficiales, hojas de trucos (cheatsheets) y herramientas gratuitas que todo desarrollador debe tener en favoritos.
        </p>
      </div>

      {/* Grid de Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {RECOMMENDED_RESOURCES.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 group-hover:scale-105 transition-transform">
                  {getResourceIcon(item.type)}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-semibold">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500">Recomendado para:</span>
              <span className="text-[11px] font-semibold text-emerald-400">{item.recommendedFor}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
