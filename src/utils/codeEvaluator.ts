export interface LogEntry {
  type: 'log' | 'info' | 'warn' | 'error';
  content: string;
  timestamp: number;
}

export interface ExecutionResult {
  success: boolean;
  logs: LogEntry[];
  result?: unknown;
  error?: string;
  executionTimeMs: number;
}

export function executeJavaScript(code: string): ExecutionResult {
  const logs: LogEntry[] = [];
  const startTime = performance.now();

  // Guardar métodos de consola reales
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;

  const stringify = (args: unknown[]): string => {
    return args
      .map((arg) => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');
  };

  try {
    // Interceptar consola dentro de la ejecución
    console.log = (...args: unknown[]) => {
      logs.push({ type: 'log', content: stringify(args), timestamp: Date.now() });
    };
    console.info = (...args: unknown[]) => {
      logs.push({ type: 'info', content: stringify(args), timestamp: Date.now() });
    };
    console.warn = (...args: unknown[]) => {
      logs.push({ type: 'warn', content: stringify(args), timestamp: Date.now() });
    };
    console.error = (...args: unknown[]) => {
      logs.push({ type: 'error', content: stringify(args), timestamp: Date.now() });
    };

    // Ejecutar el código en una función aislada
    // Usamos new Function con return si la última línea es una expresión
    const runnable = new Function(`
      "use strict";
      ${code}
    `);

    const result = runnable();
    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      logs,
      result,
      executionTimeMs,
    };
  } catch (err) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : String(err);

    logs.push({
      type: 'error',
      content: `⚠️ Error de ejecución: ${errorMessage}`,
      timestamp: Date.now(),
    });

    return {
      success: false,
      logs,
      error: errorMessage,
      executionTimeMs,
    };
  } finally {
    // Restaurar consola
    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;
  }
}

/**
 * Validador de ejercicios didácticos
 */
export function validateExercise(
  userCode: string,
  testCheck?: { type: string; expected: string }
): { passed: boolean; message: string; outputLogs: LogEntry[] } {
  const result = executeJavaScript(userCode);

  if (!result.success) {
    return {
      passed: false,
      message: `El código generó un error: ${result.error}`,
      outputLogs: result.logs,
    };
  }

  if (!testCheck) {
    // Si no hay test específico, basta con que se ejecute sin errores y produzca algo en consola
    return {
      passed: result.logs.length > 0,
      message: result.logs.length > 0
        ? '¡Código ejecutado correctamente!'
        : 'El código corrió sin errores, pero recuerda imprimir algo con console.log.',
      outputLogs: result.logs,
    };
  }

  const allLogsText = result.logs.map((l) => l.content).join('\n');

  if (testCheck.type === 'output-contains') {
    const passed = allLogsText.toLowerCase().includes(testCheck.expected.toLowerCase());
    return {
      passed,
      message: passed
        ? '¡Excelente trabajo! La salida de la consola coincide con lo esperado.'
        : `Se esperaba que la consola mostrara "${testCheck.expected}". Revisa tus datos o console.log.`,
      outputLogs: result.logs,
    };
  }

  if (testCheck.type === 'code-contains') {
    const passed = userCode.includes(testCheck.expected);
    return {
      passed,
      message: passed
        ? '¡Genial! Has empleado la sintaxis y conceptos requeridos.'
        : `Tu código debe incluir la instrucción o palabra clave "${testCheck.expected}".`,
      outputLogs: result.logs,
    };
  }

  return {
    passed: true,
    message: '¡Ejercicio verificado con éxito!',
    outputLogs: result.logs,
  };
}
