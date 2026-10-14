import type { Module } from '../../types/curriculum';

export const MODULE_3_BACKEND: Module = {
  id: 3,
  slug: 'backend',
  title: '3. Backend y APIs REST',
  description: 'Descubre qué ocurre detrás de escena: Node.js, arquitectura de servidores con Express, diseño de APIs RESTful seguras, autenticación profesional con JWT y protección con hashing de contraseñas.',
  icon: 'Server',
  color: 'violet',
  badge: {
    id: 'modulo-3-maestro',
    name: 'Ingeniero de Servidores',
    description: 'Completaste la construcción de servidores, APIs REST y sistemas de autenticación segura.',
    icon: 'ShieldCheck',
    category: 'modulo',
  },
  lessons: [
    {
      id: 'm3-l1-nodejs-event-loop',
      moduleId: 3,
      slug: 'nodejs-y-event-loop-motor',
      title: 'Node.js y el Event Loop: El Motor que Corre en el Servidor',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Comprender qué es Node.js, cómo ejecuta JavaScript fuera del navegador, y por qué su modelo asíncrono no bloqueante (Event Loop) le permite atender a miles de usuarios simultáneamente con muy poca memoria.',
      realWorldAnalogy: {
        title: 'El Chef Solitario Hiperrápido y los Camareros',
        analogy: 'Imagina dos restaurantes:\n\n• **El Restaurante Tradicional (Servidores multihilo clásicos):** Cada cliente nuevo tiene su propio camarero personal. Si entran 1,000 clientes, necesitas 1,000 camareros. Si el cliente se queda 20 minutos leyendo la carta, ese camarero se queda cruzado de brazos esperando sin atender a nadie más. Esto consume muchísima memoria.\n• **El Restaurante Node.js (El Event Loop de un solo hilo):** Hay un solo camarero extraordinariamente ágil. Llega a tu mesa, toma tu pedido, se lo lanza a la cocina, y de inmediato va a la mesa 2 y a la mesa 3 sin quedarse esperando. Cuando la cocina termina un plato, una campana suena y el camarero te lo entrega en un segundo.\n\nEsa campana y cola de avisos es el **Event Loop**: Node.js nunca se queda de brazos cruzados esperando que el disco duro o la base de datos respondan.',
        whyItMatters: 'Empresas como Netflix, PayPal, Uber y LinkedIn redujeron sus tiempos de respuesta en un 50% y bajaron sus costos de servidores a la mitad al migrar sus sistemas a Node.js.',
        iconName: 'Cpu',
      },
      explanation: {
        sections: [
          {
            heading: '¿Qué es exactamente Node.js?',
            content: 'Node.js no es un lenguaje nuevo; es un **entorno de ejecución (Runtime)** creado por Ryan Dahl en 2009. Tomó el motor ultra veloz **V8** de Google Chrome (el que compila JavaScript a código máquina en C++) y lo sacó del navegador para que pudiera ejecutarse directamente en el sistema operativo.\n\nEsto significa que ahora con JavaScript puedes:\n• Leer y escribir archivos en el disco duro.\n• Conectarte a bases de datos.\n• Abrir puertos de red y escuchar solicitudes de Internet.',
            codeSnippet: {
              language: 'javascript',
              description: 'Tu primer servidor web nativo en Node.js (sin librerías externas):',
              code: `// En Node.js usamos el módulo nativo "http":
const http = require('http');

const servidor = http.createServer((peticion, respuesta) => {
  respuesta.statusCode = 200;
  respuesta.setHeader('Content-Type', 'text/plain; charset=utf-8');
  respuesta.end('¡Hola desde tu primer servidor en Node.js! 🚀');
});

const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log(\`Servidor escuchando en http://localhost:\${PUERTO}\`);
});`,
            },
          },
          {
            heading: 'El Objeto Global `process.env` (Variables de Entorno)',
            content: 'En el backend jamás debes escribir contraseñas, claves secretas o URLs de bases de datos directamente en el código (hardcoding). Si subes eso a GitHub, cualquier persona podría hackear tu sistema.\n\nEn su lugar, usamos **Variables de Entorno** guardadas en un archivo confidencial `.env` y leídas en Node.js con `process.env.NOMBRE_VARIABLE`:\n```javascript\nconst CLAVE_SECRETA = process.env.JWT_SECRET || "clave_por_defecto_desarrollo";\nconst PUERTO = process.env.PORT || 5000;\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando el Event Loop y variables de entorno en el laboratorio:
const entornoSimulado = {
  PORT: "8080",
  NODE_ENV: "production",
  DB_URL: "postgres://admin:secreto@db.servidor.com:5432/tienda"
};

console.log("1. Servidor iniciando...");
console.log("2. Leyendo puerto de entorno: " + entornoSimulado.PORT);
console.log("3. Modo de ejecución: " + entornoSimulado.NODE_ENV);

// Demostración del Event Loop (código no bloqueante):
setTimeout(() => {
  console.log("5. 🔔 (Event Loop): Consulta lenta de base de datos terminada.");
}, 100);

console.log("4. El servidor sigue atendiendo otras peticiones sin esperar.");`,
        explanation: 'Observa cómo la instrucción 4 se ejecuta antes que la 5 gracias a la naturaleza asíncrona de Node.js.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm3-l1-ex1',
          title: 'Configurando el puerto del servidor',
          level: 'facil',
          instruction: 'Crea una función `obtenerPuerto(envPort)` que reciba el puerto de las variables de entorno. Si `envPort` existe, retorna ese número convertido con `Number()`, si no existe (es undefined), retorna el puerto por defecto `3000`. Prueba llamándola sin argumentos.',
          starterCode: `function obtenerPuerto(envPort) {
  // Retorna envPort si existe o 3000 como fallback
}

console.log("Puerto asignado:", obtenerPuerto(undefined));`,
          hints: ['return envPort ? Number(envPort) : 3000;'],
          solutionCode: `function obtenerPuerto(envPort) {
  return envPort ? Number(envPort) : 3000;
}

console.log("Puerto asignado:", obtenerPuerto(undefined));`,
          solutionExplanation: 'El patrón de fallback con `process.env.PORT || 3000` garantiza que tu servidor funcione tanto en tu laptop como en plataformas en la nube (Vercel, Render).',
          testCheck: {
            type: 'output-contains',
            expected: '3000',
          },
        },
        {
          id: 'm3-l1-ex2',
          title: 'Simulando un despachador de peticiones',
          level: 'medio',
          instruction: 'Crea una función `despacharRuta(url)` que si recibe "/api/saludo" retorne `{ status: 200, mensaje: "¡Hola desde el backend!" }`, y para cualquier otra ruta retorne `{ status: 404, mensaje: "Ruta no encontrada" }`. Prueba con "/api/saludo".',
          starterCode: `function despacharRuta(url) {
  if (url === "/api/saludo") {
    return { status: 200, mensaje: "¡Hola desde el backend!" };
  }
  return { status: 404, mensaje: "Ruta no encontrada" };
}

console.log(despacharRuta("/api/saludo"));`,
          hints: [
            'Evalúa la URL con if (url === "/api/saludo").',
          ],
          solutionCode: `function despacharRuta(url) {
  if (url === "/api/saludo") {
    return { status: 200, mensaje: "¡Hola desde el backend!" };
  }
  return { status: 404, mensaje: "Ruta no encontrada" };
}

console.log(despacharRuta("/api/saludo"));`,
          solutionExplanation: 'Así es como un servidor inspecciona la URL entrante para decidir qué controlador o función debe responder.',
          testCheck: {
            type: 'output-contains',
            expected: '¡Hola desde el backend!',
          },
        },
        {
          id: 'm3-l1-ex3',
          title: 'Manejador de cola asíncrona (Reto)',
          level: 'reto',
          instruction: 'Crea una función `simularColaPeticiones(usuarios)` que use `Promise.all()` para procesar una lista de nombres de usuarios en paralelo. A cada usuario devuélvele `{ nombre, atendido: true }`. Prueba con `["Lucas", "Elena"]` e imprime el resultado.',
          starterCode: `async function simularColaPeticiones(usuarios) {
  const promesas = usuarios.map(async (u) => {
    return { nombre: u, atendido: true };
  });
  return await Promise.all(promesas);
}

simularColaPeticiones(["Lucas", "Elena"]).then(res => console.log("Atendidos:", res));`,
          hints: [
            'Promise.all procesa múltiples promesas en paralelo de manera concurrente.',
          ],
          solutionCode: `async function simularColaPeticiones(usuarios) {
  const promesas = usuarios.map(async (u) => {
    return { nombre: u, atendido: true };
  });
  return await Promise.all(promesas);
}

simularColaPeticiones(["Lucas", "Elena"]).then(res => console.log("Atendidos:", res));`,
          solutionExplanation: 'La concurrencia en Node.js permite atender múltiples tareas I/O sin bloquear el hilo principal de ejecución.',
          testCheck: {
            type: 'output-contains',
            expected: 'Lucas',
          },
        },
      ],
      quiz: [
        {
          id: 'm3-l1-q1',
          question: '¿Qué es exactamente Node.js?',
          options: [
            'Un nuevo lenguaje de programación que reemplazó a JavaScript.',
            'Un entorno de ejecución (Runtime) que permite ejecutar JavaScript fuera del navegador en el servidor, usando el motor V8 de Google.',
            'Un tipo de pantalla o monitor para diseñadores.',
            'Una base de datos relacional para guardar contraseñas.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Node.js lleva JavaScript al lado del servidor, permitiendo construir APIs, servidores y herramientas de terminal.',
        },
        {
          id: 'm3-l1-q2',
          question: '¿Cómo logra Node.js atender a miles de usuarios simultáneos en un solo hilo principal?',
          options: [
            'Mediante el Event Loop y operaciones de entrada/salida (I/O) no bloqueantes y asíncronas.',
            'Acelerando la velocidad del procesador físico con imanes.',
            'Ignorando a la mitad de los usuarios.',
            'Creando un nuevo sistema operativo cada vez que entra alguien.',
          ],
          correctIndex: 0,
          explanation: '¡Muy bien! Su arquitectura orientada a eventos delega tareas lentas (como base de datos o disco) y continúa atendiendo otras solicitudes.',
        },
        {
          id: 'm3-l1-q3',
          question: '¿Por qué las contraseñas y claves de API deben guardarse en variables de entorno (process.env) y nunca escritas en el código?',
          options: [
            'Porque el código se ejecuta más lento si contiene contraseñas.',
            'Por seguridad: evita que secretos críticos se filtren públicamente al subir el repositorio a GitHub o compartirlo con otros desarrolladores.',
            'Porque las letras de las contraseñas consumen más batería.',
            'Es solo una moda estética sin razón de seguridad.',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! Las variables de entorno mantienen tus credenciales seguras y permiten usar distintas configuraciones en desarrollo y en producción.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Node.js permite ejecutar JavaScript en el servidor gracias al motor V8 de Google Chrome.',
          'Su arquitectura orientada a eventos (Event Loop) es asíncrona y no bloqueante.',
          'Es ideal para aplicaciones de alta concurrencia: APIs REST, chats en tiempo real y microservicios.',
          'Las variables de entorno (`process.env`) protegen tus credenciales y secretos de producción.',
        ],
        commonPitfalls: [
          'Escribir operaciones síncronas bloqueantes (como `fs.readFileSync`) dentro de una ruta web concurrida, lo que congelaría el servidor para todos los demás usuarios.',
          'Subir accidentalmente el archivo `.env` a GitHub (recuerda siempre ponerlo en tu `.gitignore`).',
          'Intentar acceder al objeto `window` o `document` en Node.js (el DOM solo existe dentro del navegador, no en el servidor).',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm3-l2-express-middlewares',
      moduleId: 3,
      slug: 'expressjs-y-middlewares-ventanilla',
      title: 'Express.js y Middlewares: La Ventanilla y Filtros de Seguridad',
      order: 2,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Aprender qué es el framework Express.js, cómo estructurar rutas HTTP (GET, POST, PUT, DELETE) y cómo funcionan los Middlewares como filtros de inspección y seguridad paso a paso.',
      realWorldAnalogy: {
        title: 'La Aduana del Aeropuerto y las Cintas Transportadoras',
        analogy: 'Imagina que llegas a un aeropuerto internacional para viajar:\n\n• **Express.js es el Aeropuerto:** La infraestructura organizada que recibe a los pasajeros y los dirige a la puerta de embarque correcta.\n• **Las Rutas son las Puertas de Embarque:** Si vas a París vas a la puerta `/viajes/paris`, si vas a Tokio vas a `/viajes/tokio`.\n• **¿Y qué son los Middlewares?** Son los **filtros de seguridad y aduanas** por los que debes pasar antes de subir al avión:\n  1. Primer control: ¿Tienes tu pasaporte y boleto? (Middleware de autenticación).\n  2. Segundo control: El escáner de equipaje (Middleware de validación de datos: que no lleves nada prohibido).\n  3. Si pasas ambos controles, el guardia dice "Siguiente" (`next()`) y finalmente llegas a tu asiento (el controlador final que te entrega el servicio).\n\nSi no tienes boleto, el guardia te frena en seco y no te deja continuar.',
        whyItMatters: 'Express.js es el framework de backend más usado en el ecosistema Node.js. Aprender su sistema de middlewares te permitirá construir sistemas de login, control de acceso, registro de logs y validaciones en minutos.',
        iconName: 'Network',
      },
      explanation: {
        sections: [
          {
            heading: 'Estructura de una Aplicación Express.js',
            content: 'En Express, creamos una aplicación con `const app = express()`, y registramos rutas asociadas a métodos HTTP:\n\n• `app.get("/usuarios", handler)`: Solicitar datos.\n• `app.post("/usuarios", handler)`: Crear un nuevo usuario.\n• `app.put("/usuarios/:id", handler)`: Actualizar un usuario existente.\n• `app.delete("/usuarios/:id", handler)`: Borrar un usuario.',
            codeSnippet: {
              language: 'javascript',
              description: 'Servidor completo con Express y rutas:',
              code: `const express = require('express');
const app = express();

// Middleware obligatorio para entender JSON en el cuerpo (body) de las peticiones:
app.use(express.json());

// Ruta GET:
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde Express!' });
});

// Ruta POST:
app.post('/api/usuarios', (req, res) => {
  const { nombre } = req.body;
  res.status(201).json({ id: 1, nombre, creado: true });
});

app.listen(3000, () => console.log('Servidor Express en puerto 3000'));`,
            },
          },
          {
            heading: 'La Magia de los Middlewares y la función `next()`',
            content: 'Un middleware es una función con tres argumentos: `(req, res, next)`:\n• Puede inspeccionar o alterar la petición (`req`).\n• Puede rechazar la petición con un error (`res.status(403).json(...)`).\n• Si todo está en orden, llama a `next()` para pasarle el turno al siguiente middleware o controlador.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando la cadena de Middlewares de Express en JavaScript:
function ejecutarCadenaMiddlewares(req) {
  console.log("➡️ Petición entrante:", req.metodo, req.ruta);

  // Middleware 1: Registro de logs
  console.log(" [1. Logger]: Hora: " + new Date().toLocaleTimeString());

  // Middleware 2: Verificador de token
  if (!req.encabezados["autorizacion"]) {
    return {
      status: 401,
      error: "⛔ Acceso denegado: Falta el token de autorización"
    };
  }

  // Controlador final (si pasó los filtros)
  return {
    status: 200,
    datos: { mensaje: "¡Bienvenido a la zona protegida del backend!" }
  };
}

// Prueba 1: Petición sin autorización
console.log("--- Caso A (Sin Token) ---");
console.log(ejecutarCadenaMiddlewares({ metodo: "GET", ruta: "/perfil", encabezados: {} }));

// Prueba 2: Petición con autorización
console.log("\\n--- Caso B (Con Token) ---");
console.log(ejecutarCadenaMiddlewares({ metodo: "GET", ruta: "/perfil", encabezados: { autorizacion: "Bearer abc123xyz" } }));`,
        explanation: 'Observa cómo los middlewares interceptan las peticiones y deciden si dejarlas pasar o detenerlas.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm3-l2-ex1',
          title: 'Creando un enrutador básico',
          level: 'facil',
          instruction: 'Crea una función `manejadorRuta(metodo, ruta)` que si es `GET` a `/estado` retorne `{ ok: true, version: "1.0" }`. Para cualquier otra combinación retorna `{ error: "No encontrado" }`. Prueba con "GET" y "/estado".',
          starterCode: `function manejadorRuta(metodo, ruta) {
  if (metodo === "GET" && ruta === "/estado") {
    return { ok: true, version: "1.0" };
  }
  return { error: "No encontrado" };
}

console.log(manejadorRuta("GET", "/estado"));`,
          hints: ['Comprueba metodo === "GET" && ruta === "/estado"'],
          solutionCode: `function manejadorRuta(metodo, ruta) {
  if (metodo === "GET" && ruta === "/estado") {
    return { ok: true, version: "1.0" };
  }
  return { error: "No encontrado" };
}

console.log(manejadorRuta("GET", "/estado"));`,
          solutionExplanation: 'En Express esto equivale a escribir: `app.get("/estado", (req, res) => res.json({ ok: true, version: "1.0" }))`.',
          testCheck: {
            type: 'output-contains',
            expected: '1.0',
          },
        },
        {
          id: 'm3-l2-ex2',
          title: 'El Middleware de autenticación de API Key',
          level: 'medio',
          instruction: 'Escribe una función `middlewareApiKey(apiKey)` que retorne true si la key es exactamente "clave-secreta-2026", o lance un error con `throw new Error("API Key inválida")` en caso contrario. Pruébala dentro de un try/catch con "clave-secreta-2026".',
          starterCode: `function middlewareApiKey(apiKey) {
  if (apiKey !== "clave-secreta-2026") {
    throw new Error("API Key inválida");
  }
  return true;
}

try {
  const autorizada = middlewareApiKey("clave-secreta-2026");
  console.log("Acceso concedido:", autorizada);
} catch (e) {
  console.log("Error:", e.message);
}`,
          hints: ['Verifica si apiKey !== "clave-secreta-2026"'],
          solutionCode: `function middlewareApiKey(apiKey) {
  if (apiKey !== "clave-secreta-2026") {
    throw new Error("API Key inválida");
  }
  return true;
}

try {
  const autorizada = middlewareApiKey("clave-secreta-2026");
  console.log("Acceso concedido:", autorizada);
} catch (e) {
  console.log("Error:", e.message);
}`,
          solutionExplanation: 'Los middlewares de Express se encargan de verificar credenciales antes de procesar lógica pesada.',
          testCheck: {
            type: 'output-contains',
            expected: 'Acceso concedido: true',
          },
        },
        {
          id: 'm3-l2-ex3',
          title: 'Parser de parámetros de ruta (Reto)',
          level: 'reto',
          instruction: 'Crea una función `extraerIdDeRuta(patron, urlReal)` que dado el patrón "/usuarios/:id" y la URL "/usuarios/42", extraiga el valor del ID ("42") como objeto `{ id: "42" }`. Imprime el resultado.',
          starterCode: `function extraerIdDeRuta(patron, urlReal) {
  const partesPatron = patron.split("/");
  const partesUrl = urlReal.split("/");
  const params = {};

  partesPatron.forEach((parte, idx) => {
    if (parte.startsWith(":")) {
      const nombreParam = parte.substring(1);
      params[nombreParam] = partesUrl[idx];
    }
  });

  return params;
}

console.log("req.params:", extraerIdDeRuta("/usuarios/:id", "/usuarios/42"));`,
          hints: [
            'Los dos puntos : en las rutas de Express indican parámetros dinámicos que se capturan en req.params.',
          ],
          solutionCode: `function extraerIdDeRuta(patron, urlReal) {
  const partesPatron = patron.split("/");
  const partesUrl = urlReal.split("/");
  const params = {};

  partesPatron.forEach((parte, idx) => {
    if (parte.startsWith(":")) {
      const nombreParam = parte.substring(1);
      params[nombreParam] = partesUrl[idx];
    }
  });

  return params;
}

console.log("req.params:", extraerIdDeRuta("/usuarios/:id", "/usuarios/42"));`,
          solutionExplanation: 'En Express, definir `app.get("/usuarios/:id")` puebla automáticamente el objeto `req.params.id`.',
          testCheck: {
            type: 'output-contains',
            expected: '42',
          },
        },
      ],
      quiz: [
        {
          id: 'm3-l2-q1',
          question: '¿Qué es un Middleware en Express.js?',
          options: [
            'Un tipo de cable que conecta la pantalla.',
            'Una función intermedia que se ejecuta entre la recepción de una petición HTTP y la respuesta final, ideal para logs, seguridad y validaciones.',
            'Un lenguaje de bases de datos.',
            'Un comando para apagar el servidor.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Los middlewares actúan como capas o filtros por donde viaja la solicitud antes de llegar a su destino final.',
        },
        {
          id: 'm3-l2-q2',
          question: '¿Para qué sirve invocar a la función `next()` dentro de un middleware?',
          options: [
            'Para cerrar el navegador del usuario.',
            'Para indicarle a Express que este middleware terminó su trabajo y debe ceder el control al siguiente middleware o controlador de la cadena.',
            'Para borrar la base de datos.',
            'Para reiniciar el servidor.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Si olvidas llamar a `next()` y no envías una respuesta con `res.send()`, la petición del cliente se quedará esperando indefinidamente hasta agotar el tiempo (timeout).',
        },
        {
          id: 'm3-l2-q3',
          question: '¿Qué middleware integrado de Express es obligatorio para poder leer datos JSON enviados en el cuerpo (body) de un POST?',
          options: [
            'express.static()',
            'express.json()',
            'express.router()',
            'express.session()',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! `app.use(express.json())` parsea el cuerpo de las solicitudes con encabezado application/json y lo deja disponible en `req.body`.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Express.js simplifica radicalmente la creación de servidores web y APIs en Node.js.',
          'Las rutas HTTP (`app.get`, `app.post`, `app.put`, `app.delete`) organizan los endpoints del sistema.',
          'Los middlewares son funciones intermedias `(req, res, next)` para autenticación, validación y logs.',
          '`req.params` captura variables de la URL (ej: `/productos/:id`), y `req.body` recibe los datos enviados en solicitudes POST/PUT.',
        ],
        commonPitfalls: [
          'Olvidar colocar `app.use(express.json())` al principio del archivo, lo que hace que `req.body` sea `undefined`.',
          'Olvidar llamar a `next()` dentro de un middleware personalizado, dejando colgadas las peticiones del cliente.',
          'Intentar enviar dos respuestas en la misma petición (ej: llamar dos veces a `res.json()`), lo que provocará el clásico error "Cannot set headers after they are sent to the client".',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm3-l3-apis-rest-y-codigos-http',
      moduleId: 3,
      slug: 'diseno-de-apis-restful-y-codigos-http',
      title: 'Diseño de APIs RESTful y Códigos de Estado HTTP',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Aprender las mejores prácticas internacionales para diseñar URLs limpias y profesionales (REST), el uso correcto de los verbos HTTP y el significado de los códigos de estado más comunes (200, 201, 400, 401, 403, 404, 500).',
      realWorldAnalogy: {
        title: 'Los Verbos y Códigos de Señales Universales',
        analogy: 'Imagina que viajas a un país donde no hablas el idioma, pero hay un código de señales con luces y tarjetas universales:\n\n• **Los Verbos HTTP:** Son las intenciones claras de lo que quieres hacer con un recurso (un sustantivo en plural como `/articulos`):\n  - **GET:** "Por favor, déjame ver la lista de artículos" (solo lectura, no modifica nada).\n  - **POST:** "Aquí tienes un nuevo artículo para que lo crees y lo guardes".\n  - **PUT / PATCH:** "Actualiza los datos de este artículo específico".\n  - **DELETE:** "Elimina este artículo del sistema".\n\n• **Los Códigos de Estado (Semáforo mundial):**\n  - **Familia 200 (Verde):** ¡Todo salió bien! (200 OK, 201 Creado exitosamente).\n  - **Familia 400 (Amarillo / Naranja):** Error del cliente: algo hiciste mal (400 Datos inválidos, 401 No autenticado, 404 No encontrado).\n  - **Familia 500 (Rojo de emergencia):** Error del servidor: el backend falló internamente (500 Internal Server Error).',
        whyItMatters: 'Diseñar una API siguiendo el estándar RESTful permite que cualquier cliente (una app web en React, una app móvil en iOS o Android, o un sistema de escritorio) se comunique con tu servidor sin confusiones.',
        iconName: 'Send',
      },
      explanation: {
        sections: [
          {
            heading: 'Regla de Oro: Nombres de Recursos en Plural',
            content: 'En una API REST profesional, las URLs representan **recursos (sustantivos en plural)**, nunca verbos ni acciones:\n\n❌ **Mal diseño:**\n• `/obtenerUsuarios`\n• `/crearNuevoUsuario`\n• `/borrarUsuarioPorId?id=5`\n\n✅ **Diseño RESTful profesional:**\n• `GET /api/v1/usuarios`: Lista de usuarios.\n• `POST /api/v1/usuarios`: Crear usuario.\n• `GET /api/v1/usuarios/5`: Ver usuario con ID 5.\n• `PUT /api/v1/usuarios/5`: Modificar usuario con ID 5.\n• `DELETE /api/v1/usuarios/5`: Borrar usuario con ID 5.',
          },
          {
            heading: 'Los Códigos de Estado HTTP que Debes Dominar',
            content: '• **200 OK:** Petición exitosa.\n• **201 Created:** Recurso creado exitosamente (usado en POST).\n• **204 No Content:** Acción exitosa que no necesita devolver datos (usado a menudo en DELETE).\n• **400 Bad Request:** Faltan campos obligatorios o el formato está mal.\n• **401 Unauthorized:** No has iniciado sesión o tu token no existe.\n• **403 Forbidden:** Has iniciado sesión, pero no tienes permisos de administrador.\n• **404 Not Found:** El recurso solicitado no existe.\n• **500 Internal Server Error:** Ocurrió un error inesperado en el servidor.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de respuestas y códigos de estado de una API RESTful:
function controladorArticulos(metodo, id, body) {
  // Base de datos simulada en memoria
  let articulos = [
    { id: 1, titulo: "Aprende React", visitas: 1200 },
    { id: 2, titulo: "Guía de Node.js", visitas: 950 }
  ];

  if (metodo === "GET" && !id) {
    return { status: 200, datos: articulos };
  }

  if (metodo === "GET" && id) {
    const articulo = articulos.find(a => a.id === id);
    if (!articulo) return { status: 404, error: "Artículo no encontrado" };
    return { status: 200, datos: articulo };
  }

  if (metodo === "POST") {
    if (!body || !body.titulo) {
      return { status: 400, error: "El campo 'titulo' es obligatorio" };
    }
    const nuevo = { id: 3, titulo: body.titulo, visitas: 0 };
    return { status: 201, mensaje: "Artículo creado exitosamente", datos: nuevo };
  }

  return { status: 405, error: "Método no permitido" };
}

console.log("1. GET /articulos ->", controladorArticulos("GET"));
console.log("2. GET /articulos/99 (inexistente) ->", controladorArticulos("GET", 99));
console.log("3. POST /articulos (válido) ->", controladorArticulos("POST", null, { titulo: "Arquitectura REST" }));`,
        explanation: 'Prueba llamando al controlador con datos incompletos para ver el código 400 o con un ID válido.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm3-l3-ex1',
          title: 'Asignador de códigos de estado',
          level: 'facil',
          instruction: 'Crea una función `obtenerCodigo(exito, creado)` que si `exito` es true y `creado` es true retorne 201; si `exito` es true y `creado` es false retorne 200; y si `exito` es false retorne 400. Imprime el resultado de llamar `obtenerCodigo(true, true)`.',
          starterCode: `function obtenerCodigo(exito, creado) {
  if (exito && creado) return 201;
  if (exito) return 200;
  return 400;
}

console.log("Código para recurso recién creado:", obtenerCodigo(true, true));`,
          hints: ['El código 201 Created se usa cuando una operación POST crea un recurso con éxito.'],
          solutionCode: `function obtenerCodigo(exito, creado) {
  if (exito && creado) return 201;
  if (exito) return 200;
  return 400;
}

console.log("Código para recurso recién creado:", obtenerCodigo(true, true));`,
          solutionExplanation: 'Utilizar códigos de estado semánticos (201 en lugar de un 200 genérico) es la marca de un desarrollador backend profesional.',
          testCheck: {
            type: 'output-contains',
            expected: '201',
          },
        },
        {
          id: 'm3-l3-ex2',
          title: 'Validador de formato de URLs RESTful',
          level: 'medio',
          instruction: 'Crea una función `esUrlRestful(url)` que verifique que la URL no contenga palabras de acción como "crear", "get", "borrar" o "update". Si no contiene ninguna de esas palabras retorna true, de lo contrario false. Pruébala con "/api/v1/productos".',
          starterCode: `function esUrlRestful(url) {
  const palabrasProhibidas = ["crear", "get", "borrar", "update", "obtener"];
  const tieneVerbo = palabrasProhibidas.some(p => url.toLowerCase().includes(p));
  return !tieneVerbo;
}

console.log("¿Es RESTful '/api/v1/productos'?:", esUrlRestful("/api/v1/productos"));`,
          hints: [
            'En RESTful las acciones las determina el método HTTP (GET, POST, DELETE), no la URL.',
          ],
          solutionCode: `function esUrlRestful(url) {
  const palabrasProhibidas = ["crear", "get", "borrar", "update", "obtener"];
  const tieneVerbo = palabrasProhibidas.some(p => url.toLowerCase().includes(p));
  return !tieneVerbo;
}

console.log("¿Es RESTful '/api/v1/productos'?:", esUrlRestful("/api/v1/productos"));`,
          solutionExplanation: 'Las URLs REST deben ser limpias y usar sustantivos en plural para que la intención la dicte el verbo HTTP.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm3-l3-ex3',
          title: 'El despachador CRUD completo (Reto)',
          level: 'reto',
          instruction: 'Crea una función `mapearAccionCrud(metodoHttp)` que mapee "GET" a "Lectura", "POST" a "Creación", "PUT" a "Actualización" y "DELETE" a "Eliminación". Si recibe otro método retorna "No soportado". Prueba con "DELETE".',
          starterCode: `function mapearAccionCrud(metodo) {
  const mapa = {
    GET: "Lectura",
    POST: "Creación",
    PUT: "Actualización",
    DELETE: "Eliminación"
  };
  return mapa[metodo] || "No soportado";
}

console.log("Acción correspondiente a DELETE:", mapearAccionCrud("DELETE"));`,
          hints: [
            'CRUD corresponde a Create (POST), Read (GET), Update (PUT), Delete (DELETE).',
          ],
          solutionCode: `function mapearAccionCrud(metodo) {
  const mapa = {
    GET: "Lectura",
    POST: "Creación",
    PUT: "Actualización",
    DELETE: "Eliminación"
  };
  return mapa[metodo] || "No soportado";
}

console.log("Acción correspondiente a DELETE:", mapearAccionCrud("DELETE"));`,
          solutionExplanation: 'El acrónimo CRUD (Create, Read, Update, Delete) se mapea directamente a los cuatro verbos HTTP principales.',
          testCheck: {
            type: 'output-contains',
            expected: 'Eliminación',
          },
        },
      ],
      quiz: [
        {
          id: 'm3-l3-q1',
          question: '¿Cuál de las siguientes URLs sigue las buenas prácticas de diseño RESTful para obtener la lista de productos?',
          options: [
            '/api/obtenerTodosLosProductos',
            '/api/v1/productos (usando método GET)',
            '/api/ver_productos_ahora',
            '/api/productos/listadoCompleto.php',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Las URLs en REST deben basarse en sustantivos en plural (`/productos`), dejando que el método HTTP (`GET`) indique la acción.',
        },
        {
          id: 'm3-l3-q2',
          question: '¿Qué código de estado HTTP debe devolver el servidor cuando un cliente intenta acceder a una ruta privada sin enviar un token de autenticación?',
          options: [
            '200 OK',
            '401 Unauthorized (No autorizado)',
            '500 Error Interno',
            '301 Redirección permanente',
          ],
          correctIndex: 1,
          explanation: '¡Muy bien! El 401 Unauthorized indica que la petición carece de credenciales de autenticación válidas.',
        },
        {
          id: 'm3-l3-q3',
          question: '¿Qué código de estado HTTP es el más apropiado tras crear exitosamente un nuevo registro mediante una solicitud POST?',
          options: [
            '201 Created',
            '404 Not Found',
            '204 No Content',
            '503 Servicio no disponible',
          ],
          correctIndex: 0,
          explanation: '¡Excelente! El código 201 Created informa al cliente que la solicitud fue atendida y condujo a la creación de un nuevo recurso.',
        },
      ],
      summary: {
        keyTakeaways: [
          'REST organiza la web alrededor de recursos nombrados en plural (`/usuarios`, `/pedidos`).',
          'Los métodos HTTP expresan la intención: GET (leer), POST (crear), PUT (actualizar), DELETE (borrar).',
          'Los códigos de estado HTTP se dividen en familias: 2xx (éxito), 4xx (error del cliente) y 5xx (error del servidor).',
          'Responder con códigos correctos (201, 400, 401, 404) hace que los clientes frontend gestionen estados y errores con precisión.',
        ],
        commonPitfalls: [
          'Incluir verbos en las URLs como `/api/borrarUsuario` en lugar de enviar un `DELETE /api/usuarios/1`.',
          'Responder siempre con código 200 OK aunque haya ocurrido un error (ej: `{ status: 200, error: "Falló la base de datos" }`), lo que confunde a las herramientas de monitoreo.',
          'Olvidar versionar las APIs (usar `/api/v1/...`) para poder publicar mejoras a futuro sin romper aplicaciones existentes.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm3-l4-autenticacion-jwt',
      moduleId: 3,
      slug: 'autenticacion-profesional-jwt',
      title: 'Autenticación Profesional con JWT: La Pulsera VIP Inviolable',
      order: 4,
      estimatedTime: '30 min',
      difficulty: 'Intermedio',
      objective: 'Comprender qué es la autenticación basada en tokens (JWT - JSON Web Token), por qué no guardamos sesiones en la memoria del servidor (Stateless), su anatomía (Header, Payload, Signature) y cómo proteger rutas privadas.',
      realWorldAnalogy: {
        title: 'La Pulsera Sellada del Festival de Música',
        analogy: 'Imagina que vas a un festival de música masivo de 3 días con 80,000 asistentes:\n\n• **El Sistema Antiguo (Sesiones en Memoria):** Cada vez que quieres entrar a un escenario o pedir una bebida, el guardia tendría que buscar tu nombre y foto en una carpeta física gigante de 80,000 páginas en la puerta central. Si la puerta central se llena o se quema la carpeta, nadie entra.\n• **El Sistema Moderno (JWT - JSON Web Token):** El primer día muestras tu documento en la taquilla. Te colocan en la muñeca una **pulsera sellada e infalsificable**. La pulsera tiene escrita tu categoría ("Acceso VIP"), tu ID de usuario y una fecha de expiración ("Válida hasta el domingo"). Además, tiene un holograma y sello térmico secreto que solo los organizadores del festival pueden firmar.\n\nCada vez que vas a un escenario, el guardia solo mira el holograma de tu pulsera (la firma criptográfica). No necesita llamar a la oficina central ni consultar ninguna base de datos: ¡la pulsera demuestra por sí misma quién eres de forma autónoma y segura!',
        whyItMatters: 'JWT es el estándar de autenticación utilizado por Google, Twitter, Spotify y millones de APIs para autenticar millones de peticiones por segundo sin saturar las bases de datos.',
        iconName: 'KeyRound',
      },
      explanation: {
        sections: [
          {
            heading: 'La Anatomía de un JWT (Tres Partes Separadas por Puntos)',
            content: 'Un token JWT parece una cadena larga de letras y números como:\n`eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`\n\nEstá compuesto exactamente por tres partes separadas por puntos (`.`):\n\n1. **Header (Cabecera):** Qué algoritmo de cifrado se usó (ej: `HS256`).\n2. **Payload (Cuerpo / Carga útil):** Los datos públicos del usuario (ej: `userId: 42, rol: "admin"`). ¡Nunca pongas contraseñas aquí porque cualquiera puede decodificarlo!\n3. **Signature (Firma criptográfica):** El sello secreto generado combinando el Header + Payload + una clave secreta que solo el servidor conoce (`JWT_SECRET`). Si un hacker intenta cambiar su rol a "admin" en el payload, la firma deja de coincidir y el servidor rechaza el token al instante.',
            codeSnippet: {
              language: 'javascript',
              description: 'Generación y verificación de un JWT en Node.js:',
              code: `const jwt = require('jsonwebtoken');

const CLAVE_SECRETA = "mi_clave_ultra_secreta_2026";

// 1. Al hacer login exitoso, firmamos un token con 2 horas de vida:
const token = jwt.sign(
  { usuarioId: 1042, rol: "desarrollador" },
  CLAVE_SECRETA,
  { expiresIn: '2h' }
);

console.log("Token generado para el cliente:", token);

// 2. En peticiones futuras, el servidor verifica la firma:
try {
  const datosDecodificados = jwt.verify(token, CLAVE_SECRETA);
  console.log("Usuario autenticado con éxito:", datosDecodificados.usuarioId);
} catch (error) {
  console.error("Token inválido o expirado:", error.message);
}`,
            },
          },
          {
            heading: '¿Cómo viaja el JWT en las Peticiones?',
            content: 'El cliente (tu app en React) guarda el token y lo envía en cada solicitud dentro del encabezado HTTP:\n`Authorization: Bearer <TOKEN_AQUI>`\n\nUn middleware en Express lee este encabezado, verifica la firma con `jwt.verify`, y si es válido, adjunta el usuario a la petición (`req.usuario = datos`) antes de llamar a `next()`.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de creación y verificación de Tokens JWT:
function simularFirmarToken(payload, claveSecreta) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const cuerpo = btoa(JSON.stringify(payload));
  // Firma simulada combinando payload y la clave secreta
  const firma = btoa(cuerpo + "::" + claveSecreta);
  return header + "." + cuerpo + "." + firma;
}

function simularVerificarToken(token, claveSecreta) {
  const [header, cuerpo, firma] = token.split(".");
  const firmaEsperada = btoa(cuerpo + "::" + claveSecreta);

  if (firma !== firmaEsperada) {
    return { valido: false, error: "🚨 ¡Firma inválida! El token fue adulterado o la clave es incorrecta." };
  }

  const datos = JSON.parse(atob(cuerpo));
  return { valido: true, usuario: datos };
}

const miToken = simularFirmarToken({ id: 99, email: "dev@rutafullstack.com", rol: "admin" }, "secreto123");
console.log("Token generado:\\n" + miToken + "\\n");

console.log("1. Verificación legítima con clave correcta:");
console.log(simularVerificarToken(miToken, "secreto123"));

console.log("\\n2. Verificación fallida con clave incorrecta:");
console.log(simularVerificarToken(miToken, "clave_equivocada"));`,
        explanation: 'Ejecuta para ver cómo la firma criptográfica garantiza que el contenido del token no pueda ser alterado.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm3-l4-ex1',
          title: 'Extrayendo el Bearer Token',
          level: 'facil',
          instruction: 'Crea una función `extraerBearerToken(encabezadoAuth)` que reciba un string como `"Bearer eyJhbGci..."`. Si empieza con "Bearer ", retorna únicamente el token sin la palabra "Bearer ". Si no, retorna null. Pruébala.',
          starterCode: `function extraerBearerToken(encabezado) {
  if (encabezado && encabezado.startsWith("Bearer ")) {
    return encabezado.split(" ")[1];
  }
  return null;
}

console.log("Token extraído:", extraerBearerToken("Bearer token_seguro_xyz"));`,
          hints: ['Usa encabezado.split(" ")[1] o encabezado.substring(7)'],
          solutionCode: `function extraerBearerToken(encabezado) {
  if (encabezado && encabezado.startsWith("Bearer ")) {
    return encabezado.split(" ")[1];
  }
  return null;
}

console.log("Token extraído:", extraerBearerToken("Bearer token_seguro_xyz"));`,
          solutionExplanation: 'La convención HTTP Authorization: Bearer <token> es el estándar de autenticación OAuth 2.0 y JWT.',
          testCheck: {
            type: 'output-contains',
            expected: 'token_seguro_xyz',
          },
        },
        {
          id: 'm3-l4-ex2',
          title: 'El verificador de expiración',
          level: 'medio',
          instruction: 'Dado un payload de token `{ exp: 1735689600 }` (en segundos UNIX), crea una función `haExpirado(expiracionSegundos, tiempoActualSegundos)` que retorne true si el tiempo actual superó a la expiración. Prueba con expiracion=100 y actual=150.',
          starterCode: `function haExpirado(expiracion, actual) {
  return actual > expiracion;
}

console.log("¿Token caducado?:", haExpirado(100, 150));`,
          hints: ['Si el tiempo actual es mayor que exp, el token ya caducó y debe rechazarse.'],
          solutionCode: `function haExpirado(expiracion, actual) {
  return actual > expiracion;
}

console.log("¿Token caducado?:", haExpirado(100, 150));`,
          solutionExplanation: 'Todos los JWTs profesionales incluyen una marca de tiempo `exp` para que los tokens robados caduquen automáticamente.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm3-l4-ex3',
          title: 'Middleware de control de roles (Reto)',
          level: 'reto',
          instruction: 'Crea una función `verificarRolRequerido(usuario, rolPermitido)` que retorne true si el usuario tiene ese rol (ej: "admin"). Si el usuario tiene otro rol (ej: "cliente"), debe lanzar un error con `throw new Error("Permisos insuficientes (403 Forbidden)")`. Pruébalo dentro de un try/catch con rol incorrecto.',
          starterCode: `function verificarRolRequerido(usuario, rolPermitido) {
  if (usuario.rol !== rolPermitido) {
    throw new Error("Permisos insuficientes (403 Forbidden)");
  }
  return true;
}

try {
  verificarRolRequerido({ id: 1, rol: "lector" }, "admin");
} catch (e) {
  console.log("Acceso rechazado:", e.message);
}`,
          hints: [
            'El código 403 Forbidden indica que el usuario está autenticado pero no tiene privilegios suficientes.',
          ],
          solutionCode: `function verificarRolRequerido(usuario, rolPermitido) {
  if (usuario.rol !== rolPermitido) {
    throw new Error("Permisos insuficientes (403 Forbidden)");
  }
  return true;
}

try {
  verificarRolRequerido({ id: 1, rol: "lector" }, "admin");
} catch (e) {
  console.log("Acceso rechazado:", e.message);
}`,
          solutionExplanation: 'Este patrón (Role-Based Access Control - RBAC) protege endpoints sensibles de administración.',
          testCheck: {
            type: 'output-contains',
            expected: '403 Forbidden',
          },
        },
      ],
      quiz: [
        {
          id: 'm3-l4-q1',
          question: '¿Por qué la arquitectura basada en JWT se denomina "Stateless" (sin estado)?',
          options: [
            'Porque el servidor no necesita guardar los tokens en su memoria RAM ni consultar la base de datos en cada petición; el token contiene su propia información verificable mediante la firma criptográfica.',
            'Porque los servidores solo funcionan sin conexión a Internet.',
            'Porque los usuarios nunca cierran sesión.',
            'Porque no tiene ningún costo financiero.',
          ],
          correctIndex: 0,
          explanation: '¡Exacto! El servidor no almacena sesiones en memoria, lo que permite escalar horizontalmente a decenas de servidores sin sincronizar sesiones.',
        },
        {
          id: 'm3-l4-q2',
          question: '¿Qué información NUNCA debe guardarse dentro del Payload de un JWT?',
          options: [
            'El ID numérico del usuario.',
            'La contraseña del usuario, números de tarjeta de crédito o secretos confidenciales (porque el payload solo está codificado en Base64 y cualquiera puede leerlo).',
            'El rol del usuario (ej: "admin" o "estudiante").',
            'La fecha de expiración del token.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Base64 no es cifrado: es solo una codificación que cualquiera puede decodificar. El JWT garantiza que los datos no fueron adulterados (integridad), pero no los oculta.',
        },
        {
          id: 'm3-l4-q3',
          question: '¿Qué ocurre si un usuario malicioso intenta editar el payload de su token para cambiar su rol a "admin"?',
          options: [
            'Se convierte automáticamente en el dueño de la empresa.',
            'Al cambiar un solo carácter del payload, la firma criptográfica (Signature) ya no coincidirá con la clave secreta del servidor y la petición será rechazada de inmediato.',
            'El servidor se apaga.',
            'El token se duplica.',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! La firma criptográfica protege la integridad absoluta del token.',
        },
      ],
      summary: {
        keyTakeaways: [
          'JWT permite autenticar usuarios sin mantener sesiones activas en la memoria del servidor (Stateless).',
          'Consta de 3 partes separadas por puntos: Header (algoritmo), Payload (datos del usuario) y Signature (firma con clave secreta).',
          'El token viaja en las peticiones HTTP dentro del encabezado `Authorization: Bearer <token>`.',
          'Nunca guardes contraseñas ni datos sensibles en el payload.',
        ],
        commonPitfalls: [
          'Creer que el payload de un JWT es un secreto indescifrable (es texto Base64 visible para cualquiera).',
          'Usar una clave secreta débil como "123456" o "secreto" en `JWT_SECRET` (debe ser una cadena aleatoria criptográfica robusta).',
          'Crear tokens sin fecha de expiración (`expiresIn`), lo que permitiría que un token robado funcione para siempre.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm3-l5-validacion-hashing-seguridad',
      moduleId: 3,
      slug: 'validacion-hashing-seguridad-boveda',
      title: 'Validación de Datos y Hashing de Contraseñas: La Bóveda Acorazada',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Aprender por qué jamás se guardan contraseñas en texto plano, cómo funciona el hashing irreversible con sal (Salt + Bcrypt), y cómo validar y sanitizar datos entrantes para proteger tu servidor de inyecciones y ataques.',
      realWorldAnalogy: {
        title: 'La Picadora de Carne Irreversible y el Portero de la Discoteca',
        analogy: '• **El Hashing con Bcrypt:** Imagina una manzana fresca (tu contraseña: `"MichiFiel2026"`). Si la metes a una licuadora industrial con hielo y sal, obtienes un puré irreconocible de color verde. Cualquiera puede ver el puré (`$2b$10$wK...`), pero **es físicamente imposible reconstruir la manzana original a partir del puré**. Eso es una **Función Hash Criptográfica**.\nCuando el usuario vuelve a iniciar sesión, el servidor toma la contraseña que escribió, la pasa por la misma licuadora y compara si el puré resultante es idéntico al puré guardado en la base de datos. Si un hacker entra a tu base de datos, ¡solo encontrará puré inútil!\n\n• **La Validación de Datos (El Portero):** Si un usuario envía un formulario de registro con un email como `"DROP TABLE usuarios;"` o una edad como `"-500"`, el portero (librerías como Zod o validadores) lo frena antes de que toque la base de datos.',
        whyItMatters: 'Filtraciones masivas de contraseñas ocurren todos los meses en empresas descuidadas. Aplicar hashing con sal y validación estricta es un deber legal y ético de todo desarrollador de software profesional.',
        iconName: 'ShieldAlert',
      },
      explanation: {
        sections: [
          {
            heading: 'Diferencia Crítica: Cifrado vs. Hashing',
            content: '• **Cifrado (Doble vía):** Tomas un texto, lo bloqueas con una llave, y con la misma llave (o una pública/privada) puedes volver a descifrar el texto original (usado para mensajes privados y tarjetas bancarias).\n• **Hashing (Una sola vía irreversible):** Es una función matemática unidireccional. Puedes convertir texto en hash, pero es matemáticamente imposible volver del hash al texto original.\n\nAdemás, `bcrypt` añade **Salt (Sal)**: un puñado de caracteres aleatorios únicos por usuario para evitar que se usen "Tablas Arcoíris" (diccionarios de contraseñas precalculadas).',
            codeSnippet: {
              language: 'javascript',
              description: 'Cómo hashear y comparar contraseñas con bcrypt en Node.js:',
              code: `const bcrypt = require('bcrypt');

async function registrarUsuario(passwordPlano) {
  const RONDAS_DE_SAL = 10;
  // Hashear contraseña:
  const hashSeguro = await bcrypt.hash(passwordPlano, RONDAS_DE_SAL);
  console.log("Contraseña hasheada para guardar en DB:", hashSeguro);
  return hashSeguro;
}

async function verificarLogin(passwordIngresado, hashGuardadoEnDB) {
  // Comparar de forma segura en tiempo constante:
  const coincide = await bcrypt.compare(passwordIngresado, hashGuardadoEnDB);
  return coincide; // true si es correcta, false si es incorrecta
}`,
            },
          },
          {
            heading: 'Validación Temprana: Nunca confíes en el Frontend',
            content: 'Cualquier atacante puede saltarse las validaciones de tu formulario web abriendo la terminal o herramientas como Postman. Por eso, **el Backend debe validar todo**:\n• ¿El email tiene formato válido?\n• ¿La contraseña tiene al menos 8 caracteres?\n• ¿La edad es un número positivo?',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de Hashing unidireccional y Validación en JavaScript:
function simularHashConSal(password, salt) {
  // Simulador pedagógico de hash unidireccional
  let hashNum = 0;
  const cadena = password + "::" + salt;
  for (let i = 0; i < cadena.length; i++) {
    hashNum = (hashNum << 5) - hashNum + cadena.charCodeAt(i);
    hashNum |= 0;
  }
  return "$hash$" + salt + "$" + Math.abs(hashNum).toString(16);
}

// 1. Registro de usuario:
const passwordReal = "SuperPasswordSeguro2026!";
const saltAleatorio = "x7k9";
const hashEnBaseDeDatos = simularHashConSal(passwordReal, saltAleatorio);

console.log("Contraseña original del usuario:", passwordReal);
console.log("Lo que se guarda en la Base de Datos:", hashEnBaseDeDatos);

// 2. Intento de login:
function intentarLogin(passwordEscrito) {
  const hashGenerado = simularHashConSal(passwordEscrito, saltAleatorio);
  const coincide = hashGenerado === hashEnBaseDeDatos;
  return coincide ? "✅ Login exitoso" : "❌ Contraseña incorrecta";
}

console.log("\\nPrueba con contraseña correcta:", intentarLogin("SuperPasswordSeguro2026!"));
console.log("Prueba con contraseña errónea:", intentarLogin("123456"));`,
        explanation: 'Comprueba cómo el backend verifica si la contraseña es correcta sin conocer nunca el texto plano.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm3-l5-ex1',
          title: 'Validador de longitud de contraseña',
          level: 'facil',
          instruction: 'Crea una función `validarSeguridadPassword(password)` que retorne true si tiene al menos 8 caracteres de longitud, o false si tiene menos. Pruébala con "mypass123".',
          starterCode: `function validarSeguridadPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

console.log("¿Cumple longitud mínima de 8?:", validarSeguridadPassword("mypass123"));`,
          hints: ['password.length >= 8'],
          solutionCode: `function validarSeguridadPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

console.log("¿Cumple longitud mínima de 8?:", validarSeguridadPassword("mypass123"));`,
          solutionExplanation: 'Exigir al menos 8 a 12 caracteres es el primer filtro básico para prevenir ataques de fuerza bruta.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm3-l5-ex2',
          title: 'Sanitizador de entradas de texto',
          level: 'medio',
          instruction: 'Crea una función `sanitizarEntrada(texto)` que elimine espacios accidentales al inicio y final con `.trim()` y reemplace caracteres peligrosos `<` y `>` por sus entidades seguras `&lt;` y `&gt;`. Prueba con ` "  <script>alert(1)</script>  "`.',
          starterCode: `function sanitizarEntrada(texto) {
  return texto
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

console.log("Texto sanitizado:", sanitizarEntrada("  <script>alert(1)</script>  "));`,
          hints: [
            'Usa replace(/</g, "&lt;") para neutralizar etiquetas HTML y prevenir ataques XSS (Cross-Site Scripting).',
          ],
          solutionCode: `function sanitizarEntrada(texto) {
  return texto
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

console.log("Texto sanitizado:", sanitizarEntrada("  <script>alert(1)</script>  "));`,
          solutionExplanation: 'La sanitización limpia los datos antes de guardarlos para evitar ataques de inyección de código.',
          testCheck: {
            type: 'output-contains',
            expected: '&lt;script&gt;',
          },
        },
        {
          id: 'm3-l5-ex3',
          title: 'Validador de esquema de registro (Reto)',
          level: 'reto',
          instruction: 'Crea una función `validarRegistro(body)` que verifique que existan `email` (con formato que incluya "@") y `password` (mínimo 6 caracteres). Si es válido retorna `{ valido: true }`, si no retorna `{ valido: false, error: "Datos de registro inválidos" }`. Imprime el resultado con datos válidos.',
          starterCode: `function validarRegistro(body) {
  if (!body || !body.email || !body.email.includes("@")) {
    return { valido: false, error: "Email inválido" };
  }
  if (!body.password || body.password.length < 6) {
    return { valido: false, error: "Contraseña demasiado corta" };
  }
  return { valido: true };
}

console.log("Resultado de validación:", validarRegistro({ email: "dev@fullstack.com", password: "secreto2026" }));`,
          hints: [
            'Valida la existencia de ambos campos antes de evaluar sus propiedades.',
          ],
          solutionCode: `function validarRegistro(body) {
  if (!body || !body.email || !body.email.includes("@")) {
    return { valido: false, error: "Email inválido" };
  }
  if (!body.password || body.password.length < 6) {
    return { valido: false, error: "Contraseña demasiado corta" };
  }
  return { valido: true };
}

console.log("Resultado de validación:", validarRegistro({ email: "dev@fullstack.com", password: "secreto2026" }));`,
          solutionExplanation: 'En producción se usan librerías como Zod o Joi para automatizar esquemas de validación estrictos en el backend.',
          testCheck: {
            type: 'output-contains',
            expected: 'valido: true',
          },
        },
      ],
      quiz: [
        {
          id: 'm3-l5-q1',
          question: '¿Por qué NUNCA se deben guardar contraseñas en texto plano en una base de datos?',
          options: [
            'Porque ocupan mucho espacio en el disco duro.',
            'Porque si ocurre una brecha de seguridad y la base de datos es filtrada, los atacantes tendrían acceso inmediato a las cuentas de todos los usuarios.',
            'Porque las contraseñas en texto plano no se pueden imprimir.',
            'Porque las computadoras no entienden letras minúsculas.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! El hashing con bcrypt asegura que incluso si la base de datos cae en manos ajenas, las contraseñas originales permanezcan protegidas e inaccesibles.',
        },
        {
          id: 'm3-l5-q2',
          question: '¿Qué es la "Sal" (Salt) en el algoritmo de hashing Bcrypt?',
          options: [
            'Un condimento de cocina que se le echa al procesador.',
            'Una cadena de caracteres aleatorios únicos añadida a cada contraseña antes de hashearla para evitar ataques con tablas precalculadas (Rainbow Tables).',
            'Un tipo de antivirus de Microsoft.',
            'Una contraseña de respaldo que conoce el dueño del servidor.',
          ],
          correctIndex: 1,
          explanation: '¡Muy bien! El Salt garantiza que dos usuarios con la misma contraseña ("123456") tengan hashes completamente distintos en la base de datos.',
        },
        {
          id: 'm3-l5-q3',
          question: '¿Por qué no es suficiente validar los formularios únicamente en el Frontend (con HTML o React)?',
          options: [
            'Porque React no sabe validar texto.',
            'Porque cualquier usuario malicioso puede desactivar JavaScript en su navegador o enviar peticiones directas con herramientas como Postman o cURL, saltándose por completo las validaciones del cliente.',
            'Porque el frontend se apaga cuando el usuario parpadea.',
            'Solo es una norma decorativa sin impacto.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Regla sagrada de seguridad: "Nunca confíes en el cliente". El backend es la última línea de defensa y siempre debe validar todos los datos que recibe.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Las contraseñas siempre se protegen con funciones hash unidireccionales con sal (Bcrypt).',
          'El hashing es irreversible: convierte la contraseña en un resumen criptográfico que no se puede desarmar.',
          'Nunca confíes en los datos enviados por el frontend: valida y sanitiza todo en el backend.',
          'Herramientas como Zod, Joi y Helmet ayudan a blindar servidores Node/Express.',
        ],
        commonPitfalls: [
          'Usar algoritmos obsoletos e inseguros como MD5 o SHA-1 para contraseñas (son vulnerables a colisiones instantáneas).',
          'Guardar contraseñas en texto plano "temporalmente mientras probamos en desarrollo".',
          'Pensar que cifrar es lo mismo que hashear: las contraseñas se hashean, no se cifran.',
        ],
      },
      xpReward: 50,
    },
  ],
};
