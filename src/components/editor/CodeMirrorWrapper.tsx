import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface CodeMirrorWrapperProps {
  code: string;
  onChange: (value: string) => void;
  language?: 'javascript' | 'html' | 'css' | 'bash';
  readOnly?: boolean;
  minHeight?: string;
  onReset?: () => void;
}

export const CodeMirrorWrapper: React.FC<CodeMirrorWrapperProps> = ({
  code,
  onChange,
  language = 'javascript',
  readOnly = false,
  minHeight = '240px',
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const getLanguageExtension = () => {
    switch (language) {
      case 'html':
        return [html()];
      case 'css':
        return [css()];
      case 'javascript':
      default:
        return [javascript({ jsx: true, typescript: true })];
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative border border-slate-700/60 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-inner group">
      {/* Barra superior de la ventana del editor */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="font-mono text-[11px] text-slate-300 ml-2 uppercase font-medium tracking-wider">
            {language}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {onReset && (
            <button
              onClick={onReset}
              className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors text-slate-400 flex items-center gap-1 text-[11px]"
              title="Reiniciar código inicial"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors text-slate-400 flex items-center gap-1 text-[11px]"
            title="Copiar código al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor CodeMirror */}
      <div className="text-sm">
        <CodeMirror
          value={code}
          height="100%"
          minHeight={minHeight}
          theme={oneDark}
          extensions={getLanguageExtension()}
          onChange={onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  );
};
