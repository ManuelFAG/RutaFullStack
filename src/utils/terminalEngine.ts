export interface TerminalState {
  currentPath: string;
  files: Record<string, string>; // path -> content
  gitInitialized: boolean;
  gitStaged: string[];
  gitCommits: Array<{ hash: string; message: string; date: string }>;
  history: string[];
}

export const INITIAL_TERMINAL_STATE: TerminalState = {
  currentPath: '~/proyectos',
  files: {
    '~/proyectos/README.md': '# Mi Primer Proyecto Full Stack\n¡Aprendiendo desde cero!',
    '~/proyectos/notas.txt': 'Comandos básicos: ls, cd, mkdir, git status',
  },
  gitInitialized: false,
  gitStaged: [],
  gitCommits: [],
  history: [],
};

export function processTerminalCommand(
  input: string,
  state: TerminalState
): { output: string; newState: TerminalState } {
  const trimmed = input.trim();
  if (!trimmed) return { output: '', newState: state };

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const newState = { ...state, history: [...state.history, input] };

  switch (cmd) {
    case 'clear':
      return { output: '__CLEAR__', newState };

    case 'pwd':
      return { output: newState.currentPath, newState };

    case 'help':
      return {
        output: `Comandos disponibles en RutaTerminal:
  ls          - Listar archivos en la carpeta actual
  pwd         - Mostrar la ruta de la carpeta de trabajo
  mkdir <dir> - Crear una nueva carpeta
  cd <dir>    - Navegar a una carpeta (usa 'cd ..' para volver)
  touch <arc> - Crear un archivo nuevo vacío
  cat <arc>   - Ver el contenido de un archivo
  git init    - Inicializar un repositorio Git
  git status  - Ver el estado del repositorio
  git add .   - Preparar cambios para guardar
  git commit -m "<msg>" - Guardar una instantánea (commit)
  git log     - Ver el historial de commits
  clear       - Limpiar la pantalla de la terminal`,
        newState,
      };

    case 'ls':
    case 'dir': {
      const currentPrefix = newState.currentPath + '/';
      const fileNames = Object.keys(newState.files)
        .filter((f) => f.startsWith(currentPrefix))
        .map((f) => f.replace(currentPrefix, '').split('/')[0]);

      const uniqueNames = Array.from(new Set(fileNames));
      if (uniqueNames.length === 0) {
        return { output: '(directorio vacío)', newState };
      }
      return {
        output: uniqueNames
          .map((n) => (n.includes('.') ? `📄 ${n}` : `📁 ${n}/`))
          .join('    '),
        newState,
      };
    }

    case 'mkdir': {
      if (!args[0]) return { output: 'error: falta especificar el nombre de la carpeta (ej: mkdir mi-app)', newState };
      const folderName = args[0];
      const newPath = `${newState.currentPath}/${folderName}/.keep`;
      newState.files = { ...newState.files, [newPath]: '' };
      return { output: `✨ Carpeta creada: ${folderName}/`, newState };
    }

    case 'cd': {
      if (!args[0] || args[0] === '~') {
        newState.currentPath = '~/proyectos';
        return { output: '', newState };
      }
      if (args[0] === '..') {
        const segments = newState.currentPath.split('/');
        if (segments.length > 2) {
          segments.pop();
          newState.currentPath = segments.join('/');
        }
        return { output: '', newState };
      }
      const targetFolder = args[0];
      newState.currentPath = `${newState.currentPath}/${targetFolder}`;
      return { output: '', newState };
    }

    case 'touch': {
      if (!args[0]) return { output: 'error: debes indicar el nombre del archivo (ej: touch app.js)', newState };
      const fileName = args[0];
      const filePath = `${newState.currentPath}/${fileName}`;
      newState.files = { ...newState.files, [filePath]: '// Nuevo archivo creado en terminal\n' };
      return { output: `📄 Archivo creado: ${fileName}`, newState };
    }

    case 'cat': {
      if (!args[0]) return { output: 'error: debes indicar qué archivo deseas leer (ej: cat README.md)', newState };
      const fileName = args[0];
      const filePath = `${newState.currentPath}/${fileName}`;
      if (newState.files[filePath] !== undefined) {
        return { output: newState.files[filePath], newState };
      }
      return { output: `cat: ${fileName}: No existe el archivo o directorio`, newState };
    }

    case 'git': {
      const sub = args[0];
      if (!sub) return { output: 'Uso de git: git init, git status, git add ., git commit -m "...", git log', newState };

      if (sub === 'init') {
        newState.gitInitialized = true;
        return {
          output: `🎉 Repositorio Git vacío inicializado en ${newState.currentPath}/.git/\nAhora Git está vigilando los cambios de tus archivos como una máquina del tiempo.`,
          newState,
        };
      }

      if (!newState.gitInitialized) {
        return {
          output: 'fatal: no es un repositorio de git (o ninguno de los directorios superiores). Ejecuta antes: git init',
          newState,
        };
      }

      if (sub === 'status') {
        if (newState.gitStaged.length > 0) {
          return {
            output: `En la rama main\nCambios listos para ser confirmados (staged):\n${newState.gitStaged.map((f) => `  (nuevo archivo)   \x1b[32m${f}\x1b[0m`).join('\n')}\n\nUsa 'git commit -m "mensaje"' para guardar la foto.`,
            newState,
          };
        }
        return {
          output: `En la rama main\nArchivos sin seguimiento:\n  (usa "git add <archivo>..." para incluirlo a la foto)\n    📄 index.html\n    📄 style.css\n\nNada agregado al commit pero existen archivos sin seguimiento (usa "git add .")`,
          newState,
        };
      }

      if (sub === 'add') {
        newState.gitStaged = ['index.html', 'style.css', 'app.js'];
        return {
          output: '✅ Archivos añadidos a la zona de preparación (Staging Area). ¡Listos para ser guardados con git commit!',
          newState,
        };
      }

      if (sub === 'commit') {
        const fullMsg = args.slice(1).join(' ');
        const cleanMsg = fullMsg.replace(/-m\s*"?([^"]*)"?/i, '$1').trim() || 'Avance de proyecto';

        if (newState.gitStaged.length === 0) {
          return {
            output: 'Nada para confirmar, el árbol de trabajo está limpio (o te faltó hacer "git add .")',
            newState,
          };
        }

        const commitHash = Math.random().toString(16).substring(2, 9);
        newState.gitCommits = [
          { hash: commitHash, message: cleanMsg, date: new Date().toLocaleTimeString() },
          ...newState.gitCommits,
        ];
        newState.gitStaged = [];

        return {
          output: `[main ${commitHash}] ${cleanMsg}\n 3 archivos cambiados, 42 inserciones(+)\n✨ ¡Punto de guardado creado con éxito! Puedes volver a este momento cuando quieras.`,
          newState,
        };
      }

      if (sub === 'log') {
        if (newState.gitCommits.length === 0) {
          return { output: 'fatal: tu rama actual main no tiene ningún commit todavía.', newState };
        }
        return {
          output: newState.gitCommits
            .map(
              (c) =>
                `commit \x1b[33m${c.hash}\x1b[0m (HEAD -> main)\nFecha:   ${c.date}\n\n    ${c.message}\n`
            )
            .join('\n'),
          newState,
        };
      }

      return { output: `Comando git '${sub}' no reconocido en el simulador pedagógico. Prueba: git init, git add ., git commit -m "mensaje", git log`, newState };
    }

    default:
      return {
        output: `Comando '${cmd}' no encontrado. Escribe 'help' para ver la lista de comandos disponibles.`,
        newState,
      };
  }
}
