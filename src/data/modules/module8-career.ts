import type { Module } from '../../types/curriculum';

export const MODULE_8_CAREER: Module = {
  id: 8,
  slug: 'carrera-profesional',
  title: '8. Carrera Profesional y Empleo',
  description: 'Todo lo que necesitas para conseguir tu primer empleo tecnológico o clientes freelance: portafolio de alto impacto, CV optimizado para ATS, simulacros de entrevistas técnicas, código limpio y mentalidad para seguir aprendiendo.',
  icon: 'Briefcase',
  color: 'cyan',
  badge: {
    id: 'modulo-8-maestro',
    name: 'Programador Profesional',
    description: 'Completaste la ruta completa y tienes todo listo para postularte a empleos tecnológicos.',
    icon: 'Trophy',
    category: 'modulo',
  },
  lessons: [
    // LECCIÓN 1: PORTAFOLIO TÉCNICO DE ALTO IMPACTO
    {
      id: 'm8-l1-portafolio-tecnico-de-alto-impacto',
      moduleId: 8,
      slug: 'portafolio-tecnico-de-alto-impacto',
      title: 'El Portafolio Técnico de Alto Impacto: Menos Tutoriales, Más Soluciones Reales',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Diseñar un portafolio de proyectos que cautive a reclutadores y clientes: descartar proyectos genéricos de tutorial, estructurar 3 proyectos estrella con problemas del mundo real, demos en vivo funcionando en la nube y documentación impecable en GitHub.',
      realWorldAnalogy: {
        title: 'El Escaparate del Maestro Artesano vs El Catálogo de Fotocopias',
        analogy: 'Un reclutador técnico de una empresa internacional revisa más de 100 candidaturas cada semana. El 90% de los aspirantes presentan exactamente los mismos proyectos clonados de tutoriales de YouTube: una lista de tareas (To-Do list) básica, una calculadora o una Pokédex sencilla.\n\nEs como entrar a una tienda de muebles y ver 50 mesas de plástico idénticas:\n• No destacan.\n• No demuestran cómo piensas ante problemas complejos.\n• No prueban que sepas conectar una base de datos real o manejar errores.\n\nTu portafolio debe ser el **escaparate del maestro artesano**: **3 proyectos estrella pulidos** que resuelvan necesidades reales. Cada proyecto tiene un botón *"Ver Demo en Vivo"* que abre en 1 segundo en el navegador y un enlace a un repositorio en GitHub con un README visual y profesional.',
        whyItMatters: 'En la industria del software, lo que tú demuestras que sabes construir con tus manos tiene 10 veces más peso que cualquier título académico en papel.',
        iconName: 'FolderGit2',
      },
      explanation: {
        sections: [
          {
            heading: 'La Regla de los 3 Proyectos Estrella',
            content: 'No necesitas tener 20 proyectos a medias en tu GitHub. Concéntrate en 3 proyectos de alta calidad:\n\n1. **El Proyecto Insignia (Full Stack Completo):** Tu obra maestra (como DevTask Pro o ShopStack). Tiene frontend en React, backend en Node/Express, PostgreSQL con Prisma, autenticación JWT y despliegue real en producción.\n2. **El Proyecto de Integración o API Externa:** Una aplicación que resuelva un problema con datos reales (ej. un panel financiero que consuma APIs del clima, mapas o divisas en tiempo real).\n3. **El Proyecto de Dominio Específico o Multiplataforma:** Una PWA móvil o app de escritorio con Tauri que demuestre tu versatilidad técnica.',
          },
          {
            heading: 'Anatomía de un README de GitHub de 5 Estrellas',
            content: 'Tu README es la portada de tu trabajo. Debe incluir:\n\n• **Título claro y descripción en una frase** del valor que aporta.\n• **GIF o captura animada en acción** (la gente cree lo que ve).\n• **Enlaces destacados:** 🚀 Demo en Vivo y 📖 Documentación de la API.\n• **Insignias del Stack Tecnológico** (React, TypeScript, Tailwind, Node, Docker).\n• **Características Principales** con viñetas concisas.\n• **Instrucciones para correrlo localmente** en menos de 3 comandos (`git clone`, `npm install`, `npm run dev`).',
          },
          {
            heading: 'El Sitio Web de tu Portafolio',
            content: 'Mantenlo simple, rápido y responsivo:\n• Modo oscuro por defecto con alto contraste.\n• Cero animaciones lentas o intros innecesarias de 5 segundos.\n• Botones directos para contactarte por Email, LinkedIn y descargar tu CV.\n• Desplegado en Vercel o Netlify con tu propio dominio personalizado (`tunombre.dev`).',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Evaluador interactivo de calidad de portafolios técnicos:
function auditarPortafolio(candidato) {
  console.log(\`🔍 Auditando portafolio de: \${candidato.nombre}\`);
  let puntos = 0;
  const observaciones = [];

  // Criterio 1: Cantidad de proyectos estrella
  if (candidato.proyectos.length >= 3) {
    puntos += 30;
    console.log(" ✅ Cantidad adecuada de proyectos estrella (+30 pts)");
  } else {
    observaciones.push("Se recomienda tener al menos 3 proyectos completos.");
  }

  // Criterio 2: Todos los proyectos tienen Demo en Vivo con HTTPS
  const todosTienenDemo = candidato.proyectos.every(p => p.demoUrl && p.demoUrl.startsWith("https://"));
  if (todosTienenDemo) {
    puntos += 35;
    console.log(" ✅ Todos los proyectos tienen Demo en vivo con HTTPS (+35 pts)");
  } else {
    observaciones.push("Al menos un proyecto carece de Demo en vivo desplegado.");
  }

  // Criterio 3: Proyectos resuelven problemas reales (No solo ToDo list básico)
  const tieneProyectosAvanzados = candidato.proyectos.some(p => p.tieneAuth && p.tieneBaseDatos);
  if (tieneProyectosAvanzados) {
    puntos += 35;
    console.log(" ✅ Incluye aplicaciones Full Stack con autenticación y base de datos (+35 pts)");
  } else {
    observaciones.push("Falta un proyecto Full Stack completo con base de datos y autenticación.");
  }

  console.log(\`\\n📊 Calificación de Empleabilidad: \${puntos}/100 pts\`);
  if (observaciones.length > 0) {
    console.log("💡 Oportunidades de mejora:", observaciones);
  } else {
    console.log("🎉 ¡Portafolio de nivel profesional listo para postularte!");
  }
}

const miPortafolio = {
  nombre: "Alex Developer",
  proyectos: [
    { titulo: "DevTask Pro", demoUrl: "https://devtask.vercel.app", tieneAuth: true, tieneBaseDatos: true },
    { titulo: "ClimaRadar PWA", demoUrl: "https://climaradar.vercel.app", tieneAuth: false, tieneBaseDatos: false },
    { titulo: "E-Commerce API", demoUrl: "https://api-shop.onrender.com", tieneAuth: true, tieneBaseDatos: true }
  ]
};

auditarPortafolio(miPortafolio);`,
        explanation: 'Ejecuta el evaluador para analizar los tres factores que más diferencian a un portafolio senior de uno principiante.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm8-l1-ex1',
          title: 'Validador de tarjeta de proyecto para portafolio',
          level: 'facil',
          instruction: 'Crea una función `validarTarjetaProyecto(proyecto)` que compruebe que el objeto contenga: `titulo` (string no vacío), `descripcion` (string de al menos 20 caracteres), `demoUrl` (que empiece con "https://") y `repoGithub` (que contenga "github.com"). Si cumple todas las reglas retorna `{ aprobado: true }`, de lo contrario `{ aprobado: false, faltantes: [...] }`. Pruébala con un proyecto válido.',
          starterCode: `function validarTarjetaProyecto(proyecto) {
  // Valida campos indispensables
}

const miProyecto = {
  titulo: "RutaFullStack Platform",
  descripcion: "Plataforma educativa interactiva con editor de código y gamificación en tiempo real.",
  demoUrl: "https://rutafullstack.com",
  repoGithub: "https://github.com/usuario/rutafullstack"
};

console.log(validarTarjetaProyecto(miProyecto));`,
          hints: [
            'const faltantes = [];',
            'if (!proyecto.titulo) faltantes.push("titulo");',
            'if (!proyecto.descripcion || proyecto.descripcion.length < 20) faltantes.push("descripcion");',
            'if (!proyecto.demoUrl || !proyecto.demoUrl.startsWith("https://")) faltantes.push("demoUrl");',
            'if (!proyecto.repoGithub || !proyecto.repoGithub.includes("github.com")) faltantes.push("repoGithub");',
            'return faltantes.length === 0 ? { aprobado: true } : { aprobado: false, faltantes };'
          ],
          solutionCode: `function validarTarjetaProyecto(proyecto) {
  const faltantes = [];
  if (!proyecto || typeof proyecto !== 'object') {
    return { aprobado: false, faltantes: ["datos_invalidos"] };
  }
  if (!proyecto.titulo || typeof proyecto.titulo !== 'string' || proyecto.titulo.trim().length === 0) {
    faltantes.push("titulo");
  }
  if (!proyecto.descripcion || typeof proyecto.descripcion !== 'string' || proyecto.descripcion.length < 20) {
    faltantes.push("descripcion");
  }
  if (!proyecto.demoUrl || typeof proyecto.demoUrl !== 'string' || !proyecto.demoUrl.startsWith("https://")) {
    faltantes.push("demoUrl");
  }
  if (!proyecto.repoGithub || typeof proyecto.repoGithub !== 'string' || !proyecto.repoGithub.includes("github.com")) {
    faltantes.push("repoGithub");
  }

  return faltantes.length === 0 ? { aprobado: true } : { aprobado: false, faltantes };
}

const miProyecto = {
  titulo: "RutaFullStack Platform",
  descripcion: "Plataforma educativa interactiva con editor de código y gamificación en tiempo real.",
  demoUrl: "https://rutafullstack.com",
  repoGithub: "https://github.com/usuario/rutafullstack"
};

console.log(validarTarjetaProyecto(miProyecto));`,
          solutionExplanation: 'Tener una descripción clara, una demo funcionando y el código abierto en GitHub es la tríada que valida la autenticidad de tu trabajo ante los reclutadores.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm8-l1-ex2',
          title: 'Generador de insignias Shields.io para GitHub README',
          level: 'medio',
          instruction: 'Crea una función `generarInsigniasMarkdown(tecnologias)` que reciba un array de nombres de tecnologías `["React", "TypeScript", "PostgreSQL"]` y retorne un array de imágenes Markdown de Shields.io: `![Nombre](https://img.shields.io/badge/-Nombre-black?style=flat&logo=Nombre)`. Prueba con el array dado e imprime la primera insignia.',
          starterCode: `function generarInsigniasMarkdown(tecnologias) {
  // Retorna array de strings con formato de imagen Markdown
}

const tags = ["React", "TypeScript", "PostgreSQL"];
const badges = generarInsigniasMarkdown(tags);
console.log("Primera insignia generada:", badges[0]);`,
          hints: [
            'Usa tecnologias.map(t => \`![\${t}](https://img.shields.io/badge/-\${t}-black?style=flat&logo=\${t.toLowerCase()})\`)'
          ],
          solutionCode: `function generarInsigniasMarkdown(tecnologias) {
  return tecnologias.map(t => {
    const slug = encodeURIComponent(t);
    return \`![\${t}](https://img.shields.io/badge/-\${slug}-black?style=flat&logo=\${slug.toLowerCase()})\`;
  });
}

const tags = ["React", "TypeScript", "PostgreSQL"];
const badges = generarInsigniasMarkdown(tags);
console.log("Primera insignia generada:", badges[0]);`,
          solutionExplanation: 'Las insignias visuales en el encabezado de un README transmiten profesionalismo y permiten a los evaluadores escanear rápidamente las tecnologías utilizadas.',
          testCheck: {
            type: 'output-contains',
            expected: 'shields.io',
          },
        },
        {
          id: 'm8-l1-ex3',
          title: 'Clasificador de proyectos por valor diferencial (Reto)',
          level: 'reto',
          instruction: 'Crea una función `evaluarDiferenciacionProyecto(proyecto)` que analice un objeto `{ titulo, caracteristicas: [] }`. Si el título o características contienen términos genéricos como "todo list", "pokedex", "calculadora" o "clon simple", le asigna la categoría "GENERICO". Si incluye características avanzadas como "autenticacion jwt", "base de datos", "websockets", "pagos" o "docker", le asigna "ALTO_VALOR". Si no encaja en ninguno, le asigna "ESTANDAR". Prueba con un proyecto que incluya autenticación y pagos.',
          starterCode: `function evaluarDiferenciacionProyecto(proyecto) {
  // Clasifica en GENERICO, ESTANDAR o ALTO_VALOR
}

const proyectoPro = {
  titulo: "Plataforma de Cursos Online",
  caracteristicas: ["autenticacion jwt", "pagos con stripe", "base de datos postgres"]
};

console.log("Categoría del proyecto:", evaluarDiferenciacionProyecto(proyectoPro));`,
          hints: [
            'Convierte todo a minúsculas para evaluar',
            'Comprueba palabras avanzadas para ALTO_VALOR',
            'Comprueba palabras genéricas para GENERICO'
          ],
          solutionCode: `function evaluarDiferenciacionProyecto(proyecto) {
  const textoCompleto = (proyecto.titulo + ' ' + (proyecto.caracteristicas || []).join(' ')).toLowerCase();
  
  const palabrasAvanzadas = ['autenticacion', 'jwt', 'base de datos', 'websockets', 'pagos', 'docker', 'monorepo'];
  const palabrasGenericas = ['todo list', 'pokedex', 'calculadora', 'clon simple'];

  const esAvanzado = palabrasAvanzadas.some(p => textoCompleto.includes(p));
  const esGenerico = palabrasGenericas.some(p => textoCompleto.includes(p));

  if (esAvanzado && !esGenerico) return "ALTO_VALOR";
  if (esGenerico) return "GENERICO";
  return "ESTANDAR";
}

const proyectoPro = {
  titulo: "Plataforma de Cursos Online",
  caracteristicas: ["autenticacion jwt", "pagos con stripe", "base de datos postgres"]
};

console.log("Categoría del proyecto:", evaluarDiferenciacionProyecto(proyectoPro));`,
          solutionExplanation: 'Los proyectos que integran autenticación segura, bases de datos reales y flujos de negocio son los que diferencian a un candidato senior de los cientos de postulantes junior.',
          testCheck: {
            type: 'output-contains',
            expected: 'ALTO_VALOR',
          },
        },
      ],
      quiz: [
        {
          id: 'm8-l1-q1',
          question: '¿Por qué se desaconseja llenar el portafolio con proyectos como una "ToDo List básica" o una "Calculadora simple"?',
          options: [
            'Porque las computadoras modernas ya traen calculadora instalada.',
            'Porque son proyectos comunes de tutorial que no demuestran arquitectura compleja, diseño de bases de datos, manejo de errores ni originalidad ante un reclutador.',
            'Porque JavaScript prohíbe crear listas de tareas.',
            'Porque pesan demasiado en la memoria.',
          ],
          correctIndex: 1,
          explanation: 'Los reclutadores ven cientos de proyectos de tutorial idénticos al día. Para destacar, debes mostrar aplicaciones que resuelvan problemas reales con bases de datos y autenticación.',
        },
        {
          id: 'm8-l1-q2',
          question: '¿Cuál es el elemento más importante que debe tener cada proyecto en tu portafolio?',
          options: [
            'Un video musical de fondo.',
            'Un enlace a una "Demo en Vivo" funcionando en producción con HTTPS para que el evaluador pueda probar la app en 5 segundos sin instalar nada.',
            'Una lista de 50 librerías de npm que no se usan.',
            'El logotipo de tu universidad en tamaño gigante.',
          ],
          correctIndex: 1,
          explanation: 'La gran mayoría de evaluadores no van a descargar tu código para compilarlo localmente; probar la demo en vivo es la forma inmediata en que comprueban tus capacidades.',
        },
        {
          id: 'm8-l1-q3',
          question: '¿Qué información NUNCA debe faltar en el archivo README de tu proyecto en GitHub?',
          options: [
            'El horóscopo del desarrollador.',
            'Descripción del problema resuelto, tecnologías usadas, enlace a la demo en vivo y comandos sencillos para ejecutarlo localmente.',
            'La contraseña de tu correo electrónico.',
            'Las notas de tus exámenes de la escuela.',
          ],
          correctIndex: 1,
          explanation: 'Un README profesional actúa como la carta de presentación técnica de tu proyecto facilitando la comprensión y evaluación del código.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Calidad supera a cantidad: 3 proyectos estrella completos valen mucho más que 20 tutoriales a medias.',
          'Cada proyecto debe tener un enlace directo a su demo en vivo y un README visual con capturas animadas.',
          'Demostrar capacidades Full Stack reales (autenticación, bases de datos y despliegue) te posiciona en el 10% superior de candidatos.',
        ],
        commonPitfalls: [
          'Tener proyectos en el portafolio cuyos enlaces de demo dan error 404 o están caídos.',
          'Subir repositorios a GitHub con el README por defecto que genera Vite o Create React App sin personalizar.',
          'Crear un sitio de portafolio recargado de animaciones pesadas que tarda 8 segundos en cargar en conexiones móviles.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 2: CV TÉCNICO Y LINKEDIN PARA PROGRAMADORES
    {
      id: 'm8-l2-curriculum-vitae-y-linkedin-tech',
      moduleId: 8,
      slug: 'curriculum-vitae-y-linkedin-para-programadores',
      title: 'CV Técnico y LinkedIn: Cómo Superar los Filtros ATS y Atraer Reclutadores',
      order: 2,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Redactar un currículum vitae técnico optimizado para superar los filtros automáticos de los sistemas ATS, aplicar la fórmula de impacto XYZ de Google y convertir tu perfil de LinkedIn en un imán de oportunidades laborales internacionales.',
      realWorldAnalogy: {
        title: 'La Tarjeta de Embarque Prioritaria para el Vuelo',
        analogy: 'En los aeropuertos modernos, cuando pasas por las puertas de embarque automáticas, un lector láser escanea tu pase de abordar en medio segundo:\n\n• Si el código de barras tiene un diseño extraño o el papel está lleno de dibujos innecesarios, la máquina pita en rojo y no se abre.\n• En los departamentos de talento de empresas como Amazon, Google, Mercado Libre o startups de Silicon Valley ocurre lo mismo: utilizan software **ATS (Applicant Tracking System)** que escanea cientos de CVs en PDF buscando palabras clave técnicas exactas (`React`, `TypeScript`, `Node.js`, `PostgreSQL`, `Docker`).\n\nSi pones barras de progreso de colores (*"JavaScript: 85%"*), tablas complejas o diseños multicolores de diseñador gráfico, el software se confunde y descarta tu postulación automáticamente antes de que un ojo humano llegue a leerla.',
        whyItMatters: 'Un CV técnico estructurado con precisión y una presencia activa en LinkedIn pueden multiplicar por 5 el número de entrevistas laborales que recibes cada mes.',
        iconName: 'FileCheck',
      },
      explanation: {
        sections: [
          {
            heading: 'La Fórmula de Impacto XYZ de Google',
            content: 'En lugar de escribir descripciones pasivas y aburridas, los ingenieros de Google utilizan la fórmula XYZ:\n\n> **"Logré [X], medido por [Y], haciendo [Z]."**\n\n• **Forma Pasiva Novata:** *"Trabajé en el frontend haciendo componentes con React."*\n• **Forma Profesional con Fórmula XYZ:** *"Desarrollé la interfaz de usuario con React y Tailwind CSS, **reduciendo el tiempo de carga en un 38%** y **aumentando la retención de usuarios**, mediante la implementación de lazy loading y componentes modularizados."*\n\nLas empresas no contratan horas de teclado; contratan **resultados medibles**.',
          },
          {
            heading: 'Estructura Óptima del CV Técnico (1 Sola Página)',
            content: '1. **Encabezado:** Nombre, Rol (*Full Stack Developer*), Ciudad/País, Email, Teléfono, LinkedIn, GitHub y Portafolio Web (¡con enlaces clicables!).\n2. **Habilidades Técnicas Agrupadas:**\n   • *Lenguajes:* JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3.\n   • *Frontend:* React, Tailwind CSS, Responsive Design, Context API.\n   • *Backend & DB:* Node.js, Express, PostgreSQL, Prisma ORM, REST APIs, JWT.\n   • *DevOps & Herramientas:* Docker, Git/GitHub, GitHub Actions, Vercel, Render.\n3. **Proyectos Destacados:** 2 o 3 proyectos estrella con enlaces, viñetas de impacto y tecnologías.\n4. **Experiencia Laboral / Proyectos Freelance:** Con enfoque en logros y métricas.\n5. **Educación y Certificaciones:** Formación técnica y cursos relevantes.',
          },
          {
            heading: 'Optimización de Perfil de LinkedIn',
            content: '• **Titular (Headline):** No pongas solo *"Estudiante en búsqueda de empleo"*. Pon: *"Full Stack Developer | React, TypeScript, Node.js, PostgreSQL | Creando productos web escalables"*.\n• **Sección Acerca de mí:** Cuenta tu historia en primera persona, tu pasión por resolver problemas y lista tus tecnologías principales.\n• **Construir en Público (Building in Public):** Comparte publicaciones cortas sobre lo que aprendes cada semana. Los reclutadores buscan activamente profesionales con curiosidad y ganas de mejorar.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Transformador de viñetas tradicionales a viñetas con la Fórmula XYZ de Google:
function aplicarFormulaXYZ({ accionLograda, metricaImpacto, tecnologiaUsada }) {
  const vinetas = [
    \`Optimicé \${accionLograda}, logrando \${metricaImpacto}, mediante el uso de \${tecnologiaUsada}.\`,
    \`Desarrollé \${accionLograda}, reduciendo \${metricaImpacto}, implementando \${tecnologiaUsada}.\`,
    \`Diseñé e integré \${accionLograda}, aumentando \${metricaImpacto}, utilizando \${tecnologiaUsada}.\`
  ];
  return vinetas;
}

// Ejemplo práctico para una experiencia o proyecto:
const datosLogro = {
  accionLograda: "el sistema de autenticación y gestión de sesiones",
  metricaImpacto: "una reducción del 100% en tokens huérfanos y 40ms en tiempo de respuesta",
  tecnologiaUsada: "JWT con rotación de tokens y middlewares en Express con PostgreSQL"
};

const resultados = aplicarFormulaXYZ(datosLogro);
console.log("🚀 Viñetas de Alto Impacto para tu CV:");
resultados.forEach((v, i) => console.log(\` \${i+1}. \${v}\`));`,
        explanation: 'Modifica los datos para redactar las viñetas que colocarás en tu CV técnico destacando métricas de rendimiento y tecnologías.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm8-l2-ex1',
          title: 'Detector de métricas de impacto en viñetas de CV',
          level: 'facil',
          instruction: 'Crea una función `contieneMetricaImpacto(texto)` que verifique si una viñeta del currículum incluye métricas cuantitativas: debe detectar la presencia de números acompañados de símbolos como "%", "ms", "x", "segundos", "usuarios" o "dólares". Si contiene métricas retorna `true`, de lo contrario retorna `false`. Prueba con la frase: "Aceleró la carga en 45%".',
          starterCode: `function contieneMetricaImpacto(texto) {
  // Comprueba presencia de números y métricas
}

const frase = "Aceleró la carga en 45% usando React";
console.log("¿Tiene métrica cuantificada?:", contieneMetricaImpacto(frase));`,
          hints: [
            'Usa regex o comprobaciones de strings con indexOf/includes',
            'const tieneNumero = /\\d+/.test(texto);',
            'const tieneUnidad = ["%", "ms", "segundos", "minutos", "usuarios", "veces", "x"].some(u => texto.toLowerCase().includes(u));',
            'return tieneNumero && tieneUnidad;'
          ],
          solutionCode: `function contieneMetricaImpacto(texto) {
  if (!texto || typeof texto !== 'string') return false;
  const tieneNumero = /\\d+/.test(texto);
  const unidades = ['%', 'ms', 'segundos', 'minutos', 'usuarios', 'veces', 'x', '$'];
  const tieneUnidad = unidades.some(u => texto.toLowerCase().includes(u));
  return tieneNumero && tieneUnidad;
}

const frase = "Aceleró la carga en 45% usando React";
console.log("¿Tiene métrica cuantificada?:", contieneMetricaImpacto(frase));`,
          solutionExplanation: 'Los reclutadores y gerentes de ingeniería se sienten atraídos por viñetas que demuestran impacto cuantitativo verificable en lugar de descripciones genéricas.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm8-l2-ex2',
          title: 'Extractor de palabras clave de ofertas laborales (Filtro ATS)',
          level: 'medio',
          instruction: 'Crea una función `analizarCoincidenciaATS(descripcionEmpleo, habilidadesCandidato)` que cuente cuántas habilidades del candidato aparecen en el texto de la oferta de trabajo. Debe retornar `{ coincidencias: [...], porcentajeMatch: number }` (calculado sobre el total de habilidades de la oferta encontradas). Prueba con una oferta que busque "React", "TypeScript" y "Docker".',
          starterCode: `function analizarCoincidenciaATS(descripcionEmpleo, habilidadesCandidato) {
  // Compara habilidades presentes en el texto
}

const textoOferta = "Buscamos desarrollador Full Stack con experiencia en React, TypeScript, Node.js y Docker para proyectos ágiles.";
const misSkills = ["React", "TypeScript", "Docker", "PostgreSQL"];

console.log(analizarCoincidenciaATS(textoOferta, misSkills));`,
          hints: [
            'const textoMin = descripcionEmpleo.toLowerCase();',
            'const encontradas = habilidadesCandidato.filter(s => textoMin.includes(s.toLowerCase()));',
            'return { coincidencias: encontradas, porcentajeMatch: Math.round((encontradas.length / habilidadesCandidato.length) * 100) };'
          ],
          solutionCode: `function analizarCoincidenciaATS(descripcionEmpleo, habilidadesCandidato) {
  const textoMin = descripcionEmpleo.toLowerCase();
  const encontradas = habilidadesCandidato.filter(s => textoMin.includes(s.toLowerCase()));
  const porcentaje = Math.round((encontradas.length / habilidadesCandidato.length) * 100);

  return {
    coincidencias: encontradas,
    porcentajeMatch: porcentaje
  };
}

const textoOferta = "Buscamos desarrollador Full Stack con experiencia en React, TypeScript, Node.js y Docker para proyectos ágiles.";
const misSkills = ["React", "TypeScript", "Docker", "PostgreSQL"];

console.log(analizarCoincidenciaATS(textoOferta, misSkills));`,
          solutionExplanation: 'Alinear las palabras clave de tu CV con las tecnologías exactas mencionadas en la oferta de empleo es la estrategia número uno para superar los filtros de software ATS.',
          testCheck: {
            type: 'output-contains',
            expected: 'coincidencias',
          },
        },
        {
          id: 'm8-l2-ex3',
          title: 'Generador de Titular optimizado para LinkedIn (Reto)',
          level: 'reto',
          instruction: 'Crea una función `generarTitularLinkedIn({ rol, tecnologiasPrincipales, propuestaValor })` que ensamble el titular profesional con el separador " | ". Debe validar que el resultado no supere los 120 caracteres de longitud máxima recomendada para que no se corte en teléfonos móviles. Si supera el límite, debe truncar la propuesta de valor con "...". Prueba generando un titular para Full Stack Developer.',
          starterCode: `function generarTitularLinkedIn({ rol, tecnologiasPrincipales, propuestaValor }) {
  // Ensambla y respeta el límite de 120 caracteres
}

const configTitular = {
  rol: "Full Stack Developer",
  tecnologiasPrincipales: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  propuestaValor: "Construyendo soluciones web escalables y de alto rendimiento"
};

console.log(generarTitularLinkedIn(configTitular));`,
          hints: [
            'const techs = tecnologiasPrincipales.join(", ");',
            'let titular = \`\${rol} | \${techs} | \${propuestaValor}\`;',
            'if (titular.length > 120) titular = titular.substring(0, 117) + "..."; return titular;'
          ],
          solutionCode: `function generarTitularLinkedIn({ rol, tecnologiasPrincipales, propuestaValor }) {
  const techs = tecnologiasPrincipales.join(', ');
  let titular = \`\${rol} | \${techs} | \${propuestaValor}\`;

  if (titular.length > 120) {
    titular = titular.substring(0, 117) + '...';
  }
  return titular;
}

const configTitular = {
  rol: "Full Stack Developer",
  tecnologiasPrincipales: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  propuestaValor: "Construyendo soluciones web escalables y de alto rendimiento"
};

console.log(generarTitularLinkedIn(configTitular));`,
          solutionExplanation: 'Un titular con palabras clave claras permite que los reclutadores que buscan en LinkedIn Recruiter te encuentren en los primeros resultados de búsqueda.',
          testCheck: {
            type: 'output-contains',
            expected: 'Full Stack Developer',
          },
        },
      ],
      quiz: [
        {
          id: 'm8-l2-q1',
          question: '¿Por qué se debe evitar colocar barras de porcentaje (ej. "JavaScript: 80%") en un CV técnico?',
          options: [
            'Porque ocupan mucha tinta al imprimir.',
            'Porque son subjetivas e imposibles de medir (¿qué significa 80% de un lenguaje?), y además confunden a los escáneres ATS automáticos.',
            'Porque JavaScript no permite porcentajes.',
            'Porque la ley prohíbe los números en los currículums.',
          ],
          correctIndex: 1,
          explanation: 'Nadie sabe qué representa un "80% de JavaScript". Los reclutadores prefieren ver una lista limpia de tecnologías y viñetas con proyectos reales donde las aplicaste.',
        },
        {
          id: 'm8-l2-q2',
          question: '¿Qué fórmula recomienda Google para redactar logros impactantes en un currículum técnico?',
          options: [
            'La fórmula ABC: Action, Benefit, Close.',
            'La fórmula XYZ: "Logré [X], medido por [Y], haciendo [Z]".',
            'La fórmula de Pitágoras.',
            'La fórmula FIFO: First In, First Out.',
          ],
          correctIndex: 1,
          explanation: 'La fórmula XYZ de Google conecta claramente la acción realizada con una métrica cuantificable y la tecnología empleada.',
        },
        {
          id: 'm8-l2-q3',
          question: '¿Cuál es la longitud ideal para el CV de un programador con menos de 5 años de experiencia?',
          options: [
            '4 páginas detallando cada tarea desde la escuela.',
            'Exactamente 1 sola página bien estructurada y legible.',
            '10 diapositivas de PowerPoint.',
            'Un libro empastado de 50 páginas.',
          ],
          correctIndex: 1,
          explanation: 'Un CV de 1 sola página demuestra capacidad de síntesis, respeto por el tiempo del reclutador y permite escanear tus logros en menos de 10 segundos.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Los filtros ATS buscan palabras clave específicas; usa formatos limpios de una página sin columnas complejas.',
          'Aplica la fórmula XYZ de Google cuantificando el impacto de tus proyectos con porcentajes y métricas.',
          'Optimiza tu titular de LinkedIn con tus tecnologías clave para aparecer en búsquedas directas de reclutadores.',
        ],
        commonPitfalls: [
          'Incluir barras de porcentaje o gráficos de estrellas en las habilidades en lugar de listas agrupadas limpias.',
          'No poner enlaces clicables directos a tu GitHub, LinkedIn y portafolio web en el encabezado del CV.',
          'Enviar el mismo CV genérico a 50 empresas distintas sin adaptar las palabras clave a la oferta específica.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 3: ENTREVISTAS TÉCNICAS Y LIVE CODING (MÉTODO REACTO)
    {
      id: 'm8-l3-entrevistas-tecnicas-y-live-coding',
      moduleId: 8,
      slug: 'entrevistas-tecnicas-algoritmos-y-live-coding',
      title: 'La Entrevista Técnica: Algoritmos, Live Coding y el Método REACTO',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Avanzado',
      objective: 'Aprender a superar entrevistas técnicas de programación en vivo utilizando el framework estructurado REACTO, comunicar tus pensamientos en voz alta bajo presión y analizar la complejidad temporal y espacial con notación Big-O.',
      realWorldAnalogy: {
        title: 'El Copiloto de Rally y Pensar en Voz Alta',
        analogy: 'En una carrera de rally a 180 km/h por caminos de tierra, el copiloto nunca se queda en silencio con la cabeza agachada mirando el mapa:\n\n• Si el copiloto no habla, el piloto va a ciegas y se estrellan en la primera curva.\n• En una entrevista técnica de **Live Coding**, tu entrevistador no solo quiere ver el código final; **quiere escuchar cómo razona tu mente**.\n\nSi te dan un problema de algoritmos y te quedas callado durante 15 minutos tecleando en silencio, el evaluador no sabe si estás bloqueado, si vas por buen camino o si estás adivinando.\n\nSi hablas en voz alta, explicas tu estrategia antes de escribir código y preguntas por casos límite, el entrevistador te verá como un compañero de equipo comunicativo y te dará pistas si te desvías.',
        whyItMatters: 'Muchos candidatos brillantes quedan fuera de procesos de selección no por falta de conocimientos de código, sino por no saber comunicar su proceso de pensamiento durante la entrevista.',
        iconName: 'Code2',
      },
      explanation: {
        sections: [
          {
            heading: 'El Framework REACTO: Tu Guía Paso a Paso',
            content: '1. **R - Repeat (Repetir):** Repite el problema con tus propias palabras para confirmar que entendiste y no hay malentendidos.\n2. **E - Examples (Ejemplos):** Escribe 2 ejemplos de entrada y salida, incluyendo casos límite (¿qué pasa si el array viene vacío? ¿si hay números negativos?).\n3. **A - Approach (Estrategia):** Explica tu plan antes de escribir código. Menciona primero la solución por fuerza bruta y luego cómo optimizarla.\n4. **C - Code (Codificar):** Escribe código limpio con nombres descriptivos de variables.\n5. **T - Test (Probar):** Haz una prueba de escritorio mental pasando uno de tus ejemplos línea por línea.\n6. **O - Optimize (Optimizar):** Analiza la complejidad Big-O temporal y espacial (ej. *"Esta solución toma O(n) tiempo y O(1) memoria"*).',
          },
          {
            heading: 'Notación Big-O Simplificada',
            content: '• **O(1) - Tiempo Constante:** Acceso inmediato a un array por índice (`array[0]`) o a un Map por clave. Es instantáneo.\n• **O(n) - Tiempo Lineal:** Un bucle que recorre todos los elementos una vez.\n• **O(n²) - Tiempo Cuadrático:** Bucles anidados (un bucle dentro de otro bucle). Peligroso para conjuntos de datos grandes.\n• **O(log n) - Tiempo Logarítmico:** Búsqueda binaria (divide el problema a la mitad en cada paso).',
          },
          {
            heading: 'Preguntas Inversas: Cuando te dicen "¿Tienes alguna pregunta para nosotros?"',
            content: 'Jamás digas *"No, todo claro"*. Esta es tu oportunidad de oro para demostrar interés genuino:\n• *"¿Cómo es el proceso habitual de Code Review en el equipo?"*\n• *"¿Cuál ha sido el mayor reto técnico que el equipo ha resuelto en el último trimestre?"*\n• *"¿Cómo equilibran la entrega de nuevas funcionalidades con el pago de deuda técnica?"*',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Demostración del Problema Clásico "Two Sum" usando el método REACTO:
// Problema: Dado un array de números y un objetivo, encuentra los dos índices que sumen el objetivo.

// Estrategia 1: Fuerza Bruta con bucles anidados -> O(n²) tiempo
function twoSumFuerzaBruta(nums, objetivo) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === objetivo) {
        return [i, j];
      }
    }
  }
  return [];
}

// Estrategia 2: Optimizada con Hash Map en una sola pasada -> O(n) tiempo y O(n) espacio
function twoSumOptimizado(nums, objetivo) {
  console.log(\`🔍 Buscando suma para objetivo: \${objetivo} en array: \${JSON.stringify(nums)}\`);
  const mapaComplementos = new Map(); // Guarda: valor -> índice

  for (let i = 0; i < nums.length; i++) {
    const complemento = objetivo - nums[i];
    console.log(\` Paso \${i+1}: Evaluando número \${nums[i]} (necesitamos complemento: \${complemento})\`);

    if (mapaComplementos.has(complemento)) {
      const indicePrevio = mapaComplementos.get(complemento);
      console.log(\` 🎉 ¡Encontrado! Complemento \${complemento} estaba en índice \${indicePrevio}\`);
      return [indicePrevio, i];
    }

    mapaComplementos.set(nums[i], i);
  }
  return [];
}

const resultado = twoSumOptimizado([2, 7, 11, 15], 9);
console.log("Índices resultantes:", resultado);`,
        explanation: 'Observa cómo usar un Map reduce la complejidad de O(n²) a O(n), pasando de una solución novata a una respuesta de nivel senior.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm8-l3-ex1',
          title: 'Algoritmo de Palíndromo con limpieza de caracteres',
          level: 'facil',
          instruction: 'Crea una función `esPalindromoValido(cadena)` que determine si una cadena se lee igual al derecho y al revés ignorando mayúsculas, espacios y caracteres no alfanuméricos. Prueba con "Anita lava la tina" e imprime el resultado.',
          starterCode: `function esPalindromoValido(cadena) {
  // Limpia caracteres y compara con invertido
}

console.log("¿Es palíndromo?:", esPalindromoValido("Anita lava la tina"));`,
          hints: [
            'Limpia con cadena.toLowerCase().replace(/[^a-z0-9]/g, "")',
            'Compara textoLimpio === textoLimpio.split("").reverse().join("")'
          ],
          solutionCode: `function esPalindromoValido(cadena) {
  if (typeof cadena !== 'string') return false;
  const limpio = cadena.toLowerCase().replace(/[^a-z0-9]/g, '');
  const invertido = limpio.split('').reverse().join('');
  return limpio === invertido;
}

console.log("¿Es palíndromo?:", esPalindromoValido("Anita lava la tina"));`,
          solutionExplanation: 'Este problema evalúa la capacidad de normalizar entradas de texto y considerar casos límite en entrevistas iniciales.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm8-l3-ex2',
          title: 'Detección de duplicados en tiempo lineal O(n)',
          level: 'medio',
          instruction: 'Crea una función `encontrarPrimerDuplicado(arrayNumeros)` que retorne el primer número que aparezca por segunda vez en el array en tiempo lineal O(n). Si no hay duplicados, retorna -1. Debe utilizar un `Set` para no usar bucles anidados O(n²). Prueba con `[2, 1, 3, 5, 3, 2]`.',
          starterCode: `function encontrarPrimerDuplicado(arrayNumeros) {
  // Usa un Set para encontrar el primer número repetido
}

console.log("Primer duplicado:", encontrarPrimerDuplicado([2, 1, 3, 5, 3, 2]));`,
          hints: [
            'const vistos = new Set();',
            'for (const num of arrayNumeros) { if (vistos.has(num)) return num; vistos.add(num); }',
            'return -1;'
          ],
          solutionCode: `function encontrarPrimerDuplicado(arrayNumeros) {
  const vistos = new Set();
  for (const num of arrayNumeros) {
    if (vistos.has(num)) {
      return num;
    }
    vistos.add(num);
  }
  return -1;
}

console.log("Primer duplicado:", encontrarPrimerDuplicado([2, 1, 3, 5, 3, 2]));`,
          solutionExplanation: 'Utilizar un Set proporciona búsquedas en tiempo O(1), permitiendo resolver el problema en una sola pasada O(n) sin bucles anidados.',
          testCheck: {
            type: 'output-contains',
            expected: '3',
          },
        },
        {
          id: 'm8-l3-ex3',
          title: 'Aplanador recursivo de arrays anidados (Reto)',
          level: 'reto',
          instruction: 'En muchas entrevistas técnicas prohíben usar el método `.flat()` nativo para comprobar recursión. Crea una función `aplanarArrayRecursivo(arrayAnidado)` que tome un array con cualquier nivel de anidación (ej. `[1, [2, [3, 4], 5]]`) y retorne un único array plano `[1, 2, 3, 4, 5]`. Pruébala con el array dado.',
          starterCode: `function aplanarArrayRecursivo(arrayAnidado) {
  // Aplana recursivamente sin usar .flat()
}

const anidado = [1, [2, [3, 4], 5], 6];
console.log("Array aplanado:", aplanarArrayRecursivo(anidado));`,
          hints: [
            'const resultado = [];',
            'for (const item of arrayAnidado) { if (Array.isArray(item)) resultado.push(...aplanarArrayRecursivo(item)); else resultado.push(item); }',
            'return resultado;'
          ],
          solutionCode: `function aplanarArrayRecursivo(arrayAnidado) {
  const resultado = [];
  for (const item of arrayAnidado) {
    if (Array.isArray(item)) {
      resultado.push(...aplanarArrayRecursivo(item));
    } else {
      resultado.push(item);
    }
  }
  return resultado;
}

const anidado = [1, [2, [3, 4], 5], 6];
console.log("Array aplanado:", aplanarArrayRecursivo(anidado));`,
          solutionExplanation: 'La recursión es un concepto frecuentemente evaluado en entrevistas para medir el manejo de estructuras de datos en árbol y pilas de ejecución.',
          testCheck: {
            type: 'output-contains',
            expected: '1,2,3,4,5,6',
          },
        },
      ],
      quiz: [
        {
          id: 'm8-l3-q1',
          question: '¿Qué es lo más importante que evalúa un entrevistador técnico durante una sesión de Live Coding?',
          options: [
            'Que escribas el código sin hablar y lo más rápido posible.',
            'Tu capacidad de comunicación, cómo descompones el problema, cómo manejas casos límite y cómo razonas en voz alta.',
            'Que no cometas ninguna falta ortográfica en los comentarios.',
            'El teclado mecánico que estás utilizando.',
          ],
          correctIndex: 1,
          explanation: 'La entrevista técnica evalúa tus habilidades de colaboración y razonamiento estructurado; cómo llegas a la solución es tan importante como la solución misma.',
        },
        {
          id: 'm8-l3-q2',
          question: '¿Qué complejidad temporal tiene recorrer un array con un bucle simple de inicio a fin?',
          options: [
            'O(1) - Constante',
            'O(n) - Lineal',
            'O(n²) - Cuadrática',
            'O(log n) - Logarítmica',
          ],
          correctIndex: 1,
          explanation: 'Un bucle simple que procesa cada uno de los "n" elementos una sola vez tiene una complejidad lineal O(n).',
        },
        {
          id: 'm8-l3-q3',
          question: '¿Qué debes hacer si te quedas atascado durante una entrevista técnica de programación en vivo?',
          options: [
            'Cerrar la llamada inmediatamente sin decir nada.',
            'Explicar con calma en voz alta dónde está la duda, qué has intentado hasta ahora y solicitar una aclaración o pista al entrevistador.',
            'Adivinar números al azar.',
            'Decir que el lenguaje de programación no sirve.',
          ],
          correctIndex: 1,
          explanation: 'Pedir clarificaciones y comunicar con madurez dónde está el bloqueo demuestra profesionalismo y capacidad de trabajar en equipo.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El framework REACTO aporta estructura y calma para resolver cualquier ejercicio de programación.',
          'Pensar en voz alta transforma la entrevista en una conversación colaborativa con tu futuro colega.',
          'Conocer las complejidades Big-O comunes (O(1), O(n), O(n²)) te permite justificar tus decisiones de diseño.',
        ],
        commonPitfalls: [
          'Empezar a escribir código inmediatamente sin haber confirmado las reglas y casos límite del problema.',
          'Quedarse en silencio absoluto durante minutos generando incertidumbre en el entrevistador.',
          'No tener preparadas preguntas inteligentes sobre el equipo y la empresa al final de la entrevista.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 4: CÓDIGO LIMPIO Y PRINCIPIOS SOLID
    {
      id: 'm8-l4-codigo-limpio-y-buenas-practicas',
      moduleId: 8,
      slug: 'codigo-limpio-principios-solid-y-refactorizacion',
      title: 'Código Limpio y Principios SOLID: Escribe Software para Humanos',
      order: 4,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Adoptar los estándares profesionales de ingeniería de software: escribir código legible y autodocumentado, aplicar los principios SOLID y DRY/KISS, aplanar condicionales anidados con Cláusulas de Guarda y realizar revisiones de código (Code Reviews) constructivas.',
      realWorldAnalogy: {
        title: 'Escribir para el Futuro Tú que Tendrá que Leerlo a las 3:00 AM',
        analogy: 'Hay una famosa cita del legendario ingeniero Martin Fowler:\n\n> *"Cualquier tonto puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender."*\n\nCuando tienes prisa y nombras variables como `x`, `temp`, `data2` y metes 8 niveles de `if` anidados dentro de una función de 300 líneas, la computadora lo compila sin quejarse.\n\nPero dentro de 6 meses, cuando ocurra un fallo en producción y tengas que entrar tú mismo a solucionar el problema a las 3:00 AM con la presión del cliente encima, no recordarás qué significaba `temp` ni cómo funcionaban esos 8 condicionales. **Escribir código limpio es un acto de respeto hacia tus compañeros y hacia tu yo del futuro**.',
        whyItMatters: 'En las empresas tecnológicas, el 80% del tiempo de un desarrollador se pasa leyendo código existente y solo el 20% escribiendo código nuevo. El código limpio ahorra millones en mantenimiento.',
        iconName: 'Sparkles',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Principios Fundamentales: KISS, DRY y YAGNI',
            content: '• **KISS (Keep It Simple, Stupid):** La solución más simple que funcione siempre es mejor que una arquitectura sobrecargada e innecesariamente compleja.\n• **DRY (Don\'t Repeat Yourself):** Cada pieza de lógica debe tener una única representación en el sistema. Si copias y pegas el mismo bloque de código en 3 archivos, extrae una función reutilizable.\n• **YAGNI (You Aren\'t Gonna Need It):** No programes funciones hoy pensando en *"quizás en 2 años necesitemos esto"*. Construye lo que necesitas ahora.',
          },
          {
            heading: 'Cláusulas de Guarda (Guard Clauses): El Fin de la Pirámide del Infierno',
            content: 'Evita anidar condicionales uno dentro de otro. Retorna temprano (*Early Return*):\n\n```typescript\n// ❌ Código espagueti anidado (Pirámide del Infierno):\nfunction procesarPago(usuario, monto) {\n  if (usuario) {\n    if (usuario.activo) {\n      if (monto > 0) {\n        if (usuario.saldo >= monto) {\n          // Ejecutar pago...\n        }\n      }\n    }\n  }\n}\n\n// ✅ Código Limpio con Cláusulas de Guarda planas:\nfunction procesarPago(usuario, monto) {\n  if (!usuario) return { error: "Usuario requerido" };\n  if (!usuario.activo) return { error: "Usuario inactivo" };\n  if (monto <= 0) return { error: "Monto inválido" };\n  if (usuario.saldo < monto) return { error: "Saldo insuficiente" };\n\n  // Toda la lógica principal corre plana y limpia aquí:\n  usuario.saldo -= monto;\n  return { exito: true };\n}\n```',
          },
          {
            heading: 'Los Principios SOLID en Resumen Práctico',
            content: '• **S - Responsabilidad Única (Single Responsibility):** Una función o clase debe tener una sola razón para cambiar (no mezcles validación de datos con envío de emails y guardado en BD en la misma función).\n• **O - Abierto/Cerrado (Open/Closed):** El código debe estar abierto a extensión pero cerrado a modificación (usa estrategias o plugins en vez de agregar otro `case` a un switch gigante).\n• **L - Sustitución de Liskov:** Las clases hijas deben poder sustituir a sus clases padres sin romper el programa.\n• **I - Segregación de Interfaces:** Mejor muchas interfaces pequeñas y específicas que una interfaz gigante con métodos que no se usan.\n• **D - Inversión de Dependencias:** Módulos de alto nivel no deben depender de detalles de bajo nivel; ambos deben depender de abstracciones.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Demostración de Refactorización a Cláusulas de Guarda (Early Return):

// ❌ Versión antes de refactorizar:
function autorizarPrestamoAnidado(cliente, monto) {
  let resultado;
  if (cliente) {
    if (cliente.edad >= 18) {
      if (cliente.puntajeCrediticio > 650) {
        if (monto <= cliente.ingresoMensual * 5) {
          resultado = "Aprobado";
        } else {
          resultado = "Rechazado: Monto excede límite de ingresos";
        }
      } else {
        resultado = "Rechazado: Puntaje insuficiente";
      }
    } else {
      resultado = "Rechazado: Menor de edad";
    }
  } else {
    resultado = "Rechazado: Cliente no existe";
  }
  return resultado;
}

// ✅ Versión limpia y plana con Cláusulas de Guarda:
function autorizarPrestamoLimpio(cliente, monto) {
  if (!cliente) return "Rechazado: Cliente no existe";
  if (cliente.edad < 18) return "Rechazado: Menor de edad";
  if (cliente.puntajeCrediticio <= 650) return "Rechazado: Puntaje insuficiente";
  if (monto > cliente.ingresoMensual * 5) return "Rechazado: Monto excede límite de ingresos";

  return "Aprobado";
}

const solicitante = { edad: 24, puntajeCrediticio: 720, ingresoMensual: 2000 };
console.log("Resultado con código limpio:", autorizarPrestamoLimpio(solicitante, 5000));`,
        explanation: 'Fíjate cómo la versión limpia elimina 4 niveles de indentación facilitando enormemente la lectura y mantenimiento del código.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm8-l4-ex1',
          title: 'Refactorización con Early Return',
          level: 'facil',
          instruction: 'Refactoriza la función `validarAcceso(usuario)` utilizando Cláusulas de Guarda: 1) Si no hay usuario retorna "Sin usuario". 2) Si `usuario.baneado` es true retorna "Acceso bloqueado". 3) Si `usuario.rol !== "ADMIN"` retorna "Permiso denegado". 4) Si pasa todo retorna "Acceso concedido". Ningún bloque de código debe tener más de 1 nivel de sangría.',
          starterCode: `function validarAcceso(usuario) {
  // Implementa usando solo early returns
}

console.log(validarAcceso({ baneado: false, rol: "ADMIN" }));`,
          hints: [
            'if (!usuario) return "Sin usuario";',
            'if (usuario.baneado) return "Acceso bloqueado";',
            'if (usuario.rol !== "ADMIN") return "Permiso denegado";',
            'return "Acceso concedido";'
          ],
          solutionCode: `function validarAcceso(usuario) {
  if (!usuario) return "Sin usuario";
  if (usuario.baneado) return "Acceso bloqueado";
  if (usuario.rol !== "ADMIN") return "Permiso denegado";
  return "Acceso concedido";
}

console.log(validarAcceso({ baneado: false, rol: "ADMIN" }));`,
          solutionExplanation: 'Los Early Returns reducen la carga cognitiva del programador al descartar casos de error al principio de la función.',
          testCheck: {
            type: 'output-contains',
            expected: 'Acceso concedido',
          },
        },
        {
          id: 'm8-l4-ex2',
          title: 'Principio de Responsabilidad Única (SRP)',
          level: 'medio',
          instruction: 'Dado un código que mezcla validación y formateo, crea dos funciones separadas: 1) `validarEmail(email)` que retorne true si es string y tiene "@". 2) `formatearNombre(nombre)` que retorne el nombre en minúsculas y sin espacios alrededor. Luego una función `procesarPerfil(nombre, email)` que use ambas y retorne `{ nombreFormateado, emailValido }`. Pruébala.',
          starterCode: `function procesarPerfil(nombre, email) {
  // Separa responsabilidades en funciones puras
}

console.log(procesarPerfil("  CARLOS  ", "carlos@dev.com"));`,
          hints: [
            'Crea function validarEmail(email) { return typeof email === "string" && email.includes("@"); }',
            'Crea function formatearNombre(nombre) { return (nombre || "").trim().toLowerCase(); }'
          ],
          solutionCode: `function validarEmail(email) {
  return typeof email === 'string' && email.includes('@');
}

function formatearNombre(nombre) {
  return typeof nombre === 'string' ? nombre.trim().toLowerCase() : '';
}

function procesarPerfil(nombre, email) {
  return {
    nombreFormateado: formatearNombre(nombre),
    emailValido: validarEmail(email)
  };
}

console.log(procesarPerfil("  CARLOS  ", "carlos@dev.com"));`,
          solutionExplanation: 'Separar funciones con una sola responsabilidad (SRP) hace que cada pieza sea trivialmente fácil de probar de forma unitaria y reutilizar.',
          testCheck: {
            type: 'output-contains',
            expected: 'carlos',
          },
        },
        {
          id: 'm8-l4-ex3',
          title: 'Patrón Estrategia para Open/Closed Principle (Reto)',
          level: 'reto',
          instruction: 'En lugar de un switch con casos fijos, crea un calculador de descuentos extensible basado en un mapa de estrategias: `const estrategiasDescuento = { VIP: (m) => m * 0.20, REGULAR: (m) => m * 0.05 };`. Crea la función `calcularDescuentoCliente(tipoCliente, monto)` que ejecute la estrategia correspondiente o retorne 0 si el tipo no existe. Además, agrega una nueva estrategia "ESTUDIANTE" (15%) sin modificar la función principal. Prueba con tipo "ESTUDIANTE" y monto 100.',
          starterCode: `const estrategiasDescuento = {
  VIP: (monto) => monto * 0.20,
  REGULAR: (monto) => monto * 0.05
};

function calcularDescuentoCliente(tipoCliente, monto) {
  // Ejecuta la estrategia correspondiente
}

// Extiende con ESTUDIANTE y prueba con monto 100:`,
          hints: [
            'estrategiasDescuento.ESTUDIANTE = (monto) => monto * 0.15;',
            'const fn = estrategiasDescuento[tipoCliente]; return fn ? fn(monto) : 0;'
          ],
          solutionCode: `const estrategiasDescuento = {
  VIP: (monto) => monto * 0.20,
  REGULAR: (monto) => monto * 0.05
};

function calcularDescuentoCliente(tipoCliente, monto) {
  const estrategia = estrategiasDescuento[tipoCliente];
  return estrategia ? estrategia(monto) : 0;
}

// Extensión sin modificar la función (Open for extension, closed for modification):
estrategiasDescuento.ESTUDIANTE = (monto) => monto * 0.15;

console.log("Descuento estudiante:", calcularDescuentoCliente("ESTUDIANTE", 100));`,
          solutionExplanation: 'El patrón Estrategia permite agregar nuevos comportamientos sin modificar el código existente, cumpliendo el principio Abierto/Cerrado (OCP).',
          testCheck: {
            type: 'output-contains',
            expected: '15',
          },
        },
      ],
      quiz: [
        {
          id: 'm8-l4-q1',
          question: '¿Qué significa el acrónimo DRY en desarrollo de software?',
          options: [
            'Do Repeat Yourself (Repite tu código para que quede claro).',
            'Don\'t Repeat Yourself (No te repitas: evita duplicar lógica de negocio en múltiples lugares).',
            'Direct Routing Yield.',
            'Data Relational Yield.',
          ],
          correctIndex: 1,
          explanation: 'DRY postula que cada pieza de conocimiento debe tener una representación única e inequívoca dentro de un sistema para evitar inconsistencias.',
        },
        {
          id: 'm8-l4-q2',
          question: '¿Cuál es el principal beneficio de utilizar Cláusulas de Guarda (Early Return)?',
          options: [
            'Hacen que la computadora consuma menos memoria RAM.',
            'Eliminan los niveles profundos de anidación condicional, dejando el flujo principal del código plano, limpio y legible.',
            'Obligan a usar siempre bucles while.',
            'Solo funcionan en TypeScript.',
          ],
          correctIndex: 1,
          explanation: 'Retornar temprano ante casos de error o condiciones no cumplidas mantiene el código plano y previene la "pirámide del infierno" de if anidados.',
        },
        {
          id: 'm8-l4-q3',
          question: '¿Qué establece el Principio de Responsabilidad Única (SRP) en SOLID?',
          options: [
            'Que un solo programador debe escribir todo el proyecto.',
            'Que cada módulo, función o clase debe tener una sola razón para cambiar, encargándose de una única tarea bien definida.',
            'Que todas las variables deben ser de una sola letra.',
            'Que el servidor solo puede tener un puerto abierto.',
          ],
          correctIndex: 1,
          explanation: 'Una función que hace una sola cosa bien es más fácil de entender, probar, depurar y reutilizar que una función monolítica multitarea.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El código limpio se escribe pensando en la facilidad de lectura y comprensión de los humanos.',
          'Las Cláusulas de Guarda aplanan condicionales y reducen la carga cognitiva drásticamente.',
          'Los principios SOLID, DRY y KISS guían la arquitectura hacia sistemas desacoplados y fáciles de extender.',
        ],
        commonPitfalls: [
          'Nombrar variables de forma perezosa o críptica (a, x, temp, flag) en lugar de nombres descriptivos que expliquen su intención.',
          'Escribir funciones monstruosas de cientos de líneas que mezclan lógica de interfaz, llamadas a la API y validaciones.',
          'Sobreingeniería prematura: aplicar patrones de diseño complejos cuando una función simple de 5 líneas era suficiente.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 5: LA MENTALIDAD FULL STACK Y EL CAMINO CONTINUO
    {
      id: 'm8-l5-mentalidad-full-stack-y-futuro',
      moduleId: 8,
      slug: 'mentalidad-full-stack-aprender-a-aprender-y-el-futuro',
      title: 'La Mentalidad Full Stack: Aprender a Aprender, IA como Copiloto y el Camino Continuo',
      order: 5,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Desarrollar la mentalidad de crecimiento del desarrollador Full Stack moderno: superar el síndrome del impostor, utilizar herramientas de Inteligencia Artificial como copilotos multiplicadores sin perder el criterio técnico y trazar tu plan de acción para los próximos 90 días.',
      realWorldAnalogy: {
        title: 'El Cinturón Negro que Vuelve a Ser Blanco',
        analogy: 'En las artes marciales tradicionales japonesas existe una hermosa metáfora:\n\n• Tras muchos años de disciplina y sudor, el estudiante alcanza el anhelado **Cinturón Negro**.\n• Sin embargo, con los años de práctica diaria continua, la tela negra del cinturón se deshilacha, se desgasta y **vuelve a tornarse de color blanco**.\n\nEn la tecnología nunca hay un destino final donde digas: *"Ya terminé de estudiar, ya me lo sé todo"*. Nuevas herramientas, frameworks y modelos de IA continuarán apareciendo.\n\nEl verdadero poder de un Desarrollador Full Stack no es memorizar cada comando de memoria; es **aprender a aprender con agilidad**, saber hacer las preguntas correctas, leer documentación oficial sin miedo y usar la tecnología para construir cosas asombrosas que resuelvan problemas reales para las personas.',
        whyItMatters: 'Los mejores ingenieros del mundo no son los que nunca cometen errores, sino los que tienen la curiosidad insaciable y la resiliencia para investigar y aprender continuamente.',
        iconName: 'Compass',
      },
      explanation: {
        sections: [
          {
            heading: 'El Síndrome del Impostor: El Secreto que Todos Callan',
            content: 'El 85% de los programadores —incluyendo ingenieros senior en Google, Microsoft o Netflix— han sentido en algún momento: *"Siento que no sé lo suficiente, en cualquier momento se darán cuenta de que no soy tan inteligente"*.\n\nLa verdad liberadora: **Nadie sabe todo**. La informática es demasiado inmensa. Lo normal es consultar la documentación oficial, buscar soluciones en foros y apoyarse en herramientas todos los días. La clave no es saberlo todo de memoria; es tener el método para resolverlo.',
          },
          {
            heading: 'La IA como Copiloto Multiplicador (No como Piloto Automático Ciego)',
            content: 'Herramientas como Antigravity, GitHub Copilot y ChatGPT han transformado la programación:\n\n• **El Uso Novato Inseguro:** Pedirle a la IA que escriba todo el código, copiarlo sin entenderlo y rezar para que funcione. Si algo falla, el novato no sabe qué hacer.\n• **El Uso Profesional Senior:** Usar la IA como un asistente de investigación de alta velocidad para generar esqueletos de tests, proponer alternativas de arquitectura y explicar errores complejos, manteniendo siempre **tú el criterio y el control de la calidad final**.',
          },
          {
            heading: 'Tu Plan de Acción para los Próximos 90 Días',
            content: '1. **Días 1 a 30 (Consolidación):** Construye y personaliza tu proyecto final Full Stack con tus propios toques de diseño y publícalo en vivo.\n2. **Días 31 a 60 (Presencia):** Pule tu portafolio web, redacta tu CV técnico con la fórmula XYZ y optimiza tu perfil de LinkedIn.\n3. **Días 61 a 90 (Aceleración):** Comienza a postularte a ofertas de trabajo internacionales o clientes freelance, practica live coding y comparte tus aprendizajes en público (*Building in Public*).',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Generador interactivo de tu Plan de Acción de 90 Días Full Stack:
function generarPlanDeCarrera({ objetivo, horasSemanales }) {
  console.log(\`🎯 Plan de Carrera para objetivo: '\${objetivo}' (\${horasSemanales} hrs/semana)\`);

  const plan = [
    {
      mes: "Mes 1 (Días 1-30)",
      enfoque: "Consolidación de Proyectos",
      hitos: [
        "Desplegar Proyecto Final con PostgreSQL en Vercel y Render",
        "Configurar tests unitarios con Vitest y CI/CD en GitHub Actions",
        "Documentar README con capturas y demo en vivo HTTPS"
      ]
    },
    {
      mes: "Mes 2 (Días 31-60)",
      enfoque: "Marca Personal y Portafolio",
      hitos: [
        "Publicar sitio web de portafolio personal en dominio propio",
        "Redactar CV técnico de 1 página con fórmula XYZ de Google",
        "Optimizar titular y sección Acerca de mí en LinkedIn"
      ]
    },
    {
      mes: "Mes 3 (Días 61-90)",
      enfoque: "Postulaciones y Entrevistas",
      hitos: [
        "Practicar 1 ejercicio diario con método REACTO (LeetCode/Codewars)",
        "Enviar 5 postulaciones semanales adaptando palabras clave ATS",
        "Participar en comunidades de desarrolladores y compartir aprendizajes"
      ]
    }
  ];

  plan.forEach(fase => {
    console.log(\`\\n📅 \${fase.mes}: \${fase.enfoque}\`);
    fase.hitos.forEach(h => console.log(\`  [ ] \${h}\`));
  });

  return { exito: true, totalHitos: 9 };
}

generarPlanDeCarrera({ objetivo: "Desarrollador Full Stack Junior", horasSemanales: 15 });`,
        explanation: 'Ejecuta el generador para visualizar los hitos estratégicos que te llevarán a convertirte en un profesional contratado.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm8-l5-ex1',
          title: 'Planificador de balance 70/30 (Práctica vs Teoría)',
          level: 'facil',
          instruction: 'Crea una función `calcularDistribucionEstudio(horasTotalesSemanales)` que calcule la regla de oro del aprendizaje técnico: 70% de práctica activa programando proyectos y 30% de lectura teórica. Debe retornar un objeto `{ horasPractica, horasTeoria }` redondeado a 1 decimal. Prueba con 10 horas semanales e imprime el resultado.',
          starterCode: `function calcularDistribucionEstudio(horasTotalesSemanales) {
  // Retorna horasPractica (70%) y horasTeoria (30%)
}

console.log(calcularDistribucionEstudio(10));`,
          hints: [
            'const horasPractica = Number((horasTotalesSemanales * 0.7).toFixed(1));',
            'const horasTeoria = Number((horasTotalesSemanales * 0.3).toFixed(1));',
            'return { horasPractica, horasTeoria };'
          ],
          solutionCode: `function calcularDistribucionEstudio(horasTotalesSemanales) {
  const horasPractica = Number((horasTotalesSemanales * 0.7).toFixed(1));
  const horasTeoria = Number((horasTotalesSemanales * 0.3).toFixed(1));
  return { horasPractica, horasTeoria };
}

console.log(calcularDistribucionEstudio(10));`,
          solutionExplanation: 'La programación es una habilidad motriz y cognitiva: se aprende escribiendo código real, no viendo tutoriales de forma pasiva.',
          testCheck: {
            type: 'output-contains',
            expected: '7',
          },
        },
        {
          id: 'm8-l5-ex2',
          title: 'Validador de prompts técnicos profesionales para IA',
          level: 'medio',
          instruction: 'Para usar la IA con criterio senior, un buen prompt debe tener 3 componentes: Rol, Contexto y Restricción. Crea una función `evaluarPromptTecnico(promptTexto)` que verifique que el texto contenga al menos 50 caracteres y mencione al menos una palabra de contexto técnico ("react", "node", "typescript", "postgres", "api"). Si cumple retorna `{ calidad: "ALTA", listo: true }`, de lo contrario `{ calidad: "BAJA", recomendacion: "Añade más contexto y especificaciones técnicas al prompt" }`. Pruébala.',
          starterCode: `function evaluarPromptTecnico(promptTexto) {
  // Evalúa longitud y palabras clave de contexto
}

const miPrompt = "Actúa como un arquitecto senior en React y TypeScript. Revisa este componente y sugiere optimizaciones de rendimiento con useMemo.";
console.log(evaluarPromptTecnico(miPrompt));`,
          hints: [
            'const p = promptTexto.toLowerCase();',
            'const tieneLongitud = promptTexto.length >= 50;',
            'const tienePalabra = ["react", "node", "typescript", "postgres", "api", "docker"].some(k => p.includes(k));',
            'return (tieneLongitud && tienePalabra) ? { calidad: "ALTA", listo: true } : { calidad: "BAJA", recomendacion: "..." };'
          ],
          solutionCode: `function evaluarPromptTecnico(promptTexto) {
  if (!promptTexto || typeof promptTexto !== 'string') {
    return { calidad: "BAJA", recomendacion: "Prompt inválido" };
  }
  const p = promptTexto.toLowerCase();
  const tieneLongitud = promptTexto.length >= 50;
  const palabrasClave = ["react", "node", "typescript", "postgres", "api", "docker"];
  const tienePalabra = palabrasClave.some(k => p.includes(k));

  if (tieneLongitud && tienePalabra) {
    return { calidad: "ALTA", listo: true };
  }
  return {
    calidad: "BAJA",
    recomendacion: "Añade más contexto y especificaciones técnicas al prompt"
  };
}

const miPrompt = "Actúa como un arquitecto senior en React y TypeScript. Revisa este componente y sugiere optimizaciones de rendimiento con useMemo.";
console.log(evaluarPromptTecnico(miPrompt));`,
          solutionExplanation: 'Dar contexto claro, roles y restricciones específicas a los modelos de IA permite obtener respuestas técnicas precisas y de nivel senior.',
          testCheck: {
            type: 'output-contains',
            expected: 'ALTA',
          },
        },
        {
          id: 'm8-l5-ex3',
          title: 'El Manifiesto de Graduación Full Stack (Reto)',
          level: 'reto',
          instruction: 'Crea una función `generarDiplomaGraduacion(nombreDesarrollador, modulosCompletados)` que verifique que el candidato haya completado los 8 módulos de la ruta. Si `modulosCompletados === 8`, retorna un texto de graduación con fecha actual que proclame a `nombreDesarrollador` como "Desarrollador Full Stack Certificado por RutaFullStack" con título honorífico de "Arquitecto de Software". Si tiene menos de 8 módulos, retorna "Módulos pendientes: X/8". Prueba con 8 módulos.',
          starterCode: `function generarDiplomaGraduacion(nombreDesarrollador, modulosCompletados) {
  // Genera el diploma si completó los 8 módulos
}

console.log(generarDiplomaGraduacion("Estudiante Estrella", 8));`,
          hints: [
            'if (modulosCompletados === 8) return \`🎓 ¡FELICITACIONES \${nombreDesarrollador}! Has completado con éxito la ruta de 8 módulos convirtiéndote en Desarrollador Full Stack Certificado por RutaFullStack.\`;',
            'return \`Módulos pendientes: \${8 - modulosCompletados}/8\`;'
          ],
          solutionCode: `function generarDiplomaGraduacion(nombreDesarrollador, modulosCompletados) {
  if (modulosCompletados === 8) {
    return \`🎓 ¡FELICITACIONES \${nombreDesarrollador}! Has completado con éxito la ruta de 8 módulos convirtiéndote en Desarrollador Full Stack Certificado por RutaFullStack con honores de Arquitecto de Software.\`;
  }
  return \`Módulos pendientes: \${8 - modulosCompletados}/8\`;
}

console.log(generarDiplomaGraduacion("Estudiante Estrella", 8));`,
          solutionExplanation: '¡Completar los 8 módulos de RutaFullStack representa un viaje integral desde los fundamentos de la computación hasta el nivel profesional Full Stack!',
          testCheck: {
            type: 'output-contains',
            expected: 'Desarrollador Full Stack Certificado',
          },
        },
      ],
      quiz: [
        {
          id: 'm8-l5-q1',
          question: '¿Qué es el Síndrome del Impostor y cómo se maneja en el desarrollo de software?',
          options: [
            'Un virus informático que borra los archivos del servidor.',
            'La sensación psicológica de no saber lo suficiente; se supera reconociendo que la tecnología es inmensa y que aprender a investigar y consultar documentación oficial es lo que define a un profesional.',
            'Un tipo de licencia de código abierto.',
            'Un error que ocurre cuando se apaga el monitor.',
          ],
          correctIndex: 1,
          explanation: 'Incluso los programadores más experimentados investigan y consultan documentación todos los días. El síndrome del impostor se disipa cuando entiendes que la curiosidad y la resiliencia son tus mayores fortalezas.',
        },
        {
          id: 'm8-l5-q2',
          question: '¿Cuál es la forma más profesional de utilizar la Inteligencia Artificial en el flujo de trabajo de programación?',
          options: [
            'Copiar y pegar código generado a ciegas sin leerlo ni entenderlo.',
            'Utilizar la IA como un copiloto inteligente para acelerar la escritura de pruebas, sugerir alternativas de arquitectura y resolver dudas, manteniendo siempre el criterio y la validación técnica en tus manos.',
            'Dejar que la IA responda tus entrevistas de trabajo en silencio.',
            'Desinstalar los editores de código.',
          ],
          correctIndex: 1,
          explanation: 'La IA multiplica la velocidad del programador que comprende los fundamentos técnicos; usarla con criterio y rigor es la marca de un ingeniero moderno.',
        },
        {
          id: 'm8-l5-q3',
          question: '¿Qué porcentaje de tiempo se recomienda dedicar a la práctica activa (escribir código y proyectos) frente al estudio teórico pasivo?',
          options: [
            '100% teoría y 0% práctica.',
            '70% de práctica activa programando y resolviendo retos frente a un 30% de lectura teórica.',
            '5% práctica y 95% videos.',
            'No se recomienda practicar nunca.',
          ],
          correctIndex: 1,
          explanation: 'La regla del 70/30 garantiza que los conceptos se fijen mediante la memoria muscular y la resolución de problemas reales en el editor de código.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La mentalidad de crecimiento y la curiosidad continua son las habilidades más valiosas en tecnología.',
          'La IA es tu copiloto multiplicador: acelera tu trabajo pero el criterio y la comprensión siguen siendo tuyos.',
          'Con una ruta clara de 90 días, un portafolio sólido y el método REACTO, estás listo para triunfar en la industria tecnológica.',
        ],
        commonPitfalls: [
          'Dejarse paralizar por el síndrome del impostor y no postularse a empleos esperando "saberlo absolutamente todo".',
          'Depender ciegamente de la IA copiando código sin entender la lógica subyacente.',
          'Aislarse: la programación es una profesión social; compartir en público y participar en comunidades acelera tu crecimiento profesional.',
        ],
      },
      xpReward: 50,
    },
  ],
};
