import React, { useState } from 'react';
import { Download, Upload, Copy, Check, RotateCcw, X, Shield, AlertTriangle } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({ isOpen, onClose }) => {
  const { exportData, importData, resetProgress } = useProgress();
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    const data = await exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rutafullstack_progreso_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage({ text: '¡Archivo descargado con éxito!', success: true });
  };

  const handleCopyClipboard = async () => {
    const data = await exportData();
    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setStatusMessage({ text: 'Progreso copiado al portapapeles.', success: true });
  };

  const handleImport = async () => {
    if (!jsonText.trim()) {
      setStatusMessage({ text: 'Por favor pega el código JSON de tu respaldo.', success: false });
      return;
    }

    const res = await importData(jsonText);
    setStatusMessage({ text: res.message, success: res.success });
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonText(content);
        const res = await importData(content);
        setStatusMessage({ text: res.message, success: res.success });
        if (res.success) {
          setTimeout(() => onClose(), 1500);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = async () => {
    await resetProgress();
    setShowResetConfirm(false);
    setStatusMessage({ text: 'Progreso reiniciado correctamente.', success: true });
    setTimeout(() => onClose(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-100">Copia de Seguridad y Migración</h3>
              <p className="text-xs text-slate-400">Fase 1: Guarda, transfiere o restaura tu avance en formato JSON</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-5 overflow-y-auto text-sm text-slate-300">
          {/* Mensaje de estado */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.success
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
              }`}
            >
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Sección Exportar */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs uppercase tracking-wider">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Exportar tu progreso</span>
            </div>
            <p className="text-xs text-slate-400">
              Descarga un archivo con tus lecciones completadas, XP, racha e insignias para llevarlo a otro dispositivo.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar archivo .json</span>
              </button>
              <button
                onClick={handleCopyClipboard}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar al portapapeles'}</span>
              </button>
            </div>
          </div>

          {/* Sección Importar */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs uppercase tracking-wider">
              <Upload className="w-4 h-4 text-sky-400" />
              <span>Importar progreso</span>
            </div>
            <p className="text-xs text-slate-400">
              Sube tu archivo .json o pega el texto para restaurar tu avance en este navegador.
            </p>
            <div className="space-y-2">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
              />
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="O pega aquí el contenido JSON..."
                rows={3}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={handleImport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restaurar Progreso</span>
              </button>
            </div>
          </div>

          {/* Zona de Peligro: Reiniciar */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar todo mi progreso</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 w-full justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>¿Seguro que deseas borrar todo?</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleConfirmReset}
                    className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                  >
                    Sí, borrar
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
