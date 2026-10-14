import type { Module } from '../../types/curriculum';

export const MODULE_6_DEVOPS: Module = {
  id: 6,
  slug: 'devops',
  title: '6. DevOps y Despliegue',
  description: 'Variables de entorno seguras, testing unitario e integración, empaquetado en contenedores Docker, flujos de CI/CD con GitHub Actions y despliegue profesional en la nube (Vercel, Render).',
  icon: 'Cloud',
  color: 'indigo',
  badge: {
    id: 'modulo-6-maestro',
    name: 'Capitán DevOps',
    description: 'Contenerizaste y automatizaste el despliegue continuo de aplicaciones en producción.',
    icon: 'Terminal',
    category: 'modulo',
  },
  lessons: [
    // LECCIÓN 1: VARIABLES DE ENTORNO Y CONFIGURACIÓN (12-FACTOR APP)
    {
      id: 'm6-l1-variables-entorno-y-configuracion',
      moduleId: 6,
      slug: 'variables-de-entorno-y-12-factor-app',
      title: 'Variables de Entorno y Configuración Segura: La Metodología 12-Factor',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Comprender los principios de The Twelve-Factor App para desacoplar código de configuración, dominar el uso seguro de archivos .env y .gitignore, y construir validadores estrictos que impidan que el servidor inicie si faltan variables críticas de producción.',
      realWorldAnalogy: {
        title: 'El Adaptador de Voltaje Universal y la Caja Fuerte de Llaves',
        analogy: 'Imagina que fabricas un secador de cabello de alta gama:\n\n• Si diseñas el aparato con cables soldados fijamente para funcionar solo con el enchufe y voltaje de Colombia (110V), en el momento en que alguien lo lleve a España (220V) se quemará al instante. El aparato estaba **acoplado rígidamente a su entorno local**.\n• En su lugar, el aparato debe tener un puerto estándar universal (el código) y un adaptador intercambiable que lee el voltaje del país donde se conecta (la configuración por variables de entorno).\n\nTu aplicación jamás debe tener URLs de bases de datos ni contraseñas escritas dentro del código fuente. Debe leer del entorno (`process.env`). Si subes una contraseña a GitHub, los bots tardan menos de 2 minutos en encontrarla y vaciar tu cuenta de base de datos.',
        whyItMatters: 'Filtrar credenciales y claves de API en repositorios públicos es uno de los incidentes de ciberseguridad más comunes y costosos en empresas de todo el mundo.',
        iconName: 'Key',
      },
      explanation: {
        sections: [
          {
            heading: 'La Metodología de los Doce Factores (Factor III: Configuración)',
            content: 'El estándar de la industria para software moderno establece una regla de oro:\n\n> *"Guarda la configuración en el entorno, nunca en el repositorio de código."*\n\nUna prueba infalible para saber si tu aplicación está bien diseñada: **¿Podrías publicar tu repositorio en GitHub como público hoy mismo sin comprometer ninguna contraseña ni acceso privado?** Si la respuesta es no, tienes credenciales quemadas en el código (hardcoding).',
          },
          {
            heading: 'La Trilogía de Archivos: `.env`, `.env.example` y `.gitignore`',
            content: '1. **`.env`:** Contiene las contraseñas reales locales. **DEBE estar en `.gitignore`** para que jamás suba al control de versiones de Git.\n2. **`.env.example`:** Contiene la lista de nombres de variables sin valores secretos (ej. `DATABASE_URL=postgresql://user:pass@localhost:5432/db`). Se sube a Git como guía para que tus compañeros sepan qué variables configurar.\n3. **`.gitignore`:** Archivo que le ordena a Git ignorar `.env`, `.env.local` y carpetas temporales como `node_modules` y `dist`.',
          },
          {
            heading: 'Validación Fuerte al Arrancar: Fail Fast (Falla Rápido)',
            content: 'Si tu backend inicia pero no tiene configurado `JWT_SECRET`, la aplicación parecerá estar viva hasta que el primer usuario intente iniciar sesión y se encuentre con un error 500.\n\nEs una buena práctica implementar validación estricta de entorno al inicio:\n\n```typescript\n// config/env.ts\nconst variablesRequeridas = ["PORT", "DATABASE_URL", "JWT_SECRET"];\n\nfor (const variable of variablesRequeridas) {\n  if (!process.env[variable]) {\n    console.error(\`❌ Error Fatal: Falta la variable de entorno \${variable}\`);\n    process.exit(1); // Detiene el servidor de inmediato antes de aceptar conexiones\n  }\n}\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de validación de variables de entorno al arrancar el servidor:
const entornoSimulado = {
  NODE_ENV: "production",
  PORT: "8080",
  // DATABASE_URL: "postgres://admin:pass@db.cloud.com:5432/produccion", // Descomenta para probar éxito
  JWT_SECRET: "clave_secreta_super_segura_2026"
};

function validarYConfigurarEntorno(env) {
  console.log("🔍 Verificando variables de entorno del sistema...");
  
  const esquema = [
    { clave: "PORT", requerido: false, porDefecto: 3000, tipo: "numero" },
    { clave: "NODE_ENV", requerido: false, porDefecto: "development", tipo: "string" },
    { clave: "DATABASE_URL", requerido: true, tipo: "string" },
    { clave: "JWT_SECRET", requerido: true, tipo: "string" }
  ];

  const configuracionFinal = {};
  const errores = [];

  for (const regla of esquema) {
    const valor = env[regla.clave];

    if (!valor && regla.requerido) {
      errores.push(\`Variable obligatoria faltante: '\${regla.clave}'\`);
      continue;
    }

    if (!valor && !regla.requerido) {
      configuracionFinal[regla.clave] = regla.porDefecto;
      continue;
    }

    if (regla.tipo === "numero") {
      const num = Number(valor);
      if (isNaN(num)) errores.push(\`La variable '\${regla.clave}' debe ser numérica\`);
      configuracionFinal[regla.clave] = num;
    } else {
      configuracionFinal[regla.clave] = valor;
    }
  }

  if (errores.length > 0) {
    console.error("❌ Fallo en el arranque del servidor (Fail Fast):");
    errores.forEach(e => console.error(" • " + e));
    return { valido: false, errores };
  }

  console.log("✅ Configuración validada exitosamente:", configuracionFinal);
  return { valido: true, configuracion: configuracionFinal };
}

validarYConfigurarEntorno(entornoSimulado);`,
        explanation: 'Descomenta DATABASE_URL en el código o cambia el PORT a texto para ver cómo el validador protege la integridad de tu aplicación.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm6-l1-ex1',
          title: 'Parser didáctico de archivos .env',
          level: 'facil',
          instruction: 'Crea una función `parsearArchivoEnv(contenidoTexto)` que reciba una cadena simulada de un archivo .env. La función debe dividir por saltos de línea, ignorar líneas vacías o que comiencen con "#" (comentarios), y retornar un objeto con pares clave-valor eliminando espacios alrededor. Prueba con el texto dado e imprime el objeto resultante.',
          starterCode: `const textoArchivoEnv = \`
# Configuración del servidor
PORT=5000
NODE_ENV=production

# Base de datos
DATABASE_URL=postgresql://admin:secreto@localhost:5432/app
\`;

function parsearArchivoEnv(contenidoTexto) {
  // Retorna objeto con las variables parseadas
}

const variables = parsearArchivoEnv(textoArchivoEnv);
console.log("Variables parseadas:", variables);`,
          hints: [
            'Divide con contenidoTexto.split("\\n")',
            'Filtra líneas: const lineaLimpia = l.trim(); if (!lineaLimpia || lineaLimpia.startsWith("#")) continue;',
            'Usa split("=") para separar la clave del valor'
          ],
          solutionCode: `const textoArchivoEnv = \`
# Configuración del servidor
PORT=5000
NODE_ENV=production

# Base de datos
DATABASE_URL=postgresql://admin:secreto@localhost:5432/app
\`;

function parsearArchivoEnv(contenidoTexto) {
  const resultado = {};
  const lineas = contenidoTexto.split('\\n');
  for (const l of lineas) {
    const limpia = l.trim();
    if (!limpia || limpia.startsWith('#')) continue;
    const indiceIgual = limpia.indexOf('=');
    if (indiceIgual !== -1) {
      const clave = limpia.substring(0, indiceIgual).trim();
      const valor = limpia.substring(indiceIgual + 1).trim();
      resultado[clave] = valor;
    }
  }
  return resultado;
}

const variables = parsearArchivoEnv(textoArchivoEnv);
console.log("Variables parseadas:", variables);`,
          solutionExplanation: 'Esta lógica es idéntica a cómo librerías populares como "dotenv" leen y cargan archivos de configuración en process.env.',
          testCheck: {
            type: 'output-contains',
            expected: '5000',
          },
        },
        {
          id: 'm6-l1-ex2',
          title: 'Verificador de seguridad para .gitignore',
          level: 'medio',
          instruction: 'Crea una función `verificarSeguridadGitignore(lineasGitignore)` que reciba un array de nombres de archivos y patrones incluidos en el `.gitignore`. Debe verificar que contenga al menos los patrones de seguridad esenciales: ".env" (o ".env*") y "node_modules". Si ambos están presentes, retorna `{ seguro: true, mensaje: "Repositorio protegido contra filtraciones" }`. Si falta alguno, retorna `{ seguro: false, faltantes: [...] }`. Pruébala con un array que contenga ambos.',
          starterCode: `function verificarSeguridadGitignore(lineasGitignore) {
  // Comprueba que .env y node_modules estén protegidos
}

const gitignoreProyecto = ["node_modules", ".env", "dist", ".DS_Store"];
console.log("Estado de seguridad:", verificarSeguridadGitignore(gitignoreProyecto));`,
          hints: [
            'Busca si lineasGitignore incluye "node_modules"',
            'Busca si lineasGitignore incluye ".env" o ".env*"'
          ],
          solutionCode: `function verificarSeguridadGitignore(lineasGitignore) {
  const faltantes = [];
  const tieneNodeModules = lineasGitignore.some(l => l.trim() === 'node_modules' || l.trim() === 'node_modules/');
  const tieneEnv = lineasGitignore.some(l => l.trim() === '.env' || l.trim().startsWith('.env'));

  if (!tieneNodeModules) faltantes.push('node_modules');
  if (!tieneEnv) faltantes.push('.env');

  if (faltantes.length === 0) {
    return { seguro: true, mensaje: "Repositorio protegido contra filtraciones" };
  }
  return { seguro: false, faltantes };
}

const gitignoreProyecto = ["node_modules", ".env", "dist", ".DS_Store"];
console.log("Estado de seguridad:", verificarSeguridadGitignore(gitignoreProyecto));`,
          solutionExplanation: 'Verificar que .env esté en .gitignore evita que las contraseñas de bases de datos y tokens de producción suban al historial de Git.',
          testCheck: {
            type: 'output-contains',
            expected: 'Repositorio protegido contra filtraciones',
          },
        },
        {
          id: 'm6-l1-ex3',
          title: 'Gestor de configuraciones multientorno (Reto)',
          level: 'reto',
          instruction: 'Crea una función `obtenerConfiguracionEntorno(envActual)` que determine la configuración adecuada según `NODE_ENV` ("development", "test" o "production"). Debe retornar un objeto con: `esProduccion: boolean`, `corsPermitido: string` (en desarrollo es "http://localhost:5173", en producción es "https://rutafullstack.com"), y `nivelLog: string` (en desarrollo "debug", en producción "info", en test "silent"). Si NODE_ENV no está definido, debe asumir por defecto "development". Prueba llamándola con "production".',
          starterCode: `function obtenerConfiguracionEntorno(envActual) {
  // Retorna configuración según el entorno
}

const configProd = obtenerConfiguracionEntorno("production");
console.log("Configuración de producción:", configProd);`,
          hints: [
            'const entorno = envActual || "development";',
            'const esProduccion = entorno === "production";',
            'Define corsPermitido y nivelLog con switch o condicionales'
          ],
          solutionCode: `function obtenerConfiguracionEntorno(envActual) {
  const entorno = envActual || 'development';
  const esProduccion = entorno === 'production';
  
  let corsPermitido = 'http://localhost:5173';
  if (esProduccion) {
    corsPermitido = 'https://rutafullstack.com';
  }

  let nivelLog = 'debug';
  if (entorno === 'production') nivelLog = 'info';
  if (entorno === 'test') nivelLog = 'silent';

  return {
    entorno,
    esProduccion,
    corsPermitido,
    nivelLog
  };
}

const configProd = obtenerConfiguracionEntorno("production");
console.log("Configuración de producción:", configProd);`,
          solutionExplanation: 'Diferenciar las configuraciones por entorno asegura que en desarrollo puedas depurar con logs detallados mientras que en producción proteges los orígenes con CORS estricto.',
          testCheck: {
            type: 'output-contains',
            expected: 'https://rutafullstack.com',
          },
        },
      ],
      quiz: [
        {
          id: 'm6-l1-q1',
          question: '¿Por qué NUNCA se debe subir el archivo ".env" al repositorio de Git o GitHub?',
          options: [
            'Porque Git solo acepta archivos con extensión .js o .ts.',
            'Porque contiene contraseñas, secretos criptográficos y URLs de bases de datos que quedarían expuestas públicamente o a terceros.',
            'Porque el archivo .env hace que el repositorio pese más de 10 gigabytes.',
            'Porque GitHub bloquea automáticamente cualquier repositorio que tenga más de 3 archivos.',
          ],
          correctIndex: 1,
          explanation: 'El archivo .env guarda secretos reales de producción. Debe ser ignorado por .gitignore y configurado directamente en el panel del proveedor de hosting.',
        },
        {
          id: 'm6-l1-q2',
          question: '¿Qué principio describe la práctica de "Fail Fast" (Falla Rápido) en la carga de variables de entorno?',
          options: [
            'Reiniciar la computadora tres veces si una variable falla.',
            'Hacer que el servidor se niegue a arrancar de inmediato si falta una variable crítica (ej. DATABASE_URL), evitando errores en tiempo de ejecución.',
            'Ignorar todos los errores para que la app nunca se caiga.',
            'Enviar un mensaje SMS al cliente.',
          ],
          correctIndex: 1,
          explanation: 'Fail Fast garantiza que el servidor no acepte tráfico de usuarios si sus conexiones fundamentales o claves secretas no están correctamente provistas.',
        },
        {
          id: 'm6-l1-q3',
          question: '¿Cuál es el propósito del archivo ".env.example" en un proyecto profesional?',
          options: [
            'Es una copia idéntica del .env con las contraseñas reales de producción.',
            'Servir como plantilla documentada con los nombres de las variables requeridas sin exponer valores confidenciales reales.',
            'Es un archivo que se ejecuta en el navegador del cliente.',
            'Eliminar los archivos de la computadora si se descarga el proyecto.',
          ],
          correctIndex: 1,
          explanation: '.env.example le muestra a cualquier nuevo desarrollador en el equipo qué variables debe definir en su propio .env local sin filtrar secretos.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La metodología 12-Factor exige separar de forma absoluta el código ejecutable de la configuración del entorno.',
          'El archivo .env nunca se versiona en Git; solo se comparte .env.example como plantilla documentada.',
          'Validar variables al arrancar el servidor (Fail Fast) previene fallos silenciosos y errores 500 en producción.',
        ],
        commonPitfalls: [
          'Hacer commit de credenciales y luego pensar que con hacer otro commit borrándolas se soluciona: los secretos quedan guardados en el historial de Git para siempre.',
          'No definir valores por defecto razonables para variables no críticas como el puerto local (PORT || 3000).',
          'Tener configuraciones diferentes quemadas en el código con "if (empresa === \'cliente1\')" en vez de usar variables de entorno limpias.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 2: TESTING AUTOMATIZADO (UNITARIO E INTEGRACIÓN CON VITEST / JEST)
    {
      id: 'm6-l2-testing-unitario-e-integracion',
      moduleId: 6,
      slug: 'testing-automatizado-unitario-e-integracion',
      title: 'Testing Automatizado: Pruebas Unitarias y de Integración con Vitest / Jest',
      order: 2,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Dominar la pirámide de pruebas del software profesional: escribir pruebas unitarias con el patrón AAA (Arrange, Act, Assert), utilizar mocks y espías para aislar dependencias externas y asegurar la calidad continua del código.',
      realWorldAnalogy: {
        title: 'Los Inspectores de Calidad en la Línea de Ensamblaje',
        analogy: 'Imagina una fábrica de automóviles:\n\n• **El Método Novato (Pruebas Manuales):** Construyes el auto completo, te subes, enciendes el motor y manejas 100 kilómetros a toda velocidad esperando que los frenos no fallen. Si fallan, tienes un accidente fatal y no sabes qué pieza específica estaba defectuosa.\n• **El Método Profesional (Testing Automatizado):** En cada paso hay un robot inspector:\n  1. **Prueba Unitaria:** Se prueba cada tuerca, cada bombilla y cada pistón de forma individual y aislada en milisegundos.\n  2. **Prueba de Integración:** Se prueba que cuando el pedal del freno se presione, el líquido hidráulico empuje las pastillas contra el disco correctamente.\n  3. **Prueba End-to-End (E2E):** Se prueba el auto completo encendiendo y frenando en una pista controlada.\n\nEscribir pruebas te da la superpotencia de modificar código o actualizar librerías sin miedo a romper lo que ya funcionaba.',
        whyItMatters: 'En equipos de alta tecnología, ninguna línea de código llega a producción sin una suite de pruebas automatizadas que pase al 100%. Te ahorra fines de semana apagando incendios en producción.',
        iconName: 'CheckSquare',
      },
      explanation: {
        sections: [
          {
            heading: 'La Pirámide de Pruebas',
            content: '• **Pruebas Unitarias (Base de la pirámide):** Prueban funciones pequeñas y aisladas. Son ultra rápidas (ejecutan cientos en 1 segundo) y muy baratas de mantener.\n• **Pruebas de Integración (Cuerpo):** Prueban cómo interactúan varios módulos juntos (ej. un controlador de Express conectándose con la base de datos).\n• **Pruebas End-to-End E2E (Cúspide):** Prueban la aplicación completa simulando clics reales en un navegador con Playwright o Cypress. Son lentas y costosas de mantener.',
          },
          {
            heading: 'El Patrón AAA: Arrange, Act, Assert',
            content: 'Toda prueba profesional sigue tres pasos rigurosos:\n\n1. **Arrange (Preparar):** Configuras los datos de entrada y el estado inicial.\n2. **Act (Actuar):** Ejecutas la función o acción que deseas evaluar.\n3. **Assert (Verificar / Afirmar):** Compruebas que el resultado obtenido coincide exactamente con el valor esperado.\n\n```typescript\nimport { describe, it, expect } from "vitest";\nimport { calcularTotalConIva } from "./facturacion";\n\ndescribe("calcularTotalConIva", () => {\n  it("debe aplicar el 19% de IVA correctamente a un precio base", () => {\n    // 1. Arrange\n    const subtotal = 100;\n    const tasaIva = 0.19;\n\n    // 2. Act\n    const total = calcularTotalConIva(subtotal, tasaIva);\n\n    // 3. Assert\n    expect(total).toBe(119);\n  });\n});\n```',
          },
          {
            heading: 'Mocks y Espías: Simulando el Mundo Exterior',
            content: 'En una prueba unitaria, **tu código nunca debe llamar a una pasarela de pago real (Stripe) ni enviar correos reales** a usuarios.\n\nUsamos **Mocks (simuladores)** para reemplazar dependencias externas con funciones ficticias que controlamos por completo:\n\n```typescript\nimport { vi, it, expect } from "vitest";\n\nit("debe llamar al servicio de correo al registrar un usuario", async () => {\n  const mockServicioEmail = vi.fn().mockResolvedValue({ enviado: true });\n  \n  await registrarUsuario({ email: "test@dev.com" }, mockServicioEmail);\n  \n  expect(mockServicioEmail).toHaveBeenCalledTimes(1);\n  expect(mockServicioEmail).toHaveBeenCalledWith("test@dev.com");\n});\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Mini ejecutor de pruebas automatizadas (Estilo Vitest / Jest en memoria):
function crearTestRunner() {
  const suites = [];
  let suiteActual = null;

  const describe = (nombreSuite, fn) => {
    suiteActual = { nombre: nombreSuite, tests: [] };
    suites.push(suiteActual);
    fn();
  };

  const it = (nombreTest, fn) => {
    try {
      fn();
      suiteActual.tests.push({ nombre: nombreTest, pasado: true });
    } catch (error) {
      suiteActual.tests.push({ nombre: nombreTest, pasado: false, error: error.message });
    }
  };

  const expect = (valorReal) => ({
    toBe: (esperado) => {
      if (valorReal !== esperado) throw new Error(\`Se esperaba '\${esperado}', pero se recibió '\${valorReal}'\`);
    },
    toEqual: (esperado) => {
      if (JSON.stringify(valorReal) !== JSON.stringify(esperado)) {
        throw new Error(\`Objetos no coinciden. Esperado: \${JSON.stringify(esperado)}\`);
      }
    },
    toBeGreaterThan: (esperado) => {
      if (valorReal <= esperado) throw new Error(\`\${valorReal} no es mayor que \${esperado}\`);
    }
  });

  return { describe, it, expect, suites };
}

const { describe, it, expect, suites } = crearTestRunner();

// Probando una función de negocio:
function calcularDescuento(precio, porcentaje) {
  if (precio < 0 || porcentaje < 0 || porcentaje > 100) return 0;
  return precio - (precio * (porcentaje / 100));
}

describe("Suite de Facturación: calcularDescuento", () => {
  it("Aplica 20% de descuento a un producto de $100", () => {
    const total = calcularDescuento(100, 20);
    expect(total).toBe(80);
  });

  it("Maneja precios negativos retornando 0", () => {
    const total = calcularDescuento(-50, 10);
    expect(total).toBe(0);
  });
});

console.log("📊 Reporte de Pruebas Automatizadas:");
suites.forEach(s => {
  console.log(\`\\nSuite: \${s.nombre}\`);
  s.tests.forEach(t => {
    if (t.pasado) console.log(\`  ✅ PASSED: \${t.nombre}\`);
    else console.log(\`  ❌ FAILED: \${t.nombre} -> \${t.error}\`);
  });
});`,
        explanation: 'Ejecuta las pruebas y observa cómo el ejecutor valida el comportamiento de la función sin necesidad de abrir un navegador.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm6-l2-ex1',
          title: 'Aserción personalizada de tolerancia decimal (toBeCloseTo)',
          level: 'facil',
          instruction: 'En JavaScript `0.1 + 0.2 === 0.30000000000000004` debido a la representación binaria IEEE 754 de punto flotante. Crea una función `afirmarCercano(valorReal, esperado, tolerancia = 0.001)` que retorne true si la diferencia absoluta `Math.abs(valorReal - esperado) <= tolerancia`, y lance un error si no. Prueba con la suma de 0.1 + 0.2 frente a 0.3 e imprime "Aserción decimal exitosa".',
          starterCode: `function afirmarCercano(valorReal, esperado, tolerancia = 0.001) {
  // Comprueba que la diferencia absoluta esté dentro del rango
}

const suma = 0.1 + 0.2;
afirmarCercano(suma, 0.3);
console.log("Aserción decimal exitosa");`,
          hints: [
            'if (Math.abs(valorReal - esperado) > tolerancia) throw new Error("Valores no coinciden");',
            'return true;'
          ],
          solutionCode: `function afirmarCercano(valorReal, esperado, tolerancia = 0.001) {
  const diferencia = Math.abs(valorReal - esperado);
  if (diferencia > tolerancia) {
    throw new Error(\`Se esperaba cercanía a \${esperado}, diferencia fue \${diferencia}\`);
  }
  return true;
}

const suma = 0.1 + 0.2;
afirmarCercano(suma, 0.3);
console.log("Aserción decimal exitosa");`,
          solutionExplanation: 'Vitest y Jest incluyen la función expect(valor).toBeCloseTo() exactamente para evitar falsos negativos en cálculos financieros y matemáticos.',
          testCheck: {
            type: 'output-contains',
            expected: 'Aserción decimal exitosa',
          },
        },
        {
          id: 'm6-l2-ex2',
          title: 'Implementación de un Mock Function Espía (vi.fn)',
          level: 'medio',
          instruction: 'Crea una función `crearMock()` que simule `vi.fn()` de Vitest: debe retornar una función ejecutable que lleve la cuenta de cuántas veces fue llamada (`llamadas: 0`) y con qué argumentos (`historialLlamadas: []`). Debe tener un método `mockReturnValue(val)` para fijar qué valor debe retornar al invocarse. Prueba creando un mock, ejecutándolo dos veces con argumentos y verificando que el conteo sea 2.',
          starterCode: `function crearMock() {
  // Retorna función con llamadas e historial
}

const miEspia = crearMock();
miEspia("primer_argumento");
miEspia("segundo_argumento");
console.log("Total de llamadas registradas:", miEspia.llamadas);`,
          hints: [
            'let valorRetorno = undefined; const fn = function(...args) { fn.llamadas++; fn.historialLlamadas.push(args); return valorRetorno; };',
            'fn.llamadas = 0; fn.historialLlamadas = []; fn.mockReturnValue = (v) => { valorRetorno = v; }; return fn;'
          ],
          solutionCode: `function crearMock() {
  let valorRetorno = undefined;
  const fn = function(...args) {
    fn.llamadas++;
    fn.historialLlamadas.push(args);
    return valorRetorno;
  };
  fn.llamadas = 0;
  fn.historialLlamadas = [];
  fn.mockReturnValue = function(val) {
    valorRetorno = val;
    return fn;
  };
  return fn;
}

const miEspia = crearMock();
miEspia("primer_argumento");
miEspia("segundo_argumento");
console.log("Total de llamadas registradas:", miEspia.llamadas);`,
          solutionExplanation: 'Los espías y mocks permiten verificar interacciones entre componentes (si se llamó a la base de datos o si se envió un email) sin ejecutar los efectos secundarios reales.',
          testCheck: {
            type: 'output-contains',
            expected: '2',
          },
        },
        {
          id: 'm6-l2-ex3',
          title: 'Test de integración de autenticación con Mock de Base de Datos (Reto)',
          level: 'reto',
          instruction: 'Escribe una función de prueba `probarFlujoLogin(servicioAuth, mockRepositorio)` que valide dos casos: 1) Login exitoso cuando el usuario existe y la contraseña coincide, retornando `{ token: "jwt_valido" }`. 2) Login fallido cuando el usuario no existe, retornando `{ error: "Credenciales invalidas" }`. Si ambos casos pasan, imprime "Suite de Autenticación: 2 pruebas pasadas".',
          starterCode: `const servicioAuth = {
  login: (repo, email, pass) => {
    const user = repo.buscarPorEmail(email);
    if (!user || user.password !== pass) return { error: "Credenciales invalidas" };
    return { token: "jwt_valido" };
  }
};

function probarFlujoLogin(servicio, repo) {
  // Ejecuta las dos pruebas y reporta
}

const repoMock = {
  buscarPorEmail: (email) => email === "ana@dev.com" ? { email: "ana@dev.com", password: "123" } : null
};

probarFlujoLogin(servicioAuth, repoMock);`,
          hints: [
            'Prueba 1: const res1 = servicio.login(repo, "ana@dev.com", "123"); if (!res1.token) throw new Error("Fallo caso exitoso");',
            'Prueba 2: const res2 = servicio.login(repo, "falso@dev.com", "123"); if (res2.error !== "Credenciales invalidas") throw new Error("Fallo caso invalido");',
            'Imprime console.log("Suite de Autenticación: 2 pruebas pasadas");'
          ],
          solutionCode: `const servicioAuth = {
  login: (repo, email, pass) => {
    const user = repo.buscarPorEmail(email);
    if (!user || user.password !== pass) return { error: "Credenciales invalidas" };
    return { token: "jwt_valido" };
  }
};

function probarFlujoLogin(servicio, repo) {
  // Caso 1: Exitoso
  const casoExitoso = servicio.login(repo, "ana@dev.com", "123");
  if (!casoExitoso || casoExitoso.token !== "jwt_valido") {
    throw new Error("Fallo en caso exitoso");
  }

  // Caso 2: Usuario inexistente
  const casoInvalido = servicio.login(repo, "falso@dev.com", "123");
  if (!casoInvalido || casoInvalido.error !== "Credenciales invalidas") {
    throw new Error("Fallo en caso inválido");
  }

  console.log("Suite de Autenticación: 2 pruebas pasadas");
}

const repoMock = {
  buscarPorEmail: (email) => email === "ana@dev.com" ? { email: "ana@dev.com", password: "123" } : null
};

probarFlujoLogin(servicioAuth, repoMock);`,
          solutionExplanation: 'Esta prueba simula un test de integración clásico verificando la lógica de negocio completa sin depender de una base de datos real conectada.',
          testCheck: {
            type: 'output-contains',
            expected: 'Suite de Autenticación: 2 pruebas pasadas',
          },
        },
      ],
      quiz: [
        {
          id: 'm6-l2-q1',
          question: '¿Qué significan las tres "A" en el patrón de testing AAA?',
          options: [
            'Async, Await, Action.',
            'Arrange (Preparar datos), Act (Ejecutar acción), Assert (Verificar resultado).',
            'Authentication, Authorization, Access.',
            'Apple, Android, Amazon.',
          ],
          correctIndex: 1,
          explanation: 'Arrange, Act, Assert es el estándar universal para organizar pruebas claras y legibles, separando la preparación, la ejecución y la verificación.',
        },
        {
          id: 'm6-l2-q2',
          question: '¿Por qué se deben usar "Mocks" en las pruebas unitarias en lugar de llamar a servicios reales de terceros (como Stripe o Twilio)?',
          options: [
            'Porque los servicios reales cobran por cada petición y harían que las pruebas sean lentas, impredecibles y fallen si no hay conexión a Internet.',
            'Porque JavaScript no permite hacer llamadas de red.',
            'Porque las pruebas unitarias solo se pueden correr de noche.',
            'Porque Stripe prohíbe el uso de pruebas.',
          ],
          correctIndex: 0,
          explanation: 'Los mocks garantizan que las pruebas unitarias sean rápidas (milisegundos), independientes de la red externa, gratuitas y completamente deterministas.',
        },
        {
          id: 'm6-l2-q3',
          question: '¿Qué mide el "Code Coverage" (Cobertura de Código) en un proyecto de software?',
          options: [
            'La cantidad de gigabytes de memoria que consume el servidor.',
            'El porcentaje de líneas, funciones y ramas de tu código fuente que fueron ejecutadas y verificadas por las pruebas automatizadas.',
            'El número de comentarios explicativos por cada archivo.',
            'La velocidad de conexión a Internet de los desarrolladores.',
          ],
          correctIndex: 1,
          explanation: 'El Code Coverage indica qué porcentaje de tu código está protegido por pruebas, identificando partes no testeadas donde podrían esconderse bugs.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Las pruebas automatizadas previenen regresiones y garantizan que los refactorings no rompan funcionalidades existentes.',
          'La pirámide de pruebas recomienda una base amplia de pruebas unitarias rápidas y una cantidad menor de pruebas de integración y E2E.',
          'El patrón Arrange-Act-Assert aporta consistencia y claridad al diseño de pruebas.',
        ],
        commonPitfalls: [
          'Probar detalles internos de implementación en lugar de comportamientos y salidas públicas.',
          'No usar mocks en peticiones de red externas, provocando pruebas inestables (flaky tests) que fallan aleatoriamente por problemas de conexión.',
          'Buscar 100% de cobertura de código a ciegas escribiendo pruebas superficiales que no prueban casos límite ni errores reales.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 3: DOCKER Y CONTENEDORES
    {
      id: 'm6-l3-docker-y-contenedores',
      moduleId: 6,
      slug: 'docker-y-contenedores-empaquetado-aislado',
      title: 'Docker y Contenedores: "En mi Máquina sí Funciona" es Cosa del Pasado',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Comprender qué son los contenedores Docker y cómo resuelven las inconsistencias entre sistemas operativos, diseñar Dockerfiles optimizados con Multi-stage builds, usar .dockerignore para mantener imágenes ligeras y orquestar servicios con docker-compose.yml.',
      realWorldAnalogy: {
        title: 'El Contenedor Marítimo de Carga Estandarizado',
        analogy: 'Antes de 1956, transportar mercancía en barcos era un caos total: los estibadores tenían que cargar sacos de café de formas raras, barriles de madera pesados y cajas frágiles a mano. Si cambiabas de barco o subías la carga a un tren, todo tenía que desempaquetarse y adaptarse.\n\nMalcolm McLean inventó el **Contenedor Marítimo Estandarizado**: una caja de acero de medidas idénticas (20 o 40 pies). Da igual si dentro hay bananas, ropa o piezas de avión; la caja encaja perfectamente en cualquier barco, tren o camión del mundo.\n\n**Docker** es exactamente eso para el software: empaqueta tu aplicación Node.js, tu versión exacta de Linux, tus librerías y tus fuentes en un "contenedor" estándar. Si corre en tu laptop con Windows o Mac, **correrá 100% idéntico** en los servidores de la nube de Linux sin sorpresas ni dependencias faltantes.',
        whyItMatters: 'Docker eliminó la excusa más frustrante de la historia del desarrollo: *"¡Pero si en mi máquina local funcionaba bien!"*. Es el estándar absoluto de despliegue en la nube.',
        iconName: 'Box',
      },
      explanation: {
        sections: [
          {
            heading: 'Contenedor vs Máquina Virtual: ¿Por qué es tan Ligero?',
            content: '• **Máquina Virtual (VirtualBox, VMware):** Incluye una copia completa de un sistema operativo invitado (Guest OS) de varios gigabytes y emula hardware completo. Es pesada y tarda minutos en encender.\n\n• **Contenedor Docker:** Comparte el kernel del sistema operativo anfitrión. Solo empaqueta los binarios y dependencias que tu app necesita. Pesa megabytes y arranca en milisegundos.',
          },
          {
            heading: 'Anatomía de un Dockerfile Profesional para Node.js',
            content: 'Un `Dockerfile` es la receta para construir tu imagen. El orden de los comandos es vital para aprovechar la **caché de capas** de Docker:\n\n```dockerfile\n# 1. Imagen base ligera basada en Alpine Linux\nFROM node:20-alpine AS base\nWORKDIR /app\n\n# 2. Copiamos PRIMERO solo package.json para aprovechar la caché de Docker\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# 3. Copiamos el resto del código fuente\nCOPY . .\n\n# 4. Exponemos el puerto y definimos el comando de inicio\nEXPOSE 3000\nCMD ["node", "src/main.js"]\n```',
            callout: {
              type: 'tip',
              text: 'Si copias el código fuente ANTES de hacer npm install, cada vez que cambies una coma en tu código Docker invalidará la caché y volverá a descargar todos los paquetes desde cero, tardando minutos en vez de segundos.',
            },
          },
          {
            heading: 'Orquestación Local con `docker-compose.yml`',
            content: 'En un proyecto real necesitas tu backend Node.js y una base de datos PostgreSQL corriendo juntos. Con Docker Compose los levantas con un solo comando `docker compose up -d`:\n\n```yaml\nversion: "3.8"\nservices:\n  servidor:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DATABASE_URL=postgres://admin:secreto@db:5432/tienda\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: admin\n      POSTGRES_PASSWORD: secreto\n      POSTGRES_DB: tienda\n    ports:\n      - "5432:5432"\n    volumes:\n      - datos_db:/var/lib/postgresql/data\n\nvolumes:\n  datos_db:\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de construcción de capas (Build Cache) de un Dockerfile:
const instruccionesDockerfile = [
  { comando: "FROM", argumento: "node:20-alpine", pesoMb: 120 },
  { comando: "WORKDIR", argumento: "/app", pesoMb: 0 },
  { comando: "COPY", argumento: "package*.json ./", pesoMb: 0.1 },
  { comando: "RUN", argumento: "npm install", pesoMb: 180 },
  { comando: "COPY", argumento: ". .", pesoMb: 5 },
  { comando: "CMD", argumento: '["node", "index.js"]', pesoMb: 0 }
];

function simularDockerBuild(instrucciones, archivoModificado) {
  console.log(\`🔨 Iniciando docker build tras modificar: '\${archivoModificado}'\`);
  let capaInvalida = false;
  let pesoTotalMb = 0;
  let tiempoConstruccionSegundos = 0;

  instrucciones.forEach((paso, idx) => {
    pesoTotalMb += paso.pesoMb;
    
    // Si se modificó un archivo de código y estamos en la capa de código
    if (archivoModificado === "index.js" && paso.argumento === ". .") {
      capaInvalida = true;
    }
    // Si se modificó package.json, se invalida desde la capa de package
    if (archivoModificado === "package.json" && paso.argumento.includes("package")) {
      capaInvalida = true;
    }

    if (!capaInvalida) {
      console.log(\` [Paso \${idx+1}/\${instrucciones.length}] \${paso.comando} \${paso.argumento} -> ⚡ USING CACHE (0.1s)\`);
      tiempoConstruccionSegundos += 0.1;
    } else {
      console.log(\` [Paso \${idx+1}/\${instrucciones.length}] \${paso.comando} \${paso.argumento} -> 📦 BUILD LAYER (\${paso.pesoMb > 0 ? (paso.pesoMb / 20).toFixed(1) + 's' : '0.2s'})\`);
      tiempoConstruccionSegundos += paso.pesoMb > 0 ? (paso.pesoMb / 20) : 0.2;
    }
  });

  console.log(\`\\n🎉 Imagen construida con éxito. Peso total: \${pesoTotalMb.toFixed(1)} MB\`);
  console.log(\`⏱️ Tiempo total de build: \${tiempoConstruccionSegundos.toFixed(1)} segundos\`);
}

// Probamos modificando solo una línea de código fuente:
simularDockerBuild(instruccionesDockerfile, "index.js");`,
        explanation: 'Fíjate cómo modificar index.js reutiliza la caché de npm install (180 MB) ahorrando tiempo. Cambia el argumento a "package.json" para ver la diferencia.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm6-l3-ex1',
          title: 'Validador de optimización de orden en Dockerfile',
          level: 'facil',
          instruction: 'Crea una función `analizarOrdenDockerfile(instrucciones)` que reciba un array de instrucciones `["FROM ...", "COPY ...", "RUN ..."]`. Debe verificar que la instrucción que copia `package.json` (`COPY package`) aparezca ANTES de la instrucción que copia el código completo (`COPY . .`). Si el orden es correcto, retorna `{ optimizado: true }`. Si no, retorna `{ optimizado: false, error: "COPY package*.json debe ir antes de COPY . . para aprovechar la caché" }`. Prueba con una lista válida.',
          starterCode: `function analizarOrdenDockerfile(instrucciones) {
  // Comprueba que COPY package esté antes de COPY . .
}

const dockerfileValido = [
  "FROM node:20-alpine",
  "WORKDIR /app",
  "COPY package*.json ./",
  "RUN npm ci",
  "COPY . .",
  "CMD [\"node\", \"server.js\"]"
];

console.log(analizarOrdenDockerfile(dockerfileValido));`,
          hints: [
            'Busca el índice de COPY package con findIndex',
            'Busca el índice de COPY . . con findIndex',
            'Comprueba indicePackage < indiceCodigoCompleto'
          ],
          solutionCode: `function analizarOrdenDockerfile(instrucciones) {
  const indicePackage = instrucciones.findIndex(i => i.includes('package'));
  const indiceCodigo = instrucciones.findIndex(i => i.trim() === 'COPY . .' || i.includes('COPY . .'));

  if (indicePackage !== -1 && indiceCodigo !== -1 && indicePackage < indiceCodigo) {
    return { optimizado: true };
  }
  return {
    optimizado: false,
    error: "COPY package*.json debe ir antes de COPY . . para aprovechar la caché"
  };
}

const dockerfileValido = [
  "FROM node:20-alpine",
  "WORKDIR /app",
  "COPY package*.json ./",
  "RUN npm ci",
  "COPY . .",
  "CMD [\"node\", \"server.js\"]"
];

console.log(analizarOrdenDockerfile(dockerfileValido));`,
          solutionExplanation: 'Separar la copia de dependencias de la copia del código fuente permite a Docker reutilizar la capa de npm ci si las dependencias no han cambiado.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm6-l3-ex2',
          title: 'Generador de archivo .dockerignore esencial',
          level: 'medio',
          instruction: 'Para evitar meter archivos innecesarios de gigabytes dentro de la imagen de Docker, crea una función `generarDockerignore()` que retorne un array con las 4 reglas mínimas indispensables: "node_modules", ".git", ".env" y "dist" (o "build"). Imprime el contenido formateado separado por saltos de línea.',
          starterCode: `function generarDockerignore() {
  // Retorna array de exclusiones obligatorias
}

const lineas = generarDockerignore();
console.log(lineas.join("\\n"));`,
          hints: [
            'return ["node_modules", ".git", ".env", "dist"];'
          ],
          solutionCode: `function generarDockerignore() {
  return [
    'node_modules',
    '.git',
    '.env',
    'dist'
  ];
}

const lineas = generarDockerignore();
console.log(lineas.join('\\n'));`,
          solutionExplanation: 'Sin .dockerignore, Docker copiará tu carpeta local de node_modules y el historial pesado de .git, inflando el tamaño de la imagen en cientos de megabytes y filtrando el archivo .env.',
          testCheck: {
            type: 'output-contains',
            expected: 'node_modules',
          },
        },
        {
          id: 'm6-l3-ex3',
          title: 'Parser de dependencias en docker-compose (Reto)',
          level: 'reto',
          instruction: 'En `docker-compose.yml`, los servicios con `depends_on` deben levantarse en el orden correcto. Crea una función `calcularOrdenArranque(servicios)` que reciba un objeto donde cada servicio define sus dependencias `depends_on: [...]`. La función debe retornar un array con los nombres de los servicios en el orden seguro en que deben encenderse (primero los que no tienen dependencias). Pruébala con un servicio "api" que depende de "db" y "redis".',
          starterCode: `const serviciosApp = {
  api: { depends_on: ["db", "redis"] },
  db: { depends_on: [] },
  redis: { depends_on: [] }
};

function calcularOrdenArranque(servicios) {
  // Retorna los servicios ordenados (db y redis antes que api)
}

const orden = calcularOrdenArranque(serviciosApp);
console.log("Orden de encendido de contenedores:", orden);`,
          hints: [
            'Separa los servicios sin dependencias primero',
            'Luego añade los que dependen de ellos',
            'api debe ir al final'
          ],
          solutionCode: `const serviciosApp = {
  api: { depends_on: ["db", "redis"] },
  db: { depends_on: [] },
  redis: { depends_on: [] }
};

function calcularOrdenArranque(servicios) {
  const independientes = [];
  const dependientes = [];

  for (const [nombre, config] of Object.entries(servicios)) {
    if (!config.depends_on || config.depends_on.length === 0) {
      independientes.push(nombre);
    } else {
      dependientes.push(nombre);
    }
  }

  return [...independientes, ...dependientes];
}

const orden = calcularOrdenArranque(serviciosApp);
console.log("Orden de encendido de contenedores:", orden);`,
          solutionExplanation: 'Docker Compose utiliza un grafo dirigido acíclico (DAG) para resolver qué contenedores (bases de datos, cachés) deben estar listos antes de levantar los servidores de backend.',
          testCheck: {
            type: 'output-contains',
            expected: 'api',
          },
        },
      ],
      quiz: [
        {
          id: 'm6-l3-q1',
          question: '¿Cuál es la diferencia fundamental entre un contenedor Docker y una máquina virtual tradicional?',
          options: [
            'Docker requiere tener dos computadoras físicas conectadas por cable.',
            'Un contenedor comparte el kernel del sistema operativo anfitrión sin emular hardware completo, haciéndolo mucho más ligero y rápido que una máquina virtual.',
            'Las máquinas virtuales solo funcionan con Windows y Docker solo con Android.',
            'No existe ninguna diferencia; son términos sinónimos.',
          ],
          correctIndex: 1,
          explanation: 'Los contenedores comparten el kernel del sistema operativo del host, lo que permite que arranquen en segundos y consuman una fracción mínima de memoria RAM.',
        },
        {
          id: 'm6-l3-q2',
          question: '¿Por qué es fundamental incluir "node_modules" dentro del archivo .dockerignore?',
          options: [
            'Porque Docker no permite instalar paquetes de npm.',
            'Para evitar copiar las dependencias de tu sistema local (que pueden estar compiladas para Windows o macOS) dentro del contenedor Linux, permitiendo que "npm ci" instale binarios limpios para el contenedor.',
            'Porque de lo contrario el contenedor borra el disco duro.',
            'Para que el código JavaScript se convierta en Python.',
          ],
          correctIndex: 1,
          explanation: 'Copiar node_modules local causaría conflictos con binarios nativos de C++ compilados para tu sistema operativo y sobrecargaría el contexto de build innecesariamente.',
        },
        {
          id: 'm6-l3-q3',
          question: '¿Para qué sirve la directiva "volumes" en un archivo docker-compose.yml para una base de datos PostgreSQL?',
          options: [
            'Para subir el volumen del audio del servidor.',
            'Para persistir los datos en el disco de la máquina anfitriona de modo que no se pierdan cuando el contenedor se detenga o reinicie.',
            'Para cambiar el color del contenedor a azul.',
            'Para enviar los datos a una red social.',
          ],
          correctIndex: 1,
          explanation: 'Los contenedores son efímeros por naturaleza (si mueren, sus datos internos desaparecen). Los volúmenes montan una carpeta persistente del host garantizando la durabilidad de los datos.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Docker garantiza que tu aplicación funcione exactamente igual en cualquier máquina local y servidor en la nube.',
          'La estructura del Dockerfile debe aprovechar la caché de capas copiando dependencias antes del código fuente.',
          'Docker Compose orquesta múltiples servicios (backend, base de datos, Redis) con redes y volúmenes persistentes en un solo archivo.',
        ],
        commonPitfalls: [
          'No crear .dockerignore y enviar carpetas gigantescas (.git, node_modules) en el contexto de compilación.',
          'Usar imágenes base gigantescas (ej. node:latest de 1 GB) en lugar de variantes optimizadas ligeras como node:20-alpine (120 MB).',
          'Ejecutar el contenedor como usuario "root" en producción en lugar de crear un usuario sin privilegios por seguridad.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 4: CI/CD CON GITHUB ACTIONS
    {
      id: 'm6-l4-ci-cd-con-github-actions',
      moduleId: 6,
      slug: 'ci-cd-integracion-y-entrega-continua-github-actions',
      title: 'CI/CD y Automatización: Integración y Entrega Continua con GitHub Actions',
      order: 4,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Comprender los conceptos de Integración Continua (CI) y Despliegue Continuo (CD), diseñar pipelines automáticas con GitHub Actions en archivos YAML, proteger ramas principales (main/master) con pruebas obligatorias y gestionar secretos de despliegue.',
      realWorldAnalogy: {
        title: 'El Piloto Automático y la Línea de Inspección Continua',
        analogy: 'Imagina el taller de mantenimiento de una aerolínea de pasajeros:\n\n• **El Método Manual Antiguo:** Un mecánico ajusta una tuerca, llama a otro mecánico por teléfono, le pide que revise el motor, luego buscan un disquete, suben a la cabina y cargan el software a mano. Es lento, propenso al olvido humano y riesgoso.\n• **El Flujo CI/CD (Piloto Automático):** En el instante en que el mecánico guarda una modificación (`git push`):\n  1. **CI (Continuous Integration):** Un robot automático se despierta, descarga el código, ejecuta el linter (revisa formato), compila TypeScript y corre las 300 pruebas automatizadas en una máquina virtual limpia. Si una sola prueba falla, la alarma suena en rojo y el cambio es rechazado.\n  2. **CD (Continuous Deployment):** Si todas las pruebas pasan en verde, otro robot empaqueta la app en Docker y la despliega automáticamente en los servidores de producción sin que nadie tenga que mover un dedo.\n\nEl equipo puede hacer 20 despliegues seguros al día con total tranquilidad.',
        whyItMatters: 'GitHub Actions es la plataforma de automatización más popular del planeta. Automatizar tus pruebas y despliegues te permite trabajar con la misma calidad de ingeniería que Google o Vercel.',
        iconName: 'GitBranch',
      },
      explanation: {
        sections: [
          {
            heading: 'Diferencia Clave: ¿Qué es CI y qué es CD?',
            content: '• **CI (Continuous Integration):** Los desarrolladores integran su código frecuentemente en la rama compartida. Cada push dispara linters, compilación y pruebas automáticas para detectar errores inmediatamente.\n\n• **CD (Continuous Delivery / Deployment):**\n  - *Continuous Delivery:* El código validado está siempre listo para ser lanzado a producción con un solo clic.\n  - *Continuous Deployment:* Todo cambio que pase las pruebas de CI se despliega en producción automáticamente sin intervención humana.',
          },
          {
            heading: 'Anatomía de un Workflow en `.github/workflows/ci.yml`',
            content: 'Los flujos de trabajo se escriben en formato **YAML** dentro de la carpeta `.github/workflows/` de tu repositorio:\n\n```yaml\nname: CI Pipeline\n\n# Cuándo se dispara el workflow:\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  verificar-calidad:\n    runs-on: ubuntu-latest # Máquina virtual limpia en la nube\n\n    steps:\n      # 1. Descargar el repositorio\n      - name: Checkout de código\n        uses: actions/checkout@v4\n\n      # 2. Configurar versión de Node.js\n      - name: Instalar Node.js 20\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: "npm"\n\n      # 3. Instalar dependencias limpias\n      - name: Instalar dependencias\n        run: npm ci\n\n      # 4. Comprobar TypeScript y Linter\n      - name: Verificar tipos\n        run: npm run build\n\n      # 5. Ejecutar pruebas automatizadas\n      - name: Ejecutar Vitest\n        run: npm test\n```',
          },
          {
            heading: 'Manejo Seguro de Secretos con `${{ secrets.MI_TOKEN }}`',
            content: 'Jamás escribas tokens de Vercel, Render o AWS en tu archivo YAML. En GitHub ve a **Settings > Secrets and variables > Actions** y guárdalos como secretos encriptados. En tu workflow los invocas de forma segura con `${{ secrets.VERCEL_TOKEN }}`.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de ejecución de pipeline de GitHub Actions (CI/CD):
class SimuladorGitHubAction {
  constructor(nombre) {
    this.nombre = nombre;
    this.pasos = [];
  }

  agregarPaso(nombrePaso, comandoSimulado, forzarFallo = false) {
    this.pasos.push({ nombre: nombrePaso, comando: comandoSimulado, forzarFallo });
    return this;
  }

  async ejecutar() {
    console.log(\`🚀 [GitHub Actions Runner] Iniciando workflow: '\${this.nombre}' en ubuntu-latest...\`);
    const inicio = Date.now();

    for (let i = 0; i < this.pasos.length; i++) {
      const paso = this.pasos[i];
      console.log(\`\\n ▶️  Paso \${i + 1}/\${this.pasos.length}: \${paso.nombre} (\${paso.comando})\`);

      // Simulamos la ejecución del paso
      if (paso.forzarFallo) {
        console.error(\` ❌ ERROR: El paso '\${paso.nombre}' falló con código de salida 1.\`);
        console.error(" 🛑 Pipeline cancelada. El Pull Request está bloqueado.");
        return { exito: false, pasoFallido: paso.nombre };
      } else {
        console.log(\` ✅ Paso completado con éxito (0.4s)\`);
      }
    }

    const duracion = ((Date.now() - inicio) / 1000).toFixed(2);
    console.log(\`\\n🎉 ¡Todos los checks pasaron en verde! (\${duracion}s)\`);
    console.log("🚀 Despliegue automático a producción autorizado.");
    return { exito: true };
  }
}

const workflow = new SimuladorGitHubAction("Integración y Despliegue Continuo")
  .agregarPaso("Checkout", "actions/checkout@v4")
  .agregarPaso("Setup Node", "actions/setup-node@v4")
  .agregarPaso("Install", "npm ci")
  .agregarPaso("Typecheck & Build", "npm run build")
  .agregarPaso("Test Suite", "npm test", false) // Cambia a true para simular un fallo
  .agregarPaso("Deploy to Cloud", "vercel --prod");

workflow.ejecutar();`,
        explanation: 'Cambia forzarFallo a true en el paso de "Test Suite" para ver cómo GitHub Actions bloquea el despliegue cuando se detecta un bug.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm6-l4-ex1',
          title: 'Validador de sintaxis estructural de workflows de GitHub Actions',
          level: 'facil',
          instruction: 'Crea una función `validarWorkflowYAML(workflowObj)` que compruebe que el objeto tenga las tres claves raíz obligatorias: `name` (string), `on` (objeto o array de eventos de disparo) y `jobs` (objeto con al menos un job definido). Si cumple retorna `{ valido: true }`, de lo contrario `{ valido: false, error: "Estructura de workflow incompleta" }`. Pruébala con un objeto válido e imprime el resultado.',
          starterCode: `function validarWorkflowYAML(workflowObj) {
  // Comprueba name, on y jobs
}

const miWorkflow = {
  name: "Build and Test",
  on: ["push", "pull_request"],
  jobs: {
    test: { runsOn: "ubuntu-latest", steps: [] }
  }
};

console.log(validarWorkflowYAML(miWorkflow));`,
          hints: [
            'Verifica typeof workflowObj.name === "string"',
            'Verifica workflowObj.on && (Array.isArray(workflowObj.on) || typeof workflowObj.on === "object")',
            'Verifica workflowObj.jobs && Object.keys(workflowObj.jobs).length > 0'
          ],
          solutionCode: `function validarWorkflowYAML(workflowObj) {
  if (!workflowObj || typeof workflowObj !== 'object') {
    return { valido: false, error: "Estructura de workflow incompleta" };
  }
  const tieneNombre = typeof workflowObj.name === 'string' && workflowObj.name.length > 0;
  const tieneDisparador = workflowObj.on && (Array.isArray(workflowObj.on) || typeof workflowObj.on === 'object');
  const tieneJobs = workflowObj.jobs && typeof workflowObj.jobs === 'object' && Object.keys(workflowObj.jobs).length > 0;

  if (tieneNombre && tieneDisparador && tieneJobs) {
    return { valido: true };
  }
  return { valido: false, error: "Estructura de workflow incompleta" };
}

const miWorkflow = {
  name: "Build and Test",
  on: ["push", "pull_request"],
  jobs: {
    test: { runsOn: "ubuntu-latest", steps: [] }
  }
};

console.log(validarWorkflowYAML(miWorkflow));`,
          solutionExplanation: 'GitHub Actions valida rigurosamente este esquema YAML antes de registrar la pipeline en la pestaña Actions del repositorio.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm6-l4-ex2',
          title: 'Detector de secretos expuestos en archivos YAML',
          level: 'medio',
          instruction: 'En los workflows jamás se deben escribir tokens reales. Crea una función `detectarSecretosQuemados(contenidoTexto)` que busque patrones inseguros como "ghp_", "sk_live_", "AKIA" o cadenas que asignen contraseñas en texto plano sin usar `${{ secrets.`. Si detecta alguna, retorna `{ seguro: false, alerta: "Secreto expuesto detectado" }`. Si todas las variables sensibles usan la sintaxis `${{ secrets.`, retorna `{ seguro: true }`. Prueba con un archivo que use `${{ secrets.VERCEL_TOKEN }}`.',
          starterCode: `function detectarSecretosQuemados(contenidoTexto) {
  // Comprueba que no tenga claves fijas
}

const yamlSeguro = "env:\\n  TOKEN: \${{ secrets.VERCEL_TOKEN }}";
console.log("Resultado de seguridad:", detectarSecretosQuemados(yamlSeguro));`,
          hints: [
            'Busca patrones maliciosos: if (contenidoTexto.includes("ghp_") || contenidoTexto.includes("sk_live_") || contenidoTexto.includes("AKIA")) return { seguro: false, alerta: "Secreto expuesto detectado" };',
            'return { seguro: true };'
          ],
          solutionCode: `function detectarSecretosQuemados(contenidoTexto) {
  const patronesPeligrosos = ['ghp_', 'sk_live_', 'AKIA', 'AIzaSy'];
  for (const patron of patronesPeligrosos) {
    if (contenidoTexto.includes(patron)) {
      return { seguro: false, alerta: "Secreto expuesto detectado: " + patron };
    }
  }
  return { seguro: true };
}

const yamlSeguro = "env:\\n  TOKEN: \${{ secrets.VERCEL_TOKEN }}";
console.log("Resultado de seguridad:", detectarSecretosQuemados(yamlSeguro));`,
          solutionExplanation: 'Herramientas como GitHub Secret Scanning y GitGuardian inspeccionan cada commit buscando patrones de claves privadas para evitar fugas de seguridad.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm6-l4-ex3',
          title: 'Simulador de Matriz de Pruebas Multi-Versión (Reto)',
          level: 'reto',
          instruction: 'En CI profesional usamos matrices para probar en Node 18, 20 y 22 simultáneamente. Crea una función `ejecutarMatrizTests(versionesNode, funcionTest)` que ejecute la prueba para cada versión. Debe retornar un reporte `{ totalVersiones, exitosas: [...], fallidas: [...] }`. Prueba con versiones `[18, 20, 22]` donde la versión 18 simule un fallo y las demás éxito.',
          starterCode: `function ejecutarMatrizTests(versionesNode, funcionTest) {
  // Ejecuta la función de prueba para cada versión
}

const simuladorTest = (version) => version >= 20; // Falla en Node 18
const resultadoMatriz = ejecutarMatrizTests([18, 20, 22], simuladorTest);
console.log("Resultado de la matriz:", resultadoMatriz);`,
          hints: [
            'Recorre versionesNode',
            'Si funcionTest(v) es true añade a exitosas, si es false añade a fallidas'
          ],
          solutionCode: `function ejecutarMatrizTests(versionesNode, funcionTest) {
  const exitosas = [];
  const fallidas = [];

  for (const v of versionesNode) {
    const paso = funcionTest(v);
    if (paso) {
      exitosas.push(v);
    } else {
      fallidas.push(v);
    }
  }

  return {
    totalVersiones: versionesNode.length,
    exitosas,
    fallidas,
    aprobada: fallidas.length === 0
  };
}

const simuladorTest = (version) => version >= 20;
const resultadoMatriz = ejecutarMatrizTests([18, 20, 22], simuladorTest);
console.log("Resultado de la matriz:", resultadoMatriz);`,
          solutionExplanation: 'La directiva strategy: matrix de GitHub Actions permite correr pruebas en múltiples sistemas operativos (Ubuntu, Windows, Mac) y versiones de Node en paralelo.',
          testCheck: {
            type: 'output-contains',
            expected: 'exitosas',
          },
        },
      ],
      quiz: [
        {
          id: 'm6-l4-q1',
          question: '¿Qué diferencia existe entre Continuous Delivery y Continuous Deployment?',
          options: [
            'Continuous Delivery solo funciona para aplicaciones móviles.',
            'Continuous Delivery prepara el software para que se pueda desplegar a producción con aprobación manual, mientras que Continuous Deployment lo publica a producción automáticamente sin intervención humana tras pasar los tests.',
            'Continuous Deployment es un servicio de pago de Microsoft.',
            'Son exactamente la misma cosa sin ninguna distinción.',
          ],
          correctIndex: 1,
          explanation: 'Continuous Delivery deja el código probado listo para desplegar cuando el equipo decida; Continuous Deployment automatiza el paso a producción inmediatamente.',
        },
        {
          id: 'm6-l4-q2',
          question: '¿Dónde se deben almacenar las credenciales y tokens privados para que GitHub Actions pueda usarlos en el despliegue?',
          options: [
            'En el archivo README.md del proyecto.',
            'En el panel de configuración de GitHub (Repository Settings > Secrets and variables > Actions).',
            'En los comentarios del código fuente.',
            'En el nombre de las ramas de Git.',
          ],
          correctIndex: 1,
          explanation: 'GitHub Secrets cifra las claves con encriptación asimétrica y las enmascara automáticamente en los logs de la consola para que nunca se filtren.',
        },
        {
          id: 'm6-l4-q3',
          question: '¿En qué carpeta y con qué extensión deben colocarse los archivos de workflows de GitHub Actions?',
          options: [
            'En la raíz del proyecto con extensión .txt.',
            'En la carpeta .github/workflows/ con extensión .yml o .yaml.',
            'Dentro de node_modules/actions/.',
            'En la carpeta dist/ como archivos .html.',
          ],
          correctIndex: 1,
          explanation: 'GitHub busca automáticamente los archivos YAML dentro del directorio .github/workflows/ en la raíz del repositorio.',
        },
      ],
      summary: {
        keyTakeaways: [
          'CI/CD automatiza la verificación de calidad y la entrega de software, permitiendo despliegues frecuentes y sin fricción.',
          'GitHub Actions utiliza archivos YAML declarativos organizados en eventos (on), trabajos (jobs) y pasos (steps).',
          'Los secretos de infraestructura deben gestionarse exclusivamente mediante GitHub Secrets cifrados.',
        ],
        commonPitfalls: [
          'No configurar bloqueo de ramas (Branch Protection Rules), permitiendo hacer push directo a main sin que los tests hayan pasado.',
          'Usar "npm install" en el CI en lugar de "npm ci", lo que puede instalar versiones inesperadas de librerías distintas a las fijadas en package-lock.json.',
          'No cachear la carpeta de dependencias (~/.npm), haciendo que cada ejecución de la pipeline tarde minutos innecesarios descargando paquetes.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 5: DESPLIEGUE EN LA NUBE (VERCEL, RENDER, HEALTH CHECKS Y DNS)
    {
      id: 'm6-l5-despliegue-en-la-nube',
      moduleId: 6,
      slug: 'despliegue-en-la-nube-vercel-render-dns-healthchecks',
      title: 'Despliegue en la Nube: Publicación Real en Vercel, Render y Health Checks',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Aprender la arquitectura de despliegue moderna en la nube: publicar frontends en Edge Networks globales (Vercel/Netlify), hospedar backends y bases de datos en plataformas PaaS (Render/Railway), configurar dominios personalizados (DNS, registros CNAME y certificados SSL) e implementar endpoints de Health Check para monitoreo de alta disponibilidad.',
      realWorldAnalogy: {
        title: 'La Mudanza del Garaje al Rascacielos con Conserje y Dirección Postal',
        analogy: 'Desarrollar una aplicación en tu computadora (`http://localhost:5173`) es como armar un mueble en el garaje de tu casa: funciona bien para ti, pero nadie más en el mundo puede entrar a usarlo.\n\nEl **Despliegue en la Nube** es llevar tu aplicación a un rascacielos en la mejor avenida del mundo:\n• **El Frontend en Vercel:** Es como tener sucursales de tu tienda con copias de tus folletos en 100 ciudades distintas al mismo tiempo (CDN / Edge Network). Cuando un usuario entra desde Madrid o Buenos Aires, la página web le carga en 40 milisegundos desde el servidor más cercano a su casa.\n• **El Backend en Render:** Es la oficina central segura con aire acondicionado, generadores de electricidad de respaldo y monitores de seguridad las 24 horas.\n• **El Dominio y DNS (`tuapp.com`):** Es tu dirección postal oficial con placa de oro y candado de seguridad SSL (el candado verde HTTPS) que garantiza que nadie pueda espiar la comunicación.',
        whyItMatters: 'Comprender cómo se despliegan, monitorean y enrutan las aplicaciones en producción es la habilidad definitiva que transforma a un estudiante en un verdadero ingeniero Full Stack.',
        iconName: 'Globe',
      },
      explanation: {
        sections: [
          {
            heading: 'La Arquitectura de Despliegue Moderna',
            content: 'En la industria actual no se suele colocar todo en un solo servidor monolítico lento:\n\n1. **Frontend (Vercel / Netlify / Cloudflare Pages):** Hospeda el código compilado de React/Vite/Next.js en una red de distribución de contenido (CDN) global. Ofrece SSL automático, despliegues instantáneos por cada commit y previsualizaciones en Pull Requests (Preview Deployments).\n\n2. **Backend (Render / Railway / Fly.io):** Hospeda tu servidor Node.js/Express en un contenedor seguro con auto-escalado y reinicio automático si el proceso se cuelga.\n\n3. **Base de Datos Gestionada (Supabase / Neon / Render Postgres):** Bases de datos administradas con respaldos diarios automáticos y alta disponibilidad.',
          },
          {
            heading: 'Cómo Funcionan los Dominios y el DNS (Registros A y CNAME)',
            content: 'Cuando compras un dominio en Namecheap, GoDaddy o Cloudflare:\n\n• **Registro A (Address):** Apunta tu dominio raíz (`miweb.com`) a una dirección IP numérica directa del servidor (ej. `76.76.21.21`).\n• **Registro CNAME (Canonical Name):** Apunta un subdominio (`www.miweb.com` o `api.miweb.com`) a un alias de dominio (ej. `cname.vercel-dns.com`).\n• **Certificados SSL/TLS (HTTPS):** Vercel y Cloudflare emiten certificados automáticos gratuitos con Let\'s Encrypt para cifrar todo el tráfico entre el usuario y tu servidor.',
          },
          {
            heading: 'Health Checks: Monitoreo de Caídas y Disponibilidad',
            content: 'Los balanceadores de carga y servicios de monitoreo (como UptimeRobot o Better Uptime) necesitan saber cada 30 segundos si tu servidor sigue vivo y con buena salud. Para eso implementamos un endpoint `/health` o `/api/health`:\n\n```typescript\napp.get("/health", async (req, res) => {\n  const estadoDb = await verificarConexionBaseDatos();\n  const memoria = process.memoryUsage();\n\n  const salud = {\n    status: estadoDb ? "ok" : "degraded",\n    uptimeSegundos: Math.floor(process.uptime()),\n    timestamp: new Date().toISOString(),\n    memoriaHeapMb: Math.round(memoria.heapUsed / 1024 / 1024),\n    baseDatos: estadoDb ? "conectada" : "error_conexion"\n  };\n\n  const codigoHttp = estadoDb ? 200 : 503;\n  res.status(codigoHttp).json(salud);\n});\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de endpoint de Health Check y cálculo de disponibilidad (SLA):
class ServidorEnLaNube {
  constructor(nombreApp) {
    this.nombreApp = nombreApp;
    this.inicio = Date.now();
    this.dbConectada = true;
    this.totalPeticiones = 0;
    this.peticionesFallidas = 0;
  }

  // Simula el endpoint GET /health
  obtenerHealthCheck() {
    const uptimeSegundos = Math.floor((Date.now() - this.inicio) / 1000);
    const estadoGeneral = this.dbConectada ? "UP" : "DOWN";
    const codigoHttp = this.dbConectada ? 200 : 503;

    return {
      codigoHttp,
      cuerpo: {
        app: this.nombreApp,
        status: estadoGeneral,
        uptimeSegundos,
        baseDatos: this.dbConectada ? "SALUDABLE" : "DESCONECTADA",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
      }
    };
  }

  simularTrafico(peticionesTotales, porcentajeError = 0.05) {
    this.totalPeticiones += peticionesTotales;
    this.peticionesFallidas += Math.round(peticionesTotales * porcentajeError);
  }

  calcularDisponibilidadSLA() {
    if (this.totalPeticiones === 0) return 100;
    const exitosas = this.totalPeticiones - this.peticionesFallidas;
    return Number(((exitosas / this.totalPeticiones) * 100).toFixed(3));
  }
}

const miServidor = new ServidorEnLaNube("RutaFullStack API");
miServidor.simularTrafico(10000, 0.001); // 10,000 peticiones con 0.1% de fallos

console.log("1. Respuesta del Health Check /api/health:");
console.log(miServidor.obtenerHealthCheck());

console.log(\`\\n2. Métrica de Disponibilidad del Servidor (SLA): \${miServidor.calcularDisponibilidadSLA()}%\`);`,
        explanation: 'Observa cómo los servicios de hosting y monitoreo utilizan el código HTTP y el cuerpo del Health Check para determinar si redirigir tráfico al servidor o reiniciar el contenedor.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm6-l5-ex1',
          title: 'Implementación didáctica del endpoint /health',
          level: 'facil',
          instruction: 'Crea una función `generarRespuestaHealth(estadoBaseDatos, versionApp)` que retorne el objeto JSON de salud del servidor: si `estadoBaseDatos` es true, el objeto debe tener `status: "healthy"`, `codigoHttp: 200`, `version: versionApp` y `timestamp` con fecha actual en formato ISO. Si es false, debe tener `status: "unhealthy"`, `codigoHttp: 503`. Prueba con estado true e imprime el resultado.',
          starterCode: `function generarRespuestaHealth(estadoBaseDatos, versionApp) {
  // Retorna respuesta de salud
}

const respuestaSalud = generarRespuestaHealth(true, "1.2.0");
console.log("Health Check:", respuestaSalud);`,
          hints: [
            'if (estadoBaseDatos) return { status: "healthy", codigoHttp: 200, version: versionApp, timestamp: new Date().toISOString() };',
            'else return { status: "unhealthy", codigoHttp: 503, version: versionApp, timestamp: new Date().toISOString() };'
          ],
          solutionCode: `function generarRespuestaHealth(estadoBaseDatos, versionApp) {
  const saludable = Boolean(estadoBaseDatos);
  return {
    status: saludable ? 'healthy' : 'unhealthy',
    codigoHttp: saludable ? 200 : 503,
    version: versionApp,
    timestamp: new Date().toISOString()
  };
}

const respuestaSalud = generarRespuestaHealth(true, "1.2.0");
console.log("Health Check:", respuestaSalud);`,
          solutionExplanation: 'Los orquestadores de la nube como Kubernetes, Render y AWS ECS consultan este endpoint periódicamente para saber si el contenedor debe seguir activo.',
          testCheck: {
            type: 'output-contains',
            expected: 'healthy',
          },
        },
        {
          id: 'm6-l5-ex2',
          title: 'Validador de configuración de registros DNS',
          level: 'medio',
          instruction: 'Crea una función `validarConfiguracionDNS(registros)` que reciba un array de registros DNS `[{ tipo, nombre, valor }]`. Debe comprobar que exista un registro "CNAME" para "www" apuntando a "cname.vercel-dns.com" y un registro "A" para "@" apuntando a una IP válida (4 números separados por puntos). Si ambos existen, retorna `{ configurado: true, mensaje: "Dominio listo para producción con SSL" }`. Prueba con la lista dada.',
          starterCode: `function validarConfiguracionDNS(registros) {
  // Valida presencia de registros A y CNAME
}

const misRegistrosDNS = [
  { tipo: "A", nombre: "@", valor: "76.76.21.21" },
  { tipo: "CNAME", nombre: "www", valor: "cname.vercel-dns.com" }
];

console.log(validarConfiguracionDNS(misRegistrosDNS));`,
          hints: [
            'const tieneA = registros.some(r => r.tipo === "A" && r.nombre === "@");',
            'const tieneCNAME = registros.some(r => r.tipo === "CNAME" && r.nombre === "www" && r.valor.includes("vercel"));',
            'if (tieneA && tieneCNAME) return { configurado: true, mensaje: "Dominio listo para producción con SSL" };'
          ],
          solutionCode: `function validarConfiguracionDNS(registros) {
  const tieneA = registros.some(r => r.tipo === 'A' && r.nombre === '@');
  const tieneCNAME = registros.some(r => r.tipo === 'CNAME' && r.nombre === 'www' && r.valor.includes('vercel'));

  if (tieneA && tieneCNAME) {
    return { configurado: true, mensaje: "Dominio listo para producción con SSL" };
  }
  return { configurado: false, error: "Faltan registros requeridos en la zona DNS" };
}

const misRegistrosDNS = [
  { tipo: "A", nombre: "@", valor: "76.76.21.21" },
  { tipo: "CNAME", nombre: "www", valor: "cname.vercel-dns.com" }
];

console.log(validarConfiguracionDNS(misRegistrosDNS));`,
          solutionExplanation: 'Configurar correctamente los registros A y CNAME en tu proveedor de DNS es lo que vincula tu nombre de dominio comercial con los servidores de la nube.',
          testCheck: {
            type: 'output-contains',
            expected: 'Dominio listo para producción con SSL',
          },
        },
        {
          id: 'm6-l5-ex3',
          title: 'Calculador de SLA y Disponibilidad de Servicio (Reto)',
          level: 'reto',
          instruction: 'En los acuerdos de nivel de servicio (SLA), las empresas prometen "tres nueves" (99.9% de uptime) o "cuatro nueves" (99.99%). Crea una función `calcularMinutosCaidaPermitidos(porcentajeSLA, diasMes = 30)` que calcule cuántos minutos de caída no planificada puede tener el servicio en un mes según el porcentaje prometido (`minutosTotales = diasMes * 24 * 60`; `minutosCaida = minutosTotales * (1 - (porcentajeSLA / 100))`). Debe retornar el número de minutos redondeado a 2 decimales. Prueba con 99.9% de SLA e imprime el resultado.',
          starterCode: `function calcularMinutosCaidaPermitidos(porcentajeSLA, diasMes = 30) {
  // Calcula minutos de indisponibilidad permitidos
}

const minutos999 = calcularMinutosCaidaPermitidos(99.9, 30);
console.log("Minutos de caída permitidos al mes para 99.9%:", minutos999);`,
          hints: [
            'const totalMinutos = diasMes * 24 * 60;',
            'const fraccion = (100 - porcentajeSLA) / 100;',
            'return Number((totalMinutos * fraccion).toFixed(2));'
          ],
          solutionCode: `function calcularMinutosCaidaPermitidos(porcentajeSLA, diasMes = 30) {
  const totalMinutos = diasMes * 24 * 60;
  const fraccionCaida = (100 - porcentajeSLA) / 100;
  return Number((totalMinutos * fraccionCaida).toFixed(2));
}

const minutos999 = calcularMinutosCaidaPermitidos(99.9, 30);
console.log("Minutos de caída permitidos al mes para 99.9%:", minutos999);`,
          solutionExplanation: 'Para un SLA de 99.9%, tu servicio solo puede estar caído un máximo de 43.2 minutos en todo el mes. ¡Por eso la automatización, los tests y el monitoreo son tan vitales!',
          testCheck: {
            type: 'output-contains',
            expected: '43.2',
          },
        },
      ],
      quiz: [
        {
          id: 'm6-l5-q1',
          question: '¿Por qué plataformas como Vercel y Netlify ofrecen tiempos de carga extremadamente rápidos para frontends?',
          options: [
            'Porque eliminan los estilos CSS de la página.',
            'Porque distribuyen y cachean los archivos estáticos en una red global CDN (Edge Network) sirviendo la página desde el servidor físicamente más cercano al usuario.',
            'Porque solo permiten que un usuario visite la web a la vez.',
            'Porque obligan a usar computadoras cuánticas.',
          ],
          correctIndex: 1,
          explanation: 'Las CDN (Content Delivery Networks) tienen nodos en cientos de ciudades del mundo, reduciendo la latencia de red a unos pocos milisegundos.',
        },
        {
          id: 'm6-l5-q2',
          question: '¿Cuál es el código de estado HTTP estándar que debe devolver un endpoint "/health" cuando todos los servicios internos funcionan correctamente?',
          options: [
            '200 OK',
            '404 Not Found',
            '500 Internal Server Error',
            '301 Moved Permanently',
          ],
          correctIndex: 0,
          explanation: 'El código 200 OK le confirma a los balanceadores de carga y monitores externos que el servidor está saludable y listo para recibir tráfico de usuarios.',
        },
        {
          id: 'm6-l5-q3',
          question: '¿Qué tipo de registro DNS se utiliza habitualmente para apuntar un subdominio como "www.miweb.com" al dominio de un servicio en la nube (como cname.vercel-dns.com)?',
          options: [
            'Registro MX',
            'Registro CNAME (Canonical Name)',
            'Registro TXT',
            'Registro NS',
          ],
          correctIndex: 1,
          explanation: 'Un registro CNAME crea un alias de un nombre de dominio hacia otro nombre de dominio canónico gestionado por tu proveedor de hosting.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La arquitectura moderna desacopla el frontend estático distribuido en CDNs Edge (Vercel) del backend contenerizado (Render).',
          'Los registros DNS (A y CNAME) conectan dominios personalizados y permiten aprovisionamiento automático de certificados SSL/TLS con HTTPS.',
          'Los Health Checks (/health) y el monitoreo de disponibilidad (SLA) aseguran alta disponibilidad y autorrecuperación de fallos en la nube.',
        ],
        commonPitfalls: [
          'No configurar variables de entorno en el panel de producción del proveedor de hosting, provocando que la app falle al arrancar.',
          'Olvidar habilitar CORS para el dominio oficial de producción, impidiendo que el frontend se comunique con la API del backend.',
          'No monitorear la salud del servidor con herramientas de alerta temprana, enterándose de que la app está caída por quejas de los usuarios en redes sociales.',
        ],
      },
      xpReward: 50,
    },
  ],
};
