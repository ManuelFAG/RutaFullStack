import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Sparkles } from 'lucide-react';
import { TerminalState, INITIAL_TERMINAL_STATE, processTerminalCommand } from '../../utils/terminalEngine';

interface TerminalViewProps {
  initialCommand?: string;
  onCommandRun?: (cmd: string, output: string) => void;
}

interface HistoryItem {
  command: string;
  output: string;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ initialCommand, onCommandRun }) => {
  const [terminalState, setTerminalState] = useState<TerminalState>(INITIAL_TERMINAL_STATE);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'intro',
      output: '🌟 Bienvenido a la Terminal Interactiva de RutaFullStack.\nEscribe "help" para ver los comandos disponibles o haz clic en las sugerencias abajo.',
    },
  ]);
  const [inputVal, setInputVal] = useState(initialCommand || '');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    if (!cmdText.trim()) return;

    const { output, newState } = processTerminalCommand(cmdText, terminalState);
    setTerminalState(newState);

    if (output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: cmdText, output }]);
    }

    if (onCommandRun) {
      onCommandRun(cmdText, output);
    }

    setInputVal('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const pastCommands = terminalState.history;
      if (pastCommands.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < pastCommands.length) {
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const pastCommands = terminalState.history;
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const handleReset = () => {
    setTerminalState(INITIAL_TERMINAL_STATE);
    setHistory([
      {
        command: 'reset',
        output: 'Terminal reiniciada a estado original.',
      },
    ]);
    setInputVal('');
  };

  const suggestions = ['pwd', 'ls', 'mkdir mi-web', 'cd mi-web', 'git init', 'git status', 'git add .', 'git commit -m "primer checkpoint"', 'git log', 'help'];

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden font-mono text-sm shadow-xl">
      {/* Cabecera de la terminal */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-slate-800 text-xs text-slate-400 select-none">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-200 font-semibold text-[11px]">bash — {terminalState.currentPath}</span>
        </div>
        <button
          onClick={handleReset}
          className="p-1 hover:text-white hover:bg-slate-800 rounded transition text-slate-400 flex items-center gap-1 text-[11px]"
          title="Reiniciar simulador"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Limpiar</span>
        </button>
      </div>

      {/* Salida de la consola */}
      <div
        className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-slate-200 min-h-[200px] max-h-[380px]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== 'intro' && item.command !== 'reset' && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <span className="text-emerald-400 font-bold">rutadev@pc</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-400 font-medium">{terminalState.currentPath}</span>
                <span className="text-slate-400">$</span>
                <span className="text-slate-100 font-medium">{item.command}</span>
              </div>
            )}
            {item.output && (
              <pre className="whitespace-pre-wrap text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 font-mono leading-relaxed">
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Input activo */}
        <div className="flex items-center space-x-2 text-xs pt-1">
          <span className="text-emerald-400 font-bold">rutadev@pc</span>
          <span className="text-slate-500">:</span>
          <span className="text-sky-400 font-medium">{terminalState.currentPath}</span>
          <span className="text-slate-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un comando..."
            className="flex-1 bg-transparent text-emerald-300 focus:outline-none font-mono text-xs placeholder:text-slate-600"
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Barra de sugerencias para principiantes / móviles */}
      <div className="p-2.5 bg-[#161b22]/90 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <div className="flex items-center gap-1 text-slate-400 mr-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="hidden sm:inline font-sans text-xs">Comandos rápidos:</span>
        </div>
        {suggestions.map((sug) => (
          <button
            key={sug}
            onClick={() => executeCommand(sug)}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 hover:text-emerald-300 text-slate-300 transition text-[11px] font-mono border border-slate-700/50 shrink-0"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
};
