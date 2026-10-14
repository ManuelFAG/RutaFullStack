import type { Module } from '../../types/curriculum';

export const MODULE_5_MULTIPLATFORM: Module = {
  id: 5,
  slug: 'multiplataforma',
  title: '5. Desarrollo Multiplataforma',
  description: 'Lleva tu código a todas partes: aplicaciones móviles nativas para iOS y Android con React Native & Expo, Progressive Web Apps (PWA) instalables, y apps de escritorio con Tauri y Electron compartiendo el 80% de tu código.',
  icon: 'Smartphone',
  color: 'rose',
  badge: {
    id: 'modulo-5-maestro',
    name: 'Desarrollador Omnipresente',
    description: 'Completaste el desarrollo de aplicaciones para Web, Móviles (iOS/Android) y Escritorio.',
    icon: 'Layers',
    category: 'modulo',
  },
  lessons: [
    // LECCIÓN 1: INTRODUCCIÓN MULTIPLATAFORMA Y PWAS
    {
      id: 'm5-l1-introduccion-multiplataforma-y-pwa',
      moduleId: 5,
      slug: 'introduccion-multiplataforma-y-pwa',
      title: 'Introducción al Desarrollo Multiplataforma y PWAs (Progressive Web Apps)',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Comprender las diferencias arquitectónicas entre aplicaciones Web, PWAs, Híbridas y Nativas, y aprender a transformar una aplicación web en una PWA instalable en dispositivos móviles y de escritorio mediante Web App Manifest y Service Workers con soporte offline.',
      realWorldAnalogy: {
        title: 'El Pasaporte Universal vs Aprender 3 Idiomas desde Cero',
        analogy: 'Hace años, si una empresa quería lanzar una aplicación, tenía que contratar 3 equipos de ingenieros distintos:\n\n• Un equipo programando en **Swift/Objective-C** para iPhone (iOS).\n• Un equipo programando en **Kotlin/Java** para Android.\n• Un equipo programando en **C# o C++** para Windows y Mac.\n\nEsto triplicaba los costos, triplicaba el tiempo de entrega y hacía que las actualizaciones tardaran meses.\n\nEl desarrollo **Multiplataforma** es como hablar un idioma universal (JavaScript/TypeScript): escribes la lógica central de tu app una sola vez y herramientas inteligentes la adaptan para correr en cualquier pantalla.\n\nY una **PWA (Progressive Web App)** es el truco más elegante: tu sitio web se disfraza de aplicación nativa. El usuario puede pulsar "Instalar en pantalla de inicio", tener un icono en su teléfono, abrirla a pantalla completa y usarla incluso sin conexión a Internet, ¡sin tener que pagar las comisiones ni esperar la aprobación de las tiendas de Apple o Google!',
        whyItMatters: 'Compañías como Twitter (X Lite), Pinterest, Uber y Starbucks aumentaron su retención de usuarios en más de un 70% al implementar PWAs que cargan al instante en redes móviles lentas.',
        iconName: 'Globe',
      },
      explanation: {
        sections: [
          {
            heading: 'El Espectro de Tipos de Aplicaciones',
            content: '1. **Web Tradicional:** Requiere navegador, conexión constante a Internet y no se puede instalar en la pantalla del dispositivo.\n\n2. **PWA (Progressive Web App):** Sitio web con superpoderes: instalable, funciona sin conexión gracias a Service Workers, y envía notificaciones push web.\n\n3. **Híbrida / Multiplataforma Compilada (React Native, Flutter):** Escribes en un solo lenguaje, pero los componentes visuales son vistas 100% nativas del sistema operativo.\n\n4. **Nativa Pura (Swift/Kotlin):** Máximo rendimiento y acceso inmediato a las últimas APIs de hardware, pero requiere mantener bases de código separadas.',
          },
          {
            heading: 'El Manifiesto de la Web App (`manifest.json`)',
            content: 'Es un archivo JSON que le dice al navegador cómo debe comportarse tu web cuando el usuario decide instalarla:\n\n```json\n{\n  "name": "RutaFullStack - Plataforma Educativa",\n  "short_name": "RutaFullStack",\n  "start_url": "/",\n  "display": "standalone", // Oculta la barra de URL del navegador como una app nativa\n  "background_color": "#0a0d14",\n  "theme_color": "#10b981",\n  "icons": [\n    {\n      "src": "/icons/icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/icons/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png",\n      "purpose": "any maskable"\n    }\n  ]\n}\n```',
          },
          {
            heading: 'Service Workers: El Guardián Offline de la Red',
            content: 'Un **Service Worker** es un script en JavaScript que se ejecuta en segundo plano en el navegador, completamente separado de la página web. Actúa como un proxy de red programable: intercepta cada petición HTTP que hace tu aplicación y decide si responder con los archivos guardados en la memoria caché local o salir a Internet.',
            codeSnippet: {
              language: 'javascript',
              description: 'Estrategia "Cache First con Network Fallback" en un Service Worker:',
              code: `self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuestaEnCache) => {
      // 1. Si el archivo está en la memoria caché, lo entrega de inmediato (ultra rápido)
      if (respuestaEnCache) {
        return respuestaEnCache;
      }
      // 2. Si no está en caché, va a Internet a buscarlo
      return fetch(evento.request).catch(() => {
        // 3. Si no hay conexión, muestra una página offline de cortesía
        return caches.match('/offline.html');
      });
    })
  );
});`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando un Service Worker con estrategia "Network First con Fallback a Caché":
const memoriaCacheLocal = {
  "/index.html": "<html><body><h1>Bienvenido a RutaFullStack (Versión en Caché)</h1></body></html>",
  "/estilos.css": "body { background: #0a0d14; color: #10b981; }",
  "/logo.svg": "<svg>Logo SVG</svg>"
};

// Simulador de peticiones con estado de conexión ajustable:
let hayConexionAInternet = false; // Cambia a true para probar modo online

async function simularPeticionServiceWorker(url) {
  console.log(\`🌐 Interceptando petición para: \${url}\`);
  
  if (hayConexionAInternet) {
    try {
      console.log("⚡ Conexión detectada. Descargando versión fresca de la red...");
      return { origen: "RED", contenido: \`Contenido en vivo descargado de \${url}\` };
    } catch {
      // Si la red falla a mitad de camino, cae a la caché
    }
  }

  console.log("📡 Sin conexión a Internet. Buscando en la memoria caché offline...");
  if (memoriaCacheLocal[url]) {
    return { origen: "CACHE_OFFLINE", contenido: memoriaCacheLocal[url] };
  }

  return { origen: "ERROR_404", contenido: "Página no disponible sin conexión." };
}

async function ejecutarPrueba() {
  const respuesta = await simularPeticionServiceWorker("/index.html");
  console.log("Resultado de la respuesta:", respuesta);
}

ejecutarPrueba();`,
        explanation: 'Cambia hayConexionAInternet a true o false para ver cómo el Service Worker garantiza que la app nunca muestre la pantalla en blanco del dinosaurio sin conexión.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm5-l1-ex1',
          title: 'Validador de Web App Manifest',
          level: 'facil',
          instruction: 'Crea una función `validarManifestPWA(manifest)` que compruebe que el objeto contenga las propiedades obligatorias: `name` (string no vacío), `short_name` (string), `start_url` (string que empiece con "/") y `display` (debe ser exactamente "standalone" o "fullscreen"). Si cumple todo retorna `true`, de lo contrario `false`. Pruébala con el manifest dado e imprime el resultado.',
          starterCode: `function validarManifestPWA(manifest) {
  // Comprueba name, short_name, start_url y display
}

const miManifest = {
  name: "Plataforma Educativa FullStack",
  short_name: "RutaApp",
  start_url: "/",
  display: "standalone"
};

console.log("¿Manifest válido?:", validarManifestPWA(miManifest));`,
          hints: [
            'Verifica typeof manifest.name === "string" && manifest.name.length > 0',
            'Verifica manifest.start_url?.startsWith("/")',
            'Verifica manifest.display === "standalone" || manifest.display === "fullscreen"'
          ],
          solutionCode: `function validarManifestPWA(manifest) {
  if (!manifest || typeof manifest !== 'object') return false;
  const nombreValido = typeof manifest.name === 'string' && manifest.name.trim().length > 0;
  const shortValido = typeof manifest.short_name === 'string' && manifest.short_name.trim().length > 0;
  const urlValida = typeof manifest.start_url === 'string' && manifest.start_url.startsWith('/');
  const displayValido = manifest.display === 'standalone' || manifest.display === 'fullscreen';
  return nombreValido && shortValido && urlValida && displayValido;
}

const miManifest = {
  name: "Plataforma Educativa FullStack",
  short_name: "RutaApp",
  start_url: "/",
  display: "standalone"
};

console.log("¿Manifest válido?:", validarManifestPWA(miManifest));`,
          solutionExplanation: 'Google Lighthouse y los navegadores móviles requieren estas propiedades mínimas para permitir que el botón nativo de "Instalar App" aparezca.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm5-l1-ex2',
          title: 'Simulación de Caché Offline con CacheStorage',
          level: 'medio',
          instruction: 'Crea una clase `SimuladorCaches` con dos métodos: `guardar(url, respuesta)` y `obtener(url)`. Si la URL existe en la caché, `obtener` debe retornar `{ encontrado: true, respuesta }`. Si no existe, debe retornar `{ encontrado: false, respuesta: null }`. Guarda una ruta "/lecciones/m1" y luego búscala imprimiendo el resultado.',
          starterCode: `class SimuladorCaches {
  constructor() {
    this.almacen = {};
  }
  guardar(url, respuesta) {
    // Almacena en this.almacen
  }
  obtener(url) {
    // Retorna { encontrado, respuesta }
  }
}

const cache = new SimuladorCaches();
cache.guardar("/lecciones/m1", "Contenido descargado del Módulo 1");
console.log(cache.obtener("/lecciones/m1"));`,
          hints: [
            'En guardar: this.almacen[url] = respuesta;',
            'En obtener: if (this.almacen[url]) return { encontrado: true, respuesta: this.almacen[url] }; else return { encontrado: false, respuesta: null };'
          ],
          solutionCode: `class SimuladorCaches {
  constructor() {
    this.almacen = {};
  }
  guardar(url, respuesta) {
    this.almacen[url] = respuesta;
  }
  obtener(url) {
    if (url in this.almacen) {
      return { encontrado: true, respuesta: this.almacen[url] };
    }
    return { encontrado: false, respuesta: null };
  }
}

const cache = new SimuladorCaches();
cache.guardar("/lecciones/m1", "Contenido descargado del Módulo 1");
console.log(cache.obtener("/lecciones/m1"));`,
          solutionExplanation: 'La API de CacheStorage de los navegadores modernos permite almacenar respuestas completas de peticiones HTTP para uso offline sin límites rígidos de localStorage.',
          testCheck: {
            type: 'output-contains',
            expected: 'Contenido descargado del Módulo 1',
          },
        },
        {
          id: 'm5-l1-ex3',
          title: 'Cola de sincronización offline en segundo plano (Reto)',
          level: 'reto',
          instruction: 'Cuando un usuario marca una lección como completada sin internet, no podemos perder esa acción. Crea una función `procesarColaSincronizacion(colaAcciones, estaOnline)` que reciba un array de acciones pendientes `[{ id: 1, accion: "COMPLETAR_LECCION" }]` y un booleano `estaOnline`. Si `estaOnline` es true, procesa todas las acciones imprimiendo "Sincronizando acción: " + id, vacía la cola y retorna un array con las acciones sincronizadas. Si `estaOnline` es false, imprime "Sin conexión: X acciones en espera" y no vacía la cola. Prueba con 2 acciones y conexión activa.',
          starterCode: `const pendientes = [
  { id: 101, accion: "COMPLETAR_LECCION", datos: { lessonId: "m5-l1" } },
  { id: 102, accion: "GUARDAR_NOTA", datos: { texto: "Buen concepto de PWA" } }
];

function procesarColaSincronizacion(colaAcciones, estaOnline) {
  // Procesa o retiene según conectividad
}

const sincronizadas = procesarColaSincronizacion(pendientes, true);
console.log("Acciones procesadas:", sincronizadas.length);`,
          hints: [
            'Si !estaOnline imprime console.log("Sin conexión: " + colaAcciones.length + " acciones en espera") y retorna []',
            'Si estaOnline recorre colaAcciones imprimiendo y usando splice para vaciar'
          ],
          solutionCode: `const pendientes = [
  { id: 101, accion: "COMPLETAR_LECCION", datos: { lessonId: "m5-l1" } },
  { id: 102, accion: "GUARDAR_NOTA", datos: { texto: "Buen concepto de PWA" } }
];

function procesarColaSincronizacion(colaAcciones, estaOnline) {
  if (!estaOnline) {
    console.log("Sin conexión: " + colaAcciones.length + " acciones en espera");
    return [];
  }

  const procesadas = [];
  while (colaAcciones.length > 0) {
    const accion = colaAcciones.shift();
    console.log("Sincronizando acción: " + accion.id);
    procesadas.push(accion);
  }
  return procesadas;
}

const sincronizadas = procesarColaSincronizacion(pendientes, true);
console.log("Acciones procesadas:", sincronizadas.length);`,
          solutionExplanation: 'Esta arquitectura de "Offline Sync" mediante Background Sync API de PWAs o almacenamiento persistente garantiza que los progresos del usuario nunca se pierdan en zonas con mala cobertura.',
          testCheck: {
            type: 'output-contains',
            expected: 'Sincronizando acción: 101',
          },
        },
      ],
      quiz: [
        {
          id: 'm5-l1-q1',
          question: '¿Qué propiedad del archivo manifest.json hace que una PWA se abra sin la barra de direcciones del navegador, viéndose como una app nativa?',
          options: [
            '"mode": "fullscreen-browser"',
            '"display": "standalone"',
            '"type": "mobile-native"',
            '"viewport": "no-header"',
          ],
          correctIndex: 1,
          explanation: '"display": "standalone" oculta toda la interfaz del navegador (barra de búsqueda, pestañas), dando la apariencia y sensación de una aplicación nativa instalada.',
        },
        {
          id: 'm5-l1-q2',
          question: '¿Cuál es la función primordial de un Service Worker en una Progressive Web App?',
          options: [
            'Acelerar la velocidad de la tarjeta gráfica de la computadora.',
            'Actuar como un proxy de red en segundo plano para interceptar peticiones y servir archivos cacheados sin conexión.',
            'Compilar código TypeScript a lenguaje C++ para la tienda de aplicaciones.',
            'Reemplazar la base de datos PostgreSQL del servidor backend.',
          ],
          correctIndex: 1,
          explanation: 'Los Service Workers corren en un hilo separado del navegador, interceptan eventos de red (fetch) y gestionan la memoria caché local permitiendo el funcionamiento offline.',
        },
        {
          id: 'm5-l1-q3',
          question: '¿Cuál es una ventaja principal de una PWA frente a una aplicación nativa tradicional publicada en Google Play o Apple App Store?',
          options: [
            'Puede acceder al procesador cuántico del teléfono.',
            'No requiere pasar por revisiones de tiendas de apps ni pagar comisiones de publicación, y se actualiza al instante cada vez que despliegas en tu servidor web.',
            'Solo funciona cuando el teléfono está conectado al cargador de pared.',
            'Requiere escribir código en tres lenguajes diferentes a la vez.',
          ],
          correctIndex: 1,
          explanation: 'Las PWAs se distribuyen directamente a través de una URL web, permitiendo actualizaciones inmediatas en producción sin esperar la aprobación de Apple o Google.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El desarrollo multiplataforma permite unificar la base de código para atender Web, Móviles y Escritorio.',
          'Las PWAs combinan el alcance universal de la web con capacidades nativas (instalación, notificaciones y funcionamiento offline).',
          'El archivo manifest.json define la identidad de la app y los Service Workers controlan la interceptación de red y la memoria caché.',
        ],
        commonPitfalls: [
          'Creer que un Service Worker funciona sin HTTPS: por razones de seguridad, los Service Workers solo se activan en localhost o dominios con certificado SSL seguro (HTTPS).',
          'Cachear recursos eternamente sin estrategia de invalidación, provocando que los usuarios nunca vean las nuevas versiones de tu código.',
          'Olvidar configurar iconos en resoluciones requeridas (192x192 y 512x512) en el manifest, impidiendo que el navegador ofrezca la instalación.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 2: REACT NATIVE Y EXPO (COMPONENTES NATIVOS Y FLEXBOX MÓVIL)
    {
      id: 'm5-l2-react-native-y-expo',
      moduleId: 5,
      slug: 'react-native-y-expo-componentes-nativos-moviles',
      title: 'React Native & Expo: Componentes Nativos y Flexbox en Dispositivos Móviles',
      order: 2,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Aprender cómo React Native traduce componentes JSX en vistas nativas reales de iOS y Android sin usar WebViews, dominar las primitivas esenciales (View, Text, Image, TouchableOpacity, FlatList) y las reglas de diseño Flexbox móvil.',
      realWorldAnalogy: {
        title: 'El Director de Orquesta y los Músicos Nativos de Cada País',
        analogy: 'En el desarrollo web, React le habla al navegador y crea elementos del DOM como `<div>`, `<p>` y `<button>`. Pero un teléfono iPhone o Android no sabe qué es un `<div>` ni tiene un navegador corriendo por defecto dentro de sus aplicaciones nativas.\n\nEn **React Native**, tu código JavaScript actúa como un **director de orquesta internacional**:\n• Cuando escribes `<View>`, en un iPhone se crea una vista nativa de Apple en Objective-C/Swift (`UIView`), y en un teléfono Android se crea un `android.view.ViewGroup` en Java/Kotlin.\n• Cuando escribes `<Text>`, el sistema crea un `UILabel` en iOS y un `TextView` en Android.\n\nNo estás renderizando una página web dentro de una app; estás controlando los componentes visuales nativos reales del fabricante a 60/120 fotogramas por segundo.',
        whyItMatters: 'React Native es la tecnología detrás de las aplicaciones móviles de Facebook, Instagram, Shopify, Discord, Tesla, Uber Eats y Pinterest.',
        iconName: 'Smartphone',
      },
      explanation: {
        sections: [
          {
            heading: 'De Etiquetas HTML Web a Primitivas Nativas de React Native',
            content: 'En React Native no existen las etiquetas HTML. Usamos componentes nativos importados de `react-native`:\n\n• `<div>` o `<section>` ➔ `<View>`: El contenedor visual básico.\n• `<p>`, `<span>`, `<h1>` ➔ `<Text>`: En React Native **TODO texto debe estar envuelto en un componente Text**; no puedes poner texto suelto dentro de un View.\n• `<img>` ➔ `<Image source={{ uri: "..." }} />`.\n• `<button>` ➔ `<TouchableOpacity>` o `<Pressable>`: Contenedores interactivos que detectan toques y reducen la opacidad para dar retroalimentación visual táctil.\n• `overflow-y: scroll` ➔ `<ScrollView>` o `<FlatList>`.',
          },
          {
            heading: 'Las Reglas de Flexbox en Móviles (Diferencias con la Web)',
            content: 'En la Web con CSS, el valor por defecto de `display: flex` organiza los elementos en fila horizontal (`flex-direction: row`).\n\nEn React Native:\n1. **`flexDirection` es vertical por defecto (`column`)** porque las pantallas de los teléfonos móviles son verticales (portrait).\n2. **No existen unidades como `px`, `em` o `rem`**: Todos los valores de tamaño y margen son números puros basados en puntos independientes de densidad de pantalla (`dp`), adaptándose automáticamente a pantallas de baja y altísima densidad (Retina display).\n3. Los estilos se declaran mediante `StyleSheet.create({ ... })`:',
            codeSnippet: {
              language: 'javascript',
              description: 'Ejemplo de componente y estilos con StyleSheet en React Native:',
              code: `import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const TarjetaCurso = ({ titulo, nivel, onPress }) => (
  <View style={styles.card}>
    <Text style={styles.titulo}>{titulo}</Text>
    <Text style={styles.badge}>{nivel}</Text>
    <TouchableOpacity style={styles.boton} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.textoBoton}>Comenzar Lección</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    // Sombra nativa en iOS:
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // Sombra nativa en Android:
    elevation: 4,
  },
  titulo: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  badge: { color: '#10b981', fontSize: 12, marginTop: 4 },
  boton: { backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 10, marginTop: 14, alignItems: 'center' },
  textoBoton: { color: '#022c22', fontWeight: 'bold' }
});`,
            },
          },
          {
            heading: 'Listas Masivas de Alto Rendimiento con `<FlatList>`',
            content: 'Si intentas mostrar una lista de 500 productos con un `.map()` dentro de un `<ScrollView>`, el teléfono intentará crear 500 vistas en memoria de golpe y la app se congelará.\n\n`<FlatList>` resuelve esto mediante **virtualización de celdas**: solo renderiza en pantalla los 6 o 7 elementos que el usuario está viendo en ese instante. A medida que el usuario hace scroll, recicla la memoria de los elementos que salen de la vista para renderizar los nuevos.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulador de renderizado y virtualización de FlatList en React Native:
const listaLecciones = [
  { id: "1", titulo: "1. Introducción a PWA", duracion: "15 min" },
  { id: "2", titulo: "2. Primitivas de React Native", duracion: "20 min" },
  { id: "3", titulo: "3. Flexbox Móvil", duracion: "18 min" },
  { id: "4", titulo: "4. Acceso a Sensores", duracion: "25 min" },
  { id: "5", titulo: "5. Compilación con Expo", duracion: "12 min" }
];

// Simulador de StyleSheet.create con validación móvil:
function crearEstilosMoviles(estilos) {
  for (const [nombreClase, reglas] of Object.entries(estilos)) {
    // Verificamos que no usen unidades de texto como "16px"
    for (const [propiedad, valor] of Object.entries(reglas)) {
      if (typeof valor === "string" && valor.endsWith("px")) {
        console.warn(\`⚠️ Advertencia React Native: No uses "px" en '\${propiedad}'. Usa números puros: \${parseInt(valor)}\`);
      }
    }
  }
  return estilos;
}

// Simulador de renderizado con FlatList:
function simularFlatList({ data, keyExtractor, renderItem }) {
  console.log(\`📱 FlatList montada con \${data.length} elementos virtualizados en memoria.\`);
  return data.map((item, index) => {
    const key = keyExtractor(item);
    const vista = renderItem({ item, index });
    return { key, componente: vista };
  });
}

const estilosApp = crearEstilosMoviles({
  contenedor: { flex: 1, backgroundColor: "#0f172a" },
  titulo: { fontSize: 16, color: "#fff" } // Correcto: sin "px"
});

const resultadoRender = simularFlatList({
  data: listaLecciones,
  keyExtractor: (item) => item.id,
  renderItem: ({ item }) => \`[Componente Nativo Text: \${item.titulo} (\${item.duracion})]\`
});

console.log("Elementos nativos renderizados:", resultadoRender);`,
        explanation: 'Ejecuta el código y experimenta cambiando las propiedades de estilo para familiarizarte con las diferencias entre CSS web y StyleSheet de React Native.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm5-l2-ex1',
          title: 'Adaptador de estilos CSS a React Native StyleSheet',
          level: 'facil',
          instruction: 'Crea una función `convertirEstilosAMovil(estiloWeb)` que reciba un objeto de estilos web y lo limpie para React Native: si alguna propiedad tiene un valor de tipo string que termina en "px" (ej. "20px"), debe convertirlo a número puro `parseInt(valor, 10)`. Además, si la propiedad `flexDirection` no está definida, debe asignarle por defecto "column". Prueba convirtiendo el objeto dado e imprime el resultado.',
          starterCode: `function convertirEstilosAMovil(estiloWeb) {
  // Limpia valores "px" a número y asegura flexDirection: "column"
}

const estiloWebPrueba = {
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "#1e293b"
};

console.log("Estilo móvil convertido:", convertirEstilosAMovil(estiloWebPrueba));`,
          hints: [
            'Copia el objeto: const resultado = { ...estiloWeb };',
            'Recorre Object.entries y haz parseInt si typeof valor === "string" && valor.endsWith("px")',
            'if (!resultado.flexDirection) resultado.flexDirection = "column";'
          ],
          solutionCode: `function convertirEstilosAMovil(estiloWeb) {
  const resultado = {};
  for (const [clave, valor] of Object.entries(estiloWeb)) {
    if (typeof valor === 'string' && valor.endsWith('px')) {
      resultado[clave] = parseInt(valor, 10);
    } else {
      resultado[clave] = valor;
    }
  }
  if (!resultado.flexDirection) {
    resultado.flexDirection = 'column';
  }
  return resultado;
}

const estiloWebPrueba = {
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "#1e293b"
};

console.log("Estilo móvil convertido:", convertirEstilosAMovil(estiloWebPrueba));`,
          solutionExplanation: 'En React Native, StyleSheet utiliza números escalables independientes de densidad de pantalla en lugar de cadenas con "px".',
          testCheck: {
            type: 'output-contains',
            expected: '16',
          },
        },
        {
          id: 'm5-l2-ex2',
          title: 'Implementación del simulador de FlatList',
          level: 'medio',
          instruction: 'Crea una función `procesarFlatList(elementos, funcionClave, funcionRender)` que simule el comportamiento de `<FlatList data={elementos} keyExtractor={funcionClave} renderItem={funcionRender} />`. La función debe retornar un array de objetos con `{ id: key, nodo: renderizado }`. Debe lanzar un error si algún elemento no produce una clave única. Pruébala con la lista de usuarios dada e imprime el resultado.',
          starterCode: `const usuariosMovil = [
  { uuid: "u101", nombre: "Luciana", rol: "Desarrolladora" },
  { uuid: "u102", nombre: "Esteban", rol: "Diseñador" }
];

function procesarFlatList(elementos, funcionClave, funcionRender) {
  // Simula la virtualización y control de claves únicas
}

const salida = procesarFlatList(
  usuariosMovil,
  (item) => item.uuid,
  ({ item }) => item.nombre + " - " + item.rol
);
console.log("Salida de lista móvil:", salida);`,
          hints: [
            'Usa un Set o array para verificar claves duplicadas',
            'Mapea cada item y llama a funcionRender({ item, index })'
          ],
          solutionCode: `const usuariosMovil = [
  { uuid: "u101", nombre: "Luciana", rol: "Desarrolladora" },
  { uuid: "u102", nombre: "Esteban", rol: "Diseñador" }
];

function procesarFlatList(elementos, funcionClave, funcionRender) {
  const clavesVistas = new Set();
  return elementos.map((item, index) => {
    const key = funcionClave(item);
    if (clavesVistas.has(key)) {
      throw new Error("Clave duplicada encontrada en FlatList: " + key);
    }
    clavesVistas.add(key);
    const nodo = funcionRender({ item, index });
    return { id: key, nodo };
  });
}

const salida = procesarFlatList(
  usuariosMovil,
  (item) => item.uuid,
  ({ item }) => item.nombre + " - " + item.rol
);
console.log("Salida de lista móvil:", salida);`,
          solutionExplanation: 'FlatList requiere la función keyExtractor para identificar cada celda de forma única y reciclarla eficientemente en memoria.',
          testCheck: {
            type: 'output-contains',
            expected: 'Luciana',
          },
        },
        {
          id: 'm5-l2-ex3',
          title: 'Manejador de feedback táctil con Pressable (Reto)',
          level: 'reto',
          instruction: 'En móviles el feedback visual al tocar la pantalla es crucial. Crea una función `simularPressable({ pressed, estiloBase, estiloPresionado })` que reciba el estado de presionado (`pressed: true/false`), el estilo base del botón y un estilo adicional de opacidad cuando está presionado. Debe retornar el objeto de estilos combinado resultante, reduciendo la opacidad a 0.6 cuando `pressed` es true y manteniéndola en 1.0 cuando `pressed` es false. Prueba llamándola con pressed: true e imprime el estilo resultante.',
          starterCode: `function simularPressable({ pressed, estiloBase, estiloPresionado }) {
  // Retorna estilos fusionados según el estado táctil
}

const estiloBoton = { backgroundColor: "#10b981", padding: 12, borderRadius: 8 };
const estiloActivo = simularPressable({
  pressed: true,
  estiloBase: estiloBoton,
  estiloPresionado: { opacity: 0.6 }
});

console.log("Estilo en toque activo:", estiloActivo);`,
          hints: [
            'Usa destructuring y spread: return { ...estiloBase, opacity: pressed ? (estiloPresionado?.opacity || 0.6) : 1.0, ...(pressed ? estiloPresionado : {}) };'
          ],
          solutionCode: `function simularPressable({ pressed, estiloBase, estiloPresionado }) {
  const base = { ...estiloBase };
  if (pressed) {
    return {
      ...base,
      ...estiloPresionado,
      opacity: estiloPresionado?.opacity !== undefined ? estiloPresionado.opacity : 0.6
    };
  }
  return {
    ...base,
    opacity: 1.0
  };
}

const estiloBoton = { backgroundColor: "#10b981", padding: 12, borderRadius: 8 };
const estiloActivo = simularPressable({
  pressed: true,
  estiloBase: estiloBoton,
  estiloPresionado: { opacity: 0.6 }
});

console.log("Estilo en toque activo:", estiloActivo);`,
          solutionExplanation: 'El componente nativo Pressable de React Native recibe una función de estilo: style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}.',
          testCheck: {
            type: 'output-contains',
            expected: '0.6',
          },
        },
      ],
      quiz: [
        {
          id: 'm5-l2-q1',
          question: '¿Qué sucede si intentas colocar texto directamente dentro de un componente `<View>` en React Native sin usar `<Text>`?',
          options: [
            'El texto se muestra con la fuente por defecto del sistema.',
            'Lanza un error de ejecución en rojo: "Text strings must be rendered within a <Text> component".',
            'React Native lo convierte automáticamente en un elemento HTML <span>.',
            'El texto se oculta pero la app sigue funcionando normalmente.',
          ],
          correctIndex: 1,
          explanation: 'A diferencia de la Web, en React Native todo texto debe estar rigurosamente encapsulado en un componente <Text> porque las vistas nativas móviles (UIView / ViewGroup) no aceptan texto directo.',
        },
        {
          id: 'm5-l2-q2',
          question: '¿Cuál es la dirección del eje principal de Flexbox (flexDirection) por defecto en React Native?',
          options: [
            '"row" (horizontal, igual que en la Web)',
            '"column" (vertical, adaptado a la orientación natural de los teléfonos móviles)',
            '"grid" (cuadrícula automática)',
            '"absolute" (posicionamiento por coordenadas)',
          ],
          correctIndex: 1,
          explanation: 'Dado que los smartphones se utilizan casi siempre en posición vertical, flexDirection en React Native tiene el valor predeterminado "column".',
        },
        {
          id: 'm5-l2-q3',
          question: '¿Por qué se debe preferir `<FlatList>` en lugar de `<ScrollView>` para listas largas de elementos?',
          options: [
            'Porque FlatList solo funciona cuando el teléfono está en modo avión.',
            'Porque FlatList virtualiza las celdas en pantalla y recicla memoria, renderizando solo lo visible en lugar de toda la lista a la vez.',
            'Porque FlatList no requiere escribir funciones en JavaScript.',
            'Porque ScrollView no permite desplazarse verticalmente.',
          ],
          correctIndex: 1,
          explanation: 'ScrollView renderiza todos los elementos simultáneamente en memoria colapsando el rendimiento en listas largas; FlatList virtualiza la lista manteniendo la memoria constante.',
        },
      ],
      summary: {
        keyTakeaways: [
          'React Native traduce componentes JSX a vistas y controles nativos reales del sistema operativo del dispositivo.',
          'Las primitivas principales son View (contenedor), Text (texto obligatorio), Image (imágenes) y TouchableOpacity/Pressable (interacciones táctiles).',
          'Flexbox en móviles tiene dirección vertical por defecto y usa medidas numéricas independientes de resolución de pantalla.',
        ],
        commonPitfalls: [
          'Intentar usar selectores CSS tradicionales (como .clase o div > p) o unidades con "px" en StyleSheet.',
          'Renderizar listas de cientos de elementos con .map() dentro de un ScrollView en lugar de usar FlatList.',
          'Olvidar configurar activeOpacity o feedback táctil en elementos interactivos, haciendo que la app se sienta rígida o poco receptiva al tacto.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 3: ACCESO A HARDWARE Y SENSORES
    {
      id: 'm5-l3-sensores-y-hardware-movil',
      moduleId: 5,
      slug: 'acceso-a-hardware-sensores-camara-gps-notificaciones',
      title: 'Acceso al Hardware y Sensores: Cámara, GPS, Biometría y Almacenamiento Seguro',
      order: 3,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Aprender a interactuar con los sensores y hardware nativo del dispositivo móvil mediante Expo APIs: dominar el flujo de permisos obligatorios (Cámara, GPS), almacenamiento seguro con SecureStore (llaveros Keychain/KeyStore) y control del ciclo de vida de la app (AppState).',
      realWorldAnalogy: {
        title: 'El Mayordomo Diplomático y las Llaves de la Casa',
        analogy: 'En una computadora de escritorio o navegador web, la aplicación está aislada en una jaula de arena (sandbox) muy estricta. Pero en un smartphone, la app puede encender el micrófono, leer tu ubicación precisa por satélite, acceder al álbum de fotos de tu familia y escanear tu huella dactilar o rostro.\n\nEl sistema operativo (iOS y Android) actúa como un **guardia de seguridad implacable**:\n• Antes de que tu app pueda siquiera tocar la cámara o el GPS, debe pedirle permiso formal al usuario con un mensaje claro que explique el motivo.\n• Si el usuario rechaza el permiso, tu aplicación no debe crashear; debe adaptarse elegantemente (por ejemplo, permitiendo subir una foto de la galería en lugar de abrir la cámara en vivo).',
        whyItMatters: 'Manejar permisos de forma transparente y almacenar tokens en bóvedas cifradas (Keychain/KeyStore) es indispensable para que Apple y Google aprueben tu aplicación en sus tiendas oficiales.',
        iconName: 'Shield',
      },
      explanation: {
        sections: [
          {
            heading: 'El Flujo Obligatorio de Permisos en Móviles',
            content: 'En iOS y Android no puedes simplemente llamar a `Camera.open()`. Primero debes consultar el estado del permiso con Expo:\n\n```typescript\nimport { Camera } from "expo-camera";\n\nconst [permission, requestPermission] = Camera.useCameraPermissions();\n\nif (!permission) {\n  // Los permisos aún se están cargando desde el sistema operativo\n  return <View />;\n}\n\nif (!permission.granted) {\n  // El usuario aún no ha concedido el permiso\n  return (\n    <View style={styles.container}>\n      <Text>Necesitamos acceso a tu cámara para escanear el código QR.</Text>\n      <Button title="Conceder Permiso" onPress={requestPermission} />\n    </View>\n  );\n}\n\n// ¡Permiso concedido! Podemos renderizar la cámara\nreturn <Camera style={styles.camera} />;\n```',
          },
          {
            heading: 'Almacenamiento Local: AsyncStorage vs Expo SecureStore',
            content: '• **`AsyncStorage`:** Almacenamiento clave-valor asíncrono no cifrado. Es perfecto para preferencias de usuario (tema oscuro/claro, última lección vista).\n\n• **`Expo SecureStore`:** Almacenamiento fuertemente cifrado por hardware que utiliza el **Keychain** en iOS y el **KeyStore** protegido por hardware en Android. **Aquí es donde OBLIGATORIAMENTE debes guardar tokens JWT de autenticación y contraseñas temporales.** Nunca guardes tokens en texto plano.',
          },
          {
            heading: 'El Ciclo de Vida de la App (`AppState`)',
            content: 'Un teléfono no es como una computadora con múltiples ventanas visibles a la vez. Cuando el usuario recibe una llamada telefónica o pulsa el botón de inicio, tu app pasa a segundo plano:\n\n• `active`: La app está en primer plano y visible para el usuario.\n• `background`: La app está en segundo plano (el usuario abrió otra app o bloqueó la pantalla).\n• `inactive`: Estado transitorio (ej. transición de multitarea o notificación emergente).\n\nDetectar esto te permite pausar llamadas a la API de geolocalización o contadores para no agotar la batería del usuario.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando el ciclo de permisos y SecureStore en Expo:
class SimuladorSecureStore {
  constructor() {
    this.bovedaCifrada = {};
  }

  async setItemAsync(clave, valor) {
    // Simula cifrado AES por hardware
    const valorCifrado = "[CIFRADO_HARDWARE_KEYSTORE]" + btoa(valor);
    this.bovedaCifrada[clave] = valorCifrado;
    console.log(\`🔐 Guardado seguro en llavero nativo: '\${clave}'\`);
  }

  async getItemAsync(clave) {
    if (!this.bovedaCifrada[clave]) return null;
    const descifrado = atob(this.bovedaCifrada[clave].replace("[CIFRADO_HARDWARE_KEYSTORE]", ""));
    return descifrado;
  }
}

// Simulador de flujo de permisos móviles:
async function solicitarAccesoGps(permisosPrevios) {
  console.log("🛰️ Consultando estado de permiso de Ubicación (GPS)...");
  if (permisosPrevios.status === "granted") {
    return { exito: true, coordenadas: { lat: 4.6097, lng: -74.0817 } };
  } else if (permisosPrevios.canAskAgain) {
    console.log("📲 Mostrando diálogo nativo al usuario: '¿Permitir a RutaFullStack acceder a tu ubicación?'");
    return { exito: true, coordenadas: { lat: 4.6097, lng: -74.0817 } };
  } else {
    console.warn("❌ Permiso denegado permanentemente. Redirigiendo a Configuración del Sistema.");
    return { exito: false, coordenadas: null };
  }
}

async function probarHardware() {
  const secureStore = new SimuladorSecureStore();
  await secureStore.setItemAsync("auth_token_jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
  
  const tokenRecuperado = await secureStore.getItemAsync("auth_token_jwt");
  console.log("Token recuperado intacto:", tokenRecuperado.substring(0, 20) + "...");

  const resultadoGps = await solicitarAccesoGps({ status: "undetermined", canAskAgain: true });
  console.log("Resultado del sensor GPS:", resultadoGps);
}

probarHardware();`,
        explanation: 'Observa cómo el cifrado seguro en hardware protege los tokens y cómo los permisos determinan si los sensores entregan datos o devuelven valores nulos seguros.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm5-l3-ex1',
          title: 'Gestor de permisos con fallback amigable',
          level: 'facil',
          instruction: 'Crea una función `evaluarPermisoCamara(estadoPermiso)` que reciba un objeto `{ status, granted }`. Si `granted` es true, retorna "Camara lista para escanear". Si es false y `status === "denied"`, retorna "Acceso denegado: activa la camara en los ajustes". Para cualquier otro caso retorna "Esperando respuesta del usuario". Prueba llamándola con `{ status: "granted", granted: true }` e imprime el resultado.',
          starterCode: `function evaluarPermisoCamara(estadoPermiso) {
  // Evalúa granted y status
}

const resultado = evaluarPermisoCamara({ status: "granted", granted: true });
console.log(resultado);`,
          hints: [
            'if (estadoPermiso.granted) return "Camara lista para escanear";',
            'if (estadoPermiso.status === "denied") return "Acceso denegado: activa la camara en los ajustes";',
            'return "Esperando respuesta del usuario";'
          ],
          solutionCode: `function evaluarPermisoCamara(estadoPermiso) {
  if (estadoPermiso && estadoPermiso.granted) {
    return "Camara lista para escanear";
  }
  if (estadoPermiso && estadoPermiso.status === "denied") {
    return "Acceso denegado: activa la camara en los ajustes";
  }
  return "Esperando respuesta del usuario";
}

const resultado = evaluarPermisoCamara({ status: "granted", granted: true });
console.log(resultado);`,
          solutionExplanation: 'En el desarrollo móvil, manejar las denegaciones de permisos con mensajes claros y botones hacia la configuración del sistema es un requisito de calidad en App Store y Google Play.',
          testCheck: {
            type: 'output-contains',
            expected: 'Camara lista para escanear',
          },
        },
        {
          id: 'm5-l3-ex2',
          title: 'Almacenamiento seguro de credenciales con expiración',
          level: 'medio',
          instruction: 'Crea una función `guardarSesionSegura(almacen, token, tiempoVidaSegundos)` que guarde en un almacén simulado `{ token, expiraEn }` (donde expiraEn es `Date.now() + (tiempoVidaSegundos * 1000)`). Luego crea `verificarSesionSegura(almacen)` que retorne el token si aún no ha expirado, o elimine la clave y retorne null si ya expiró. Prueba guardando un token con tiempo de vida de 3600 segundos y verificando que retorne el token.',
          starterCode: `const almacenSeguro = {};

function guardarSesionSegura(almacen, token, tiempoVidaSegundos) {
  // Guarda token con timestamp de expiración
}

function verificarSesionSegura(almacen) {
  // Retorna token o limpia si expiró
}

guardarSesionSegura(almacenSeguro, "token_jwt_super_seguro", 3600);
console.log("Token verificado:", verificarSesionSegura(almacenSeguro));`,
          hints: [
            'almacen.session = { token, expiraEn: Date.now() + tiempoVidaSegundos * 1000 }',
            'En verificar: if (!almacen.session) return null;',
            'if (Date.now() > almacen.session.expiraEn) { delete almacen.session; return null; } else return almacen.session.token;'
          ],
          solutionCode: `const almacenSeguro = {};

function guardarSesionSegura(almacen, token, tiempoVidaSegundos) {
  almacen.session = {
    token,
    expiraEn: Date.now() + (tiempoVidaSegundos * 1000)
  };
}

function verificarSesionSegura(almacen) {
  if (!almacen.session) return null;
  if (Date.now() > almacen.session.expiraEn) {
    delete almacen.session;
    return null;
  }
  return almacen.session.token;
}

guardarSesionSegura(almacenSeguro, "token_jwt_super_seguro", 3600);
console.log("Token verificado:", verificarSesionSegura(almacenSeguro));`,
          solutionExplanation: 'Gestionar la expiración local de tokens junto con el almacenamiento cifrado evita enviar peticiones inválidas con tokens vencidos al backend.',
          testCheck: {
            type: 'output-contains',
            expected: 'token_jwt_super_seguro',
          },
        },
        {
          id: 'm5-l3-ex3',
          title: 'Controlador de batería y AppState (Reto)',
          level: 'reto',
          instruction: 'Crea una clase `ControladorServicioGps` con propiedades `rastreando: false` y métodos `iniciarRastreo()`, `detenerRastreo()` y `gestionarCambioAppState(nuevoEstado)`. Si el nuevo estado es "background" o "inactive", debe detener el rastreo para ahorrar batería e imprimir "Batería protegida: GPS en pausa". Si pasa a "active", debe reanudar el rastreo e imprimir "GPS reanudado". Prueba simulando el cambio a "background".',
          starterCode: `class ControladorServicioGps {
  constructor() {
    this.rastreando = false;
  }
  iniciarRastreo() {
    this.rastreando = true;
  }
  detenerRastreo() {
    this.rastreando = false;
  }
  gestionarCambioAppState(nuevoEstado) {
    // Pausa o reanuda según el estado
  }
}

const gpsManager = new ControladorServicioGps();
gpsManager.iniciarRastreo();
gpsManager.gestionarCambioAppState("background");`,
          hints: [
            'Si nuevoEstado === "background" || nuevoEstado === "inactive", llama this.detenerRastreo() e imprime "Batería protegida: GPS en pausa"',
            'Si nuevoEstado === "active", llama this.iniciarRastreo() e imprime "GPS reanudado"'
          ],
          solutionCode: `class ControladorServicioGps {
  constructor() {
    this.rastreando = false;
  }
  iniciarRastreo() {
    this.rastreando = true;
  }
  detenerRastreo() {
    this.rastreando = false;
  }
  gestionarCambioAppState(nuevoEstado) {
    if (nuevoEstado === 'background' || nuevoEstado === 'inactive') {
      this.detenerRastreo();
      console.log("Batería protegida: GPS en pausa");
    } else if (nuevoEstado === 'active') {
      this.iniciarRastreo();
      console.log("GPS reanudado");
    }
  }
}

const gpsManager = new ControladorServicioGps();
gpsManager.iniciarRastreo();
gpsManager.gestionarCambioAppState("background");`,
          solutionExplanation: 'Escuchar los cambios de AppState en React Native es una buena práctica fundamental para evitar consumo fantasma de batería en segundo plano.',
          testCheck: {
            type: 'output-contains',
            expected: 'Batería protegida: GPS en pausa',
          },
        },
      ],
      quiz: [
        {
          id: 'm5-l3-q1',
          question: '¿Por qué NUNCA se deben guardar tokens JWT sensibles en AsyncStorage estándar en aplicaciones móviles de producción?',
          options: [
            'Porque AsyncStorage borra los datos cada 10 minutos.',
            'Porque AsyncStorage no cifra los datos en disco, haciéndolos vulnerables si alguien extrae los archivos del teléfono o en dispositivos con root/jailbreak.',
            'Porque AsyncStorage solo permite almacenar números enteros.',
            'Porque hace que el teléfono no pueda recibir llamadas.',
          ],
          correctIndex: 1,
          explanation: 'AsyncStorage guarda datos en texto plano. Para información confidencial como tokens de sesión se debe usar Expo SecureStore, que utiliza los llaveros criptográficos protegidos por hardware (Keychain en iOS / KeyStore en Android).',
        },
        {
          id: 'm5-l3-q2',
          question: '¿Qué estado del ciclo de vida AppState indica que la app está corriendo pero no visible en primer plano?',
          options: [
            '"standby"',
            '"background"',
            '"sleeping"',
            '"detached"',
          ],
          correctIndex: 1,
          explanation: '"background" indica que la app pasó a segundo plano porque el usuario cambió de aplicación, minimizó o bloqueó la pantalla.',
        },
        {
          id: 'm5-l3-q3',
          question: '¿Qué ocurre en Android e iOS si intentas acceder a la cámara sin que el usuario haya aceptado el permiso?',
          options: [
            'El sistema operativo inventa una foto de muestra.',
            'La aplicación arroja una excepción de seguridad no controlada y se cierra inmediatamente (crash).',
            'La pantalla del teléfono parpadea en color rojo.',
            'El teléfono reinicia el sistema operativo.',
          ],
          correctIndex: 1,
          explanation: 'Tanto iOS como Android tienen estrictas políticas de privacidad: solicitar acceso al hardware sin permiso aprobado genera excepciones fatales de seguridad.',
        },
      ],
      summary: {
        keyTakeaways: [
          'El acceso a hardware en smartphones siempre requiere solicitar permisos explícitos al usuario de forma transparente.',
          'Expo SecureStore almacena credenciales confidenciales y tokens en los llaveros nativos cifrados por hardware del dispositivo.',
          'Monitorear AppState permite suspender servicios intensivos (GPS, acelerómetro) cuando la app pasa a segundo plano, prolongando la vida de la batería.',
        ],
        commonPitfalls: [
          'No explicar en el mensaje de permisos por qué la aplicación necesita la cámara o la ubicación (motivo de rechazo inmediato en App Store review).',
          'Guardar tokens de sesión en AsyncStorage sin cifrado en lugar de SecureStore.',
          'Mantener escuchadores de GPS activos en segundo plano sin justificación, provocando sobrecalentamiento y drenaje acelerado de batería.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 4: APPS DE ESCRITORIO (ELECTRON VS TAURI Y ARQUITECTURA IPC)
    {
      id: 'm5-l4-apps-escritorio-electron-tauri',
      moduleId: 5,
      slug: 'apps-de-escritorio-electron-vs-tauri-arquitectura',
      title: 'Apps de Escritorio: Electron vs Tauri y la Arquitectura de Procesos (IPC)',
      order: 4,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Comprender cómo construir aplicaciones de escritorio nativas para Windows, macOS y Linux reutilizando código web, dominar la arquitectura de proceso principal vs proceso de renderizado con puentes IPC seguros, y comparar las ventajas de Electron frente a la nueva generación con Tauri.',
      realWorldAnalogy: {
        title: 'El Camión con Central Eléctrica Propia vs El Auto Ligero que se Conecta a la Red',
        analogy: 'Imagina dos formas de construir un vehículo para transportar tu aplicación web al escritorio de una computadora:\n\n• **Electron (VS Code, Discord, Slack, Spotify, WhatsApp Desktop):** Es como un camión gigante que viaja llevando dentro su propia copia completa del navegador Chromium y del runtime Node.js. Tu app funciona idéntica en cualquier PC sin importar qué versión de Windows o Mac tenga, pero el archivo instalador pesa 80-150 MB y consume 150-250 MB de memoria RAM tan pronto lo abres.\n• **Tauri (La nueva generación):** En lugar de meter un navegador gigante dentro de tu instalador, Tauri utiliza el motor web que tu sistema operativo ya tiene instalado (WebView2 en Windows, WebKit en Mac). Y en lugar de Node.js, su núcleo backend se escribe en **Rust**. El instalador pesa apenas 5 a 10 MB y consume menos de 40 MB de memoria RAM.\n\nAmbos te permiten crear apps de escritorio potentes con React; Electron ofrece máxima compatibilidad histórica y Tauri ofrece ligereza y rendimiento de vanguardia.',
        whyItMatters: 'Llevar tu aplicación al escritorio permite crear herramientas profesionales con atajos de teclado globales, acceso a archivos locales sin restricciones de navegador y presencia fija en la barra de tareas de tus usuarios.',
        iconName: 'Monitor',
      },
      explanation: {
        sections: [
          {
            heading: 'La Arquitectura de Dos Procesos',
            content: 'Tanto en Electron como en Tauri, la aplicación se divide en dos mundos completamente aislados por razones de seguridad:\n\n1. **Proceso Principal (Main Process):** Corre con permisos nativos del sistema operativo (Node.js en Electron, Rust en Tauri). Puede crear ventanas, leer archivos del disco duro, crear iconos en la bandeja del sistema (System Tray) y gestionar menús.\n\n2. **Proceso de Renderizado (Renderer Process):** Es tu interfaz React / HTML / CSS normal. Por seguridad, **NO tiene acceso directo al disco duro ni al sistema operativo** para evitar que código malicioso o inyecciones XSS puedan borrar la computadora del usuario.',
          },
          {
            heading: 'Comunicación Segura entre Procesos: IPC y ContextBridge',
            content: 'Para que tu interfaz React le pida al proceso principal que guarde un archivo, usamos **IPC (Inter-Process Communication)** mediante un script puente precargado (`preload.js`):\n\n```javascript\n// preload.js (El puente seguro): jamás habilites "nodeIntegration: true"\nconst { contextBridge, ipcRenderer } = require("electron");\n\ncontextBridge.exposeInMainWorld("apiEscritorio", {\n  guardarArchivo: (contenido) => ipcRenderer.invoke("guardar-archivo-disco", contenido),\n  obtenerVersion: () => ipcRenderer.invoke("obtener-version-app")\n});\n```\n\nEn tu componente React, simplemente llamas:\n```typescript\nconst manejarGuardado = async () => {\n  const resultado = await window.apiEscritorio.guardarArchivo(miTexto);\n  alert(resultado.mensaje);\n};\n```',
          },
          {
            heading: 'Electron vs Tauri: Comparativa Frente a Frente',
            content: '• **Instalador:** Electron (~85 MB) vs Tauri (~8 MB).\n• **Consumo de Memoria RAM:** Electron (~180 MB base) vs Tauri (~35 MB base).\n• **Seguridad por defecto:** Tauri aísla todas las APIs de Rust por defecto; Electron requiere configurar explícitamente `contextIsolation: true` y deshabilitar `nodeIntegration`.\n• **Ecosistema:** Electron cuenta con 10 años de librerías maduras; Tauri es más moderno y veloz pero requiere nociones de Rust si necesitas módulos nativos personalizados.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando el puente de comunicación segura IPC entre React y el Proceso Principal de Escritorio:
const canalIPC = {
  manejadores: {},
  
  // En el proceso principal (Main Process):
  handle(evento, callback) {
    this.manejadores[evento] = callback;
  },

  // En el proceso de interfaz (Renderer / React):
  async invoke(evento, datos) {
    console.log(\`📡 IPC: React enviando mensaje '\${evento}' al Proceso Principal...\`);
    if (!this.manejadores[evento]) {
      throw new Error(\`No hay un manejador registrado para el evento: \${evento}\`);
    }
    return await this.manejadores[evento](datos);
  }
};

// 1. Proceso Principal: Registrando operaciones seguras de sistema operativo
canalIPC.handle("abrir-dialogo-archivo", async () => {
  return { ruta: "C:/Documentos/proyecto.fullstack", tamañoKb: 450 };
});

canalIPC.handle("notificacion-sistema", async ({ titulo, mensaje }) => {
  console.log(\`🔔 Mostrando notificación nativa en la barra de tareas: [\${titulo}] - \${mensaje}\`);
  return { entregada: true };
});

// 2. Proceso de Renderizado (Tu app React):
async function interfazUsuarioReact() {
  console.log("🖥️ React: Solicitando al sistema abrir diálogo de archivo...");
  const archivo = await canalIPC.invoke("abrir-dialogo-archivo");
  console.log("✅ Archivo recibido en React de forma segura:", archivo);

  await canalIPC.invoke("notificacion-sistema", {
    titulo: "RutaFullStack Escritorio",
    mensaje: "Tu progreso se guardó exitosamente en disco."
  });
}

interfazUsuarioReact();`,
        explanation: 'Fíjate cómo React nunca accede al disco directamente; solo envía mensajes tipados a través del canal IPC protegido.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm5-l4-ex1',
          title: 'Configuración segura de ventana BrowserWindow',
          level: 'facil',
          instruction: 'Crea una función `crearOpcionesVentanaSegura(ancho, alto)` que retorne el objeto de configuración para una ventana de Electron. Debe incluir `width: ancho`, `height: alto` y en `webPreferences` debe establecer obligatoriamente `nodeIntegration: false` y `contextIsolation: true` para prevenir vulnerabilidades de ejecución remota de código. Prueba con 1200x800 e imprime el resultado.',
          starterCode: `function crearOpcionesVentanaSegura(ancho, alto) {
  // Retorna opciones con webPreferences seguras
}

const opciones = crearOpcionesVentanaSegura(1200, 800);
console.log("Configuración de ventana:", opciones);`,
          hints: [
            'return { width: ancho, height: alto, webPreferences: { nodeIntegration: false, contextIsolation: true } };'
          ],
          solutionCode: `function crearOpcionesVentanaSegura(ancho, alto) {
  return {
    width: ancho,
    height: alto,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  };
}

const opciones = crearOpcionesVentanaSegura(1200, 800);
console.log("Configuración de ventana:", opciones);`,
          solutionExplanation: 'Habilitar contextIsolation y desactivar nodeIntegration es la regla de seguridad número 1 en Electron recomendada por el equipo de GitHub.',
          testCheck: {
            type: 'output-contains',
            expected: 'contextIsolation',
          },
        },
        {
          id: 'm5-l4-ex2',
          title: 'Validador de rutas seguras para IPC de guardado',
          level: 'medio',
          instruction: 'Para evitar que un atacante guarde archivos en carpetas del sistema operativo (Directory Traversal), crea una función `validarRutaGuardado(nombreArchivo, rutaCarpetaPermitida)` que retorne `{ valido: true, rutaCompleta }` si el nombre de archivo termina en ".json" o ".txt" y no contiene secuencias maliciosas como "../". De lo contrario debe retornar `{ valido: false, error: "Nombre de archivo o extensión no permitida" }`. Pruébala con "backup.json".',
          starterCode: `function validarRutaGuardado(nombreArchivo, rutaCarpetaPermitida) {
  // Valida que no use "../" y termine en .json o .txt
}

const res = validarRutaGuardado("backup.json", "/usuarios/app/datos");
console.log("Resultado validación de ruta:", res);`,
          hints: [
            'if (nombreArchivo.includes("../") || nombreArchivo.includes("..\\\\")) return { valido: false, error: "Nombre de archivo o extensión no permitida" };',
            'const extensionValida = nombreArchivo.endsWith(".json") || nombreArchivo.endsWith(".txt");'
          ],
          solutionCode: `function validarRutaGuardado(nombreArchivo, rutaCarpetaPermitida) {
  if (!nombreArchivo || typeof nombreArchivo !== 'string') {
    return { valido: false, error: "Nombre de archivo o extensión no permitida" };
  }
  if (nombreArchivo.includes('../') || nombreArchivo.includes('..\\')) {
    return { valido: false, error: "Nombre de archivo o extensión no permitida" };
  }
  const extensionValida = nombreArchivo.endsWith('.json') || nombreArchivo.endsWith('.txt');
  if (!extensionValida) {
    return { valido: false, error: "Nombre de archivo o extensión no permitida" };
  }
  return {
    valido: true,
    rutaCompleta: rutaCarpetaPermitida + '/' + nombreArchivo
  };
}

const res = validarRutaGuardado("backup.json", "/usuarios/app/datos");
console.log("Resultado validación de ruta:", res);`,
          solutionExplanation: 'En el proceso principal de Electron o Tauri, siempre debes validar y sanitizar cualquier argumento recibido desde el proceso de renderizado antes de invocar operaciones de disco.',
          testCheck: {
            type: 'output-contains',
            expected: 'backup.json',
          },
        },
        {
          id: 'm5-l4-ex3',
          title: 'Simulación de minimizar a la bandeja del sistema (System Tray) (Reto)',
          level: 'reto',
          instruction: 'En apps de escritorio como Slack o Spotify, al pulsar "cerrar", la ventana no debe matarse sino ocultarse en la barra de tareas. Crea una clase `VentanaEscritorio` con propiedades `visible: true` y `enBandeja: false`. Implementa los métodos `cerrar(minimizarABandeja)`, `restaurarDesdeBandeja()` y `salirAplicacion()`. Si `minimizarABandeja` es true, `cerrar()` debe poner `visible = false`, `enBandeja = true` e imprimir "Ventana oculta en System Tray". `restaurarDesdeBandeja()` debe poner `visible = true`, `enBandeja = false` e imprimir "Ventana restaurada". Prueba el flujo minimizando a bandeja y luego restaurando.',
          starterCode: `class VentanaEscritorio {
  constructor() {
    this.visible = true;
    this.enBandeja = false;
  }
  cerrar(minimizarABandeja) {
    // Si minimizarABandeja es true oculta y manda a bandeja
  }
  restaurarDesdeBandeja() {
    // Restaura visibilidad
  }
  salirAplicacion() {
    // Destruye la app
  }
}

const ventana = new VentanaEscritorio();
ventana.cerrar(true);
ventana.restaurarDesdeBandeja();`,
          hints: [
            'En cerrar: if (minimizarABandeja) { this.visible = false; this.enBandeja = true; console.log("Ventana oculta en System Tray"); } else { this.salirAplicacion(); }',
            'En restaurarDesdeBandeja: this.visible = true; this.enBandeja = false; console.log("Ventana restaurada");'
          ],
          solutionCode: `class VentanaEscritorio {
  constructor() {
    this.visible = true;
    this.enBandeja = false;
  }
  cerrar(minimizarABandeja) {
    if (minimizarABandeja) {
      this.visible = false;
      this.enBandeja = true;
      console.log("Ventana oculta en System Tray");
    } else {
      this.salirAplicacion();
    }
  }
  restaurarDesdeBandeja() {
    this.visible = true;
    this.enBandeja = false;
    console.log("Ventana restaurada");
  }
  salirAplicacion() {
    this.visible = false;
    this.enBandeja = false;
    console.log("Aplicación finalizada por completo");
  }
}

const ventana = new VentanaEscritorio();
ventana.cerrar(true);
ventana.restaurarDesdeBandeja();`,
          solutionExplanation: 'En Electron esto se programa escuchando el evento "close" de la ventana principal y llamando a event.preventDefault() seguido de win.hide().',
          testCheck: {
            type: 'output-contains',
            expected: 'Ventana restaurada',
          },
        },
      ],
      quiz: [
        {
          id: 'm5-l4-q1',
          question: '¿Por qué NUNCA se debe activar la opción "nodeIntegration: true" en el proceso de renderizado de Electron?',
          options: [
            'Porque impide que los estilos CSS se apliquen correctamente.',
            'Porque le da a cualquier código JavaScript en la ventana acceso total al sistema operativo, permitiendo que un ataque XSS o script malicioso pueda borrar o secuestrar la máquina del usuario.',
            'Porque solo funciona en computadoras con Linux.',
            'Porque hace que el texto de la aplicación se muestre al revés.',
          ],
          correctIndex: 1,
          explanation: 'nodeIntegration: true otorga permisos de Node.js directos en el DOM. Si tu web carga un contenido externo o sufre un ataque XSS, el atacante podría ejecutar comandos de terminal y acceder a archivos confidenciales del usuario.',
        },
        {
          id: 'm5-l4-q2',
          question: '¿Cuál es una ventaja principal de Tauri frente a Electron?',
          options: [
            'Tauri pesa apenas unos pocos megabytes y consume mucha menos memoria RAM porque reutiliza el WebView nativo del sistema operativo y corre su backend en Rust.',
            'Tauri no requiere escribir código ni compilar nada.',
            'Tauri solo puede ejecutarse en consolas de videojuegos.',
            'Electron fue prohibido por Microsoft.',
          ],
          correctIndex: 0,
          explanation: 'Tauri no empaqueta una copia completa de Chromium, sino que aprovecha el motor web preinstalado en el sistema operativo y un núcleo ultraligero en Rust, logrando ejecutables de ~8 MB y consumo mínimo de RAM.',
        },
        {
          id: 'm5-l4-q3',
          question: '¿Cómo se comunican de forma segura la interfaz de usuario en React y el proceso principal nativo en aplicaciones de escritorio?',
          options: [
            'Enviándose correos electrónicos entre sí.',
            'A través de canales IPC (Inter-Process Communication) expuestos de forma controlada mediante un script puente seguro (contextBridge).',
            'Guardando datos en un bloc de notas temporal en el escritorio.',
            'Reiniciando la computadora cada vez que hay un nuevo evento.',
          ],
          correctIndex: 1,
          explanation: 'El canal IPC con contextBridge es el mecanismo estándar y seguro que permite a la interfaz solicitar operaciones nativas sin otorgar acceso libre a las APIs de bajo nivel.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Electron y Tauri permiten compilar aplicaciones de escritorio para Windows, macOS y Linux utilizando HTML, CSS y React.',
          'La arquitectura de dos procesos (Main y Renderer) garantiza la seguridad aislando la interfaz gráfica del acceso directo al sistema operativo.',
          'Tauri representa la evolución moderna reduciendo dramáticamente el peso del instalador y el consumo de RAM frente a Electron.',
        ],
        commonPitfalls: [
          'Habilitar "nodeIntegration: true" en Electron creando vulnerabilidades críticas de ejecución remota de código (RCE).',
          'No validar rutas de guardado en el proceso principal, permitiendo ataques de escalada de directorios (../).',
          'Crear instaladores de Electron gigantescos sin depurar dependencias innecesarias de desarrollo.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 5: ARQUITECTURA UNIFICADA Y MONOREPOS
    {
      id: 'm5-l5-arquitectura-unificada-monorepo',
      moduleId: 5,
      slug: 'arquitectura-monorepo-codigo-compartido-web-movil-escritorio',
      title: 'Arquitectura Unificada: Monorepos y Código Compartido (Web, Móvil y Escritorio)',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Avanzado',
      objective: 'Diseñar una arquitectura profesional de Monorepo (Turborepo / pnpm workspaces) para compartir hasta el 80% del código fuente (tipos de TypeScript, clientes API, lógica de estado y utilidades) entre tu aplicación Web (React), Móvil (React Native) y Escritorio (Tauri).',
      realWorldAnalogy: {
        title: 'La Fábrica de Motores Central y los Tres Tipos de Carrocería',
        analogy: 'Imagina una prestigiosa fábrica automotriz:\n\n• Diseñan un motor potente, confiable y seguro: la lógica de autenticación de usuarios, los cálculos de precios, las llamadas a la API del backend y las definiciones de tipos de datos.\n• Los ingenieros **no fabrican 3 motores diferentes** desde cero para la moto, el sedán y el camión. Utilizan **el mismo motor central idéntico**, y solo le colocan carrocerías adaptadas a cada terreno:\n  - La carrocería Web (HTML y Tailwind CSS para navegadores).\n  - La carrocería Móvil (React Native con toques táctiles, cámara y vibración háptica).\n  - La carrocería de Escritorio (Tauri con menús nativos y atajos de teclado).\n\nSi mañana la empresa cambia una regla contable o agrega un nuevo campo a la cuenta de usuario, **solo actualizas el paquete compartido una vez** y las tres aplicaciones se actualizan automáticamente al mismo tiempo.',
        whyItMatters: 'Los gigantes tecnológicos (Google, Meta, Uber, Airbnb) operan con Monorepos. Es la estrategia que permite a equipos pequeños lanzar y mantener productos en Web, iOS, Android y PC sin multiplicar los costos ni duplicar bugs.',
        iconName: 'FolderGit2',
      },
      explanation: {
        sections: [
          {
            heading: 'Estructura de un Monorepo Moderno con Workspaces',
            content: 'En un Monorepo organizamos el proyecto en dos carpetas principales:\n\n```\nmi-proyecto-fullstack/\n├── apps/                     # Las aplicaciones ejecutables\n│   ├── web/                  # Next.js / Vite (Navegador)\n│   ├── mobile/               # React Native con Expo (iOS & Android)\n│   └── desktop/              # Tauri + React (Windows, Mac & Linux)\n└── packages/                 # El código 100% compartido\n    ├── shared-types/         # Interfaces de TypeScript comunes (User, Lesson)\n    ├── api-client/           # Funciones fetch/axios para llamar al backend\n    ├── store/                # Lógica de estado global (Zustand / Redux)\n    └── ui-tokens/            # Colores, fuentes y constantes de diseño\n```',
          },
          {
            heading: 'La Regla de Oro: Separar la Lógica Pura de la Vista Específica',
            content: 'Para lograr compartir el 80% del código, la regla fundamental es **no acoplar la lógica de negocio a ninguna tecnología visual**:\n\n• Un hook como `useAutenticacion()` o un store de Zustand para el carrito de compras no debe contener `<div>`, `<View>`, `alert()` ni referencias a `window.localStorage`.\n• En su lugar, usa abstracciones o inyección de dependencias para los adaptadores de almacenamiento (en web usa `localStorage`, en móvil usa `SecureStore`).',
          },
          {
            heading: 'Resolución de Archivos por Extensión de Plataforma',
            content: 'Los empaquetadores como Metro (React Native) y Vite reconocen extensiones de archivo específicas para cada plataforma:\n\n• `Boton.tsx`: Implementación por defecto.\n• `Boton.native.tsx`: Implementación con `<TouchableOpacity>` para iOS y Android.\n• `Boton.web.tsx`: Implementación con `<button>` y clases Tailwind para la Web.\n\nCuando importas `import { Boton } from "./Boton"`, el compilador elige automáticamente el archivo adecuado para la plataforma destino.',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Demostración de arquitectura de Monorepo: Lógica compartida consumida por Web y Móvil:

// 1. PAQUETE COMPARTIDO: packages/api-client/useAuthStore.js
function crearAuthStore(adaptadorAlmacenamiento) {
  let usuarioActual = null;

  return {
    async iniciarSesion(email, token) {
      usuarioActual = { email, fecha: new Date().toLocaleDateString() };
      await adaptadorAlmacenamiento.guardarToken("token_sesion", token);
      console.log(\`📦 Store Compartido: Usuario \${email} autenticado.\`);
      return usuarioActual;
    },
    obtenerUsuario() {
      return usuarioActual;
    }
  };
}

// 2. ADAPTADOR WEB: apps/web (Usa almacenamiento web simulado)
const adaptadorWeb = {
  guardarToken: async (k, v) => console.log(\`🌐 Web: Guardado en localStorage['\${k}']\`)
};

// 3. ADAPTADOR MÓVIL: apps/mobile (Usa llavero nativo simulado)
const adaptadorMovil = {
  guardarToken: async (k, v) => console.log(\`📱 Móvil: Guardado en Expo SecureStore (Keychain)\`)
};

// Probando el mismo store en ambas plataformas:
const authWeb = crearAuthStore(adaptadorWeb);
const authMovil = crearAuthStore(adaptadorMovil);

console.log("--- PRUEBA EN APLICACIÓN WEB ---");
authWeb.iniciarSesion("carlos@dev.com", "token_web_123");

console.log("\\n--- PRUEBA EN APLICACIÓN MÓVIL (EXPO) ---");
authMovil.iniciarSesion("carlos@dev.com", "token_movil_456");`,
        explanation: 'Observa cómo la misma lógica de negocio maneja la autenticación sin cambios, delegando únicamente el almacenamiento específico a cada plataforma.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm5-l5-ex1',
          title: 'Adaptador de almacenamiento agnóstico de plataforma',
          level: 'facil',
          instruction: 'Crea una función fábrica `crearAlmacenamientoAgnostico(plataforma)` que retorne un objeto con métodos `guardar(clave, valor)` y `obtener(clave)`. Si `plataforma === "web"`, simula el uso de un diccionario web imprimiendo "[Web]". Si `plataforma === "native"`, simula el uso de SecureStore imprimiendo "[SecureStore]". Prueba creando un almacenamiento web y guardando "tema", "oscuro".',
          starterCode: `function crearAlmacenamientoAgnostico(plataforma) {
  // Retorna métodos guardar y obtener adaptados a la plataforma
}

const storageWeb = crearAlmacenamientoAgnostico("web");
storageWeb.guardar("tema", "oscuro");`,
          hints: [
            'Usa un objeto interno const memoria = {};',
            'En guardar: memoria[clave] = valor; console.log((plataforma === "web" ? "[Web]" : "[SecureStore]") + " Guardado: " + clave);',
            'En obtener: return memoria[clave];'
          ],
          solutionCode: `function crearAlmacenamientoAgnostico(plataforma) {
  const memoria = {};
  const prefijo = plataforma === 'web' ? '[Web]' : '[SecureStore]';
  return {
    guardar: (clave, valor) => {
      memoria[clave] = valor;
      console.log(prefijo + " Guardado: " + clave);
    },
    obtener: (clave) => memoria[clave]
  };
}

const storageWeb = crearAlmacenamientoAgnostico("web");
storageWeb.guardar("tema", "oscuro");`,
          solutionExplanation: 'El patrón Adaptador permite que tu código compartido llame a una interfaz uniforme sin preocuparse por si corre en iOS, Android o Chrome.',
          testCheck: {
            type: 'output-contains',
            expected: '[Web] Guardado: tema',
          },
        },
        {
          id: 'm5-l5-ex2',
          title: 'Selector dinámico de componentes por plataforma',
          level: 'medio',
          instruction: 'Crea una función `resolverComponente(plataformaActual, variantes)` donde `variantes` es un objeto `{ default, native, web, desktop }`. La función debe retornar la variante más específica para `plataformaActual` ("ios" o "android" deben resolver "native" si existe; "web" resuelve "web"; "windows" o "macos" resuelven "desktop"). Si la variante específica no existe, debe retornar `variantes.default`. Pruébalo resolviendo el botón para la plataforma "ios".',
          starterCode: `const componentesBoton = {
  default: "BotonGenerico",
  web: "BotonHTMLConTailwind",
  native: "BotonTouchableNativo",
  desktop: "BotonVentanaEscritorio"
};

function resolverComponente(plataformaActual, variantes) {
  // Resuelve la variante correcta según la plataforma
}

const botonElegido = resolverComponente("ios", componentesBoton);
console.log("Componente seleccionado para iOS:", botonElegido);`,
          hints: [
            'Si plataformaActual === "ios" || plataformaActual === "android", comprueba variantes.native || variantes.default',
            'Si plataformaActual === "web", comprueba variantes.web || variantes.default',
            'Si plataformaActual === "windows" || plataformaActual === "macos", comprueba variantes.desktop || variantes.default'
          ],
          solutionCode: `const componentesBoton = {
  default: "BotonGenerico",
  web: "BotonHTMLConTailwind",
  native: "BotonTouchableNativo",
  desktop: "BotonVentanaEscritorio"
};

function resolverComponente(plataformaActual, variantes) {
  if (plataformaActual === 'ios' || plataformaActual === 'android') {
    return variantes.native || variantes.default;
  }
  if (plataformaActual === 'web') {
    return variantes.web || variantes.default;
  }
  if (plataformaActual === 'windows' || plataformaActual === 'macos' || plataformaActual === 'linux') {
    return variantes.desktop || variantes.default;
  }
  return variantes.default;
}

const botonElegido = resolverComponente("ios", componentesBoton);
console.log("Componente seleccionado para iOS:", botonElegido);`,
          solutionExplanation: 'Este mecanismo simula el empaquetador de React Native (Platform.select) y las extensiones .native.tsx y .web.tsx en proyectos monorepo.',
          testCheck: {
            type: 'output-contains',
            expected: 'BotonTouchableNativo',
          },
        },
        {
          id: 'm5-l5-ex3',
          title: 'Cliente API compartido con normalización de errores (Reto)',
          level: 'reto',
          instruction: 'En un paquete compartido `api-client`, los errores de red deben tener un formato uniforme para que la app web y móvil no manejen excepciones distintas. Crea una función `crearClienteApiCompartido(baseUrl, funcionPeticion)` que retorne `{ get(ruta) }`. Si la petición tiene éxito retorna `{ ok: true, datos, status: 200 }`. Si arroja un error (ej. desconexión o 500), debe capturarlo y retornar `{ ok: false, error: err.message, status: 500 }` sin romper la app. Prueba llamando a una ruta que funcione e imprime el resultado.',
          starterCode: `function crearClienteApiCompartido(baseUrl, funcionPeticion) {
  // Retorna cliente con método get que normaliza respuestas y errores
}

const mockPeticion = async (url) => ({ data: { mensaje: "Conexión exitosa" }, status: 200 });

async function probarCliente() {
  const api = crearClienteApiCompartido("https://api.rutafullstack.com", mockPeticion);
  const respuesta = await api.get("/cursos");
  console.log("Respuesta normalizada:", respuesta);
}

probarCliente();`,
          hints: [
            'Usa try { const res = await funcionPeticion(baseUrl + ruta); return { ok: true, datos: res.data, status: res.status }; } catch (err) { return { ok: false, error: err.message, status: 500 }; }'
          ],
          solutionCode: `function crearClienteApiCompartido(baseUrl, funcionPeticion) {
  return {
    async get(ruta) {
      try {
        const res = await funcionPeticion(baseUrl + ruta);
        return {
          ok: true,
          datos: res.data,
          status: res.status || 200
        };
      } catch (err) {
        return {
          ok: false,
          error: err instanceof Error ? err.message : String(err),
          status: 500
        };
      }
    }
  };
}

const mockPeticion = async (url) => ({ data: { mensaje: "Conexión exitosa" }, status: 200 });

async function probarCliente() {
  const api = crearClienteApiCompartido("https://api.rutafullstack.com", mockPeticion);
  const respuesta = await api.get("/cursos");
  console.log("Respuesta normalizada:", respuesta);
}

probarCliente();`,
          solutionExplanation: 'Tener un cliente API compartido normalizado en packages/api-client garantiza que cualquier cambio de contratos o manejo de errores en el backend se resuelva en un único punto para todas las plataformas.',
          testCheck: {
            type: 'output-contains',
            expected: 'Conexión exitosa',
          },
        },
      ],
      quiz: [
        {
          id: 'm5-l5-q1',
          question: '¿Qué es un Monorepo en el contexto de desarrollo multiplataforma moderno?',
          options: [
            'Un solo archivo JavaScript gigante donde se escribe todo el código del proyecto sin usar funciones.',
            'Un único repositorio de código que contiene múltiples aplicaciones (web, mobile, desktop) y paquetes compartidos organizados mediante workspaces.',
            'Un servidor que solo admite una base de datos a la vez.',
            'Una marca de computadoras portátiles.',
          ],
          correctIndex: 1,
          explanation: 'Un Monorepo organiza múltiples proyectos interconectados bajo un solo repositorio, facilitando compartir código, tipado TypeScript y dependencias comunes sin publicar paquetes privados en npm.',
        },
        {
          id: 'm5-l5-q2',
          question: '¿Qué tipo de código se recomienda colocar en los paquetes compartidos (packages/) de un monorepo?',
          options: [
            'Solo elementos gráficos HTML específicos de Safari.',
            'Lógica pura de negocio, clientes de API, tipos TypeScript, stores de estado global y funciones de validación agnósticas de la UI.',
            'Los archivos ejecutables .exe compilados.',
            'Las contraseñas maestras de los servidores en texto plano.',
          ],
          correctIndex: 1,
          explanation: 'Todo código que no dependa de primitivas visuales de un navegador o teléfono (como llamadas a APIs, modelos de datos, validaciones y lógica de estado) puede compartirse al 100% entre todas las plataformas.',
        },
        {
          id: 'm5-l5-q3',
          question: '¿Cómo permite el empaquetador de React Native tener implementaciones visuales diferentes para web y móvil sin duplicar la lógica?',
          options: [
            'Mediante extensiones de archivo por plataforma como Componente.native.tsx y Componente.web.tsx.',
            'Cambiando el nombre del proyecto cada vez que compilas.',
            'Eliminando el archivo de estilos en cada compilación.',
            'Instalando dos sistemas operativos en la misma computadora.',
          ],
          correctIndex: 0,
          explanation: 'Los empaquetadores como Metro y Webpack/Vite resuelven automáticamente la extensión correspondiente (.native.tsx para apps móviles y .web.tsx para el navegador) de forma transparente al importar el componente.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La arquitectura monorepo permite compartir entre el 70% y el 80% del código fuente entre Web, Móvil y Escritorio.',
          'Separar rigurosamente la lógica de negocio (hooks, stores, API clients) de la capa visual es la clave para la reutilización de código.',
          'Las extensiones por plataforma (.web.tsx vs .native.tsx) permiten personalizar la experiencia táctil móvil sin comprometer la web.',
        ],
        commonPitfalls: [
          'Introducir dependencias específicas del DOM (como window o document) en paquetes compartidos, rompiendo la compilación de React Native.',
          'No usar adaptadores para el almacenamiento local, asumiendo erróneamente que localStorage existe en dispositivos móviles nativos.',
          'Intentar forzar una sola interfaz visual para todas las pantallas: el código de negocio se comparte, pero la experiencia visual (UI/UX) debe respetar los estándares naturales de cada plataforma.',
        ],
      },
      xpReward: 50,
    },
  ],
};
