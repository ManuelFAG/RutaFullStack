import { Module } from '../../types/curriculum';

export const MODULE_1_FUNDAMENTOS: Module = {
  id: 1,
  slug: 'fundamentos',
  title: '1. Fundamentos del Desarrollo',
  description: 'Comprende cómo funciona el universo digital: desde cómo viajan los datos en Internet hasta pensar como un programador con lógica, terminal y Git.',
  icon: 'Compass',
  color: 'emerald',
  badge: {
    id: 'modulo-1-maestro',
    name: 'Maestro de Fundamentos',
    description: 'Completaste todos los fundamentos de la computación, terminal y Git.',
    icon: 'Sparkles',
    category: 'modulo',
  },
  lessons: [
    {
      id: 'm1-l1-como-funciona-internet',
      moduleId: 1,
      slug: 'como-funciona-internet',
      title: 'Cómo funciona Internet en la vida real',
      order: 1,
      estimatedTime: '15 min',
      difficulty: 'Principiante',
      objective: 'Entender qué pasa exactamente cuando escribes una dirección web en tu navegador y cómo viaja la información entre clientes y servidores.',
      realWorldAnalogy: {
        title: 'El Servicio Postal Mundial y las Direcciones',
        analogy: 'Imagina que Internet es un gigantesco sistema de correos. Tu navegador (Google Chrome) es una persona escribiendo una carta con una solicitud. El servidor es un almacén gigante al otro lado del mundo que tiene las fotos y páginas. Pero como tú no sabes la coordenada exacta del almacén, consultas una guía telefónica global llamada DNS (Sistema de Nombres de Dominio) que traduce "google.com" a una dirección postal numérica llamada IP (como "142.250.190.46"). Tu mensaje se divide en pequeños sobres (paquetes de datos) que viajan por cables submarinos a la velocidad de la luz y se vuelven a armar al llegar.',
        whyItMatters: 'Como desarrollador Full Stack, cada web o app que crees vivirá en este circuito: un cliente pidiendo datos y un servidor respondiendo con información.',
        iconName: 'Globe',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Tres Actores Principales de la Web',
            content: 'Cada vez que navegas en una aplicación, ocurren tres cosas fundamentales:\n\n1. **El Cliente (Frontend):** Es tu dispositivo (teléfono, laptop) y el navegador donde interactúas visualmente.\n2. **El Servidor (Backend):** Una computadora potente conectada 24/7 en un centro de datos, esperando atender peticiones.\n3. **La Red (Protocolos HTTP/HTTPS):** Las reglas de cortesía y seguridad para que el cliente y el servidor se entiendan.',
            callout: {
              type: 'info',
              text: 'HTTPS es como enviar tu carta dentro de un cofre blindado con candado para que nadie en el camino pueda leer tus contraseñas.',
            },
          },
          {
            heading: 'La Petición (Request) y la Respuesta (Response)',
            content: 'La conversación básica de Internet es siempre una pregunta y una respuesta:\n- **Tú pides:** "Oye servidor, por favor mándame el perfil del usuario Juanito" (Request GET).\n- **El servidor responde:** "¡Aquí tienes! Código 200 (Todo bien) junto con el texto y las imágenes" (Response).',
            codeSnippet: {
              language: 'javascript',
              description: 'Ejemplo simulado de una petición web en JavaScript moderno:',
              code: `// Así es como el navegador le envía una carta al servidor:
const peticionWeb = {
  url: "https://api.rutafullstack.com/usuarios",
  metodo: "GET", // "GET" significa: quiero obtener información
  encabezados: {
    "Formato": "application/json"
  }
};

console.log("Enviando petición a la red...");
console.log("Destino:", peticionWeb.url);`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// ¡Bienvenido a tu primer laboratorio!
// Modifica los datos de esta petición y pulsa "Ejecutar Código"

const miNavegador = "Google Chrome en Laptop";
const sitioDestino = "rutafullstack.com";
const direccionIPSimulada = "192.168.1.10";

console.log("1. El cliente (" + miNavegador + ") consulta el DNS para encontrar: " + sitioDestino);
console.log("2. El servidor responde en la IP: " + direccionIPSimulada);
console.log("3. ¡Conexión establecida con éxito!");`,
        explanation: 'Cambia los nombres entre comillas y ejecuta para ver cómo la consola procesa tu código.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm1-l1-ex1',
          title: 'Tu primera variable de red',
          level: 'facil',
          instruction: 'Declara una variable llamada `nombreServidor` con el texto "Servidor Central" e imprímela usando `console.log(nombreServidor)`.',
          starterCode: `// Ejercicio 1:
// 1. Crea la variable nombreServidor
// 2. Muestra su valor con console.log

`,
          hints: [
            'Usa la palabra const para declarar: const nombreServidor = "Servidor Central";',
            'Luego usa console.log(nombreServidor); para ver el resultado en la consola.',
          ],
          solutionCode: `const nombreServidor = "Servidor Central";
console.log(nombreServidor);`,
          solutionExplanation: 'Declaramos la constante con `const nombreServidor = "..."` y la imprimimos con `console.log()`.',
          testCheck: {
            type: 'output-contains',
            expected: 'Servidor Central',
          },
        },
        {
          id: 'm1-l1-ex2',
          title: 'Simulando un código de estado HTTP',
          level: 'medio',
          instruction: 'Crea una variable `codigoEstado` con el número 200. Si `codigoEstado` es exactamente igual a 200, imprime "Conexión exitosa", de lo contrario imprime "Error en la red".',
          starterCode: `const codigoEstado = 200;

// Agrega la condición if aquí:
`,
          hints: [
            'Utiliza la estructura if (codigoEstado === 200) { ... } else { ... }',
            'Dentro del bloque if escribe: console.log("Conexión exitosa");',
          ],
          solutionCode: `const codigoEstado = 200;

if (codigoEstado === 200) {
  console.log("Conexión exitosa");
} else {
  console.log("Error en la red");
}`,
          solutionExplanation: 'Los códigos de estado HTTP indican el resultado. El 200 significa "OK" (éxito). La estructura condicional `if/else` evalúa la igualdad estricta `===`.',
          testCheck: {
            type: 'output-contains',
            expected: 'Conexión exitosa',
          },
        },
        {
          id: 'm1-l1-ex3',
          title: 'El inspector de paquetes de datos',
          level: 'reto',
          instruction: 'Crea un arreglo llamado `paquetes` con los valores `["paquete1", "paquete2", "paquete3"]`. Usa un bucle `for...of` para imprimir cada paquete precedido por "Recibido: ".',
          starterCode: `// Crea el arreglo paquetes y recórrelo:
const paquetes = ["paquete1", "paquete2", "paquete3"];

`,
          hints: [
            'Usa un bucle: for (const paquete of paquetes) { ... }',
            'Dentro del bucle imprime: console.log("Recibido: " + paquete);',
          ],
          solutionCode: `const paquetes = ["paquete1", "paquete2", "paquete3"];

for (const paquete of paquetes) {
  console.log("Recibido: " + paquete);
}`,
          solutionExplanation: 'Los datos en Internet viajan desglosados en pequeños paquetes que el receptor va recibiendo y unificando.',
          testCheck: {
            type: 'output-contains',
            expected: 'Recibido: paquete3',
          },
        },
      ],
      quiz: [
        {
          id: 'm1-l1-q1',
          question: '¿Cuál es la función principal del sistema DNS en Internet?',
          options: [
            'Hacer que tu computadora sea más rápida y tenga más memoria.',
            'Traducir un nombre entendible por humanos (como google.com) a una dirección IP numérica.',
            'Cifrar tus archivos personales para que nadie los robe.',
            'Conectar directamente los cables submarinos con los satélites espaciales.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! El DNS es la "guía telefónica" de Internet. Los humanos recordamos nombres, pero las computadoras se comunican mediante direcciones numéricas IP.',
        },
        {
          id: 'm1-l1-q2',
          question: 'En la relación Cliente-Servidor, ¿cuál de los siguientes es un ejemplo de Cliente?',
          options: [
            'Una base de datos PostgreSQL alojada en un datacenter en Alemania.',
            'El navegador web Google Chrome o Safari en tu teléfono móvil.',
            'El servidor de correos de Gmail.',
            'Un cable de fibra óptica que cruza el océano Atlántico.',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! El cliente es la aplicación o interfaz desde la cual el usuario interactúa y solicita datos.',
        },
        {
          id: 'm1-l1-q3',
          question: '¿Qué significa la letra "S" al final de HTTPS?',
          options: [
            'Superrápido (Superfast).',
            'Seguro (Secure), indicando que la comunicación está cifrada.',
            'Servidor (Server).',
            'Satélite (Satellite).',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! La S indica seguridad mediante TLS/SSL, asegurando que los datos entre cliente y servidor no puedan ser interceptados en texto plano.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Internet funciona mediante el modelo Cliente (el que pide) y Servidor (el que atiende).',
          'El DNS traduce nombres de dominio amigables a direcciones IP numéricas.',
          'La información viaja descompuesta en pequeños paquetes de datos a través de la red.',
          'HTTPS garantiza que los datos viajen cifrados y seguros.',
        ],
        commonPitfalls: [
          'Confundir Internet (la red física global de cables y satélites) con la Web (el servicio de páginas y documentos que viaja sobre Internet).',
          'Pensar que el servidor "sabe por arte de magia" quién eres sin enviarle credenciales o identificadores en las peticiones.',
          'Olvidar que las peticiones a la red toman tiempo (latencia) y pueden fallar si se corta la conexión.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm1-l2-que-hace-un-programador',
      moduleId: 1,
      slug: 'que-hace-un-programador-fullstack',
      title: 'Qué hace un Desarrollador y qué es Full Stack',
      order: 2,
      estimatedTime: '20 min',
      difficulty: 'Principiante',
      objective: 'Comprender el rol de un programador, la diferencia entre Frontend, Backend y Bases de Datos, y por qué el perfil Full Stack es tan demandado.',
      realWorldAnalogy: {
        title: 'El Gran Restaurante Gourmet',
        analogy: 'Piensa en una aplicación como un restaurante de alta cocina:\n\n• **El Frontend es el Comedor:** La decoración, la música, las mesas y el menú impreso. Es todo lo que el comensal puede ver, tocar y disfrutar. Si la silla es incómoda o la carta es ilegible, la experiencia es mala (eso es mala UX/UI).\n• **El Backend es la Cocina:** Detrás de las puertas donde el comensal no entra. Aquí los chefs reciben los pedidos, cocinan siguiendo recetas exactas y garantizan la higiene y seguridad.\n• **La Base de Datos es la Despensa y la Nevera:** Donde se guardan organizadamente todos los ingredientes: tomates, carnes, vinos y el historial de compras.\n\n¿Y quién es el **Desarrollador Full Stack**? Es el chef maestro y administrador que entiende tanto el diseño del comedor como las técnicas de la cocina y la gestión de la despensa.',
        whyItMatters: 'Al ser Full Stack, tienes la visión completa: puedes construir una idea desde el primer boceto visual hasta el servidor que atiende a millones de usuarios.',
        iconName: 'ChefHat',
      },
      explanation: {
        sections: [
          {
            heading: 'Las Tres Capas del Desarrollo Full Stack',
            content: '1. **Frontend:** Lo que corre en el navegador del usuario (HTML para la estructura, CSS para el diseño visual, y JavaScript/React para la interactividad).\n2. **Backend:** La lógica de negocio que corre en el servidor (Node.js, Express, autenticación, seguridad).\n3. **Base de Datos:** El almacenamiento persistente (PostgreSQL para datos relacionales, MongoDB para documentos flexibles).',
          },
          {
            heading: '¿Qué hace un programador en su día a día?',
            content: 'Contrario a las películas de Hollywood con texto verde cayendo a toda prisa, programar consiste en:\n• Pensar y descomponer problemas grandes en pasos diminutos.\n• Leer más código del que escribes.\n• Diseñar soluciones legibles para otros humanos.\n• Comunicar y colaborar con herramientas como Git.',
            codeSnippet: {
              language: 'javascript',
              description: 'Modelando las capas de una orden en JavaScript:',
              code: `// Un programador modela la realidad en datos organizados:
const ordenRestaurante = {
  id: 1042,
  cliente: "Sofía",
  plato: "Pizza Margarita",
  capaFrontend: "Botón de 'Confirmar Pedido' presionado",
  capaBackend: "Validar que la tarjeta tenga saldo y avisar a cocina",
  capaBaseDeDatos: "Guardar la venta en la tabla 'pedidos'"
};

console.log("Orden procesada para:", ordenRestaurante.cliente);
console.log("Plato solicitado:", ordenRestaurante.plato);`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Crea tu primer perfil de Desarrollador Full Stack:
const desarrollador = {
  nombre: "Tu Nombre Aquí",
  rol: "Futuro Desarrollador Full Stack",
  habilidadesFrontend: ["HTML5", "CSS3", "JavaScript", "React"],
  habilidadesBackend: ["Node.js", "Express", "APIs REST"],
  baseDeDatos: "PostgreSQL",
  meta: "Construir aplicaciones que resuelvan problemas reales"
};

console.log("¡Hola, mundo! Mi nombre es: " + desarrollador.nombre);
console.log("Mi meta es: " + desarrollador.meta);`,
        explanation: 'Personaliza los valores del objeto y ejecútalo para ver tu tarjeta de presentación en la consola.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm1-l2-ex1',
          title: 'Definiendo el Frontend',
          level: 'facil',
          instruction: 'Crea una variable llamada `tecnologiaFrontend` con el valor "React" e imprímela con `console.log`.',
          starterCode: `// Ejercicio 1:
// Declara tecnologiaFrontend con el valor "React"

`,
          hints: ['const tecnologiaFrontend = "React";', 'console.log(tecnologiaFrontend);'],
          solutionCode: `const tecnologiaFrontend = "React";
console.log(tecnologiaFrontend);`,
          solutionExplanation: 'React es una de las librerías frontend más populares del mundo para construir interfaces interactivas.',
          testCheck: {
            type: 'output-contains',
            expected: 'React',
          },
        },
        {
          id: 'm1-l2-ex2',
          title: 'El clasificador de capas',
          level: 'medio',
          instruction: 'Escribe una función `clasificarCapa(nombre)` que reciba un nombre como "HTML" o "PostgreSQL". Si es "HTML" debe retornar "Frontend", si es "Node.js" debe retornar "Backend", y si es "PostgreSQL" debe retornar "Base de Datos". Imprime el resultado de llamar `clasificarCapa("Node.js")`.',
          starterCode: `function clasificarCapa(tecnologia) {
  // Tu lógica aquí con if / else
}

console.log(clasificarCapa("Node.js"));`,
          hints: [
            'Usa if (tecnologia === "Node.js") return "Backend";',
            'Recuerda verificar también "HTML" y "PostgreSQL".',
          ],
          solutionCode: `function clasificarCapa(tecnologia) {
  if (tecnologia === "HTML") return "Frontend";
  if (tecnologia === "Node.js") return "Backend";
  if (tecnologia === "PostgreSQL") return "Base de Datos";
  return "Desconocido";
}

console.log(clasificarCapa("Node.js"));`,
          solutionExplanation: 'Las funciones encapsulan lógica para que puedas reutilizarla muchas veces con diferentes entradas.',
          testCheck: {
            type: 'output-contains',
            expected: 'Backend',
          },
        },
        {
          id: 'm1-l2-ex3',
          title: 'Calculadora de tecnologías aprendidas',
          level: 'reto',
          instruction: 'Crea un arreglo `stack` con al menos 4 tecnologías que aprenderás en esta ruta (ej: "React", "Node.js", "Docker", "TypeScript"). Luego calcula cuántas tecnologías tienes con `.length` e imprime "Total a dominar: " seguido del número.',
          starterCode: `const stack = ["React", "Node.js", "Docker", "TypeScript"];

// Imprime el total con .length:
`,
          hints: [
            'stack.length te da la cantidad de elementos en el arreglo.',
            'console.log("Total a dominar: " + stack.length);',
          ],
          solutionCode: `const stack = ["React", "Node.js", "Docker", "TypeScript"];
console.log("Total a dominar: " + stack.length);`,
          solutionExplanation: 'Los arreglos te permiten agrupar listas de elementos y con la propiedad `.length` conoces su tamaño al instante.',
          testCheck: {
            type: 'output-contains',
            expected: 'Total a dominar: 4',
          },
        },
      ],
      quiz: [
        {
          id: 'm1-l2-q1',
          question: 'Siguiendo la analogía del restaurante, ¿qué parte de una aplicación representa el Comedor?',
          options: [
            'El Backend, porque procesa la tarjeta de crédito.',
            'El Frontend, porque es todo lo que el usuario ve e interactúa.',
            'La Base de Datos, porque guarda las mesas.',
            'El Servidor de DNS.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! El Frontend es la cara visible y la experiencia de usuario que se disfruta en el salón.',
        },
        {
          id: 'm1-l2-q2',
          question: '¿Por qué se llama desarrollador "Full Stack"?',
          options: [
            'Porque solo trabaja con computadoras de última generación.',
            'Porque domina tanto el frontend (cliente), como el backend (servidor) y las bases de datos (la pila completa de tecnologías).',
            'Porque trabaja exclusivamente reparando cables de red.',
            'Porque solo programa en un único lenguaje de programación antiguo.',
          ],
          correctIndex: 1,
          explanation: '¡Muy bien! "Stack" significa pila en inglés. Un desarrollador Full Stack trabaja con todas las capas de la pila tecnológica.',
        },
        {
          id: 'm1-l2-q3',
          question: '¿Cuál es la responsabilidad principal del Backend en una tienda online?',
          options: [
            'Elegir el color del botón de compra y la tipografía.',
            'Validar los datos del usuario, procesar el pago con el banco y registrar el pedido de forma segura.',
            'Instalar el navegador en el teléfono del cliente.',
            'Hacer que el ratón del usuario se mueva suavemente.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! El Backend gestiona la lógica crítica, la seguridad y las transacciones que no pueden dejarse en manos del navegador del cliente.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El Frontend se encarga de la interfaz y la experiencia directa del usuario en el navegador o app móvil.',
          'El Backend ejecuta las reglas del negocio, la seguridad y la comunicación con servicios externos.',
          'La Base de Datos conserva la información de forma estructurada para que no se pierda al apagar el equipo.',
          'Programar no es memorizar, sino descomponer problemas grandes en pasos pequeños y lógicos.',
        ],
        commonPitfalls: [
          'Creer que necesitas saber todos los lenguajes de programación del mundo para ser un buen programador.',
          'Pensar que el Backend puede confiar ciegamente en lo que envía el Frontend (siempre hay que validar en el servidor).',
          'Frustrarse si un programa no funciona al primer intento: el "debugging" (encontrar y corregir errores) es el 70% del trabajo normal de cualquier ingeniero senior.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm1-l3-logica-y-algoritmos',
      moduleId: 1,
      slug: 'logica-de-programacion-y-algoritmos',
      title: 'Lógica de Programación y Algoritmos para Principiantes',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Principiante',
      objective: 'Aprender a pensar algorítmicamente: variables como cajas, condicionales como bifurcaciones en el camino, y bucles como tareas repetitivas.',
      realWorldAnalogy: {
        title: 'La Receta para Hornear un Pastel y Cajas de Juguetes',
        analogy: 'Un **algoritmo** no es más que una receta de cocina paso a paso sin ambigüedades. Si le dices a un robot "hazme un sándwich", no sabrá qué hacer. Pero si le dices: 1) Toma dos rebanadas de pan; 2) Abre el frasco de mermelada; 3) Unta una cucharada; 4) Junta las rebanadas, el robot lo logrará siempre con exactitud.\n\nUna **variable** es como una caja de cartón con una etiqueta pegada afuera. La etiqueta dice "edad" y adentro guardas un papelito con el número "25". Si cumples años, abres la caja, borras el 25 y metes un 26. ¡La caja sigue siendo la misma, lo que cambia es su contenido!',
        whyItMatters: 'Las computadoras son increíblemente veloces, pero completamente literales. La lógica de programación es el arte de darle instrucciones tan precisas que no haya margen de error.',
        iconName: 'Cpu',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Tres Pilares de la Lógica de Programación',
            content: 'Cualquier software del mundo (desde Instagram hasta el piloto automático de un cohete espacial) está construido con solo tres elementos básicos:\n\n1. **Secuencia:** Las instrucciones se ejecutan en orden, una tras otra, de arriba hacia abajo.\n2. **Decisión (Condicionales):** "Si está lloviendo, lleva paraguas; si no, lleva gafas de sol" (`if` / `else`).\n3. **Repetición (Bucles):** "Repite batir los huevos hasta que la mezcla esté espumosa" (`for` / `while`).',
          },
          {
            heading: 'Tipos de Datos Esenciales',
            content: '• **Números (Number):** `42`, `3.14` (para cálculos matemáticos).\n• **Textos (String):** `"Hola mundo"` (siempre entre comillas dobles o simples).\n• **Booleanos (Boolean):** `true` o `false` (la moneda de dos caras: verdadero o falso).\n• **Arreglos (Array):** Listas ordenadas como `["manzana", "plátano", "pera"]`.',
            codeSnippet: {
              language: 'javascript',
              description: 'Combinando los tres pilares en un programa real:',
              code: `// 1. Variables (cajas etiquetadas)
const temperatura = 32; // grados Celsius
const pronosticoLluvia = false;

// 2. Decisión (condicional)
if (temperatura > 30 && !pronosticoLluvia) {
  console.log("¡Día perfecto para ir a la playa!");
} else {
  console.log("Mejor nos quedamos programando en casa.");
}

// 3. Repetición (bucle)
console.log("Contando para el despegue:");
for (let cuenta = 3; cuenta >= 1; cuenta--) {
  console.log(cuenta + "...");
}
console.log("¡Despegue!");`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Practica la lógica: ¿Quién puede entrar a la montaña rusa?
const estaturaMinimaCm = 140;
const estaturaAmigo1 = 155;
const estaturaAmigo2 = 132;

function puedeSubir(nombre, estatura) {
  if (estatura >= estaturaMinimaCm) {
    return "✅ " + nombre + " puede subir a la montaña rusa.";
  } else {
    const falta = estaturaMinimaCm - estatura;
    return "❌ " + nombre + " no puede subir aún (le faltan " + falta + " cm).";
  }
}

console.log(puedeSubir("Lucas", estaturaAmigo1));
console.log(puedeSubir("Mateo", estaturaAmigo2));`,
        explanation: 'Prueba cambiando las alturas o agregando un tercer amigo para ver cómo reacciona el algoritmo.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm1-l3-ex1',
          title: 'El verificador de mayoría de edad',
          level: 'facil',
          instruction: 'Declara una variable `edad = 19`. Escribe una condición que imprima "Mayor de edad" si la edad es mayor o igual a 18, o "Menor de edad" en caso contrario.',
          starterCode: `const edad = 19;

// Escribe tu condición if / else aquí:
`,
          hints: ['if (edad >= 18) { console.log("Mayor de edad"); } else { console.log("Menor de edad"); }'],
          solutionCode: `const edad = 19;

if (edad >= 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor de edad");
}`,
          solutionExplanation: 'El operador `>=` compara si un valor es mayor o igual que otro para tomar una decisión en el flujo del programa.',
          testCheck: {
            type: 'output-contains',
            expected: 'Mayor de edad',
          },
        },
        {
          id: 'm1-l3-ex2',
          title: 'La sumatoria con bucles',
          level: 'medio',
          instruction: 'Usa un bucle `for` para sumar los números del 1 al 5. Guarda la suma acumulada en una variable `total` y al final imprime "Total: " seguido de la suma (debe ser 15).',
          starterCode: `let total = 0;

// Usa un bucle for desde i = 1 hasta i <= 5 para sumar cada i a total:

console.log("Total: " + total);`,
          hints: [
            'for (let i = 1; i <= 5; i++) { total += i; }',
            'Recuerda usar let total porque su valor va a cambiar en cada vuelta.',
          ],
          solutionCode: `let total = 0;

for (let i = 1; i <= 5; i++) {
  total += i;
}

console.log("Total: " + total);`,
          solutionExplanation: 'Las variables declaradas con `let` permiten reasignar su valor, lo que es ideal para acumuladores en bucles.',
          testCheck: {
            type: 'output-contains',
            expected: 'Total: 15',
          },
        },
        {
          id: 'm1-l3-ex3',
          title: 'El filtro de números pares (Reto)',
          level: 'reto',
          instruction: 'Dado el arreglo `numeros = [1, 2, 3, 4, 5, 6]`, recorre cada número y si es par (pista: `num % 2 === 0`), agrégalo a un nuevo arreglo llamado `pares`. Al final imprime `pares`.',
          starterCode: `const numeros = [1, 2, 3, 4, 5, 6];
const pares = [];

// Recorre con for...of y usa pares.push(num) si es par:

console.log("Pares encontrados:", pares);`,
          hints: [
            'Usa el operador módulo %: si (num % 2 === 0) significa que el residuo al dividir entre 2 es 0, por lo que es par.',
            'Usa pares.push(num); dentro del if para agregarlo a la lista.',
          ],
          solutionCode: `const numeros = [1, 2, 3, 4, 5, 6];
const pares = [];

for (const num of numeros) {
  if (num % 2 === 0) {
    pares.push(num);
  }
}

console.log("Pares encontrados:", pares);`,
          solutionExplanation: 'El operador `%` (módulo o resto) es un clásico en la programación para detectar números pares, múltiplos o ciclos.',
          testCheck: {
            type: 'output-contains',
            expected: '2,',
          },
        },
      ],
      quiz: [
        {
          id: 'm1-l3-q1',
          question: '¿Qué es exactamente un algoritmo?',
          options: [
            'Un tipo especial de pantalla para monitores de alta definición.',
            'Una serie finita y ordenada de pasos o instrucciones para resolver un problema específico.',
            'Un virus informático que borra datos.',
            'Un cable que conecta dos computadoras.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Al igual que una receta de cocina o un manual de montaje, un algoritmo es una secuencia lógica de pasos.',
        },
        {
          id: 'm1-l3-q2',
          question: '¿Cuál es la diferencia clave entre una variable declarada con `const` y una con `let`?',
          options: [
            'const solo sirve para números y let para textos.',
            'const no permite que reasignes su valor una vez definido, mientras que let sí permite cambiarlo.',
            'let es más rápido que const.',
            'No hay ninguna diferencia, son exactamente iguales.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! `const` (constante) protege tu valor para que no cambie por accidente, mientras que `let` es para valores que mutarán (como un contador).',
        },
        {
          id: 'm1-l3-q3',
          question: '¿Qué resultado produce la expresión matemática `10 % 3` en programación?',
          options: [
            'El 10% de 3 (0.3).',
            'El residuo de dividir 10 entre 3, que es 1 (porque 3 * 3 = 9 y sobra 1).',
            '30 (multiplicación).',
            '3.333333...',
          ],
          correctIndex: 1,
          explanation: '¡Perfecto! El operador `%` es el operador módulo o resto, fundamental para verificar divisibilidad.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La programación se reduce a tres estructuras: Secuencias, Decisiones (if/else) y Bucles (for/while).',
          'Las variables son cajitas en memoria donde guardamos datos para usarlos más adelante.',
          'Usa `const` por defecto, y solo usa `let` si necesitas cambiar el valor con el tiempo.',
          'Pensar paso a paso como si le explicaras a un niño pequeño es la mejor técnica para programar.',
        ],
        commonPitfalls: [
          'Confundir `=` (asignar un valor) con `===` (comparar si dos cosas son exactamente iguales).',
          'Crear bucles infinitos por olvidar incrementar el contador en un `while`.',
          'Intentar escribir todo el código de una sola vez sin probarlo poco a poco con `console.log`.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm1-l4-la-terminal-sin-miedo',
      moduleId: 1,
      slug: 'la-terminal-sin-miedo',
      title: 'La Terminal sin Miedo: Hablando Directamente con tu Computadora',
      order: 4,
      estimatedTime: '20 min',
      difficulty: 'Principiante',
      objective: 'Perder el miedo a la pantalla negra con letras. Aprender a navegar carpetas, crear archivos y ejecutar comandos esenciales desde la línea de comandos.',
      realWorldAnalogy: {
        title: 'Mensajes de Texto vs. Hacer Señas con las Manos',
        analogy: 'La interfaz gráfica a la que estás acostumbrado (ventanas, iconos bonitos, la papelera de reciclaje) es como comunicarte con tu computadora **haciendo señas con las manos** (apuntas con el ratón y haces clic). Funciona, pero es lento y limitado.\n\nLa **Terminal o Línea de Comandos** es como enviarle **mensajes de texto directos** a tu sistema operativo. En vez de abrir el explorador de archivos, hacer clic derecho, "Nueva Carpeta", poner el nombre y hacer doble clic, simplemente escribes: `mkdir mi-proyecto && cd mi-proyecto` y en medio milisegundo está listo.',
        whyItMatters: 'Los servidores en la nube no tienen pantalla ni ratón. Como desarrollador Full Stack, gestionarás servidores remotos en Linux usando únicamente la terminal.',
        iconName: 'Terminal',
      },
      explanation: {
        sections: [
          {
            heading: 'El Vocabulario Básico de la Terminal',
            content: 'No necesitas memorizar cientos de comandos. Con solo estos 6 comandos esenciales harás el 90% de tus tareas diarias:\n\n1. `pwd` *(Print Working Directory)*: "¿Dónde estoy parado en este momento?".\n2. `ls` *(List)*: "Muéstrame qué archivos y carpetas hay aquí".\n3. `cd <carpeta>` *(Change Directory)*: "Entra a esta carpeta" (usa `cd ..` para salir y subir un nivel).\n4. `mkdir <nombre>` *(Make Directory)*: "Crea una nueva carpeta".\n5. `touch <archivo>`: "Crea un archivo nuevo vacío".\n6. `cat <archivo>`: "Muéstrame el contenido del archivo en la pantalla".',
          },
          {
            heading: 'La Regla de Oro de la Terminal',
            content: 'En la terminal: **si un comando se ejecuta con éxito, generalmente no dice nada** (el silencio significa éxito). Si escribes `mkdir fotos` y la terminal solo vuelve a mostrar el cursor sin quejarse, ¡significa que funcionó a la perfección!',
            callout: {
              type: 'tip',
              text: 'Truco ninja: En la terminal real, si presionas la tecla TAB, el sistema autocompleta los nombres de archivos y carpetas automáticamente.',
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'bash',
        initialCode: `ls`,
        explanation: 'Esta es una terminal interactiva real en el navegador. Escribe comandos como "ls", "pwd", "mkdir mi-app", "cd mi-app" o "help" para ver qué sucede.',
        mode: 'terminal',
      },
      exercises: [
        {
          id: 'm1-l4-ex1',
          title: 'Inspeccionando el territorio',
          level: 'facil',
          instruction: 'En el simulador de terminal de la derecha, escribe el comando `pwd` para descubrir en qué directorio estás ubicado actualmente.',
          starterCode: `pwd`,
          hints: ['Escribe exactamente pwd y presiona Enter.'],
          solutionCode: `pwd`,
          solutionExplanation: '`pwd` te devuelve la ruta absoluta de la carpeta en la que te encuentras (ej: ~/proyectos).',
          testCheck: {
            type: 'code-contains',
            expected: 'pwd',
          },
        },
        {
          id: 'm1-l4-ex2',
          title: 'Creando tu primer directorio',
          level: 'medio',
          instruction: 'Usa el comando `mkdir` para crear una carpeta llamada `codigo-secreto` y luego usa `ls` para verificar que aparezca en la lista.',
          starterCode: `mkdir codigo-secreto`,
          hints: ['Primero ejecuta: mkdir codigo-secreto', 'Luego ejecuta: ls para verla en la lista.'],
          solutionCode: `mkdir codigo-secreto\nls`,
          solutionExplanation: '`mkdir` (Make Directory) es la orden universal para crear carpetas en Linux, Mac y Windows.',
          testCheck: {
            type: 'code-contains',
            expected: 'mkdir',
          },
        },
        {
          id: 'm1-l4-ex3',
          title: 'Navegación y creación de archivos',
          level: 'reto',
          instruction: 'Crea una carpeta llamada `sitio`, entra a ella con `cd sitio`, y dentro crea un archivo llamado `index.html` usando `touch index.html`.',
          starterCode: `mkdir sitio
cd sitio
touch index.html`,
          hints: [
            'mkdir sitio crea la carpeta.',
            'cd sitio entra en ella.',
            'touch index.html genera el archivo dentro de esa carpeta.',
          ],
          solutionCode: `mkdir sitio\ncd sitio\ntouch index.html`,
          solutionExplanation: 'Esta es la secuencia exacta que realizan millones de desarrolladores cada día para iniciar un nuevo proyecto web.',
          testCheck: {
            type: 'code-contains',
            expected: 'touch',
          },
        },
      ],
      quiz: [
        {
          id: 'm1-l4-q1',
          question: '¿Qué comando debes escribir para salir de la carpeta actual y retroceder a la carpeta superior?',
          options: [
            'exit folder',
            'cd .. (con dos puntos)',
            'back',
            'undo cd',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! Los dos puntos `..` representan el directorio padre en sistemas operativos UNIX y Windows.',
        },
        {
          id: 'm1-l4-q2',
          question: '¿Por qué los desarrolladores profesionales prefieren usar la terminal para muchas tareas?',
          options: [
            'Porque es la única forma de que la computadora se encienda.',
            'Porque es mucho más rápida, permite automatizar tareas complejas con scripts y es el único método para controlar servidores remotos sin pantalla.',
            'Porque los gráficos de ventanas consumen toda la electricidad del edificio.',
            'Porque hace que el teclado suene más fuerte.',
          ],
          correctIndex: 1,
          explanation: '¡Exactamente! La velocidad y la capacidad de automatización de la terminal no tienen rival en la ingeniería de software.',
        },
        {
          id: 'm1-l4-q3',
          question: '¿Qué ocurre habitualmente en la terminal si un comando se ejecuta sin ningún error?',
          options: [
            'Suena una música de victoria.',
            'La pantalla parpadea en color verde durante 5 segundos.',
            'No muestra ningún mensaje de error y simplemente vuelve a dejar el cursor listo para el siguiente comando.',
            'Se reinicia la computadora.',
          ],
          correctIndex: 2,
          explanation: '¡Así es! La filosofía Unix dice: "Silencio es oro". Si todo salió bien, la terminal no te llena la pantalla con avisos innecesarios.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La terminal es simplemente una forma textual y súper rápida de darle órdenes directas al sistema operativo.',
          'Comandos vitales: `pwd` (dónde estoy), `ls` (qué hay), `cd` (navegar), `mkdir` (crear carpeta), `touch` (crear archivo).',
          'La tecla TAB es tu mejor amiga para autocompletar rutas y no escribir de más.',
        ],
        commonPitfalls: [
          'Entrar en pánico con la pantalla negra: la terminal solo hace lo que tú le pides.',
          'Olvidar los espacios entre los comandos y sus argumentos (ej: escribir `cd..` en vez de `cd ..`).',
          'Estar en la carpeta equivocada al ejecutar un comando: siempre verifica tu ubicación con `pwd`.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm1-l5-git-y-github',
      moduleId: 1,
      slug: 'git-y-github-paso-a-paso',
      title: 'Git y GitHub: La Máquina del Tiempo de tu Código',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Principiante',
      objective: 'Comprender qué es un sistema de control de versiones, cómo guardar instantáneas de tu proyecto con Git y cómo sincronizarlo con GitHub en la nube.',
      realWorldAnalogy: {
        title: 'El Videojuego con Puntos de Guardado y Google Docs',
        analogy: '¿Alguna vez has guardado un documento escolar como:\n• `tesis_final.doc`\n• `tesis_final_corregida.doc`\n• `tesis_final_AHORA_SI_DEFINITIVA.doc`?\n¡Todos hemos cometido ese error caótico! **Git** es la solución a ese dolor de cabeza.\n\nPiensa en Git como los **puntos de guardado (Checkpoints) de un videojuego**. Estás antes de una batalla contra el monstruo final; guardas la partida. Si mueres o arruinas tu código, ¡puedes retroceder en el tiempo exactamente al punto de guardado sin perder nada!\n\n¿Y qué es **GitHub**? Si Git es la máquina del tiempo en tu laptop, GitHub es una red social y nube como Google Docs donde subes tus puntos de guardado para que otros programadores colaboren contigo desde cualquier parte del mundo.',
        whyItMatters: 'Ninguna empresa tecnológica del planeta contrata a un desarrollador que no sepa usar Git. Es el estándar absoluto de la industria.',
        iconName: 'GitBranch',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Tres Estados del Código en Git',
            content: 'Para tomar una foto de tu proyecto con Git, existen tres zonas:\n\n1. **Directorio de Trabajo (Working Directory):** Tus archivos reales en tu editor de código.\n2. **Zona de Preparación (Staging Area):** La caja donde dices: "Quiero incluir estos archivos específicos en la próxima foto" (`git add .`).\n3. **El Repositorio (Commit / Instantánea):** La foto tomada con fecha, hora y mensaje descriptivo (`git commit -m "Agregada barra de navegación"`).',
          },
          {
            heading: 'El Flujo de Trabajo que Usarás Todos los Días',
            content: 'El ciclo diario de todo programador se resume en estos 4 pasos:\n\n1. `git init` (Una sola vez al nacer el proyecto para activar la máquina del tiempo).\n2. Modificas o creas tus archivos en el editor.\n3. `git add .` (Preparas los archivos para la foto).\n4. `git commit -m "Explicación clara de qué cambiaste"` (Tomas la foto y guardas el punto de control).',
            codeSnippet: {
              language: 'bash',
              description: 'Los comandos en acción:',
              code: `# 1. Iniciar la máquina del tiempo:
git init

# 2. Ver qué archivos cambiaron:
git status

# 3. Preparar todos los cambios:
git add .

# 4. Tomar la foto con mensaje:
git commit -m "Mi primer commit en RutaFullStack"`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'bash',
        initialCode: `git init`,
        explanation: '¡Prueba los comandos de Git en nuestro simulador interactivo! Escribe: "git init", luego "git status", luego "git add .", y finalmente "git commit -m \\"primer checkpoint\\"". Luego mira el historial con "git log".',
        mode: 'terminal',
      },
      exercises: [
        {
          id: 'm1-l5-ex1',
          title: 'Encendiendo la máquina del tiempo',
          level: 'facil',
          instruction: 'Ejecuta el comando para inicializar un repositorio Git en la terminal del laboratorio.',
          starterCode: `git init`,
          hints: ['El comando para iniciar Git en una carpeta es: git init'],
          solutionCode: `git init`,
          solutionExplanation: '`git init` crea la carpeta oculta `.git` donde Git guarda todo el historial y metadatos.',
          testCheck: {
            type: 'code-contains',
            expected: 'git init',
          },
        },
        {
          id: 'm1-l5-ex2',
          title: 'Consultando el estado del repositorio',
          level: 'medio',
          instruction: 'Usa `git status` para ver qué archivos están modificados o pendientes de ser agregados a la foto.',
          starterCode: `git status`,
          hints: ['Escribe: git status y presiona Enter.'],
          solutionCode: `git status`,
          solutionExplanation: '`git status` es el comando que más ejecutarás para saber exactamente qué cambió en tu código.',
          testCheck: {
            type: 'code-contains',
            expected: 'git status',
          },
        },
        {
          id: 'm1-l5-ex3',
          title: 'Tu primer Commit oficial (Reto)',
          level: 'reto',
          instruction: 'Prepara todos los archivos con `git add .` y crea un commit con el mensaje "Mi primer guardado" usando `git commit -m "Mi primer guardado"`.',
          starterCode: `git add .
git commit -m "Mi primer guardado"`,
          hints: [
            'Primero prepara: git add .',
            'Luego guarda: git commit -m "Mi primer guardado"',
          ],
          solutionCode: `git add .\ngit commit -m "Mi primer guardado"`,
          solutionExplanation: 'Al hacer `git commit` has generado un hash único e inmutable en la historia de tu proyecto.',
          testCheck: {
            type: 'code-contains',
            expected: 'git commit',
          },
        },
      ],
      quiz: [
        {
          id: 'm1-l5-q1',
          question: '¿Cuál es la diferencia principal entre Git y GitHub?',
          options: [
            'Git es de Microsoft y GitHub es de Apple.',
            'Git es el programa que corre localmente en tu computadora para controlar versiones, y GitHub es la plataforma en la nube para alojar y compartir tus repositorios Git.',
            'Git solo funciona para diseño gráfico y GitHub para texto.',
            'Son dos nombres comerciales para el mismo programa exactamente.',
          ],
          correctIndex: 1,
          explanation: '¡Exactamente! Git es la herramienta local de control de versiones y GitHub es el servicio en la nube donde se respaldan y colaboran esos repositorios.',
        },
        {
          id: 'm1-l5-q2',
          question: '¿Para qué sirve el comando `git add .` en el flujo de trabajo?',
          options: [
            'Para borrar todos los archivos del disco duro.',
            'Para enviar los archivos a la papelera de reciclaje.',
            'Para colocar todos los archivos modificados en el área de preparación (staging area) antes de tomar el commit.',
            'Para apagar la terminal.',
          ],
          correctIndex: 2,
          explanation: '¡Correcto! `git add .` selecciona los archivos para que formen parte del próximo commit.',
        },
        {
          id: 'm1-l5-q3',
          question: '¿Por qué es fundamental escribir mensajes claros en los commits (ej: "Corregido error en login" en vez de "asdasd" o "cambios")?',
          options: [
            'Porque si no escribes bien, la computadora no enciende.',
            'Porque cuando tú o tu equipo necesiten buscar un error en el pasado, el mensaje de commit explica exactamente qué se intentaba resolver en ese instante.',
            'Porque GitHub te cobra dinero por cada letra.',
            'Solo es una norma decorativa sin utilidad práctica.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Los mensajes de commit son la bitácora histórica de tu proyecto. Un buen mensaje ahorra horas de frustración a futuro.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Git es un sistema de control de versiones: puntos de guardado que te permiten viajar en el tiempo si algo se rompe.',
          'GitHub es el hogar en la nube de tus repositorios Git para colaborar con el mundo.',
          'El flujo sagrado: Modificar código ➔ `git add .` ➔ `git commit -m "mensaje"` ➔ `git push` (a la nube).',
          'Los mensajes de commit deben ser claros y descriptivos.',
        ],
        commonPitfalls: [
          'Hacer un commit sin haber hecho antes `git add .` (Git te dirá que no hay nada para guardar).',
          'Escribir mensajes de commit inútiles como "cambios", "fix", o "final final ya quedó".',
          'Tener miedo a romper cosas: ¡con Git siempre puedes retroceder al commit anterior!',
        ],
      },
      xpReward: 50,
    },
  ],
};
