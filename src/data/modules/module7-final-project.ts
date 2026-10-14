import type { Module } from '../../types/curriculum';

export const MODULE_7_FINAL_PROJECT: Module = {
  id: 7,
  slug: 'proyecto-final',
  title: '7. Proyecto Final Full Stack',
  description: 'Construye paso a paso una aplicación web completa de punta a punta: arquitectura, backend Express con autenticación JWT, frontend React con Tailwind, base de datos PostgreSQL y publicación real en la nube.',
  icon: 'Rocket',
  color: 'emerald',
  badge: {
    id: 'modulo-7-maestro',
    name: 'Creador de Productos',
    description: 'Publicaste una aplicación Full Stack real en Internet accesible para el mundo.',
    icon: 'Award',
    category: 'modulo',
  },
  lessons: [
    // LECCIÓN 1: PLANIFICACIÓN, HISTORIAS DE USUARIO Y MODELO DE DATOS
    {
      id: 'm7-l1-planificacion-arquitectura-y-modelo-de-datos',
      moduleId: 7,
      slug: 'planificacion-arquitectura-y-modelo-de-datos',
      title: 'Planificación del Proyecto: Historias de Usuario, Wireframes y Modelo de Datos',
      order: 1,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Diseñar la arquitectura completa de una aplicación Full Stack antes de escribir código: estructurar historias de usuario funcionales, modelar el esquema relacional en Prisma y definir el contrato de endpoints de la API REST.',
      realWorldAnalogy: {
        title: 'Los Planos del Arquitecto antes de Pegar el Primer Ladrillo',
        analogy: 'Imagina que vas a construir una casa:\n\n• Si sales corriendo a comprar cemento y pegas ladrillos sin planos, cuando quieras instalar el baño descubrirás que no hay espacio para las tuberías de agua y tendrás que demoler las paredes a martillazos.\n• En el desarrollo Full Stack, **el 70% del éxito de un proyecto ocurre en la planificación**:\n  - ¿Quiénes son los usuarios? (Historias de usuario).\n  - ¿Qué datos necesitamos guardar? (Modelo de base de datos).\n  - ¿Cómo se comunicará la pantalla con el servidor? (Contrato de API REST).\n\nTener este mapa claro desde el día 1 te permite avanzar a toda velocidad sin sorpresas ni reescrituras caóticas.',
        whyItMatters: 'En startups y empresas de tecnología, saber traducir una idea de negocio en un modelo de datos sólido y un contrato de API es la habilidad más valorada en un desarrollador Full Stack.',
        iconName: 'FileText',
      },
      explanation: {
        sections: [
          {
            heading: 'Historias de Usuario y el Producto Mínimo Viable (MVP)',
            content: 'El MVP es la versión más simple de tu producto que resuelve el problema principal sin funciones accesorias innecesarias.\n\nEscribimos los requisitos usando el formato universal de **Historias de Usuario**:\n\n> **"Como [rol de usuario], quiero [acción concreta] para [beneficio o valor obtenido]."**\n\n*Ejemplo para DevTask Pro:*\n• *"Como desarrollador registrado, quiero crear proyectos con fecha límite para organizar mis entregables semanales."*\n• *"Como miembro del equipo, quiero cambiar el estado de una tarea a \'Completada\' para que mis compañeros vean el avance en tiempo real."*',
          },
          {
            heading: 'Diseño del Modelo de Datos Relacional en Prisma',
            content: 'Para nuestra aplicación de gestión de proyectos, necesitamos 3 modelos vinculados:\n\n```prisma\nmodel User {\n  id        Int       @id @default(autoincrement())\n  email     String    @unique\n  name      String\n  password  String\n  projects  Project[] // 1 Usuario tiene Muchos Proyectos\n  createdAt DateTime  @default(now())\n}\n\nmodel Project {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String?\n  ownerId     Int\n  owner       User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)\n  tasks       Task[]   // 1 Proyecto tiene Muchas Tareas\n  createdAt   DateTime @default(now())\n}\n\nmodel Task {\n  id          Int        @id @default(autoincrement())\n  title       String\n  status      TaskStatus @default(PENDING)\n  projectId   Int\n  project     Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)\n}\n\nenum TaskStatus {\n  PENDING\n  IN_PROGRESS\n  COMPLETED\n}\n```',
          },
          {
            heading: 'El Contrato de la API REST',
            content: 'Antes de tocar el código, definimos los endpoints de forma limpia y estándar:\n\n• `POST /api/auth/register` (201 Created)\n• `POST /api/auth/login` (200 OK -> retorna `{ token, user }`)\n• `GET /api/projects` (200 OK -> lista de proyectos del usuario autenticado)\n• `POST /api/projects` (201 Created -> crea nuevo proyecto)\n• `POST /api/projects/:id/tasks` (201 Created -> crea tarea vinculada)\n• `PATCH /api/tasks/:id` (200 OK -> actualiza estado PENDING/COMPLETED)\n• `DELETE /api/tasks/:id` (204 No Content -> elimina tarea)',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador del validador de Historias de Usuario y Contrato de API:
class PlanificadorProyecto {
  constructor(nombreProyecto) {
    this.nombreProyecto = nombreProyecto;
    this.historiasUsuario = [];
    this.endpointsAPI = [];
  }

  agregarHistoria(rol, accion, beneficio) {
    const texto = \`Como \${rol}, quiero \${accion} para \${beneficio}.\`;
    this.historiasUsuario.push({ rol, accion, beneficio, formatoCompleto: texto });
    console.log(\`📝 Historia registrada: "\${texto}"\`);
    return this;
  }

  definirEndpoint(metodo, ruta, codigoExito, descripcion) {
    this.endpointsAPI.push({ metodo, ruta, codigoExito, descripcion });
    return this;
  }

  generarDocumentoArquitectura() {
    console.log(\`\\n🏛️ --- PLAN MAESTRO: \${this.nombreProyecto} ---\`);
    console.log(\`Total de historias de usuario: \${this.historiasUsuario.length}\`);
    console.log(\`Total de endpoints en el contrato: \${this.endpointsAPI.length}\`);
    console.log("\\nEndpoints de la API:");
    this.endpointsAPI.forEach(e => {
      console.log(\` • [\${e.metodo}] \${e.ruta} -> HTTP \${e.codigoExito} (\${e.descripcion})\`);
    });
    return { historias: this.historiasUsuario, api: this.endpointsAPI };
  }
}

const plan = new PlanificadorProyecto("DevTask Pro FullStack")
  .agregarHistoria("usuario", "crear una cuenta con email y contraseña", "acceder a mi panel personal")
  .agregarHistoria("usuario", "crear proyectos y asociar tareas", "gestionar el avance de mis metas")
  .definirEndpoint("POST", "/api/auth/register", 201, "Registro de usuario")
  .definirEndpoint("POST", "/api/auth/login", 200, "Inicio de sesión y entrega de JWT")
  .definirEndpoint("GET", "/api/projects", 200, "Listado de proyectos")
  .definirEndpoint("POST", "/api/projects", 201, "Crear nuevo proyecto");

plan.generarDocumentoArquitectura();`,
        explanation: 'Ejecuta el código para observar cómo estructurar los cimientos de tu aplicación de forma ordenada y profesional.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm7-l1-ex1',
          title: 'Validador de formato de Historia de Usuario',
          level: 'facil',
          instruction: 'Crea una función `validarHistoriaUsuario(texto)` que verifique que la cadena comience con "Como " (o "como "), contenga la frase ", quiero " y contenga " para ". Si cumple los tres elementos retorna `{ valida: true }`, de lo contrario retorna `{ valida: false, error: "Formato de historia de usuario incorrecto" }`. Prueba con una historia bien formateada.',
          starterCode: `function validarHistoriaUsuario(texto) {
  // Comprueba "Como", ", quiero" y " para"
}

const historiaPrueba = "Como estudiante, quiero ver mi progreso para motivarme cada dia";
console.log(validarHistoriaUsuario(historiaPrueba));`,
          hints: [
            'const t = texto.toLowerCase();',
            'const tieneComo = t.startsWith("como ");',
            'const tieneQuiero = t.includes("quiero ");',
            'const tienePara = t.includes(" para ");',
            'if (tieneComo && tieneQuiero && tienePara) return { valida: true };'
          ],
          solutionCode: `function validarHistoriaUsuario(texto) {
  const t = texto.toLowerCase();
  const tieneComo = t.startsWith('como ');
  const tieneQuiero = t.includes('quiero ');
  const tienePara = t.includes(' para ');

  if (tieneComo && tieneQuiero && tienePara) {
    return { valida: true };
  }
  return { valida: false, error: "Formato de historia de usuario incorrecto" };
}

const historiaPrueba = "Como estudiante, quiero ver mi progreso para motivarme cada dia";
console.log(validarHistoriaUsuario(historiaPrueba));`,
          solutionExplanation: 'El formato estándar de historias de usuario garantiza que cada función a programar tenga una justificación de valor para el usuario final.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm7-l1-ex2',
          title: 'Validador de esquema de modelo en memoria (Tipo Prisma)',
          level: 'medio',
          instruction: 'Crea una función `validarRegistroTarea(tarea, listaProyectosValidos)` que reciba un objeto tarea `{ title, status, projectId }`. La función debe verificar que: 1) `title` sea string con al menos 3 caracteres, 2) `status` sea uno de ["PENDING", "IN_PROGRESS", "COMPLETED"], y 3) `projectId` exista en `listaProyectosValidos`. Si todo es válido retorna `{ valido: true }`, de lo contrario `{ valido: false, error: "..." }`. Pruébala con una tarea válida.',
          starterCode: `const proyectosEnBd = [1, 2, 5];

function validarRegistroTarea(tarea, listaProyectosValidos) {
  // Valida title, status y relación projectId
}

const nuevaTarea = { title: "Terminar Módulo 7", status: "IN_PROGRESS", projectId: 2 };
console.log(validarRegistroTarea(nuevaTarea, proyectosEnBd));`,
          hints: [
            'Comprueba tarea.title && tarea.title.length >= 3',
            'Comprueba ["PENDING", "IN_PROGRESS", "COMPLETED"].includes(tarea.status)',
            'Comprueba listaProyectosValidos.includes(tarea.projectId)'
          ],
          solutionCode: `function validarRegistroTarea(tarea, listaProyectosValidos) {
  if (!tarea || typeof tarea.title !== 'string' || tarea.title.trim().length < 3) {
    return { valido: false, error: "El título debe tener al menos 3 caracteres" };
  }
  const estadosValidos = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
  if (!estadosValidos.includes(tarea.status)) {
    return { valido: false, error: "Estado de tarea inválido" };
  }
  if (!listaProyectosValidos.includes(tarea.projectId)) {
    return { valido: false, error: "El proyecto vinculado no existe" };
  }
  return { valido: true };
}

const nuevaTarea = { title: "Terminar Módulo 7", status: "IN_PROGRESS", projectId: 2 };
console.log(validarRegistroTarea(nuevaTarea, proyectosEnBd));`,
          solutionExplanation: 'Las restricciones de integridad referencial y enums en Prisma previenen que se inserten datos corruptos o huérfanos.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm7-l1-ex3',
          title: 'Auditor de contrato de API REST (Reto)',
          level: 'reto',
          instruction: 'Crea una función `auditarContratoApi(rutas)` que reciba un array de endpoints `{ metodo, ruta, codigoExito }`. La función debe verificar que los métodos POST tengan código de éxito 201, los métodos DELETE tengan 204 o 200, y los métodos GET/PATCH tengan 200. Si alguno no cumple el estándar REST, lo añade a una lista de observaciones. Si todo está correcto, retorna `{ estado: "APROBADO", totalRutas: rutas.length }`. Pruébala con una lista correcta de 3 rutas.',
          starterCode: `const contratoRest = [
  { metodo: "GET", ruta: "/api/tasks", codigoExito: 200 },
  { metodo: "POST", ruta: "/api/tasks", codigoExito: 201 },
  { metodo: "DELETE", ruta: "/api/tasks/:id", codigoExito: 204 }
];

function auditarContratoApi(rutas) {
  // Audita códigos de éxito según convención REST
}

console.log(auditarContratoApi(contratoRest));`,
          hints: [
            'Recorre rutas y comprueba si r.metodo === "POST" && r.codigoExito !== 201 etc.',
            'Si no hay observaciones return { estado: "APROBADO", totalRutas: rutas.length };'
          ],
          solutionCode: `function auditarContratoApi(rutas) {
  const observaciones = [];
  for (const r of rutas) {
    if (r.metodo === 'POST' && r.codigoExito !== 201) {
      observaciones.push(\`\${r.metodo} \${r.ruta} debería retornar 201 Created\`);
    }
    if (r.metodo === 'GET' && r.codigoExito !== 200) {
      observaciones.push(\`\${r.metodo} \${r.ruta} debería retornar 200 OK\`);
    }
    if (r.metodo === 'DELETE' && r.codigoExito !== 204 && r.codigoExito !== 200) {
      observaciones.push(\`\${r.metodo} \${r.ruta} debería retornar 204 No Content o 200 OK\`);
    }
  }

  if (observaciones.length === 0) {
    return { estado: "APROBADO", totalRutas: rutas.length };
  }
  return { estado: "RECHAZADO", observaciones };
}

const contratoRest = [
  { metodo: "GET", ruta: "/api/tasks", codigoExito: 200 },
  { metodo: "POST", ruta: "/api/tasks", codigoExito: 201 },
  { metodo: "DELETE", ruta: "/api/tasks/:id", codigoExito: 204 }
];

console.log(auditarContratoApi(contratoRest));`,
          solutionExplanation: 'Seguir las convenciones de códigos de estado HTTP en el contrato de API asegura que el frontend maneje las respuestas sin ambigüedades.',
          testCheck: {
            type: 'output-contains',
            expected: 'APROBADO',
          },
        },
      ],
      quiz: [
        {
          id: 'm7-l1-q1',
          question: '¿Por qué es fundamental definir un Producto Mínimo Viable (MVP) al iniciar un proyecto Full Stack?',
          options: [
            'Para gastar todo el presupuesto en publicidad en redes sociales.',
            'Para enfocarse en entregar la funcionalidad esencial que aporta valor real al usuario sin dispersarse en funciones secundarias interminables.',
            'Porque las bases de datos no permiten más de 2 tablas al principio.',
            'Para programar sin usar computadoras.',
          ],
          correctIndex: 1,
          explanation: 'El MVP permite validar la idea rápidamente con usuarios reales, evitando el síndrome de perfeccionismo donde los proyectos nunca se terminan.',
        },
        {
          id: 'm7-l1-q2',
          question: '¿Qué código de estado HTTP debe devolver una API REST estándar cuando un recurso nuevo (como una tarea o usuario) es creado exitosamente?',
          options: [
            '200 OK',
            '201 Created',
            '204 No Content',
            '301 Moved Permanently',
          ],
          correctIndex: 1,
          explanation: '201 Created es el código estándar oficial que confirma que la petición tuvo éxito y un nuevo recurso fue creado en el servidor.',
        },
        {
          id: 'm7-l1-q3',
          question: 'En un modelo de datos con Prisma, ¿qué efecto tiene la cláusula "onDelete: Cascade" en la relación entre Proyectos y Tareas?',
          options: [
            'Impide que cualquier usuario pueda borrar un proyecto.',
            'Elimina automáticamente todas las tareas asociadas a un proyecto cuando el proyecto es eliminado, evitando registros huérfanos.',
            'Convierte la base de datos a formato NoSQL.',
            'Guarda una copia de respaldo en un pendrive.',
          ],
          correctIndex: 1,
          explanation: 'onDelete: Cascade mantiene la base de datos limpia eliminando en cascada los elementos hijos que dependían del registro padre eliminado.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La planificación previa con historias de usuario y diagramas entidad-relación previene refactorizaciones costosas.',
          'Prisma permite modelar entidades, relaciones 1:N y restricciones de cascada de forma legible.',
          'Definir el contrato de endpoints REST antes de programar sincroniza el trabajo entre frontend y backend.',
        ],
        commonPitfalls: [
          'Empezar a programar la interfaz visual sin tener definidos los modelos de datos de la base de datos.',
          'Crear un alcance desmedido para la primera versión queriendo construir "el nuevo Facebook" en vez de un MVP funcional.',
          'Usar códigos de estado inconsistentes (ej. responder siempre 200 OK incluso cuando ocurre un error 404 o 500).',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 2: BACKEND CON EXPRESS, JWT Y CRUD ROBUSTO
    {
      id: 'm7-l2-backend-autenticacion-y-crud-robusto',
      moduleId: 7,
      slug: 'backend-autenticacion-y-crud-robusto',
      title: 'Construcción del Backend: Autenticación JWT, Rutas Protegidas y CRUD Robusto',
      order: 2,
      estimatedTime: '25 min',
      difficulty: 'Avanzado',
      objective: 'Construir el backend de la aplicación utilizando Node.js y Express: estructurar una arquitectura limpia de controladores y servicios, implementar autenticación con JWT y Bcrypt, proteger rutas con middlewares de autorización y manejar errores centralizadamente.',
      realWorldAnalogy: {
        title: 'La Central de Operaciones Blindada con Portero y Recepción',
        analogy: 'Piensa en un edificio corporativo de alta seguridad:\n\n• **El Portero en la Entrada (Middleware de Autenticación):** Cuando llegas, muestras tu carnet con chip (el Token JWT firmado). Si no tienes carnet o expiró, el portero no te deja pasar al ascensor (401 Unauthorized).\n• **El Mostrador de Recepción (Middleware de Validación):** Revisa que los documentos que traes cumplan el formato oficial antes de entregárselos al departamento correspondiente.\n• **Los Oficiales de Piso (Controladores y Servicios):** Cada departamento realiza su trabajo (crear proyectos, calcular métricas) y le entrega el resultado al usuario.\n• **El Sistema de Emergencias (Manejador de Errores Centralizado):** Si ocurre un cortocircuito, una alarma segura apaga el sector y avisa con calma sin revelar secretos del edificio.',
        whyItMatters: 'Una arquitectura de backend modular y desacoplada permite que tu aplicación crezca a cientos de miles de usuarios sin convertirse en un código espagueti imposible de mantener.',
        iconName: 'Server',
      },
      explanation: {
        sections: [
          {
            heading: 'Arquitectura Limpia en Express',
            content: 'Separamos responsabilidades en capas claras:\n\n```\nbackend/src/\n├── routes/        # Define las URLs y qué middlewares aplicar\n├── controllers/   # Recibe req y res, coordina validaciones\n├── services/      # Lógica de negocio pura (llama a Prisma)\n├── middlewares/   # Autenticación, validación, manejo de errores\n└── utils/         # Funciones de ayuda (firmar JWT, hashear passwords)\n```',
          },
          {
            heading: 'Middleware de Autenticación: Verificando el Token Bearer',
            content: 'Cada petición protegida envía el token en la cabecera `Authorization: Bearer <token>`:\n\n```typescript\nimport jwt from "jsonwebtoken";\n\nexport const protegerRuta = (req, res, next) => {\n  const cabecera = req.headers.authorization;\n  if (!cabecera || !cabecera.startsWith("Bearer ")) {\n    return res.status(401).json({ error: "Acceso no autorizado: Token faltante" });\n  }\n\n  const token = cabecera.split(" ")[1];\n  try {\n    const payload = jwt.verify(token, process.env.JWT_SECRET);\n    req.usuario = payload; // Adjuntamos los datos del usuario a la petición\n    next(); // Permite continuar al controlador\n  } catch (error) {\n    return res.status(401).json({ error: "Token inválido o expirado" });\n  }\n};\n```',
          },
          {
            heading: 'Operaciones CRUD Seguras y Pertenencia de Recursos',
            content: 'En una aplicación multiusuario, **un usuario jamás debe poder ver, editar o borrar proyectos de otro usuario**:\n\n```typescript\n// controllers/projects.ts\nexport const eliminarProyecto = async (req, res) => {\n  const { id } = req.params;\n  const usuarioId = req.usuario.id;\n\n  // Buscamos que el proyecto pertenezca al usuario autenticado\n  const proyecto = await prisma.project.findFirst({\n    where: { id: Number(id), ownerId: usuarioId }\n  });\n\n  if (!proyecto) {\n    return res.status(404).json({ error: "Proyecto no encontrado o no tienes permisos" });\n  }\n\n  await prisma.project.delete({ where: { id: Number(id) } });\n  return res.status(204).send();\n};\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando el flujo completo de una petición a través de Express y Middlewares:
const baseDatosEnMemoria = {
  usuarios: [{ id: 1, email: "ana@dev.com", nombre: "Ana" }],
  proyectos: [{ id: 101, titulo: "App Móvil", ownerId: 1 }]
};

// 1. Middleware de Autenticación simulado
function middlewareAuth(peticion) {
  const token = peticion.headers["Authorization"];
  if (!token || !token.startsWith("Bearer token_valido_")) {
    return { ok: false, status: 401, error: "No autorizado: Token ausente o inválido" };
  }
  // Extraemos id del usuario del token
  const usuarioId = parseInt(token.replace("Bearer token_valido_", ""));
  peticion.usuario = { id: usuarioId };
  return { ok: true };
}

// 2. Controlador de Creación de Proyectos
function controladorCrearProyecto(peticion) {
  const auth = middlewareAuth(peticion);
  if (!auth.ok) return auth;

  const { titulo } = peticion.body;
  if (!titulo || titulo.trim().length === 0) {
    return { ok: false, status: 400, error: "El título del proyecto es obligatorio" };
  }

  const nuevo = {
    id: baseDatosEnMemoria.proyectos.length + 101,
    titulo,
    ownerId: peticion.usuario.id
  };
  baseDatosEnMemoria.proyectos.push(nuevo);

  return { ok: true, status: 201, datos: nuevo };
}

// Probando una petición exitosa con token:
const peticionValida = {
  headers: { "Authorization": "Bearer token_valido_1" },
  body: { titulo: "Plataforma Educativa FullStack" }
};

const respuesta = controladorCrearProyecto(peticionValida);
console.log("Respuesta del servidor:", respuesta);
console.log("Base de datos actualizada:", baseDatosEnMemoria.proyectos);`,
        explanation: 'Cambia el token o elimina el título en el objeto de petición para observar cómo los middlewares interceptan y protegen las rutas.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm7-l2-ex1',
          title: 'Extractor y validador de cabecera Authorization Bearer',
          level: 'facil',
          instruction: 'Crea una función `extraerTokenBearer(cabecera)` que reciba el string del header Authorization. Si no existe o no empieza con "Bearer ", retorna `{ valido: false, error: "Formato Bearer requerido" }`. Si es válido, extrae el token eliminando espacios y retorna `{ valido: true, token }`. Prueba con "Bearer mi_token_secreto" e imprime el resultado.',
          starterCode: `function extraerTokenBearer(cabecera) {
  // Valida y extrae el token
}

const res = extraerTokenBearer("Bearer mi_token_secreto");
console.log(res);`,
          hints: [
            'if (!cabecera || !cabecera.startsWith("Bearer ")) return { valido: false, error: "Formato Bearer requerido" };',
            'const token = cabecera.substring(7).trim();',
            'return { valido: true, token };'
          ],
          solutionCode: `function extraerTokenBearer(cabecera) {
  if (!cabecera || typeof cabecera !== 'string' || !cabecera.startsWith('Bearer ')) {
    return { valido: false, error: "Formato Bearer requerido" };
  }
  const token = cabecera.substring(7).trim();
  if (token.length === 0) {
    return { valido: false, error: "Token vacío" };
  }
  return { valido: true, token };
}

const res = extraerTokenBearer("Bearer mi_token_secreto");
console.log(res);`,
          solutionExplanation: 'El estándar RFC 6750 especifica el formato "Bearer <token>" para transmitir tokens de acceso OAuth2 y JWT.',
          testCheck: {
            type: 'output-contains',
            expected: 'mi_token_secreto',
          },
        },
        {
          id: 'm7-l2-ex2',
          title: 'Middleware de autorización por propiedad de recurso',
          level: 'medio',
          instruction: 'Crea una función `verificarPropietario(recurso, usuarioActualId)` que compruebe si `recurso.ownerId === usuarioActualId`. Si coincide, retorna `{ autorizado: true }`. Si no coincide, retorna `{ autorizado: false, status: 403, error: "No tienes permisos para modificar este recurso ajeno" }`. Si el recurso no existe (es null o undefined), retorna `{ autorizado: false, status: 404, error: "Recurso no encontrado" }`. Prueba con un recurso ajeno.',
          starterCode: `function verificarPropietario(recurso, usuarioActualId) {
  // Comprueba pertenencia o retorna 404/403
}

const miProyecto = { id: 5, titulo: "E-Commerce", ownerId: 10 };
const intentoAcceso = verificarPropietario(miProyecto, 99); // Usuario 99 intenta acceder
console.log("Resultado de acceso:", intentoAcceso);`,
          hints: [
            'if (!recurso) return { autorizado: false, status: 404, error: "Recurso no encontrado" };',
            'if (recurso.ownerId !== usuarioActualId) return { autorizado: false, status: 403, error: "No tienes permisos para modificar este recurso ajeno" };',
            'return { autorizado: true };'
          ],
          solutionCode: `function verificarPropietario(recurso, usuarioActualId) {
  if (!recurso) {
    return { autorizado: false, status: 404, error: "Recurso no encontrado" };
  }
  if (recurso.ownerId !== usuarioActualId) {
    return { autorizado: false, status: 403, error: "No tienes permisos para modificar este recurso ajeno" };
  }
  return { autorizado: true };
}

const miProyecto = { id: 5, titulo: "E-Commerce", ownerId: 10 };
const intentoAcceso = verificarPropietario(miProyecto, 99);
console.log("Resultado de acceso:", intentoAcceso);`,
          solutionExplanation: 'Verificar la propiedad a nivel de controlador previene vulnerabilidades de Insecure Direct Object References (IDOR).',
          testCheck: {
            type: 'output-contains',
            expected: '403',
          },
        },
        {
          id: 'm7-l2-ex3',
          title: 'Manejador de errores centralizado (Reto)',
          level: 'reto',
          instruction: 'Crea una función `manejadorCentralErrores(error, esProduccion)` que reciba un objeto de error. Si `esProduccion` es true, jamás debe filtrar el stack trace interno; debe retornar `{ status: error.status || 500, mensaje: error.mensajePublico || "Ocurrió un error interno en el servidor" }`. Si `esProduccion` es false, debe incluir además la traza de depuración `{ ...respuesta, stack: error.stack }`. Prueba con un error en producción.',
          starterCode: `function manejadorCentralErrores(error, esProduccion) {
  // Oculta detalles internos en producción
}

const errorPrueba = {
  status: 400,
  mensajePublico: "Datos de formulario inválidos",
  stack: "Error en /controllers/auth.ts línea 45: base de datos timeout..."
};

const respProd = manejadorCentralErrores(errorPrueba, true);
console.log("Respuesta de error en producción:", respProd);`,
          hints: [
            'const status = error.status || 500;',
            'const mensaje = error.mensajePublico || "Ocurrió un error interno en el servidor";',
            'const res = { status, mensaje }; if (!esProduccion) res.stack = error.stack; return res;'
          ],
          solutionCode: `function manejadorCentralErrores(error, esProduccion) {
  const status = error.status || 500;
  const mensaje = error.mensajePublico || "Ocurrió un error interno en el servidor";
  const respuesta = { status, mensaje };

  if (!esProduccion && error.stack) {
    respuesta.stack = error.stack;
  }
  return respuesta;
}

const errorPrueba = {
  status: 400,
  mensajePublico: "Datos de formulario inválidos",
  stack: "Error en /controllers/auth.ts línea 45: base de datos timeout..."
};

const respProd = manejadorCentralErrores(errorPrueba, true);
console.log("Respuesta de error en producción:", respProd);`,
          solutionExplanation: 'En producción nunca se deben exponer los stack traces de errores a los clientes para no revelar rutas de archivos ni versiones de librerías a posibles atacantes.',
          testCheck: {
            type: 'output-contains',
            expected: 'Datos de formulario inválidos',
          },
        },
      ],
      quiz: [
        {
          id: 'm7-l2-q1',
          question: '¿Qué código de estado HTTP debe devolver el servidor cuando una petición no incluye el token JWT requerido?',
          options: [
            '401 Unauthorized',
            '403 Forbidden',
            '404 Not Found',
            '200 OK',
          ],
          correctIndex: 0,
          explanation: '401 Unauthorized indica que la petición carece de credenciales de autenticación válidas.',
        },
        {
          id: 'm7-l2-q2',
          question: '¿Cuál es la diferencia entre 401 Unauthorized y 403 Forbidden?',
          options: [
            '401 significa que no sabemos quién eres (no estás autenticado); 403 significa que sabemos quién eres, pero no tienes permisos para este recurso específico.',
            '401 es para computadoras Mac y 403 es para Windows.',
            'Son idénticos y se pueden usar indistintamente.',
            '403 se usa únicamente cuando se corta la luz en el servidor.',
          ],
          correctIndex: 0,
          explanation: '401 es un problema de autenticación (identidad); 403 es un problema de autorización (permisos/roles).',
        },
        {
          id: 'm7-l2-q3',
          question: '¿Qué es una vulnerabilidad IDOR (Insecure Direct Object Reference) en una API REST?',
          options: [
            'Un error tipográfico en el nombre de una variable en CSS.',
            'Una falla de seguridad donde un usuario puede acceder o modificar datos de otro usuario simplemente cambiando el ID en la URL (ej. /api/tasks/5) porque el backend olvidó validar la propiedad.',
            'Un problema de conexión lenta en redes 3G.',
            'Un virus informático que borra el navegador.',
          ],
          correctIndex: 1,
          explanation: 'Validar siempre que el recurso pertenezca al usuario autenticado (ownerId === req.usuario.id) es imprescindible para prevenir ataques IDOR.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La arquitectura limpia en Express desacopla rutas, controladores, servicios y middlewares para facilitar el mantenimiento.',
          'Los middlewares de autenticación interceptan el encabezado Authorization Bearer y validan la firma criptográfica del JWT.',
          'Proteger los recursos validando la pertenencia (ownerId) previene vulnerabilidades críticas de acceso a datos ajenos.',
        ],
        commonPitfalls: [
          'Confundir 401 (no autenticado) con 403 (autenticado pero sin permisos suficientes).',
          'No validar la pertenencia del recurso, permitiendo que cualquier usuario con token borre proyectos de otros con DELETE /api/projects/:id.',
          'Mostrar errores de base de datos o stack traces sin filtrar en producción exponiendo la estructura interna del sistema.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 3: FRONTEND REACT, CUSTOM HOOKS Y CONSUMO DE API
    {
      id: 'm7-l3-frontend-react-ui-y-consumo-de-api',
      moduleId: 7,
      slug: 'frontend-react-ui-y-consumo-de-api',
      title: 'Frontend Dinámico con React: Custom Hooks, Estado Global y Consumo de API',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Avanzado',
      objective: 'Construir la interfaz de usuario en React: diseñar componentes modulares con Tailwind CSS, crear un store o contexto de autenticación global, encapsular llamadas HTTP asíncronas en Custom Hooks reutilizables y manejar estados de carga y Optimistic UI.',
      realWorldAnalogy: {
        title: 'El Tablero de Control de un Avión Moderno',
        analogy: 'En un avión de última generación, el piloto no se levanta a inspeccionar las turbinas ni a medir el combustible con una varilla metálica:\n\n• Toda la información llega en tiempo real a una **pantalla limpia, clara y reactiva**.\n• Si un motor se calienta, una luz ámbar se enciende al instante.\n• Si todo marcha perfecto, los indicadores verdes brindan tranquilidad.\n\nTu aplicación React es ese tablero de control: mientras tu backend y base de datos procesan datos en la nube, el frontend le ofrece al usuario animaciones fluidas, formularios que validan en tiempo real, pantallas de carga elegantes (*skeletons*) y retroalimentación táctil inmediata.',
        whyItMatters: 'Un frontend rápido, intuitivo y con excelente manejo de estados de error es lo que convierte a visitantes curiosos en usuarios fieles de tu producto.',
        iconName: 'Layout',
      },
      explanation: {
        sections: [
          {
            heading: 'Store Global de Autenticación con React Context',
            content: 'Para que toda la aplicación sepa si el usuario ha iniciado sesión sin pasar props manualmente por 10 componentes, usamos un Contexto global:\n\n```typescript\n// context/AuthContext.tsx\ninterface AuthState {\n  user: { id: number; email: string; name: string } | null;\n  token: string | null;\n  login: (email: string, pass: string) => Promise<void>;\n  logout: () => void;\n}\n\nexport const AuthProvider = ({ children }) => {\n  const [token, setToken] = useState(() => localStorage.getItem("jwt_token"));\n  // Decodifica y mantiene la sesión activa en recargas de página\n  // ...\n};\n```',
          },
          {
            heading: 'Custom Hooks para Consumo de APIs (`useProjects`)',
            content: 'Jamás escribas llamadas `fetch()` directas dentro de tus componentes visuales. Encapsula toda la lógica de red y estado en un **Custom Hook**:\n\n```typescript\nexport function useProjects() {\n  const [projects, setProjects] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  const cargarProyectos = async () => {\n    try {\n      setLoading(true);\n      const data = await apiClient.get("/api/projects");\n      setProjects(data);\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  useEffect(() => { cargarProyectos(); }, []);\n  return { projects, loading, error, recargar: cargarProyectos };\n}\n```',
          },
          {
            heading: 'Actualizaciones Optimistas (Optimistic UI)',
            content: 'Cuando el usuario hace clic en "Completar tarea", en lugar de mostrar un spinner de 1 segundo esperando que el servidor responda:\n\n1. **Cambiamos el estado visual inmediatamente a completada** (feedback instantáneo a 0 milisegundos).\n2. En segundo plano enviamos la petición `PATCH` al backend.\n3. Si la petición falla (ej. se cortó la conexión), revertimos el cambio y mostramos una notificación de error.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de Custom Hook y Actualización Optimista (Optimistic UI):
class SimuladorEstadoTareas {
  constructor() {
    this.tareas = [
      { id: 1, titulo: "Crear esquema en Prisma", completada: true },
      { id: 2, titulo: "Diseñar vistas en React", completada: false }
    ];
    this.historialRollback = null;
  }

  // Simulación de Optimistic UI para marcar como completada
  async alternarTareaOptimista(idTarea, simularFalloRed = false) {
    console.log(\`⚡ [Optimistic UI] Actualizando visualmente la tarea \${idTarea} de inmediato...\`);
    
    // 1. Guardamos copia previa por si hay que hacer Rollback
    this.historialRollback = JSON.parse(JSON.stringify(this.tareas));

    // 2. Aplicamos cambio inmediato en la interfaz
    const tarea = this.tareas.find(t => t.id === idTarea);
    if (tarea) tarea.completada = !tarea.completada;
    console.log("📱 Estado en pantalla actualizado a 0 ms:", this.tareas);

    // 3. Enviamos petición al backend en segundo plano
    console.log("🌐 Enviando PATCH /api/tasks/:id al servidor...");
    await new Promise(r => setTimeout(r, 100)); // Simula latencia de red

    if (simularFalloRed) {
      console.warn("⚠️ ERROR DE RED: El servidor no respondió. Revertiendo interfaz (Rollback)...");
      this.tareas = this.historialRollback;
      console.log("🔄 Estado restaurado en pantalla:", this.tareas);
      return { exito: false };
    }

    console.log("✅ Confirmación recibida del servidor 200 OK. Cambio consolidado.");
    return { exito: true };
  }
}

async function probarOptimismo() {
  const app = new SimuladorEstadoTareas();
  console.log("--- PRUEBA 1: Flujo exitoso ---");
  await app.alternarTareaOptimista(2, false);

  console.log("\\n--- PRUEBA 2: Flujo con fallo de conexión ---");
  await app.alternarTareaOptimista(2, true);
}

probarOptimismo();`,
        explanation: 'Observa cómo la interfaz reacciona instantáneamente sin congelarse, y revierte el estado elegantemente si la red falla.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm7-l3-ex1',
          title: 'Determinador de estados de interfaz (Loading, Error, Empty, Data)',
          level: 'facil',
          instruction: 'Crea una función `determinarEstadoUI({ cargando, error, datos })` que retorne una cadena con el estado correspondiente: 1) Si `cargando` es true retorna "CARGANDO". 2) Si `error` tiene un mensaje retorna "ERROR". 3) Si `datos` es un array vacío retorna "VACIO". 4) Si `datos` tiene elementos retorna "EXITO". Prueba con un array con 2 elementos e imprime el resultado.',
          starterCode: `function determinarEstadoUI({ cargando, error, datos }) {
  // Retorna CARGANDO, ERROR, VACIO o EXITO
}

const estado = determinarEstadoUI({ cargando: false, error: null, datos: ["Proyecto 1", "Proyecto 2"] });
console.log("Estado de la UI:", estado);`,
          hints: [
            'if (cargando) return "CARGANDO";',
            'if (error) return "ERROR";',
            'if (Array.isArray(datos) && datos.length === 0) return "VACIO";',
            'return "EXITO";'
          ],
          solutionCode: `function determinarEstadoUI({ cargando, error, datos }) {
  if (cargando) return "CARGANDO";
  if (error) return "ERROR";
  if (Array.isArray(datos) && datos.length === 0) return "VACIO";
  return "EXITO";
}

const estado = determinarEstadoUI({ cargando: false, error: null, datos: ["Proyecto 1", "Proyecto 2"] });
console.log("Estado de la UI:", estado);`,
          solutionExplanation: 'Manejar explícitamente los 4 estados de la UI (Cargando, Error, Lista Vacía y Éxito) evita pantallas congeladas y mejora drásticamente la experiencia del usuario.',
          testCheck: {
            type: 'output-contains',
            expected: 'EXITO',
          },
        },
        {
          id: 'm7-l3-ex2',
          title: 'Interceptor de peticiones HTTP con token automático',
          level: 'medio',
          instruction: 'Crea una función `crearClienteConToken(obtenerTokenFn)` que reciba una función para obtener el token actual. Debe retornar `{ get(url, cabeceras) }`. Si hay un token disponible, debe añadir automáticamente `Authorization: "Bearer " + token` al objeto de cabeceras. Si no hay token, no debe añadir la propiedad Authorization. Prueba la llamada simulada e imprime las cabeceras finales.',
          starterCode: `function crearClienteConToken(obtenerTokenFn) {
  // Retorna método get que inyecta cabecera Authorization
}

const mockGetToken = () => "token_guardado_123";
const cliente = crearClienteConToken(mockGetToken);
const res = cliente.get("/api/projects", { "Content-Type": "application/json" });
console.log("Cabeceras enviadas:", res.cabeceras);`,
          hints: [
            'const token = obtenerTokenFn();',
            'const cabecerasFinales = { ...cabeceras };',
            'if (token) cabecerasFinales["Authorization"] = "Bearer " + token;',
            'return { url, cabeceras: cabecerasFinales };'
          ],
          solutionCode: `function crearClienteConToken(obtenerTokenFn) {
  return {
    get: (url, cabeceras = {}) => {
      const token = obtenerTokenFn();
      const cabecerasFinales = { ...cabeceras };
      if (token) {
        cabecerasFinales["Authorization"] = "Bearer " + token;
      }
      return { url, cabeceras: cabecerasFinales };
    }
  };
}

const mockGetToken = () => "token_guardado_123";
const cliente = crearClienteConToken(mockGetToken);
const res = cliente.get("/api/projects", { "Content-Type": "application/json" });
console.log("Cabeceras enviadas:", res.cabeceras);`,
          solutionExplanation: 'Configurar interceptores en clientes HTTP (como Axios o wrappers de fetch) evita tener que escribir manualmente los encabezados de autenticación en cada vista.',
          testCheck: {
            type: 'output-contains',
            expected: 'Bearer token_guardado_123',
          },
        },
        {
          id: 'm7-l3-ex3',
          title: 'Simulador de eliminación con Optimistic UI y Rollback (Reto)',
          level: 'reto',
          instruction: 'Crea una función `eliminarElementoOptimista(lista, idEliminar, peticionServidor)` que guarde una copia previa de la lista, filtre el elemento inmediatamente de la lista local, e invoque `await peticionServidor(idEliminar)`. Si la promesa se resuelve con éxito `{ ok: true }`, retorna `{ listaFinal: listaFiltrada, rollback: false }`. Si la promesa arroja un error, restaura la lista previa y retorna `{ listaFinal: listaPrevia, rollback: true, mensaje: "Error de servidor: elemento restaurado" }`. Prueba simulando un fallo.',
          starterCode: `async function eliminarElementoOptimista(lista, idEliminar, peticionServidor) {
  // Aplica Optimistic UI y revierte ante error
}

const elementos = [{ id: 10, nombre: "Item A" }, { id: 20, nombre: "Item B" }];
const mockFallo = async () => { throw new Error("Fallo 500"); };

async function probar() {
  const resultado = await eliminarElementoOptimista(elementos, 10, mockFallo);
  console.log("Resultado tras error:", resultado);
}

probar();`,
          hints: [
            'const copiaPrevia = [...lista];',
            'const filtrada = lista.filter(item => item.id !== idEliminar);',
            'try { await peticionServidor(idEliminar); return { listaFinal: filtrada, rollback: false }; } catch { return { listaFinal: copiaPrevia, rollback: true, mensaje: "Error de servidor: elemento restaurado" }; }'
          ],
          solutionCode: `async function eliminarElementoOptimista(lista, idEliminar, peticionServidor) {
  const copiaPrevia = [...lista];
  const filtrada = lista.filter(item => item.id !== idEliminar);

  try {
    await peticionServidor(idEliminar);
    return { listaFinal: filtrada, rollback: false };
  } catch (error) {
    return {
      listaFinal: copiaPrevia,
      rollback: true,
      mensaje: "Error de servidor: elemento restaurado"
    };
  }
}

const elementos = [{ id: 10, nombre: "Item A" }, { id: 20, nombre: "Item B" }];
const mockFallo = async () => { throw new Error("Fallo 500"); };

async function probar() {
  const resultado = await eliminarElementoOptimista(elementos, 10, mockFallo);
  console.log("Resultado tras error:", resultado);
}

probar();`,
          solutionExplanation: 'Las actualizaciones optimistas proporcionan una sensación de velocidad instantánea en aplicaciones de productividad, manteniendo la coherencia mediante rollbacks controlados.',
          testCheck: {
            type: 'output-contains',
            expected: 'Error de servidor: elemento restaurado',
          },
        },
      ],
      quiz: [
        {
          id: 'm7-l3-q1',
          question: '¿Cuál es la principal ventaja de encapsular llamadas a la API en Custom Hooks en lugar de colocarlas directamente en componentes visuales?',
          options: [
            'Hace que las imágenes carguen en blanco y negro.',
            'Separa la lógica de obtención de datos del diseño visual, permitiendo reutilizar la misma lógica en diferentes pantallas y simplificando las pruebas.',
            'Evita tener que usar CSS.',
            'Hace que la computadora consuma menos electricidad.',
          ],
          correctIndex: 1,
          explanation: 'Los Custom Hooks desacoplan el estado y la comunicación con el servidor de la capa de presentación visual (Clean Architecture en React).',
        },
        {
          id: 'm7-l3-q2',
          question: '¿Qué es una Actualización Optimista (Optimistic UI)?',
          options: [
            'Pensar positivamente mientras escribes código.',
            'Actualizar la interfaz visual de inmediato asumiendo que la petición al servidor tendrá éxito, revirtiendo el cambio solo si ocurre un error.',
            'Un tipo de pantalla que solo funciona de día.',
            'Una función que elimina los errores de consola.',
          ],
          correctIndex: 1,
          explanation: 'Optimistic UI elimina la percepción de lentitud en aplicaciones web dando feedback visual instantáneo a 0 milisegundos.',
        },
        {
          id: 'm7-l3-q3',
          question: '¿Por qué es recomendable mostrar "Skeletons" o pantallas de carga en lugar de una pantalla en blanco mientras se obtienen datos?',
          options: [
            'Porque reduce el abandono del usuario al comunicar que la app está activa y anticipar la estructura del contenido que aparecerá.',
            'Porque acelera la velocidad de descarga de la base de datos.',
            'Porque es un requisito de Google Chrome.',
            'Para gastar menos memoria en el servidor.',
          ],
          correctIndex: 0,
          explanation: 'Los skeletons reducen la percepción de tiempo de espera y ofrecen una experiencia de usuario mucho más pulida y profesional.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Un contexto global de autenticación gestiona la sesión y la persistencia de tokens de forma centralizada.',
          'Los Custom Hooks encapsulan la complejidad de red y exponen estados claros (loading, error, datos).',
          'La interfaz optimista combinada con manejo de errores robusto logra una experiencia de usuario ultra rápida.',
        ],
        commonPitfalls: [
          'Colocar llamadas fetch desordenadas en múltiples componentes hijos provocando peticiones duplicadas a la misma API.',
          'Olvidar manejar el estado de lista vacía (Empty State), mostrando pantallas desiertas que desconciertan al usuario.',
          'No limpiar suscripciones o peticiones asíncronas cuando un componente se desmonta, causando fugas de memoria.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 4: INTEGRACIÓN COMPLETA, PRUEBAS E2E Y SEGURIDAD
    {
      id: 'm7-l4-integracion-testing-e2e-y-seguridad',
      moduleId: 7,
      slug: 'integracion-testing-e2e-y-seguridad',
      title: 'Integración Completa, Pruebas E2E y Auditoría de Seguridad',
      order: 4,
      estimatedTime: '22 min',
      difficulty: 'Avanzado',
      objective: 'Conectar frontend y backend en un flujo continuo de punta a punta, diseñar pruebas End-to-End (E2E) que simulen el recorrido completo del usuario real y blindar la aplicación con las mejores prácticas de seguridad web para producción (CORS, Helmet, Rate Limiting y Sanitización).',
      realWorldAnalogy: {
        title: 'El Ensayo General con Vestuario y Luces antes del Gran Estreno',
        analogy: 'En una gran producción teatral en Broadway, los actores no saltan al escenario frente a 2,000 personas sin haber hecho un **ensayo general completo**:\n\n• Se prueba todo junto: los actores con sus trajes, los micrófonos encendidos, el telón subiendo en el segundo exacto y los efectos especiales de iluminación coordinados.\n• Una **Prueba End-to-End (E2E)** es ese ensayo general en el software: un navegador automatizado abre tu aplicación web real, escribe el email de un usuario, hace clic en "Crear Proyecto", verifica que la base de datos responda y comprueba que la tarjeta aparezca en pantalla sin errores.\n• Y la **Auditoría de Seguridad** es como revisar los detectores de humo y las cerraduras de emergencia del teatro para asegurar que ningún intruso pueda arruinar la función.',
        whyItMatters: 'Tener pruebas E2E y defensas de seguridad activas te permite dormir tranquilo sabiendo que tu aplicación funciona a la perfección y está protegida contra ataques comunes.',
        iconName: 'ShieldCheck',
      },
      explanation: {
        sections: [
          {
            heading: 'Conectando el Puente: Variables de Entorno y CORS',
            content: 'Para que tu frontend React (ej. en Vercel) pueda comunicarse con tu backend Express (ej. en Render), debes configurar dos cosas:\n\n1. En el **Frontend**: la variable `VITE_API_URL=https://api-devtask.onrender.com`.\n2. En el **Backend**: el middleware `cors` autorizando explícitamente el origen de tu frontend:\n```typescript\nimport cors from "cors";\n\napp.use(cors({\n  origin: process.env.FRONTEND_URL || "http://localhost:5173",\n  credentials: true,\n  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]\n}));\n```',
          },
          {
            heading: 'Blindando el Servidor: Helmet y Rate Limiting',
            content: '• **`helmet()`:** Agrega automáticamente 11 encabezados HTTP de seguridad que protegen contra ataques de scripts entre sitios (XSS), robo de clicks (Clickjacking) y descargas maliciosas.\n\n• **`express-rate-limit`:** Limita la cantidad de peticiones que una misma dirección IP puede hacer por minuto. Esto previene ataques de fuerza bruta donde un bot intenta miles de contraseñas por segundo:\n```typescript\nimport rateLimit from "express-rate-limit";\n\nconst limiterAuth = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutos\n  max: 10, // Máximo 10 intentos por IP\n  message: "Demasiados intentos de acceso. Intenta de nuevo en 15 minutos."\n});\napp.use("/api/auth/login", limiterAuth);\n```',
          },
          {
            heading: 'Pruebas E2E (End-to-End): El Viaje del Usuario',
            content: 'Con herramientas como Playwright probamos el flujo completo de punta a punta:\n\n```typescript\ntest("Flujo completo: Registro -> Crear Proyecto -> Cerrar Sesión", async ({ page }) => {\n  await page.goto("http://localhost:5173/registro");\n  await page.fill(\'input[name="email"]\', "nuevo@dev.com");\n  await page.fill(\'input[name="password"]\', "secreto123");\n  await page.click(\'button[type="submit"]\');\n  \n  // Comprueba que redirigió al dashboard y muestra el botón de nuevo proyecto\n  await expect(page.locator("h1")).toContainText("Mis Proyectos");\n});\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de Rate Limiting para protección contra ataques de fuerza bruta:
class SimuladorRateLimiter {
  constructor(maxPeticiones, ventanaSegundos) {
    this.maxPeticiones = maxPeticiones;
    this.ventanaMs = ventanaSegundos * 1000;
    this.registroIps = {};
  }

  evaluarPeticion(ip) {
    const ahora = Date.now();
    if (!this.registroIps[ip]) {
      this.registroIps[ip] = [];
    }

    // Filtramos peticiones que ya salieron de la ventana de tiempo
    this.registroIps[ip] = this.registroIps[ip].filter(t => ahora - t < this.ventanaMs);

    if (this.registroIps[ip].length >= this.maxPeticiones) {
      console.warn(\`⛔ [429 Too Many Requests] IP \${ip} bloqueada por superar \${this.maxPeticiones} peticiones.\`);
      return { bloqueado: true, status: 429, peticionesRestantes: 0 };
    }

    this.registroIps[ip].push(ahora);
    const restantes = this.maxPeticiones - this.registroIps[ip].length;
    console.log(\`✅ Petición permitida para \${ip} (Restantes: \${restantes})\`);
    return { bloqueado: false, status: 200, peticionesRestantes: restantes };
  }
}

// Permitimos máximo 3 peticiones cada 5 segundos:
const limiter = new SimuladorRateLimiter(3, 5);
const ipUsuario = "192.168.1.45";

console.log("Simulando ráfaga rápida de peticiones:");
limiter.evaluarPeticion(ipUsuario); // Intento 1
limiter.evaluarPeticion(ipUsuario); // Intento 2
limiter.evaluarPeticion(ipUsuario); // Intento 3
limiter.evaluarPeticion(ipUsuario); // Intento 4 (Debe bloquearse)`,
        explanation: 'Observa cómo el limitador de tasa protege al servidor contra ataques de saturación o fuerza bruta devolviendo el código HTTP 429.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm7-l4-ex1',
          title: 'Configurador de opciones seguras de CORS',
          level: 'facil',
          instruction: 'Crea una función `crearConfiguracionCORS(origenPermitido)` que reciba la URL permitida. Debe retornar un objeto con: `origin: origenPermitido`, `credentials: true` y `methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]`. Además, si `origenPermitido` es "*", debe lanzar un error porque permitir cualquier origen con credenciales activas es una falla de seguridad. Prueba con "https://devtask.com".',
          starterCode: `function crearConfiguracionCORS(origenPermitido) {
  // Retorna opciones seguras de CORS
}

const config = crearConfiguracionCORS("https://devtask.com");
console.log("CORS configurado:", config);`,
          hints: [
            'if (origenPermitido === "*") throw new Error("CORS inseguro: no uses * con credenciales");',
            'return { origin: origenPermitido, credentials: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] };'
          ],
          solutionCode: `function crearConfiguracionCORS(origenPermitido) {
  if (origenPermitido === '*') {
    throw new Error("CORS inseguro: no uses * con credenciales");
  }
  return {
    origin: origenPermitido,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  };
}

const config = crearConfiguracionCORS("https://devtask.com");
console.log("CORS configurado:", config);`,
          solutionExplanation: 'Limitar CORS al dominio exacto de tu frontend evita que sitios web maliciosos de terceros hagan peticiones en nombre de tus usuarios.',
          testCheck: {
            type: 'output-contains',
            expected: 'https://devtask.com',
          },
        },
        {
          id: 'm7-l4-ex2',
          title: 'Sanitizador de entradas contra inyecciones XSS',
          level: 'medio',
          instruction: 'Crea una función `sanitizarTextoHtml(cadena)` que reciba un texto introducido por el usuario y reemplace los caracteres peligrosos para evitar inyecciones Cross-Site Scripting (XSS): `<` debe cambiarse por `&lt;`, `>` por `&gt;`, `"` por `&quot;` y `&` por `&amp;`. Prueba sanitizando un intento de inyección: `<script>alert("hack")</script>` e imprime el resultado.',
          starterCode: `function sanitizarTextoHtml(cadena) {
  // Reemplaza caracteres peligrosos
}

const ataque = '<script>alert("hack")</script>';
console.log("Texto sanitizado:", sanitizarTextoHtml(ataque));`,
          hints: [
            'Reemplaza en orden: cadena.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")'
          ],
          solutionCode: `function sanitizarTextoHtml(cadena) {
  if (!cadena || typeof cadena !== 'string') return '';
  return cadena
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ataque = '<script>alert("hack")</script>';
console.log("Texto sanitizado:", sanitizarTextoHtml(ataque));`,
          solutionExplanation: 'Sanitizar caracteres HTML especiales garantiza que el navegador interprete los datos del usuario como texto puro y nunca como código ejecutable.',
          testCheck: {
            type: 'output-contains',
            expected: '&lt;script&gt;',
          },
        },
        {
          id: 'm7-l4-ex3',
          title: 'Simulador de prueba E2E automatizada (Reto)',
          level: 'reto',
          instruction: 'Crea una función `ejecutarTestE2E(pasosSimulados)` que procese un array de pasos `{ nombre, accion }`. La función debe ejecutar cada paso en orden. Si todos los pasos se resuelven sin errores, retorna `{ resultado: "EXITO", pasosSuperados: pasosSimulados.length }`. Si un paso lanza un error, detiene la prueba y retorna `{ resultado: "FALLO", pasoFallido: paso.nombre, error: err.message }`. Prueba con 3 pasos exitosos (Navegar, LlenarFormulario, VerificarDashboard).',
          starterCode: `async function ejecutarTestE2E(pasosSimulados) {
  // Ejecuta pasos secuenciales y reporta estado
}

const pasosPrueba = [
  { nombre: "Navegar a Login", accion: async () => true },
  { nombre: "Llenar Credenciales", accion: async () => true },
  { nombre: "Verificar Dashboard", accion: async () => true }
];

async function probar() {
  const reporte = await ejecutarTestE2E(pasosPrueba);
  console.log("Reporte E2E:", reporte);
}

probar();`,
          hints: [
            'Usa un bucle for (const p of pasosSimulados)',
            'try { await p.accion(); } catch (err) { return { resultado: "FALLO", pasoFallido: p.nombre, error: err.message }; }',
            'return { resultado: "EXITO", pasosSuperados: pasosSimulados.length };'
          ],
          solutionCode: `async function ejecutarTestE2E(pasosSimulados) {
  for (let i = 0; i < pasosSimulados.length; i++) {
    const paso = pasosSimulados[i];
    try {
      await paso.accion();
    } catch (err) {
      return {
        resultado: "FALLO",
        pasoFallido: paso.nombre,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
  return {
    resultado: "EXITO",
    pasosSuperados: pasosSimulados.length
  };
}

const pasosPrueba = [
  { nombre: "Navegar a Login", accion: async () => true },
  { nombre: "Llenar Credenciales", accion: async () => true },
  { nombre: "Verificar Dashboard", accion: async () => true }
];

async function probar() {
  const reporte = await ejecutarTestE2E(pasosPrueba);
  console.log("Reporte E2E:", reporte);
}

probar();`,
          solutionExplanation: 'Las pruebas E2E verifican la integración real de toda la pila tecnológica (frontend, API, autenticación y base de datos) simulando la experiencia de un usuario humano.',
          testCheck: {
            type: 'output-contains',
            expected: 'EXITO',
          },
        },
      ],
      quiz: [
        {
          id: 'm7-l4-q1',
          question: '¿Qué código HTTP debe devolver un servidor protegido con Rate Limiting cuando un usuario o bot supera el número de peticiones permitidas?',
          options: [
            '404 Not Found',
            '429 Too Many Requests',
            '500 Server Error',
            '200 OK',
          ],
          correctIndex: 1,
          explanation: 'El código 429 Too Many Requests indica oficialmente que el cliente ha enviado demasiadas solicitudes en un período de tiempo determinado.',
        },
        {
          id: 'm7-l4-q2',
          question: '¿Cuál es el objetivo principal del paquete "helmet" en un servidor Node.js/Express?',
          options: [
            'Acelerar el procesamiento de imágenes.',
            'Configurar automáticamente cabeceras HTTP de seguridad (Content-Security-Policy, X-Frame-Options, HSTS) para proteger contra ataques comunes como XSS y Clickjacking.',
            'Crear copias de respaldo de la base de datos.',
            'Cambiar el puerto del servidor.',
          ],
          correctIndex: 1,
          explanation: 'Helmet es un middleware fundamental de Express que establece encabezados HTTP de seguridad recomendados por los estándares OWASP.',
        },
        {
          id: 'm7-l4-q3',
          question: '¿Qué prueba una suite de pruebas End-to-End (E2E)?',
          options: [
            'Solo una función matemática aislada.',
            'El flujo completo de la aplicación simulando la interacción real del usuario desde el navegador hasta la base de datos.',
            'La velocidad del ventilador del servidor.',
            'El brillo de la pantalla del monitor.',
          ],
          correctIndex: 1,
          explanation: 'Las pruebas E2E validan la aplicación completa de punta a punta garantizando que la integración de todos los subsistemas funcione armoniosamente.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La conexión frontend-backend requiere configurar variables de entorno y reglas de CORS específicas.',
          'Helmet y Rate Limiting blindan el servidor Express contra inyecciones y ataques de fuerza bruta.',
          'Las pruebas E2E simulan el viaje completo del usuario dando certeza absoluta antes del lanzamiento.',
        ],
        commonPitfalls: [
          'Dejar CORS configurado con "origin: *" en producción permitiendo peticiones desde cualquier sitio web desconocido.',
          'No aplicar Rate Limiting en rutas de autenticación dejando la puerta abierta a ataques de fuerza bruta de contraseñas.',
          'No sanitizar entradas de usuario antes de renderizarlas abriendo vulnerabilidades de Cross-Site Scripting (XSS).',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 5: DESPLIEGUE A PRODUCCIÓN Y LANZAMIENTO EN VIVO
    {
      id: 'm7-l5-despliegue-produccion-y-lanzamiento',
      moduleId: 7,
      slug: 'despliegue-a-produccion-y-lanzamiento-en-vivo',
      title: 'Despliegue a Producción y Lanzamiento en Vivo: ¡Tu App en Internet!',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Avanzado',
      objective: 'Llevar a cabo el despliegue profesional y definitivo de la aplicación Full Stack: aprovisionar PostgreSQL en la nube, ejecutar migraciones con Prisma, desplegar el backend en Render y el frontend en Vercel, ejecutar pruebas de humo (Smoke Tests) y compartir el proyecto en vivo.',
      realWorldAnalogy: {
        title: 'El Corte de Cinta y la Gran Inauguración Oficial',
        analogy: 'Todo el esfuerzo, las horas de aprendizaje y cada concepto asimilado a lo largo de este camino —desde entender qué era una variable y un bucle, dominar el DOM y React, diseñar APIs en Express, consultar bases de datos relacionales y contenerizar con Docker— converge en este momento exacto.\n\nEl lanzamiento a producción es el **corte de cinta de tu obra maestra**:\n• Tu aplicación ya no es un proyecto secreto que solo corre en tu computadora (`localhost`).\n• Ahora tiene una dirección oficial en la red mundial con candado de seguridad HTTPS.\n• Cualquier persona en el mundo —tu familia, tus amigos, reclutadores de empleo o clientes reales— puede abrir el enlace en su teléfono móvil y usar lo que tú construiste con tus propias manos.',
        whyItMatters: 'Tener una aplicación Full Stack real funcionando en vivo en Internet con base de datos en la nube y autenticación segura es la prueba indiscutible que te acredita como un Desarrollador Full Stack profesional.',
        iconName: 'Trophy',
      },
      explanation: {
        sections: [
          {
            heading: 'Paso 1: Aprovisionar PostgreSQL y Ejecutar Migraciones en la Nube',
            content: '1. Crea una base de datos PostgreSQL gestionada gratuita en **Neon.tech**, **Supabase** o **Render**.\n2. Copia la cadena de conexión de producción (`DATABASE_URL=postgres://user:pass@ep-cool-db.neon.tech/neondb?sslmode=require`).\n3. En tu proyecto backend, ejecuta el comando de migración para producción:\n```bash\nnpx prisma migrate deploy\n```\n`migrate deploy` aplica todas tus migraciones SQL pendientes en la base de datos de producción sin reiniciar ni alterar datos existentes.',
          },
          {
            heading: 'Paso 2: Desplegar el Backend en Render / Railway',
            content: '1. Conecta tu repositorio de GitHub a **Render.com** creando un nuevo *Web Service*.\n2. **Build Command:** `npm install && npx prisma generate && npm run build`\n3. **Start Command:** `npm start` (o `node dist/main.js`)\n4. **Environment Variables:** Agrega `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production` y `FRONTEND_URL`.\n5. Render te otorgará una URL segura: `https://devtask-api.onrender.com`.',
          },
          {
            heading: 'Paso 3: Desplegar el Frontend en Vercel',
            content: '1. Conecta tu repositorio a **Vercel**.\n2. Framework Preset: **Vite**.\n3. En *Environment Variables* define:\n   `VITE_API_URL=https://devtask-api.onrender.com`\n4. Haz clic en **Deploy**. En menos de 45 segundos tendrás tu URL pública global: `https://devtask-pro.vercel.app`.',
          },
          {
            heading: 'Paso 4: Prueba de Humo (Smoke Testing) en Vivo',
            content: 'Apenas termine el despliegue, realiza la prueba de humo en vivo:\n1. Abre la URL en modo incógnito.\n2. Registra un usuario nuevo con contraseña real.\n3. Crea un proyecto y una tarea.\n4. Recarga la página (F5) para verificar que la sesión persista.\n5. Cierra sesión y verifica que las rutas protegidas no permitan entrar.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de Verificación de Lanzamiento a Producción (Smoke Testing):
class VerificadorLanzamientoProduccion {
  constructor(urlFrontend, urlBackend) {
    this.urlFrontend = urlFrontend;
    this.urlBackend = urlBackend;
    this.checks = [];
  }

  async ejecutarCheck(nombre, testFn) {
    try {
      const res = await testFn();
      this.checks.push({ nombre, estado: "PASADO", detalle: res });
      console.log(\`✅ [OK] \${nombre}: \${res}\`);
    } catch (error) {
      this.checks.push({ nombre, estado: "FALLADO", error: error.message });
      console.error(\`❌ [FALLO] \${nombre}: \${error.message}\`);
    }
  }

  async auditarTodo() {
    console.log("🚀 Iniciando Smoke Test de Producción...");
    
    // Check 1: HTTPS en Frontend
    await this.ejecutarCheck("Protocolo Seguro Frontend", () => {
      if (!this.urlFrontend.startsWith("https://")) throw new Error("Frontend no usa HTTPS");
      return "URL segura con SSL (Vercel Edge)";
    });

    // Check 2: Endpoint /health en Backend
    await this.ejecutarCheck("Health Check Backend", () => {
      if (!this.urlBackend.startsWith("https://")) throw new Error("Backend no usa HTTPS");
      return "API responde HTTP 200 OK (Render)";
    });

    // Check 3: Conexión con PostgreSQL
    await this.ejecutarCheck("Migraciones de Base de Datos", () => {
      return "Prisma schema sincronizado en PostgreSQL (Neon/Supabase)";
    });

    const fallos = this.checks.filter(c => c.estado === "FALLADO");
    console.log("\\n📊 RESULTADO FINAL DEL LANZAMIENTO:");
    if (fallos.length === 0) {
      console.log("🎉 ¡APLICACIÓN 100% OPERATIVA EN PRODUCCIÓN! Lista para compartir en LinkedIn y portafolio.");
    } else {
      console.log(\`⚠️ Se detectaron \${fallos.length} problemas antes de publicar.\`);
    }
  }
}

const auditor = new VerificadorLanzamientoProduccion(
  "https://devtask-pro.vercel.app",
  "https://api-devtask.onrender.com"
);

auditor.auditarTodo();`,
        explanation: 'Ejecuta el auditor para simular las comprobaciones finales que todo ingeniero senior realiza antes de anunciar el lanzamiento de un producto.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm7-l5-ex1',
          title: 'Validador de URLs de producción seguras',
          level: 'facil',
          instruction: 'Crea una función `validarUrlProduccion(url)` que verifique que la URL: 1) Comience estrictamente con "https://", 2) No contenga "localhost", y 3) No contenga puertos como ":5173" o ":3000". Si cumple retorna `{ valida: true }`, de lo contrario `{ valida: false, error: "La URL debe ser un dominio público con HTTPS" }`. Pruébala con "https://devtask.vercel.app".',
          starterCode: `function validarUrlProduccion(url) {
  // Comprueba https:// y que no sea localhost
}

const resultado = validarUrlProduccion("https://devtask.vercel.app");
console.log(resultado);`,
          hints: [
            'if (!url.startsWith("https://")) return { valida: false, error: "La URL debe ser un dominio público con HTTPS" };',
            'if (url.includes("localhost") || url.includes(":3000") || url.includes(":5173")) return { valida: false, error: "La URL debe ser un dominio público con HTTPS" };',
            'return { valida: true };'
          ],
          solutionCode: `function validarUrlProduccion(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('https://')) {
    return { valida: false, error: "La URL debe ser un dominio público con HTTPS" };
  }
  if (url.includes('localhost') || url.includes(':3000') || url.includes(':5173')) {
    return { valida: false, error: "La URL debe ser un dominio público con HTTPS" };
  }
  return { valida: true };
}

const resultado = validarUrlProduccion("https://devtask.vercel.app");
console.log(resultado);`,
          solutionExplanation: 'En producción los servicios deben utilizar dominios con certificados SSL y HTTPS para cifrar las comunicaciones de los usuarios.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm7-l5-ex2',
          title: 'Simulación de Smoke Test con control de latencia',
          level: 'medio',
          instruction: 'Crea una función `ejecutarSmokeTest(peticionSaludFn, latenciaMaximaMs = 800)` que invoque la función de prueba de salud y mida el tiempo transcurrido en milisegundos (`performance.now()`). Si la respuesta tiene status 200 y la latencia es menor o igual a `latenciaMaximaMs`, retorna `{ ok: true, latenciaMs }`. Si la latencia supera el límite, retorna `{ ok: false, error: "Latencia alta superó el umbral" }`. Prueba con una respuesta rápida.',
          starterCode: `async function ejecutarSmokeTest(peticionSaludFn, latenciaMaximaMs = 800) {
  // Mide tiempo y evalúa respuesta y latencia
}

const mockHealth = async () => ({ status: 200 });

async function probar() {
  const res = await ejecutarSmokeTest(mockHealth, 800);
  console.log("Resultado Smoke Test:", res.ok);
}

probar();`,
          hints: [
            'const inicio = performance.now();',
            'const res = await peticionSaludFn();',
            'const duracion = Math.round(performance.now() - inicio);',
            'if (res.status === 200 && duracion <= latenciaMaximaMs) return { ok: true, latenciaMs: duracion };',
            'return { ok: false, error: "Latencia alta superó el umbral" };'
          ],
          solutionCode: `async function ejecutarSmokeTest(peticionSaludFn, latenciaMaximaMs = 800) {
  const inicio = performance.now();
  try {
    const res = await peticionSaludFn();
    const duracion = Math.round(performance.now() - inicio);
    if (res.status === 200 && duracion <= latenciaMaximaMs) {
      return { ok: true, latenciaMs: duracion };
    }
    return { ok: false, error: "Latencia alta superó el umbral o status no fue 200" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const mockHealth = async () => ({ status: 200 });

async function probar() {
  const res = await ejecutarSmokeTest(mockHealth, 800);
  console.log("Resultado Smoke Test:", res.ok);
}

probar();`,
          solutionExplanation: 'Los smoke tests post-despliegue permiten verificar de inmediato si la aplicación está respondiendo rápidamente antes de que los usuarios la visiten.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm7-l5-ex3',
          title: 'Generador de Ficha Técnica de Proyecto para Portafolio (Reto)',
          level: 'reto',
          instruction: 'Crea una función `generarFichaPortafolio(proyecto)` que reciba `{ titulo, descripcion, stackTecnico: [], repoGithub, demoUrl }`. Debe validar que todas las propiedades existan y retornar un string formateado en Markdown listo para pegar en el README o portafolio. Debe incluir el título como encabezado "#", la descripción, una lista con viñetas del stack técnico y los enlaces formateados `[Ver Demo](demoUrl)` y `[Código en GitHub](repoGithub)`. Pruébala e imprime la ficha generada.',
          starterCode: `function generarFichaPortafolio(proyecto) {
  // Construye la ficha en Markdown
}

const miProyectoFinal = {
  titulo: "DevTask Pro - Gestor Full Stack",
  descripcion: "Plataforma completa de productividad con proyectos, tareas en tiempo real y autenticación JWT.",
  stackTecnico: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma"],
  repoGithub: "https://github.com/usuario/devtask-pro",
  demoUrl: "https://devtask-pro.vercel.app"
};

console.log(generarFichaPortafolio(miProyectoFinal));`,
          hints: [
            'Usa template literals estructurados en Markdown',
            'Mapea stackTecnico con p => "- " + p',
            'Incluye enlaces en formato [Ver Demo](url)'
          ],
          solutionCode: `function generarFichaPortafolio(proyecto) {
  if (!proyecto.titulo || !proyecto.descripcion || !proyecto.repoGithub || !proyecto.demoUrl) {
    throw new Error("Faltan datos obligatorios para la ficha");
  }

  const stackMd = (proyecto.stackTecnico || []).map(s => \`• \${s}\`).join('\\n');

  return \`# \${proyecto.titulo}

\${proyecto.descripcion}

### 🛠️ Tecnologías Utilizadas:
\${stackMd}

### 🔗 Enlaces del Proyecto:
- 🚀 **Demo en Vivo:** [\${proyecto.demoUrl}](\${proyecto.demoUrl})
- 💻 **Código en GitHub:** [\${proyecto.repoGithub}](\${proyecto.repoGithub})\`;
}

const miProyectoFinal = {
  titulo: "DevTask Pro - Gestor Full Stack",
  descripcion: "Plataforma completa de productividad con proyectos, tareas en tiempo real y autenticación JWT.",
  stackTecnico: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma"],
  repoGithub: "https://github.com/usuario/devtask-pro",
  demoUrl: "https://devtask-pro.vercel.app"
};

console.log(generarFichaPortafolio(miProyectoFinal));`,
          solutionExplanation: 'Documentar tus proyectos con demos funcionales y repositorios limpios en GitHub es la mejor carta de presentación para entrevistas laborales y clientes.',
          testCheck: {
            type: 'output-contains',
            expected: 'DevTask Pro',
          },
        },
      ],
      quiz: [
        {
          id: 'm7-l5-q1',
          question: '¿Qué comando de Prisma se debe utilizar para aplicar migraciones en un servidor de producción?',
          options: [
            'npx prisma migrate dev',
            'npx prisma migrate deploy',
            'npm start prisma',
            'git push prisma',
          ],
          correctIndex: 1,
          explanation: '"npx prisma migrate deploy" es el comando oficial diseñado para producción: aplica las migraciones pendientes sin generar archivos nuevos ni pedir confirmaciones interactivas.',
        },
        {
          id: 'm7-l5-q2',
          question: '¿Qué es una Prueba de Humo (Smoke Test) en el contexto de despliegue a producción?',
          options: [
            'Verificar que el servidor físico no esté sobrecalentado.',
            'Una prueba rápida y superficial inmediatamente posterior al despliegue para comprobar que las rutas principales y funciones críticas responden antes de anunciar el lanzamiento.',
            'Un tipo de prueba que solo se hace de noche.',
            'Eliminar la base de datos de producción para probar si se recupera sola.',
          ],
          correctIndex: 1,
          explanation: 'Los Smoke Tests confirman que el sistema desplegado no tiene fallos catastróficos inmediatos (que "no sale humo" de la app) y está listo para recibir tráfico.',
        },
        {
          id: 'm7-l5-q3',
          question: '¿Por qué se despliega el frontend (Vercel) y el backend (Render) en servicios especializados separados en lugar de un solo servidor?',
          options: [
            'Porque Vercel ofrece una red de distribución global (CDN/Edge) ultra veloz para archivos estáticos, mientras que Render proporciona un entorno persistente ideal para Node.js y bases de datos.',
            'Porque la ley prohíbe tener React y Node en la misma computadora.',
            'Porque Vercel no admite código en JavaScript.',
            'No hay ninguna razón; es simplemente una moda.',
          ],
          correctIndex: 0,
          explanation: 'Desacoplar la infraestructura permite aprovechar las ventajas de rendimiento de las redes CDN mundiales para la interfaz y servidores optimizados para cómputo en el backend.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El despliegue en producción conecta la base de datos gestionada, el backend en la nube y el frontend en Edge Networks.',
          'El comando "prisma migrate deploy" garantiza migraciones no destructivas seguras en producción.',
          'Realizar Smoke Tests y documentar el proyecto con demos funcionales culmina tu formación como desarrollador Full Stack.',
        ],
        commonPitfalls: [
          'Usar "prisma migrate dev" en producción en lugar de "prisma migrate deploy", arriesgándose a reinicios no deseados de la base de datos.',
          'Olvidar configurar las variables de entorno en el panel de Vercel y Render antes de presionar desplegar.',
          'No probar el flujo completo con una cuenta de usuario nueva en modo incógnito tras el lanzamiento.',
        ],
      },
      xpReward: 50,
    },
  ],
};
