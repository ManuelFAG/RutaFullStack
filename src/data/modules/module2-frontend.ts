import type { Module } from '../../types/curriculum';

export const MODULE_2_FRONTEND: Module = {
  id: 2,
  slug: 'frontend',
  title: '2. Frontend Moderno',
  description: 'Aprende a crear sitios web y aplicaciones interactivas: desde el esqueleto con HTML5 y el diseño con CSS3 (Flexbox/Grid), hasta JavaScript moderno (ES6+), APIs y componentes con React y TypeScript.',
  icon: 'Layout',
  color: 'sky',
  badge: {
    id: 'modulo-2-maestro',
    name: 'Arquitecto Frontend',
    description: 'Completaste la creación de interfaces modernas con HTML5, CSS3, JavaScript y React.',
    icon: 'Palette',
    category: 'modulo',
  },
  lessons: [
    {
      id: 'm2-l1-html5-semantico',
      moduleId: 2,
      slug: 'html5-semantico-estructura',
      title: 'HTML5 Semántico: El Esqueleto y los Planos de la Web',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Principiante',
      objective: 'Comprender qué es HTML5, cómo se estructuran las etiquetas, y por qué usar etiquetas semánticas (<header>, <main>, <article>, <footer>) es vital para la accesibilidad y los motores de búsqueda como Google.',
      realWorldAnalogy: {
        title: 'El Esqueleto Humano y los Planos de una Casa',
        analogy: 'Si una página web fuera una persona, **HTML es su esqueleto óseo**: define dónde van los brazos, las costillas y la cabeza. Sin esqueleto, seríamos una masa amorfa en el suelo.\n\nAntiguamente, los programadores construían todo usando cajas genéricas sin nombre llamadas `<div>` (como etiquetar cada habitación de una mansión simplemente como "Cuarto"). En HTML5 moderno usamos **etiquetas semánticas con significado**: `<header>` es la entrada principal, `<nav>` son los pasillos de navegación, `<main>` es la sala de estar principal, y `<footer>` es la puerta trasera de servicio. Esto permite que personas con discapacidad visual que usan lectores de pantalla y robots de Google entiendan tu página con facilidad.',
        whyItMatters: 'El 100% de las páginas web del planeta se apoyan en HTML. Un HTML bien estructurado hace que tu página cargue más rápido y aparezca en las primeras posiciones de Google.',
        iconName: 'FileCode',
      },
      explanation: {
        sections: [
          {
            heading: 'Anatomía de una Etiqueta HTML',
            content: 'Casi todas las etiquetas HTML vienen en pares:\n1. **Etiqueta de apertura:** `<etiqueta>`\n2. **Contenido:** El texto, imagen o botones dentro.\n3. **Etiqueta de cierre:** `</etiqueta>` (lleva una barra inclinada `/`).\n\nAlgunas etiquetas tienen **atributos** (configuraciones adicionales) como `id`, `class` o `href`.',
            codeSnippet: {
              language: 'html',
              description: 'Ejemplo de etiqueta con atributo:',
              code: `<!-- Una etiqueta de enlace con atributo href (destino): -->
<a href="https://rutafullstack.com" target="_blank">
  Ir a RutaFullStack
</a>`,
            },
          },
          {
            heading: 'Estructura Semántica Estándar de una Página',
            content: 'Una página web moderna y accesible se organiza así:\n\n• `<header>`: Encabezado del sitio (logo, título, menú principal).\n• `<nav>`: Barra de enlaces de navegación.\n• `<main>`: El contenido exclusivo y principal de la página actual.\n• `<section>`: Un bloque temático dentro del contenido.\n• `<article>`: Una pieza de contenido independiente (como un post de blog o tarjeta de producto).\n• `<footer>`: Pie de página (derechos de autor, redes sociales, contacto).',
            callout: {
              type: 'tip',
              text: 'Regla de oro de accesibilidad: Solo debe haber un único encabezado principal <h1> por página web. Los subtítulos van en <h2>, <h3>, etc.',
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de estructura HTML en JavaScript:
const paginaWeb = {
  header: "<header><h1>Mi Portafolio Web</h1></header>",
  nav: "<nav><a href='#proyectos'>Proyectos</a></nav>",
  main: "<main><article><h2>Mi Primer Proyecto</h2><p>¡Creado en RutaFullStack!</p></article></main>",
  footer: "<footer><p>© 2026 Desarrollador Full Stack</p></footer>"
};

console.log("Estructura completa de la página:");
console.log(paginaWeb.header);
console.log(paginaWeb.nav);
console.log(paginaWeb.main);
console.log(paginaWeb.footer);`,
        explanation: 'Explora cómo cada etiqueta semántica cumple un rol específico en la maqueta web.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm2-l1-ex1',
          title: 'Creando un titular semántico',
          level: 'facil',
          instruction: 'Declara una variable llamada `etiquetaTitulo` con el valor `<h1>RutaFullStack</h1>` e imprímela con `console.log`.',
          starterCode: `// Ejercicio 1:
// Declara etiquetaTitulo con <h1>RutaFullStack</h1>

`,
          hints: ['const etiquetaTitulo = "<h1>RutaFullStack</h1>";', 'console.log(etiquetaTitulo);'],
          solutionCode: `const etiquetaTitulo = "<h1>RutaFullStack</h1>";
console.log(etiquetaTitulo);`,
          solutionExplanation: 'La etiqueta `<h1>` representa el título principal más importante de cualquier documento web.',
          testCheck: {
            type: 'output-contains',
            expected: '<h1>RutaFullStack</h1>',
          },
        },
        {
          id: 'm2-l1-ex2',
          title: 'El verificador de etiquetas semánticas',
          level: 'medio',
          instruction: 'Crea una función `esEtiquetaSemantica(tag)` que reciba un texto (ej: "main" o "div"). Si es "header", "main", "nav", "article" o "footer", debe retornar true, de lo contrario false. Prueba con "article".',
          starterCode: `function esEtiquetaSemantica(tag) {
  const semanticas = ["header", "nav", "main", "article", "section", "footer"];
  return semanticas.includes(tag);
}

console.log("¿Es semántica 'article'?:", esEtiquetaSemantica("article"));`,
          hints: [
            'Usa el arreglo semanticas con includes(tag).',
            'La función retornará true cuando le pases "article".',
          ],
          solutionCode: `function esEtiquetaSemantica(tag) {
  const semanticas = ["header", "nav", "main", "article", "section", "footer"];
  return semanticas.includes(tag);
}

console.log("¿Es semántica 'article'?:", esEtiquetaSemantica("article"));`,
          solutionExplanation: 'Las etiquetas semánticas sustituyen a los antiguos contenedores genéricos `<div>` dando claridad conceptual al documento.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm2-l1-ex3',
          title: 'Constructor de enlaces accesibles (Reto)',
          level: 'reto',
          instruction: 'Crea una función `crearEnlace(texto, url)` que retorne una etiqueta `<a>` con el atributo `href` y el texto adentro. Por ejemplo, `crearEnlace("GitHub", "https://github.com")` debe retornar `<a href="https://github.com">GitHub</a>`. Imprime el resultado.',
          starterCode: `function crearEnlace(texto, url) {
  // Retorna el string con la etiqueta <a> completa usando template literals
}

console.log(crearEnlace("GitHub", "https://github.com"));`,
          hints: [
            'Usa comillas invertidas (template strings): `<a href="${url}">${texto}</a>`',
            'Recuerda cerrar la etiqueta con </a>.',
          ],
          solutionCode: `function crearEnlace(texto, url) {
  return \`<a href="\${url}">\${texto}</a>\`;
}

console.log(crearEnlace("GitHub", "https://github.com"));`,
          solutionExplanation: 'Los template literals de JavaScript con `${}` son perfectos para componer cadenas HTML dinámicamente.',
          testCheck: {
            type: 'output-contains',
            expected: '<a href="https://github.com">GitHub</a>',
          },
        },
      ],
      quiz: [
        {
          id: 'm2-l1-q1',
          question: '¿Por qué es preferible usar etiquetas semánticas como <article> o <nav> en lugar de simplemente <div>?',
          options: [
            'Porque las etiquetas semánticas hacen que el internet sea más rápido.',
            'Porque le dan significado al contenido, mejorando el posicionamiento en Google (SEO) y la accesibilidad para personas que usan lectores de pantalla.',
            'Porque las etiquetas <div> están prohibidas en navegadores modernos.',
            'Solo es una sugerencia decorativa que no tiene ningún impacto real.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! La semántica web ayuda a humanos y a máquinas (motores de búsqueda y tecnología asistiva) a entender la estructura lógica de la página.',
        },
        {
          id: 'm2-l1-q2',
          question: '¿Cuántas etiquetas <h1> principales se recomienda incluir por página web según las buenas prácticas?',
          options: [
            'Ninguna, solo se deben usar <h2>.',
            'Una sola por página, representando el título principal del documento.',
            'Exactamente diez en cada sección.',
            'Tantas como quieras, no existe ninguna recomendación al respecto.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Mantener un único <h1> por página ayuda a estructurar una jerarquía clara de títulos para motores de búsqueda y accesibilidad.',
        },
        {
          id: 'm2-l1-q3',
          question: '¿Qué etiqueta HTML semántica está diseñada para albergar los enlaces de navegación del sitio web?',
          options: [
            '<header>',
            '<nav>',
            '<menu-lateral>',
            '<section>',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! <nav> (navigation) es la etiqueta estándar para agrupar bloques de enlaces de navegación primarios.',
        },
      ],
      summary: {
        keyTakeaways: [
          'HTML5 define la estructura y el contenido de la web.',
          'Las etiquetas semánticas (<header>, <nav>, <main>, <article>, <footer>) aportan significado a la información.',
          'Los atributos (como href, src, id, class) configuran y personalizan las etiquetas.',
          'Estructurar bien el HTML es el paso más importante para el SEO y la accesibilidad.',
        ],
        commonPitfalls: [
          'La "divitis": envolver todo en etiquetas <div><div><div> sin usar etiquetas semánticas adecuadas.',
          'Olvidar cerrar etiquetas con su correspondiente </etiqueta>.',
          'Usar etiquetas <h1> por su tamaño visual en lugar de por su importancia jerárquica (el tamaño se controla con CSS, no con HTML).',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm2-l2-css3-flexbox-grid',
      moduleId: 2,
      slug: 'css3-flexbox-grid-responsive',
      title: 'CSS3, Flexbox y Grid: El Arte del Diseño y Responsive',
      order: 2,
      estimatedTime: '25 min',
      difficulty: 'Principiante',
      objective: 'Dominar cómo darle estilo a una web: el modelo de caja (margin, padding, border), alinear elementos sin dolor de cabeza con Flexbox y Grid, y adaptar el diseño a móviles (Responsive Design con Media Queries).',
      realWorldAnalogy: {
        title: 'La Pintura, la Ropa y los Muebles Modulares',
        analogy: 'Si HTML es el esqueleto humano, **CSS es la ropa, el peinado, los colores y el estilo**. Sin CSS, todas las páginas del mundo se verían como aburridos documentos de Word en blanco y negro con texto alineado a la izquierda.\n\n• **El Modelo de Caja:** Imagina un cuadro colgado en una pared. La pintura es el contenido. El marco de madera alrededor de la pintura es el `border`. El espacio suave entre la pintura y el marco es el `padding`. Y el espacio vacío entre ese cuadro y los otros cuadros en la pared es el `margin`.\n• **Flexbox:** Es como una fila de comensales en una barra de sushi. Puedes decirles: "repártanse el espacio por igual" (`justify-content: space-between`) o "alineense todos al centro" (`align-items: center`).\n• **CSS Grid:** Es como un tablero de ajedrez o una hoja de Excel bidimensional perfecta con filas y columnas.',
        whyItMatters: 'Más del 65% del tráfico web ocurre en teléfonos móviles. Si tu sitio no se adapta a pantallas de diferentes tamaños (diseño responsive), los usuarios lo abandonarán en segundos.',
        iconName: 'Palette',
      },
      explanation: {
        sections: [
          {
            heading: 'El Modelo de Caja (Box Model)',
            content: 'Cada elemento en una página web es una caja rectangular compuesta por 4 capas:\n\n1. **Content (Contenido):** El texto, foto o video en sí.\n2. **Padding (Relleno interno):** El espacio entre el contenido y el borde (hace que los botones no se sientan apretados).\n3. **Border (Borde):** La línea divisoria visible alrededor del elemento.\n4. **Margin (Margen exterior):** La distancia que separa esta caja de las cajas vecinas.',
            codeSnippet: {
              language: 'css',
              description: 'Estilo de una tarjeta moderna en CSS:',
              code: `.tarjeta-usuario {
  background-color: #0f172a;
  color: #f8fafc;
  padding: 1.5rem;       /* Espacio interior suave */
  border-radius: 1rem;   /* Bordes redondeados modernos */
  border: 1px solid #334155;
  margin-bottom: 1rem;   /* Separación con el elemento inferior */
}`,
            },
          },
          {
            heading: 'Flexbox: La Solución Definitiva para Alinear',
            content: 'Para activar la magia de Flexbox solo necesitas poner `display: flex;` en la caja contenedora padre.\n\n• `justify-content`: Controla la alineación horizontal (eje principal): `center`, `space-between`, `flex-start`.\n• `align-items`: Controla la alineación vertical (eje cruzado): `center`, `stretch`.\n• `flex-direction`: `row` (fila horizontal) o `column` (columna vertical).',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador del Box Model y Flexbox en JavaScript:
const elementoBoton = {
  ancho: "200px",
  padding: "12px 24px",
  margin: "16px auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  colorFondo: "#10b981", // Esmeralda vibrante
  colorTexto: "#ffffff",
  texto: "¡Regístrate Gratis!"
};

console.log("Propiedades calculadas del botón:");
console.log("Relleno interior (padding):", elementoBoton.padding);
console.log("Alineación con Flexbox:", elementoBoton.display, "| justify:", elementoBoton.justifyContent);
console.log("Resultado visual: Botón perfectamente centrado y legible.");`,
        explanation: 'Modifica los valores del padding y la alineación para entender cómo influyen en el diseño.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm2-l2-ex1',
          title: 'Calculando el tamaño con Box Model',
          level: 'facil',
          instruction: 'Crea una función `calcularAnchoTotal(contenido, padding, borde)` que sume el ancho del contenido + (padding * 2) + (borde * 2). Retorna el resultado para contenido=300, padding=20, borde=2 e imprímelo.',
          starterCode: `function calcularAnchoTotal(contenido, padding, borde) {
  // Suma contenido + padding izquierdo y derecho + borde izquierdo y derecho
}

console.log("Ancho total en píxeles:", calcularAnchoTotal(300, 20, 2));`,
          hints: [
            'El padding y el borde se aplican a ambos lados (izquierdo y derecho), por lo que se multiplican por 2.',
            'return contenido + (padding * 2) + (borde * 2);',
          ],
          solutionCode: `function calcularAnchoTotal(contenido, padding, borde) {
  return contenido + (padding * 2) + (borde * 2);
}

console.log("Ancho total en píxeles:", calcularAnchoTotal(300, 20, 2));`,
          solutionExplanation: 'En el modelo de caja clásico de CSS, el ancho total de un elemento suma el contenido más el padding y bordes de ambos lados.',
          testCheck: {
            type: 'output-contains',
            expected: '344',
          },
        },
        {
          id: 'm2-l2-ex2',
          title: 'El asistente de Flexbox',
          level: 'medio',
          instruction: 'Crea una función `obtenerAlineacionFlex(tipo)` que si recibe "centrado" retorne `{ display: "flex", justifyContent: "center", alignItems: "center" }`. Si recibe "separado" retorne `{ display: "flex", justifyContent: "space-between" }`. Imprime el resultado con "centrado".',
          starterCode: `function obtenerAlineacionFlex(tipo) {
  if (tipo === "centrado") {
    return { display: "flex", justifyContent: "center", alignItems: "center" };
  }
  return { display: "flex", justifyContent: "space-between" };
}

console.log(obtenerAlineacionFlex("centrado"));`,
          hints: [
            'Para centrar perfectamente tanto en horizontal como en vertical en Flexbox se combinan justifyContent: "center" y alignItems: "center".',
          ],
          solutionCode: `function obtenerAlineacionFlex(tipo) {
  if (tipo === "centrado") {
    return { display: "flex", justifyContent: "center", alignItems: "center" };
  }
  return { display: "flex", justifyContent: "space-between" };
}

console.log(obtenerAlineacionFlex("centrado"));`,
          solutionExplanation: 'El mítico problema de "¿Cómo centrar un div en CSS?" se resuelve al 100% con display: flex, justify-content: center y align-items: center.',
          testCheck: {
            type: 'output-contains',
            expected: 'center',
          },
        },
        {
          id: 'm2-l2-ex3',
          title: 'Simulador de Media Query Responsive (Reto)',
          level: 'reto',
          instruction: 'Crea una función `detectarDispositivo(anchoPantalla)` que reciba el ancho en píxeles. Si es menor a 640 retorne "Móvil", si está entre 640 y 1024 retorne "Tablet", y si es mayor a 1024 retorne "Escritorio". Imprime el resultado para una pantalla de 375px.',
          starterCode: `function detectarDispositivo(ancho) {
  // Tu lógica con if / else if / else
}

console.log("Dispositivo detectado:", detectarDispositivo(375));`,
          hints: [
            'if (ancho < 640) return "Móvil";',
            'else if (ancho <= 1024) return "Tablet";',
            'else return "Escritorio";',
          ],
          solutionCode: `function detectarDispositivo(ancho) {
  if (ancho < 640) return "Móvil";
  if (ancho <= 1024) return "Tablet";
  return "Escritorio";
}

console.log("Dispositivo detectado:", detectarDispositivo(375));`,
          solutionExplanation: 'Las Media Queries en CSS (`@media (max-width: 640px)`) funcionan bajo este principio exacto: aplican estilos diferentes según el ancho de la pantalla.',
          testCheck: {
            type: 'output-contains',
            expected: 'Móvil',
          },
        },
      ],
      quiz: [
        {
          id: 'm2-l2-q1',
          question: 'En el Modelo de Caja de CSS (Box Model), ¿cuál es la diferencia entre margin y padding?',
          options: [
            'No hay ninguna diferencia, son sinónimos.',
            'Padding es el espacio interior entre el contenido y el borde, mientras que margin es el espacio exterior que separa al elemento de sus vecinos.',
            'Padding solo se usa para textos y margin solo para imágenes.',
            'Margin cambia el color de fondo y padding cambia el tamaño de la fuente.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Padding es el relleno interno; margin es la distancia exterior con los elementos que lo rodean.',
        },
        {
          id: 'm2-l2-q2',
          question: '¿Qué propiedad de Flexbox permite alinear los elementos secundarios a lo largo del eje principal horizontal?',
          options: [
            'align-items',
            'justify-content',
            'flex-wrap',
            'text-align',
          ],
          correctIndex: 1,
          explanation: '¡Muy bien! `justify-content` controla la distribución y espaciado de los elementos en el eje principal (por defecto, horizontal).',
        },
        {
          id: 'm2-l2-q3',
          question: '¿Qué es el diseño web "Responsive" (Adaptable)?',
          options: [
            'Una página que responde preguntas automáticamente con inteligencia artificial.',
            'Una técnica de diseño que permite que un sitio web se ajuste fluidamente y se vea genial en pantallas de cualquier tamaño (móviles, tablets, monitores grandes).',
            'Una web que solo funciona con ratón y teclado.',
            'Un tipo de servidor que responde muy rápido.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! Responsive Design garantiza una experiencia de usuario perfecta sin importar si entra desde un iPhone diminuto o un monitor 4K panorámico.',
        },
      ],
      summary: {
        keyTakeaways: [
          'CSS controla la presentación visual, colores, tipografía y disposición espacial.',
          'El Box Model se compone de: Content, Padding (relleno interior), Border y Margin (distancia exterior).',
          'Flexbox es ideal para alinear elementos en una dimensión (filas o columnas).',
          'CSS Grid es perfecto para maquetar rejillas complejas bidimensionales.',
          'Las Media Queries permiten adaptar tu sitio a cualquier pantalla (Mobile First).',
        ],
        commonPitfalls: [
          'Usar márgenes negativos para "arreglar a la fuerza" desalineaciones en lugar de usar Flexbox.',
          'Olvidar agregar `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en el HTML, lo que hace que los móviles no apliquen el responsive correctamente.',
          'Confundir `align-items` (eje secundario) con `justify-content` (eje principal).',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm2-l3-javascript-es6-dom',
      moduleId: 2,
      slug: 'javascript-moderno-es6-dom',
      title: 'JavaScript Moderno (ES6+) y Manipulación del DOM',
      order: 3,
      estimatedTime: '30 min',
      difficulty: 'Intermedio',
      objective: 'Aprender las características más poderosas de JavaScript moderno (Arrow Functions, Destructuring, Spread Operator, Template Literals) y cómo conectar tu código a la página interactuando con el DOM y eventos de usuario.',
      realWorldAnalogy: {
        title: 'El Sistema Nervioso, los Músculos y los Interruptores de Luz',
        analogy: 'Si HTML es el esqueleto y CSS es la ropa, **JavaScript es el sistema nervioso y los músculos** que le dan vida al cuerpo.\n\n¿Y qué es el **DOM (Document Object Model)**? Imagina tu página web como una maqueta interactiva donde cada botón, párrafo o imagen tiene un interruptor o palanca con una etiqueta. El navegador toma tu HTML y crea un árbol de objetos en la memoria. Con JavaScript puedes decir: *"Oye, cuando el usuario presione el interruptor con id #boton-comprar, activa el músculo que añade el producto al carrito y cambia el color del botón a verde"* (`addEventListener("click", ...)`).',
        whyItMatters: 'JavaScript es el único lenguaje de programación que todos los navegadores del mundo entienden de forma nativa. Es el motor detrás de Facebook, Netflix, Google Maps y cualquier app web moderna.',
        iconName: 'Zap',
      },
      explanation: {
        sections: [
          {
            heading: 'Las Armas Secretas de JavaScript Moderno (ES6+)',
            content: '1. **Funciones Flecha (Arrow Functions):** Forma más limpia y concisa de escribir funciones:\n`const sumar = (a, b) => a + b;`\n\n2. **Desestructuración (Destructuring):** Extraer valores de objetos directamente como quien saca objetos de una mochila:\n`const { nombre, rol } = usuario;`\n\n3. **Operador Spread (`...`):** Copiar o expandir arreglos y objetos sin mutar los originales:\n`const nuevoArreglo = [...viejoArreglo, nuevoElemento];`\n\n4. **Template Literals:** Mezclar texto y variables con `${}` sin concatenar con signos `+` molestos.',
            codeSnippet: {
              language: 'javascript',
              description: 'Ejemplo de JavaScript moderno en acción:',
              code: `// Objeto de usuario
const programador = {
  nombre: "Carlos",
  edad: 28,
  lenguajes: ["JS", "TypeScript"]
};

// 1. Desestructuración limpia
const { nombre, lenguajes } = programador;

// 2. Spread operator para añadir un nuevo lenguaje sin mutar
const lenguajesActualizados = [...lenguajes, "Python"];

// 3. Template string elegante
console.log(\`Hola, soy \${nombre} y domino: \${lenguajesActualizados.join(", ")}\`);`,
            },
          },
          {
            heading: '¿Cómo habla JavaScript con la Pantalla? (El DOM)',
            content: 'Para interactuar con la pantalla usamos 3 pasos clave:\n\n1. **Seleccionar el elemento:** `document.querySelector("#mi-boton")`.\n2. **Escuchar lo que hace el usuario:** `.addEventListener("click", (evento) => { ... })`.\n3. **Modificar el contenido o estilos:** `elemento.textContent = "¡Cambiado!"; elemento.classList.add("activo");`.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Practica ES6+ en vivo:
const producto = {
  id: 1,
  titulo: "Teclado Mecánico RGB",
  precio: 85,
  enStock: true
};

// 1. Desestructuración:
const { titulo, precio } = producto;

// 2. Función flecha con descuento:
const aplicarDescuento = (valor, porcentaje) => valor - (valor * porcentaje / 100);

const precioConDescuento = aplicarDescuento(precio, 15);

console.log(\`Artículo: \${titulo}\`);
console.log(\`Precio original: $\${precio} USD\`);
console.log(\`Precio con 15% de descuento: $\${precioConDescuento} USD\`);`,
        explanation: 'Cambia los valores del descuento o los datos del producto y pulsa Ejecutar.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm2-l3-ex1',
          title: 'Función flecha de saludo',
          level: 'facil',
          instruction: 'Crea una función flecha `saludar` que reciba un nombre y retorne `Hola, ${nombre}!`. Imprime el resultado de llamar `saludar("Ana")`.',
          starterCode: `// Convierte a función flecha y prueba con "Ana":
const saludar = (nombre) => {
  // Retorna el saludo con template literal
};

console.log(saludar("Ana"));`,
          hints: ['const saludar = (nombre) => `Hola, ${nombre}!`;', 'console.log(saludar("Ana"));'],
          solutionCode: `const saludar = (nombre) => \`Hola, \${nombre}!\`;
console.log(saludar("Ana"));`,
          solutionExplanation: 'Las funciones flecha de una sola línea retornan implícitamente el resultado sin necesidad de escribir la palabra `return`.',
          testCheck: {
            type: 'output-contains',
            expected: 'Hola, Ana!',
          },
        },
        {
          id: 'm2-l3-ex2',
          title: 'Desestructuración y Spread Operator',
          level: 'medio',
          instruction: 'Dado el objeto `usuario = { nombre: "Leo", pais: "Colombia" }`, desestructura ambas propiedades y luego crea un nuevo objeto `usuarioActualizado` usando el spread operator `...` agregando la propiedad `rol: "Desarrollador"`. Imprime `usuarioActualizado`.',
          starterCode: `const usuario = { nombre: "Leo", pais: "Colombia" };

// 1. Desestructura nombre y pais
// 2. Crea usuarioActualizado con ...usuario y rol: "Desarrollador"

`,
          hints: [
            'const { nombre, pais } = usuario;',
            'const usuarioActualizado = { ...usuario, rol: "Desarrollador" };',
            'console.log(usuarioActualizado);',
          ],
          solutionCode: `const usuario = { nombre: "Leo", pais: "Colombia" };
const { nombre, pais } = usuario;
const usuarioActualizado = { ...usuario, rol: "Desarrollador" };
console.log(usuarioActualizado);`,
          solutionExplanation: 'El spread operator `{ ...objeto, nuevaPropiedad: valor }` crea un clon inmutable con las propiedades adicionales añadidas de forma segura.',
          testCheck: {
            type: 'output-contains',
            expected: 'Desarrollador',
          },
        },
        {
          id: 'm2-l3-ex3',
          title: 'Transformando listas con .map y .filter (Reto)',
          level: 'reto',
          instruction: 'Dado el arreglo de puntuaciones `puntos = [45, 80, 92, 60, 100]`, filtra los que sean mayores o iguales a 70 con `.filter()`, y a esos multiplícalos por 10 con `.map()`. Imprime el arreglo resultante.',
          starterCode: `const puntos = [45, 80, 92, 60, 100];

// Encadena .filter() y .map():
const aprobadosMultiplicados = puntos
  .filter(p => p >= 70)
  .map(p => p * 10);

console.log("Puntajes procesados:", aprobadosMultiplicados);`,
          hints: [
            '.filter(p => p >= 70) descarta los menores a 70.',
            '.map(p => p * 10) transforma cada elemento restante.',
          ],
          solutionCode: `const puntos = [45, 80, 92, 60, 100];
const aprobadosMultiplicados = puntos
  .filter(p => p >= 70)
  .map(p => p * 10);

console.log("Puntajes procesados:", aprobadosMultiplicados);`,
          solutionExplanation: 'Los métodos de orden superior de arreglos (.map, .filter, .reduce) son el pan de cada día en el desarrollo profesional de JavaScript y React.',
          testCheck: {
            type: 'output-contains',
            expected: '800, 920, 1000',
          },
        },
      ],
      quiz: [
        {
          id: 'm2-l3-q1',
          question: '¿Qué ventaja principal ofrece el operador Spread (...) al trabajar con objetos y arreglos?',
          options: [
            'Permite crear copias de datos de forma inmutable sin modificar ni alterar el objeto original por accidente.',
            'Hace que las imágenes pesen menos kilobytes.',
            'Convierte automáticamente el código a Python.',
            'Borra todos los elementos de una lista.',
          ],
          correctIndex: 0,
          explanation: '¡Excelente! En el desarrollo moderno (especialmente con React), la inmutabilidad es crítica para evitar efectos secundarios y bugs silenciosos.',
        },
        {
          id: 'm2-l3-q2',
          question: '¿Qué método del DOM se utiliza para escuchar interacciones del usuario, como clics de ratón o teclas presionadas?',
          options: [
            'document.listenUserNow()',
            'elemento.addEventListener("click", funcionManejadora)',
            'elemento.startHearingClicks()',
            'window.watchKeyboard()',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! `addEventListener` registra una función que se ejecutará en respuesta al evento especificado.',
        },
        {
          id: 'm2-l3-q3',
          question: '¿Qué retorna el método de arreglo `.map()` en JavaScript?',
          options: [
            'Un mapa geográfico de Google Maps.',
            'Un nuevo arreglo transformado con la misma cantidad de elementos que el original, habiendo aplicado la función a cada uno.',
            'Un número que suma todos los elementos.',
            'Un valor booleano (true o false).',
          ],
          correctIndex: 1,
          explanation: '¡Perfecto! `.map()` proyecta cada elemento de la colección en un nuevo elemento, devolviendo una nueva lista sin mutar la original.',
        },
      ],
      summary: {
        keyTakeaways: [
          'JavaScript dota a la página de dinamismo, cálculo lógico e interactividad.',
          'ES6+ introdujo características esenciales: funciones flecha, destructuring, spread operator y template strings.',
          'El DOM es la representación en memoria de tu HTML que puedes consultar y alterar en vivo.',
          'Los métodos funcionales de arreglos (`map`, `filter`, `find`) son imprescindibles.',
        ],
        commonPitfalls: [
          'Mutar arreglos y objetos directamente (ej: `arreglo.push()`) en lugar de clonar con spread (`[...arreglo, nuevo]`).',
          'Intentar acceder al DOM antes de que la página haya cargado.',
          'Confundir `==` (comparación débil con conversión de tipos implícita) con `===` (comparación estricta y segura).',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm2-l4-apis-fetch-async-await',
      moduleId: 2,
      slug: 'consumo-de-apis-fetch-async-await',
      title: 'Consumo de APIs con Fetch y Async/Await',
      order: 4,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Comprender qué son las operaciones asíncronas, cómo funcionan las Promesas en JavaScript, y cómo solicitar datos reales a un servidor usando fetch con async/await y control de errores con try/catch.',
      realWorldAnalogy: {
        title: 'El Camarero en el Restaurante y el Zumbador de Comida Rápida',
        analogy: 'En la vida real, cuando pides una hamburguesa en un restaurante de comida rápida, no te quedas congelado como estatua frente al mostrador mientras preparan la carne. Te entregan un **dispositivo zumbador (un buscapersonas)** y puedes ir a tu mesa a hablar con tus amigos o mirar el teléfono.\n\nEse zumbador es una **Promesa (Promise)** en JavaScript: una garantía de que en el futuro recibirás tu comida (éxito) o el cajero te avisará que se acabaron las papas (error). Mientras la comida se prepara en la cocina remota (el servidor), tu aplicación no se congela: sigue respondiendo fluidamente. Cuando el zumbador suena (`await`), recoges tu bandeja y procesas los datos.',
        whyItMatters: 'Ninguna aplicación web moderna vive aislada. Clima en tiempo real, catálogo de productos de Amazon, posts de Twitter, autenticación de usuarios: todo se obtiene consumiendo APIs con fetch.',
        iconName: 'CloudDownload',
      },
      explanation: {
        sections: [
          {
            heading: 'El Patrón Moderno: async / await con try / catch',
            content: 'En JavaScript moderno, trabajar con operaciones que tardan tiempo en la red es tan simple y legible como el código síncrono gracias a dos palabras clave:\n\n1. `async`: Se coloca antes de una función para indicar que realiza tareas asíncronas.\n2. `await`: Pausa la ejecución de esa función (sin congelar el navegador) hasta que la promesa se resuelva.\n3. `try / catch`: La red puede caerse o fallar; el bloque `try/catch` atrapa los errores con elegancia para que la web no se rompa.',
            codeSnippet: {
              language: 'javascript',
              description: 'El patrón profesional de petición HTTP:',
              code: `async function obtenerUsuarios() {
  try {
    console.log("1. Solicitando datos al servidor...");
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!respuesta.ok) {
      throw new Error("El servidor respondió con código de error");
    }

    const datos = await respuesta.json(); // Convertir el texto a objetos de JavaScript
    console.log("2. ¡Datos recibidos con éxito! Total de usuarios:", datos.length);
    return datos;
  } catch (error) {
    console.error("⚠️ Ocurrió un error en la conexión:", error.message);
  }
}`,
            },
          },
          {
            heading: '¿Qué es JSON y por qué se usa en todas partes?',
            content: 'JSON *(JavaScript Object Notation)* es el idioma universal de intercambio de datos en Internet. Es un formato de texto plano simple y ligero que cualquier lenguaje (JavaScript, Python, Java, Go, C#) sabe leer y generar con facilidad.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de petición asíncrona a un servidor remoto:
async function simularPeticionAPI(endpoint) {
  console.log("📡 Enviando petición a:", endpoint);
  
  // Simulamos un retraso de red con una Promesa
  const datosFalsos = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        estado: 200,
        datos: [
          { id: 101, producto: "Laptop Gamer", precio: 1200 },
          { id: 102, producto: "Ratón Inalámbrico", precio: 45 }
        ]
      });
    }, 200);
  });

  console.log("✅ Respuesta recibida (Código " + datosFalsos.estado + "):");
  datosFalsos.datos.forEach(item => {
    console.log(" - " + item.producto + " ($" + item.precio + ")");
  });
}

simularPeticionAPI("https://api.tienda.com/productos");`,
        explanation: 'Ejecuta para ver cómo async y await gestionan la espera y el procesamiento de datos del servidor.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm2-l4-ex1',
          title: 'Creando tu primera función async',
          level: 'facil',
          instruction: 'Declara una función asíncrona llamada `consultarServicio()` que retorne el texto "Servicio en línea" e imprime el resultado llamándola con `.then(res => console.log(res))`.',
          starterCode: `async function consultarServicio() {
  // Retorna "Servicio en línea"
}

consultarServicio().then(res => console.log(res));`,
          hints: [
            'async function consultarServicio() { return "Servicio en línea"; }',
          ],
          solutionCode: `async function consultarServicio() {
  return "Servicio en línea";
}

consultarServicio().then(res => console.log(res));`,
          solutionExplanation: 'Toda función declarada con la palabra clave `async` envuelve automáticamente su valor de retorno dentro de una Promesa.',
          testCheck: {
            type: 'output-contains',
            expected: 'Servicio en línea',
          },
        },
        {
          id: 'm2-l4-ex2',
          title: 'Control de errores con try / catch',
          level: 'medio',
          instruction: 'Escribe una función asíncrona `descargarDatos(debeFallar)` con un bloque `try / catch`. Si `debeFallar` es true, lanza un error con `throw new Error("Conexión perdida")`. En el bloque `catch` imprime el mensaje de error. Prueba llamándola con true.',
          starterCode: `async function descargarDatos(debeFallar) {
  try {
    if (debeFallar) {
      throw new Error("Conexión perdida");
    }
    console.log("Datos descargados");
  } catch (error) {
    console.log("Capturado:", error.message);
  }
}

descargarDatos(true);`,
          hints: [
            'El bloque catch atrapa cualquier excepción lanzada con throw sin romper la aplicación.',
          ],
          solutionCode: `async function descargarDatos(debeFallar) {
  try {
    if (debeFallar) {
      throw new Error("Conexión perdida");
    }
    console.log("Datos descargados");
  } catch (error) {
    console.log("Capturado:", error.message);
  }
}

descargarDatos(true);`,
          solutionExplanation: 'En el desarrollo web profesional, capturar errores de red con try/catch es indispensable para mostrar avisos amigables al usuario.',
          testCheck: {
            type: 'output-contains',
            expected: 'Conexión perdida',
          },
        },
        {
          id: 'm2-l4-ex3',
          title: 'El extractor de datos JSON (Reto)',
          level: 'reto',
          instruction: 'Crea una función asíncrona `procesarRespuestaServidor(textoJSON)` que use `JSON.parse()` dentro de un `try/catch`. Si el JSON es válido, imprime "Usuarios cargados: " seguido de la cantidad de elementos. Si es inválido, imprime "JSON inválido". Prueba con `\'[{"id": 1}, {"id": 2}]\'`.',
          starterCode: `async function procesarRespuestaServidor(textoJSON) {
  try {
    const lista = JSON.parse(textoJSON);
    console.log("Usuarios cargados: " + lista.length);
  } catch {
    console.log("JSON inválido");
  }
}

procesarRespuestaServidor('[{"id": 1}, {"id": 2}]');`,
          hints: [
            'JSON.parse() convierte texto plano JSON en un arreglo u objeto real de JavaScript.',
            'lista.length te da el número de elementos recibidos.',
          ],
          solutionCode: `async function procesarRespuestaServidor(textoJSON) {
  try {
    const lista = JSON.parse(textoJSON);
    console.log("Usuarios cargados: " + lista.length);
  } catch {
    console.log("JSON inválido");
  }
}

procesarRespuestaServidor('[{"id": 1}, {"id": 2}]');`,
          solutionExplanation: 'Cuando fetch recibe datos del backend, `await respuesta.json()` realiza el parseo de JSON a estructuras de objetos nativas.',
          testCheck: {
            type: 'output-contains',
            expected: 'Usuarios cargados: 2',
          },
        },
      ],
      quiz: [
        {
          id: 'm2-l4-q1',
          question: '¿Por qué las peticiones de red en JavaScript son asíncronas por defecto?',
          options: [
            'Porque JavaScript no tiene memoria suficiente.',
            'Para evitar que la interfaz de usuario del navegador se congele y deje de responder mientras espera que el servidor al otro lado del mundo responda.',
            'Porque los servidores solo aceptan conexiones durante la noche.',
            'Solo es una convención antigua sin motivo técnico.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Si las peticiones fueran síncronas bloqueantes, el usuario no podría hacer scroll, escribir ni interactuar con la pantalla durante la espera.',
        },
        {
          id: 'm2-l4-q2',
          question: '¿Qué hace la palabra clave `await` dentro de una función declarada con `async`?',
          options: [
            'Borra la memoria del navegador.',
            'Pausa la ejecución de esa función específica hasta que la Promesa se complete (con éxito o error), devolviendo el valor resuelto.',
            'Obliga al servidor a enviar los datos más rápido.',
            'Convierte la función en un bucle infinito.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! `await` permite escribir código asíncrono con la misma limpieza y legibilidad que el código secuencial síncrono.',
        },
        {
          id: 'm2-l4-q3',
          question: '¿Qué significa el acrónimo JSON?',
          options: [
            'Java System Online Network.',
            'JavaScript Object Notation (Notación de Objetos de JavaScript).',
            'Joint Security Operation Node.',
            'Javascript Output Null.',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! JSON es el estándar mundial de texto estructurado para comunicar aplicaciones y servidores en cualquier lenguaje.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Las operaciones asíncronas no congelan la interfaz de usuario.',
          'Una Promesa representa un valor que estará disponible ahora, en el futuro o nunca.',
          '`fetch()` es la API nativa de los navegadores para realizar solicitudes HTTP (GET, POST, PUT, DELETE).',
          'La combinación `async / await` junto con `try / catch` es el estándar moderno más limpio y legible.',
        ],
        commonPitfalls: [
          'Olvidar la palabra clave `await` antes de `fetch()` o `respuesta.json()`, lo que devuelve la Promesa sin resolver en lugar de los datos.',
          'Olvidar envolver las llamadas asíncronas en `try / catch`, provocando que un error de conexión no capturado rompa la aplicación.',
          'Asumir que un código de error HTTP (como 404 o 500) hace que `fetch` lance un error automáticamente: en realidad debes comprobar `if (!respuesta.ok)`.',
        ],
      },
      xpReward: 50,
    },
    {
      id: 'm2-l5-react-y-typescript',
      moduleId: 2,
      slug: 'react-y-typescript-componentes-lego',
      title: 'React y TypeScript: Interfaces Modulares como Bloques de LEGO',
      order: 5,
      estimatedTime: '30 min',
      difficulty: 'Intermedio',
      objective: 'Comprender qué es una librería de componentes, la filosofía de React (Componentes, Props y Estado con useState) y cómo TypeScript añade superpoderes de seguridad de tipos para evitar errores antes de ejecutar el código.',
      realWorldAnalogy: {
        title: 'Los Bloques de LEGO y el Constructor con Casco de Seguridad',
        analogy: 'Imagina que quieres construir un rascacielos. Podrías tallar cada ventana y cada ladrillo a mano desde cero en el cemento (eso sería JavaScript manipulando el DOM a mano: tedioso, lento y fácil de romper).\n\n**React** es como tener una caja de **bloques de LEGO prefabricados e inteligentes** llamados **Componentes**. Creas una pieza de LEGO llamada `<BotonDeCompra />` una sola vez, y la reutilizas en 50 lugares de tu aplicación pasándole diferentes colores o textos (esas configuraciones se llaman **Props**).\n\n¿Y qué es **TypeScript**? Es el **ingeniero de control de calidad con casco de seguridad** que revisa cada bloque antes de ensamblarlo. Si intentas conectar una pieza que requiere un número y le pasas un texto por error, TypeScript te avisa de inmediato en tu editor con una línea roja antes de que el usuario vea un error en producción.',
        whyItMatters: 'React es la librería de frontend más demandada y mejor pagada en la industria tecnológica mundial. TypeScript es el estándar absoluto adoptado por Microsoft, Google, Meta y startups líderes.',
        iconName: 'Boxes',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Tres Conceptos Sagrados de React',
            content: '1. **Componente:** Una función de JavaScript que retorna interfaz visual (escrita en JSX, una mezcla elegante de HTML y JS):\n`function Tarjeta({ titulo }) { return <div className="card">{titulo}</div>; }`\n\n2. **Props (Propiedades):** Los argumentos que le pasas a un componente desde el componente padre (como pasarle datos a una función).\n\n3. **Estado (`useState`):** La memoria interna del componente. Cuando el estado cambia (por ejemplo, el usuario suma un producto al carrito), React vuelve a pintar la pantalla de forma reactiva y ultra rápida automáticamente.',
            codeSnippet: {
              language: 'javascript',
              description: 'Un contador interactivo en React:',
              code: `import { useState } from 'react';

// Un componente con estado y memoria:
function ContadorInteractivo() {
  const [contador, setContador] = useState(0);

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-center">
      <p className="text-xl font-bold text-white">Clicks: {contador}</p>
      <button 
        onClick={() => setContador(contador + 1)}
        className="mt-2 px-4 py-2 bg-emerald-500 rounded-lg text-black font-bold"
      >
        Sumar +1
      </button>
    </div>
  );
}`,
            },
          },
          {
            heading: '¿Por qué TypeScript nos da superpoderes?',
            content: 'En JavaScript puro puedes escribir `usuario.edad = "veinticinco"` o `usuario.nonbre` (con falta de ortografía) y el código no se quejará hasta que explote en vivo.\n\nEn **TypeScript** defines un contrato llamado `interface`:\n```typescript\ninterface Usuario {\n  id: number;\n  nombre: string;\n  esPremium: boolean;\n}\n```\nSi intentas omitir una propiedad requerida o pasar un tipo equivocado, TypeScript te corrige al instante con autocompletado y seguridad total.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador del ciclo de Componentes y Props de React en JavaScript:
function crearComponenteBoton(props) {
  const { texto, variante = "primario", desactivado = false } = props;
  
  const claseColor = variante === "primario" ? "#10b981" : "#64748b";
  
  return {
    elemento: "<button>",
    texto: texto,
    estilos: { background: claseColor, cursor: desactivado ? "not-allowed" : "pointer" },
    render: () => \`[\${variante.toUpperCase()}] "\${texto}" (Color: \${claseColor})\`
  };
}

const boton1 = crearComponenteBoton({ texto: "Guardar Cambios", variante: "primario" });
const boton2 = crearComponenteBoton({ texto: "Cancelar", variante: "secundario" });

console.log("Componente 1 renderizado:", boton1.render());
console.log("Componente 2 renderizado:", boton2.render());`,
        explanation: 'Modifica las props y ejecuta para ver cómo los componentes reutilizables generan distintas variantes de UI.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm2-l5-ex1',
          title: 'Modelando Props de un Componente',
          level: 'facil',
          instruction: 'Crea una función `crearTarjetaProducto(props)` que desestructure `nombre` y `precio` de `props`, y retorne el texto `"Producto: ${nombre} - $${precio} USD"`. Pruébala con `{ nombre: "Monitor 4K", precio: 450 }`.',
          starterCode: `function crearTarjetaProducto(props) {
  // Desestructura nombre y precio
  // Retorna el template literal
}

console.log(crearTarjetaProducto({ nombre: "Monitor 4K", precio: 450 }));`,
          hints: [
            'const { nombre, precio } = props;',
            'return `Producto: ${nombre} - $${precio} USD`;',
          ],
          solutionCode: `function crearTarjetaProducto(props) {
  const { nombre, precio } = props;
  return \`Producto: \${nombre} - $\${precio} USD\`;
}

console.log(crearTarjetaProducto({ nombre: "Monitor 4K", precio: 450 }));`,
          solutionExplanation: 'En React, los componentes reciben un único objeto llamado `props` que contiene todos los atributos enviados desde el padre.',
          testCheck: {
            type: 'output-contains',
            expected: 'Producto: Monitor 4K - $450 USD',
          },
        },
        {
          id: 'm2-l5-ex2',
          title: 'Simulando el hook useState de React',
          level: 'medio',
          instruction: 'Crea una función `simularHookState(valorInicial)` que retorne un arreglo con dos elementos: el valor actual y una función para actualizarlo. Simula un contador que empiece en 0, actualízalo a 5 e imprime el nuevo valor.',
          starterCode: `function simularHookState(valorInicial) {
  let valor = valorInicial;
  const setValor = (nuevo) => { valor = nuevo; };
  const getValor = () => valor;
  return [getValor, setValor];
}

const [obtenerClicks, setClicks] = simularHookState(0);
setClicks(5);
console.log("Valor de estado actualizado:", obtenerClicks());`,
          hints: [
            'useState en React devuelve exactamente una tupla (arreglo de 2 elementos): [estadoActual, funcionActualizadora].',
          ],
          solutionCode: `function simularHookState(valorInicial) {
  let valor = valorInicial;
  const setValor = (nuevo) => { valor = nuevo; };
  const getValor = () => valor;
  return [getValor, setValor];
}

const [obtenerClicks, setClicks] = simularHookState(0);
setClicks(5);
console.log("Valor de estado actualizado:", obtenerClicks());`,
          solutionExplanation: 'La convención de desestructurar `const [count, setCount] = useState(0)` en React se basa en desestructuración de arreglos de JavaScript.',
          testCheck: {
            type: 'output-contains',
            expected: '5',
          },
        },
        {
          id: 'm2-l5-ex3',
          title: 'Validador de contratos con TypeScript (Reto)',
          level: 'reto',
          instruction: 'Crea una función `validarUsuarioTS(usuario)` que compruebe que `usuario.id` sea de tipo número y `usuario.email` sea de tipo string. Si cumple retorna true, si no retorna false. Prueba con `{ id: 101, email: "ana@dev.com" }`.',
          starterCode: `function validarUsuarioTS(usuario) {
  const tieneIdValido = typeof usuario.id === "number";
  const tieneEmailValido = typeof usuario.email === "string";
  return tieneIdValido && tieneEmailValido;
}

console.log("¿Cumple contrato TypeScript?:", validarUsuarioTS({ id: 101, email: "ana@dev.com" }));`,
          hints: [
            'typeof usuario.id === "number" y typeof usuario.email === "string".',
          ],
          solutionCode: `function validarUsuarioTS(usuario) {
  const tieneIdValido = typeof usuario.id === "number";
  const tieneEmailValido = typeof usuario.email === "string";
  return tieneIdValido && tieneEmailValido;
}

console.log("¿Cumple contrato TypeScript?:", validarUsuarioTS({ id: 101, email: "ana@dev.com" }));`,
          solutionExplanation: 'TypeScript realiza esta comprobación estática en tiempo de compilación para que jamás lleguen datos con tipos incorrectos a tu aplicación.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
      ],
      quiz: [
        {
          id: 'm2-l5-q1',
          question: '¿Qué es un Componente en React?',
          options: [
            'Una pieza de hardware como la tarjeta de memoria.',
            'Una función reutilizable de JavaScript que describe y retorna una porción de la interfaz de usuario en JSX.',
            'Una base de datos en la nube.',
            'Un plugin exclusivo para el navegador Google Chrome.',
          ],
          correctIndex: 1,
          explanation: '¡Exacto! Los componentes son las piezas modulares de LEGO con las que construyes aplicaciones complejas dividiéndolas en partes pequeñas y comprobables.',
        },
        {
          id: 'm2-l5-q2',
          question: '¿Cuál es la función del hook `useState` en React?',
          options: [
            'Cambiar la resolución de la pantalla del ordenador.',
            'Dotar al componente de memoria (estado interno), de modo que cuando el valor cambie, React repinte la interfaz de manera automática.',
            'Eliminar todos los archivos temporales de la computadora.',
            'Hacer una copia de seguridad en un pendrive USB.',
          ],
          correctIndex: 1,
          explanation: '¡Excelente! `useState` mantiene el estado reactivo del componente y desencadena una actualización visual limpia cada vez que el valor muta.',
        },
        {
          id: 'm2-l5-q3',
          question: '¿Por qué la industria adopta masivamente TypeScript sobre JavaScript estándar en proyectos medianos y grandes?',
          options: [
            'Porque TypeScript no requiere escribir código.',
            'Porque añade tipado estático, autocompletado inteligente y detecta más del 80% de los errores y bugs antes de que el código llegue a producción.',
            'Porque solo funciona en servidores de pago.',
            'Porque es un lenguaje creado exclusivamente para videojuegos 3D.',
          ],
          correctIndex: 1,
          explanation: '¡Correcto! TypeScript proporciona robustez, autocompletado y una documentación viva en el código que ahorra incontables horas de depuración.',
        },
      ],
      summary: {
        keyTakeaways: [
          'React permite construir interfaces modernas a base de componentes reutilizables (como bloques de LEGO).',
          'Las Props transmiten datos del componente padre al componente hijo de forma unidireccional.',
          'El Estado (`useState`) gestiona los datos cambiantes en el tiempo que refrescan la interfaz.',
          'TypeScript aporta seguridad de tipos estáticos que previene errores tontos antes de ejecutar el código.',
        ],
        commonPitfalls: [
          'Modificar el estado de React directamente (ej: `contador = contador + 1`) en lugar de usar siempre la función actualizadora `setContador(...)`.',
          'Crear componentes gigantescos con miles de líneas en lugar de dividirlos en componentes pequeños y enfocados.',
          'Usar el tipo `any` en TypeScript para todo, lo que desactiva la protección y el propósito de tener tipos.',
        ],
      },
      xpReward: 50,
    },
  ],
};
