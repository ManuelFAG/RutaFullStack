import type { Module } from '../../types/curriculum';

export const MODULE_4_DATABASES: Module = {
  id: 4,
  slug: 'bases-de-datos',
  title: '4. Bases de Datos y ORMs',
  description: 'Aprende a almacenar, estructurar y consultar información de forma profesional: SQL con PostgreSQL, NoSQL con MongoDB, relaciones de datos y modelado ágil con Prisma ORM.',
  icon: 'Database',
  color: 'amber',
  badge: {
    id: 'modulo-4-maestro',
    name: 'Guardián de Datos',
    description: 'Completaste el modelado de bases de datos relacionales y NoSQL, consultas avanzadas y Prisma ORM.',
    icon: 'HardDrive',
    category: 'modulo',
  },
  lessons: [
    // LECCIÓN 1: INTRODUCCIÓN A BASES DE DATOS, ACID Y SQL VS NOSQL
    {
      id: 'm4-l1-introduccion-bases-de-datos',
      moduleId: 4,
      slug: 'introduccion-bases-de-datos-sql-vs-nosql',
      title: 'Introducción a las Bases de Datos: SQL vs NoSQL y Principio ACID',
      order: 1,
      estimatedTime: '20 min',
      difficulty: 'Intermedio',
      objective: 'Comprender por qué las aplicaciones necesitan bases de datos en lugar de simples archivos en disco, qué significa el principio ACID para transacciones financieras fiables, y cuáles son las diferencias arquitectónicas entre el modelo Relacional (SQL) y el modelo NoSQL.',
      realWorldAnalogy: {
        title: 'El Libro Contable Notariado vs La Carpeta con Sobres Flexibles',
        analogy: 'Imagina dos métodos de archivar la información de una empresa:\n\n• **El Sistema Relacional (SQL):** Es un libro contable con renglones milimétricos y casillas estrictas. No puedes escribir letras donde va un valor monetario, y si registras una factura, debe existir obligatoriamente el cliente registrado en la página de clientes con su cédula. Si quieres transferir dinero de una cuenta a otra, o se registran ambas operaciones juntas o ninguna (Atomicidad).\n• **El Sistema NoSQL (Documentos):** Es una carpeta con sobres de manila individuales. En el sobre del cliente "Ana" metes su historial, sus preferencias de compra y sus 3 direcciones de entrega grapadas en una sola hoja. Si otro cliente nuevo no tiene direcciones, no pasa nada; su sobre simplemente no tiene esa hoja.\n\nSQL prioriza la **consistencia absoluta y las relaciones estrictas**; NoSQL prioriza la **flexibilidad y la lectura masiva rápida** de documentos completos.',
        whyItMatters: 'Elegir mal la base de datos o no entender las transacciones es la causa de catástrofes reales: cobros dobles en pasarelas de pago, pérdida de pedidos o sistemas lentos que colapsan ante millones de usuarios.',
        iconName: 'Database',
      },
      explanation: {
        sections: [
          {
            heading: '¿Por qué no guardar datos en un archivo JSON o en memoria RAM?',
            content: 'Cuando tu servidor Node.js se reinicia o se corta la energía, toda la memoria RAM se borra de inmediato (es volátil). Y si guardas todo en un archivo `datos.json`, cuando 500 usuarios intentan escribir en el mismo archivo al mismo milisegundo, el archivo se corrompe por accesos concurrentes no controlados.\n\nUn **SGBD (Sistema Gestor de Bases de Datos)** resuelve esto con:\n1. **Persistencia garantizada en disco** mediante registros de escritura previa (Write-Ahead Logs).\n2. **Concurrencia segura:** Cientos de miles de lectores y escritores simultáneos sin colisiones.\n3. **Índices de búsqueda (B-Trees):** Encontrar un usuario entre 10 millones de filas en 2 milisegundos en lugar de recorrer toda la lista.',
          },
          {
            heading: 'Las Propiedades ACID: El Estándar de Oro de la Fiabilidad',
            content: 'Cualquier base de datos que maneje transacciones financieras o datos críticos debe cumplir ACID:\n\n• **A - Atomicidad (Todo o Nada):** Si transfieres $100 de Juan a Pedro, hay dos pasos: restar $100 a Juan y sumar $100 a Pedro. Si el servidor se apaga a la mitad, la operación se revierte (Rollback). Nunca se pierde dinero.\n• **C - Consistencia:** Todos los datos respetan las reglas (por ejemplo, el saldo nunca puede ser negativo).\n• **I - Aislamiento (Isolation):** Si dos transacciones ocurren al mismo tiempo, el resultado es idéntico a si hubieran ocurrido una después de otra.\n• **D - Durabilidad:** Una vez que la base de datos confirma que guardó la transacción, un corte eléctrico no borrará los datos.',
            callout: {
              type: 'tip',
              text: 'Si estás construyendo una tienda, un banco o un sistema de reservas de asientos de avión, una base de datos relacional con soporte ACID (como PostgreSQL) es la opción estándar de la industria.',
            },
          },
          {
            heading: 'SQL vs NoSQL: Cuándo Elegir Cada Una',
            content: '• **SQL (Relacional - PostgreSQL, MySQL):** Tablas con filas y columnas predefinidas. Ideal cuando los datos están altamente interconectados (usuarios tienen pedidos, pedidos tienen productos, productos tienen categorías) y la integridad referencial es innegociable.\n\n• **NoSQL (Documentos/Clave-Valor - MongoDB, Redis):** Almacena documentos JSON/BSON o pares clave-valor. Ideal para catálogos con atributos muy variables (por ejemplo, ropa con tallas vs electrodomésticos con voltajes), logs de auditoría o cachés ultrarrápidas.',
            codeSnippet: {
              language: 'javascript',
              description: 'Comparación conceptual entre estructura Relacional (SQL) y NoSQL:',
              code: `// Enfoque Relacional (SQL): Tablas normalizadas separadas con IDs de referencia
const tablaUsuarios = [{ id: 1, nombre: "Carlos", email: "carlos@mail.com" }];
const tablaPedidos = [{ id: 101, usuarioId: 1, total: 45.50 }]; // usuarioId es Foreign Key

// Enfoque NoSQL (MongoDB): Documento embebido con todo junto en un solo registro
const documentoCliente = {
  _id: "64f1a2b3c4d5",
  nombre: "Carlos",
  email: "carlos@mail.com",
  pedidos: [
    { pedidoId: "ped-101", total: 45.50, fecha: "2026-10-13" }
  ]
};`,
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando una transacción bancaria con principio de Atomicidad (Todo o Nada):
const baseDatosBancaria = {
  cuentaA: { titular: "Lucía", saldo: 500 },
  cuentaB: { titular: "Marcos", saldo: 100 }
};

function realizarTransferencia(origen, destino, monto) {
  console.log(\`Iniciando transferencia de $\${monto} de \${origen.titular} a \${destino.titular}...\`);
  
  // 1. Guardamos el estado previo por si hay que hacer Rollback
  const saldoPrevioOrigen = origen.saldo;
  const saldoPrevioDestino = destino.saldo;

  try {
    if (origen.saldo < monto) {
      throw new Error("Saldo insuficiente en la cuenta de origen.");
    }
    
    // Paso 1: Débito
    origen.saldo -= monto;
    console.log(\`✅ Débito realizado. Saldo provisional de \${origen.titular}: $\${origen.saldo}\`);

    // Simulamos un fallo imprevisto (ej. destino bloqueado o desconexión)
    if (monto > 1000) {
      throw new Error("Límite de seguridad superado. Transacción cancelada.");
    }

    // Paso 2: Crédito
    destino.saldo += monto;
    console.log(\`✅ Crédito acreditado. Saldo de \${destino.titular}: $\${destino.saldo}\`);
    console.log("🎉 ¡Transacción confirmada (COMMIT) con éxito!");
  } catch (error) {
    console.warn(\`⚠️ Error en la transacción: \${error.message}\`);
    console.log("🔄 Ejecutando ROLLBACK: Restaurando saldos originales...");
    origen.saldo = saldoPrevioOrigen;
    destino.saldo = saldoPrevioDestino;
  }
}

realizarTransferencia(baseDatosBancaria.cuentaA, baseDatosBancaria.cuentaB, 200);
console.log("Estado final de cuentas:", baseDatosBancaria);`,
        explanation: 'Modifica el monto a 600 o 1500 y observa cómo el mecanismo de Rollback previene la pérdida de dinero manteniendo el sistema consistente.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm4-l1-ex1',
          title: 'Validación de esquema estricto (Tipo SQL)',
          level: 'facil',
          instruction: 'Crea una función `validarUsuario(usuario)` que compruebe que el objeto tenga las propiedades `nombre` (string no vacío), `edad` (número mayor o igual a 18) y `email` (string con un "@"). Si cumple todas las condiciones retorna `true`, de lo contrario retorna `false`. Prueba la función con el usuario de prueba dado e imprime el resultado.',
          starterCode: `function validarUsuario(usuario) {
  // Retorna true solo si cumple todas las reglas de esquema
}

const usuarioValido = { nombre: "Elena", edad: 25, email: "elena@correo.com" };
console.log("¿Es válido?:", validarUsuario(usuarioValido));`,
          hints: [
            'Verifica typeof usuario.nombre === "string" && usuario.nombre.trim().length > 0',
            'Verifica typeof usuario.edad === "number" && usuario.edad >= 18',
            'Verifica typeof usuario.email === "string" && usuario.email.includes("@")'
          ],
          solutionCode: `function validarUsuario(usuario) {
  if (!usuario || typeof usuario !== 'object') return false;
  const nombreValido = typeof usuario.nombre === 'string' && usuario.nombre.trim().length > 0;
  const edadValida = typeof usuario.edad === 'number' && usuario.edad >= 18;
  const emailValido = typeof usuario.email === 'string' && usuario.email.includes('@');
  return nombreValido && edadValida && emailValido;
}

const usuarioValido = { nombre: "Elena", edad: 25, email: "elena@correo.com" };
console.log("¿Es válido?:", validarUsuario(usuarioValido));`,
          solutionExplanation: 'En las bases de datos SQL relacionales, el motor realiza exactamente esta comprobación de esquema y tipos antes de permitir insertar una nueva fila en una tabla.',
          testCheck: {
            type: 'output-contains',
            expected: 'true',
          },
        },
        {
          id: 'm4-l1-ex2',
          title: 'Simulación de Integridad Referencial',
          level: 'medio',
          instruction: 'En SQL, una Clave Foránea (Foreign Key) prohíbe crear un pedido para un usuario que no existe. Crea una función `validarPedido(pedido, listaUsuarios)` que compruebe si el `pedido.clienteId` existe en la lista de usuarios. Si existe, imprime "Pedido aprobado para: " seguido del nombre del usuario y retorna true. Si no existe, imprime "Error: Cliente no encontrado" y retorna false.',
          starterCode: `const usuariosRegistrados = [
  { id: 10, nombre: "David" },
  { id: 20, nombre: "Sofia" }
];

function validarPedido(pedido, listaUsuarios) {
  // Busca si existe algún usuario cuyo id coincida con pedido.clienteId
}

validarPedido({ pedidoId: 1, clienteId: 10, total: 90 }, usuariosRegistrados);`,
          hints: [
            'Usa listaUsuarios.find(u => u.id === pedido.clienteId)',
            'Si encuentras al cliente imprime con console.log y retorna true'
          ],
          solutionCode: `const usuariosRegistrados = [
  { id: 10, nombre: "David" },
  { id: 20, nombre: "Sofia" }
];

function validarPedido(pedido, listaUsuarios) {
  const cliente = listaUsuarios.find(u => u.id === pedido.clienteId);
  if (cliente) {
    console.log("Pedido aprobado para: " + cliente.nombre);
    return true;
  } else {
    console.log("Error: Cliente no encontrado");
    return false;
  }
}

validarPedido({ pedidoId: 1, clienteId: 10, total: 90 }, usuariosRegistrados);`,
          solutionExplanation: 'La integridad referencial garantiza que no queden datos huérfanos o pedidos asignados a usuarios inexistentes.',
          testCheck: {
            type: 'output-contains',
            expected: 'Pedido aprobado para: David',
          },
        },
        {
          id: 'm4-l1-ex3',
          title: 'Transformador Relacional a Documento NoSQL (Reto)',
          level: 'reto',
          instruction: 'Escribe una función `unificarEnDocumento(usuario, listaPedidos)` que reciba un usuario relacional y una lista general de pedidos. La función debe retornar un único objeto con los datos del usuario y un array `compras` que contenga únicamente los pedidos que le pertenecen a ese usuario (`pedido.usuarioId === usuario.id`), omitiendo la propiedad redundante `usuarioId` en cada pedido.',
          starterCode: `const usuarioSQL = { id: 7, nombre: "Camila", nivel: "Gold" };
const todosLosPedidos = [
  { id: 101, usuarioId: 7, producto: "Teclado Mecánico", precio: 85 },
  { id: 102, usuarioId: 2, producto: "Mouse Gamer", precio: 40 },
  { id: 103, usuarioId: 7, producto: "Monitor 24'", precio: 190 }
];

function unificarEnDocumento(usuario, listaPedidos) {
  // Filtra los pedidos del usuario y mapea omitiendo usuarioId
}

const docMongo = unificarEnDocumento(usuarioSQL, todosLosPedidos);
console.log("Documento NoSQL unificado:", JSON.stringify(docMongo));`,
          hints: [
            'Filtra con listaPedidos.filter(p => p.usuarioId === usuario.id)',
            'Mapea cada pedido: const { usuarioId, ...resto } = p; return resto;',
            'Retorna { ...usuario, compras: pedidosMapeados }'
          ],
          solutionCode: `const usuarioSQL = { id: 7, nombre: "Camila", nivel: "Gold" };
const todosLosPedidos = [
  { id: 101, usuarioId: 7, producto: "Teclado Mecánico", precio: 85 },
  { id: 102, usuarioId: 2, producto: "Mouse Gamer", precio: 40 },
  { id: 103, usuarioId: 7, producto: "Monitor 24'", precio: 190 }
];

function unificarEnDocumento(usuario, listaPedidos) {
  const compras = listaPedidos
    .filter(p => p.usuarioId === usuario.id)
    .map(({ usuarioId, ...datosPedido }) => datosPedido);
  
  return {
    ...usuario,
    compras
  };
}

const docMongo = unificarEnDocumento(usuarioSQL, todosLosPedidos);
console.log("Documento NoSQL unificado:", JSON.stringify(docMongo));`,
          solutionExplanation: 'En NoSQL agrupamos los datos relacionados en un solo documento para que una sola lectura obtenga el cliente y todas sus compras sin hacer JOINs.',
          testCheck: {
            type: 'output-contains',
            expected: 'Teclado Mecánico',
          },
        },
      ],
      quiz: [
        {
          id: 'm4-l1-q1',
          question: '¿Qué significa la letra "A" en el principio ACID de las bases de datos transaccionales?',
          options: [
            'Autenticación: Todos los usuarios deben tener contraseña.',
            'Atomicidad: Una transacción se ejecuta por completo o se revierte por completo (todo o nada).',
            'Almacenamiento: Los datos deben guardarse siempre en discos duros SSD.',
            'Asincronía: Las consultas se ejecutan en segundo plano sin esperar respuesta.',
          ],
          correctIndex: 1,
          explanation: 'La Atomicidad garantiza que si una operación de varios pasos falla a mitad de camino, se ejecuta un Rollback y nada queda a medias ni corrupto.',
        },
        {
          id: 'm4-l1-q2',
          question: '¿Cuál es una ventaja principal de una base de datos relacional (SQL) frente a una NoSQL?',
          options: [
            'No requiere definir columnas ni tipos de datos con anticipación.',
            'Nunca necesita hacer copias de seguridad.',
            'Garantiza integridad referencial estricta y evita datos duplicados mediante tablas normalizadas.',
            'Guarda los datos únicamente en archivos de texto plano fáciles de editar con bloc de notas.',
          ],
          correctIndex: 2,
          explanation: 'Las bases de datos SQL destacan por su esquema formal estricto, claves primarias y foráneas que impiden estados inconsistentes entre entidades relacionadas.',
        },
        {
          id: 'm4-l1-q3',
          question: '¿En qué escenario suele ser más conveniente utilizar una base de datos NoSQL basada en documentos como MongoDB?',
          options: [
            'En sistemas contables bancarios donde cada centavo requiere auditoría ACID estricta.',
            'Cuando los datos tienen estructuras altamente heterogéneas, variables o anidadas (ej. catálogos de e-commerce con atributos distintos por producto).',
            'Cuando necesitas tablas con llaves foráneas estrictas y relaciones de muchos a muchos complejas.',
            'Solo cuando el servidor tiene menos de 1 GB de memoria RAM disponible.',
          ],
          correctIndex: 1,
          explanation: 'El modelo de documentos JSON/BSON de MongoDB permite almacenar atributos diversos sin necesidad de alterar un esquema rígido para cada variación de producto.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Las bases de datos previenen la pérdida de datos, manejan miles de conexiones concurrentes y aceleran búsquedas con índices.',
          'El principio ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad) es imprescindible para transacciones financieras o datos críticos.',
          'SQL organiza datos en tablas normalizadas con esquema estricto; NoSQL organiza datos en documentos o pares clave-valor de esquema flexible.',
        ],
        commonPitfalls: [
          'Guardar datos de producción en archivos locales JSON pensando que funcionará bien con usuarios concurrentes.',
          'No implementar transacciones bancarias o de pedidos dejando saldos inconsistentes ante caídas de conexión.',
          'Creer que NoSQL no necesita ningún tipo de diseño o validación: el desorden sin reglas en NoSQL genera datos corruptos imposibles de consultar.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 2: SQL Y POSTGRESQL: CONSULTAS FUNDAMENTALES (SELECT, INSERT, UPDATE, DELETE)
    {
      id: 'm4-l2-sql-consultas-fundamentales',
      moduleId: 4,
      slug: 'sql-postgresql-consultas-select-insert-update-delete',
      title: 'SQL y PostgreSQL: Las Consultas Fundamentales (CRUD Declarativo)',
      order: 2,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Aprender la sintaxis estándar de SQL sobre PostgreSQL: creación de tablas con tipos de datos correctos, filtrado preciso con WHERE, ordenamiento, paginación con LIMIT/OFFSET y operaciones seguras de modificación y borrado.',
      realWorldAnalogy: {
        title: 'El Bibliotecario Central y las Fichas de Pedido',
        analogy: 'Imagina que entras a la biblioteca más grande de la ciudad. No puedes caminar tú mismo por los pasillos secretos; debes entregarle una ficha escrita al bibliotecario jefe:\n\n*"Por favor, búscame el título y año de los libros de ciencia ficción publicados después de 2020, ordénalos por calificación de mayor a menor y tráeme solo los primeros 3"*.\n\nEn SQL, esa ficha se escribe prácticamente igual:\n`SELECT titulo, anio FROM libros WHERE genero = \'Sci-Fi\' AND anio > 2020 ORDER BY calificacion DESC LIMIT 3;`\n\nSQL es un lenguaje **declarativo**: le describes al motor *qué resultado deseas obtener*, y el optimizador de PostgreSQL calcula la ruta matemática más rápida para traértelo.',
        whyItMatters: 'PostgreSQL es la base de datos relacional más avanzada, querida y utilizada por empresas tecnológicas de clase mundial (Vercel, Supabase, Apple, Instagram). Dominar SQL es una habilidad que nunca pasa de moda.',
        iconName: 'Server',
      },
      explanation: {
        sections: [
          {
            heading: 'Creando una Tabla con Tipos de Datos Fuertes',
            content: 'En PostgreSQL definimos una tabla con el comando `CREATE TABLE`. Cada columna tiene un tipo de dato y restricciones (constraints):\n\n```sql\nCREATE TABLE usuarios (\n  id SERIAL PRIMARY KEY,               -- Entero autoincremental único\n  nombre VARCHAR(100) NOT NULL,        -- Texto de hasta 100 caracteres obligatorio\n  email VARCHAR(150) UNIQUE NOT NULL,  -- Correo único e irrepetible\n  edad INTEGER CHECK (edad >= 0),      -- Restricción: la edad no puede ser negativa\n  activo BOOLEAN DEFAULT true,         -- Por defecto verdadero\n  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- Fecha y hora automática\n);\n```',
          },
          {
            heading: 'Lectura con Filtros: SELECT, WHERE, ORDER BY y LIMIT',
            content: 'La cláusula `SELECT` extrae datos. Jamás uses `SELECT *` en producción si solo necesitas 2 columnas, ya que enviar columnas innecesarias satura el ancho de banda:\n\n```sql\n-- Consultar usuarios activos mayores de 21 años ordenados alfabéticamente\nSELECT id, nombre, email \nFROM usuarios \nWHERE activo = true AND edad >= 21 \nORDER BY nombre ASC \nLIMIT 10 OFFSET 0; -- Primeros 10 resultados (Página 1)\n```',
            callout: {
              type: 'info',
              text: 'OFFSET 10 LIMIT 10 te trae la Página 2; OFFSET 20 LIMIT 10 te trae la Página 3. Así es como se programa la paginación de resultados.',
            },
          },
          {
            heading: 'Modificación y Borrado: El Peligro Mortal de Olvidar el WHERE',
            content: 'Para insertar filas usamos `INSERT INTO`:\n```sql\nINSERT INTO usuarios (nombre, email, edad) \nVALUES (\'Laura\', \'laura@dev.com\', 28);\n```\n\nPara actualizar o borrar usamos `UPDATE` y `DELETE`:\n```sql\n-- Correcto: actualiza solo al usuario con id 5\nUPDATE usuarios SET activo = false WHERE id = 5;\n\n-- Correcto: borra solo al usuario con id 5\nDELETE FROM usuarios WHERE id = 5;\n```',
            callout: {
              type: 'warning',
              text: '¡CUIDADO EXTREMO! Si ejecutas "UPDATE usuarios SET activo = false;" sin WHERE, ¡desactivarás a TODOS los usuarios de la base de datos! Si ejecutas "DELETE FROM usuarios;" sin WHERE, ¡vaciarás la tabla entera!',
            },
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando un motor SQL en memoria para entender SELECT, INSERT y UPDATE:
const tablaProductos = [
  { id: 1, nombre: "Laptop Pro", categoria: "Computo", precio: 1200, stock: 15 },
  { id: 2, nombre: "Mouse Óptico", categoria: "Accesorios", precio: 25, stock: 80 },
  { id: 3, nombre: "Teclado RGB", categoria: "Accesorios", precio: 65, stock: 30 },
  { id: 4, nombre: "Monitor 4K", categoria: "Computo", precio: 450, stock: 8 },
  { id: 5, nombre: "Cable HDMI", categoria: "Accesorios", precio: 12, stock: 120 }
];

// 1. Simulación de: SELECT nombre, precio FROM productos WHERE categoria = 'Accesorios' ORDER BY precio DESC LIMIT 2
function simularSelectAccesoriosCaros(productos) {
  return productos
    .filter(p => p.categoria === "Accesorios")
    .sort((a, b) => b.precio - a.precio) // DESC
    .slice(0, 2) // LIMIT 2
    .map(p => ({ nombre: p.nombre, precio: p.precio })); // Proyección de columnas
}

console.log("Consulta 1 (Top 2 Accesorios más caros):");
console.log(simularSelectAccesoriosCaros(tablaProductos));

// 2. Simulación de UPDATE seguro con WHERE:
function simularUpdateStock(productos, idProducto, nuevoStock) {
  const index = productos.findIndex(p => p.id === idProducto);
  if (index !== -1) {
    productos[index].stock = nuevoStock;
    console.log(\`✅ Producto \${productos[index].nombre} actualizado con stock: \${nuevoStock}\`);
  } else {
    console.warn("❌ Error 404: Producto no encontrado para actualizar.");
  }
}

simularUpdateStock(tablaProductos, 4, 12);`,
        explanation: 'Ejecuta el código y experimenta cambiando los criterios del filtro y el orden para ver cómo se comportan las consultas SQL en memoria.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm4-l2-ex1',
          title: 'Simular SELECT con filtro WHERE compuesto',
          level: 'facil',
          instruction: 'Crea una función `buscarArticulosDisponibles(productos, precioMaximo)` que retorne una lista de nombres de productos (`p.nombre`) que cumplan dos condiciones: que su `precio` sea menor o igual al `precioMaximo` y que tengan `stock > 0`. Prueba llamando a la función con precio máximo de 50 e imprime el resultado.',
          starterCode: `const inventario = [
  { id: 1, nombre: "Audífonos Bluetooth", precio: 45, stock: 10 },
  { id: 2, nombre: "Webcam HD", precio: 70, stock: 5 },
  { id: 3, nombre: "Mouse Pad", precio: 15, stock: 0 },
  { id: 4, nombre: "Funda Laptop", precio: 25, stock: 18 }
];

function buscarArticulosDisponibles(productos, precioMaximo) {
  // Filtra por precio <= precioMaximo y stock > 0, luego retorna los nombres
}

const disponibles = buscarArticulosDisponibles(inventario, 50);
console.log("Artículos encontrados:", disponibles);`,
          hints: [
            'Usa productos.filter(p => p.precio <= precioMaximo && p.stock > 0)',
            'Usa .map(p => p.nombre) para obtener solo los nombres'
          ],
          solutionCode: `const inventario = [
  { id: 1, nombre: "Audífonos Bluetooth", precio: 45, stock: 10 },
  { id: 2, nombre: "Webcam HD", precio: 70, stock: 5 },
  { id: 3, nombre: "Mouse Pad", precio: 15, stock: 0 },
  { id: 4, nombre: "Funda Laptop", precio: 25, stock: 18 }
];

function buscarArticulosDisponibles(productos, precioMaximo) {
  return productos
    .filter(p => p.precio <= precioMaximo && p.stock > 0)
    .map(p => p.nombre);
}

const disponibles = buscarArticulosDisponibles(inventario, 50);
console.log("Artículos encontrados:", disponibles);`,
          solutionExplanation: 'En SQL esto equivale a: SELECT nombre FROM productos WHERE precio <= 50 AND stock > 0;',
          testCheck: {
            type: 'output-contains',
            expected: 'Audífonos Bluetooth',
          },
        },
        {
          id: 'm4-l2-ex2',
          title: 'Simulación de INSERT INTO con auto-incremento y validación UNIQUE',
          level: 'medio',
          instruction: 'Crea una función `insertarUsuario(tabla, nuevoUsuario)` que reciba una lista de usuarios y un objeto `{ nombre, email }`. La función debe verificar que el `email` no esté ya registrado en la tabla. Si ya existe, imprime "Error: El email ya está registrado". Si no existe, calcula el nuevo ID autoincremental (`id = tabla.length > 0 ? Math.max(...tabla.map(u => u.id)) + 1 : 1`), añade el nuevo registro a la tabla y retorna el usuario creado con su ID. Pruébala insertando un usuario.',
          starterCode: `const usuariosDB = [
  { id: 1, nombre: "Ana", email: "ana@correo.com" },
  { id: 2, nombre: "Beto", email: "beto@correo.com" }
];

function insertarUsuario(tabla, nuevoUsuario) {
  // Comprueba email único, genera ID y añade a la tabla
}

const creado = insertarUsuario(usuariosDB, { nombre: "Carla", email: "carla@correo.com" });
console.log("Usuario insertado con éxito:", creado);`,
          hints: [
            'Comprueba con tabla.some(u => u.email === nuevoUsuario.email)',
            'Genera el id y haz tabla.push({ id: nuevoId, ...nuevoUsuario })'
          ],
          solutionCode: `const usuariosDB = [
  { id: 1, nombre: "Ana", email: "ana@correo.com" },
  { id: 2, nombre: "Beto", email: "beto@correo.com" }
];

function insertarUsuario(tabla, nuevoUsuario) {
  const existe = tabla.some(u => u.email === nuevoUsuario.email);
  if (existe) {
    console.log("Error: El email ya está registrado");
    return null;
  }
  const nuevoId = tabla.length > 0 ? Math.max(...tabla.map(u => u.id)) + 1 : 1;
  const usuarioInsertado = { id: nuevoId, ...nuevoUsuario };
  tabla.push(usuarioInsertado);
  return usuarioInsertado;
}

const creado = insertarUsuario(usuariosDB, { nombre: "Carla", email: "carla@correo.com" });
console.log("Usuario insertado con éxito:", creado);`,
          solutionExplanation: 'En PostgreSQL, las restricciones PRIMARY KEY SERIAL y UNIQUE manejan esto automáticamente a nivel de motor.',
          testCheck: {
            type: 'output-contains',
            expected: 'Carla',
          },
        },
        {
          id: 'm4-l2-ex3',
          title: 'Simulación de DELETE seguro con cláusula WHERE (Reto)',
          level: 'reto',
          instruction: 'Escribe una función `eliminarUsuariosInactivos(tabla, diasInactividadLimite)` que elimine únicamente los usuarios donde `inactivoDesdeDias > diasInactividadLimite`. La función debe modificar el array original in-place o filtrarlo, e imprimir cuántas filas fueron eliminadas: "Filas eliminadas: X". Si ningún usuario cumple la condición, debe imprimir "Filas eliminadas: 0". Prueba con límite de 90 días.',
          starterCode: `const listaUsuarios = [
  { id: 101, nombre: "Mario", inactivoDesdeDias: 120 },
  { id: 102, nombre: "Natalia", inactivoDesdeDias: 15 },
  { id: 103, nombre: "Oscar", inactivoDesdeDias: 95 }
];

function eliminarUsuariosInactivos(tabla, diasInactividadLimite) {
  // Filtra y reporta cuántas filas fueron eliminadas
}

eliminarUsuariosInactivos(listaUsuarios, 90);`,
          hints: [
            'Calcula cuántos registros cumplen la condición antes de borrar',
            'Puedes usar splice en bucle inverso o reasignar filtrando',
            'Imprime console.log("Filas eliminadas: " + cantidadEliminada)'
          ],
          solutionCode: `let listaUsuarios = [
  { id: 101, nombre: "Mario", inactivoDesdeDias: 120 },
  { id: 102, nombre: "Natalia", inactivoDesdeDias: 15 },
  { id: 103, nombre: "Oscar", inactivoDesdeDias: 95 }
];

function eliminarUsuariosInactivos(tabla, diasInactividadLimite) {
  const eliminados = tabla.filter(u => u.inactivoDesdeDias > diasInactividadLimite);
  const cantidad = eliminados.length;
  
  // Modificamos el array in-place
  for (let i = tabla.length - 1; i >= 0; i--) {
    if (tabla[i].inactivoDesdeDias > diasInactividadLimite) {
      tabla.splice(i, 1);
    }
  }

  console.log("Filas eliminadas: " + cantidad);
  return cantidad;
}

eliminarUsuariosInactivos(listaUsuarios, 90);`,
          solutionExplanation: 'En SQL esta operación equivale a: DELETE FROM usuarios WHERE inactivo_dias > 90; y la consola de PostgreSQL retorna "DELETE 2".',
          testCheck: {
            type: 'output-contains',
            expected: 'Filas eliminadas: 2',
          },
        },
      ],
      quiz: [
        {
          id: 'm4-l2-q1',
          question: '¿Qué ocurre en una base de datos SQL si ejecutas "DELETE FROM usuarios;" sin incluir la cláusula WHERE?',
          options: [
            'El sistema da un error de sintaxis y no borra nada.',
            'Borra únicamente el primer usuario registrado en la tabla.',
            'Elimina todas las filas de la tabla de usuarios sin excepción.',
            'Crea una copia de respaldo antes de borrar al usuario más antiguo.',
          ],
          correctIndex: 2,
          explanation: 'Sin una cláusula WHERE para restringir el criterio, DELETE borra cada una de las filas existentes en la tabla seleccionada.',
        },
        {
          id: 'm4-l2-q2',
          question: '¿Cómo se implementa la paginación para obtener la segunda página de 20 resultados en SQL?',
          options: [
            'PAGE 2 SIZE 20;',
            'LIMIT 20 OFFSET 20;',
            'SKIP 20 TAKE 20;',
            'SELECT FIRST 20 FROM 40;',
          ],
          correctIndex: 1,
          explanation: 'LIMIT 20 limita la cantidad de filas a traer, y OFFSET 20 se salta las primeras 20 filas (la página 1), entregando exactamente la página 2.',
        },
        {
          id: 'm4-l2-q3',
          question: '¿Por qué se desaconseja utilizar "SELECT *" en aplicaciones de producción?',
          options: [
            'Porque el asterisco solo funciona en entornos de desarrollo local.',
            'Porque transfiere datos innecesarios de columnas no utilizadas, saturando la memoria del servidor y el ancho de banda de red.',
            'Porque SQL bloquea la tabla entera cuando se usa un asterisco.',
            'Porque impide que el comando WHERE funcione correctamente.',
          ],
          correctIndex: 1,
          explanation: 'Especificar las columnas exactas (ej. SELECT id, nombre, email) ahorra consumo de memoria, optimiza el tráfico de red y permite que el motor use índices de cobertura.',
        },
      ],
      summary: {
        keyTakeaways: [
          'PostgreSQL ofrece tipado estricto (VARCHAR, INTEGER, TIMESTAMP, BOOLEAN) y restricciones (PRIMARY KEY, UNIQUE, CHECK).',
          'Las consultas SELECT permiten proyecciones de columnas, filtrado con WHERE, ordenamiento con ORDER BY y paginación con LIMIT y OFFSET.',
          'UPDATE y DELETE modifican y eliminan datos; la cláusula WHERE es imprescindible para no alterar la tabla completa por error.',
        ],
        commonPitfalls: [
          'Ejecutar sentencias de modificación masiva en producción sin haber probado previamente el filtro con un SELECT.',
          'Concatenar cadenas directamente en consultas SQL en lugar de usar variables parametrizadas ($1, $2), abriendo la puerta a inyecciones SQL.',
          'Usar OFFSET en conjuntos de datos de millones de registros para paginación profunda en lugar de paginación basada en cursor (Keyset pagination).',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 3: RELACIONES DE DATOS Y JOINS (1:1, 1:N, N:M)
    {
      id: 'm4-l3-relaciones-y-joins',
      moduleId: 4,
      slug: 'relaciones-de-datos-claves-foraneas-y-joins',
      title: 'Relaciones de Datos y Consultas Cruzadas con JOINs (1:1, 1:N, N:M)',
      order: 3,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Diseñar modelos relacionales normalizados vinculando entidades con Primary Keys y Foreign Keys, entender las relaciones 1:1, 1:Muchos y Muchos:Muchos con tablas intermedias, y combinar datos usando INNER JOIN y LEFT JOIN.',
      realWorldAnalogy: {
        title: 'El Carnet de Pasajeros y los Boletos de Avión',
        analogy: 'Imagina que una aerolínea imprimiera el nombre completo, dirección, teléfono, foto y contacto de emergencia del pasajero en cada uno de los 20 boletos de vuelo que compre al año.\n\n• Si el pasajero cambia de número telefónico, tendrías que buscar y editar los 20 boletos. Si olvidas uno, los datos quedan desincronizados y contradictorios.\n• En su lugar, el boleto solo imprime: `pasajero_id: 104`. Todos los detalles del pasajero viven en una sola fila de la tabla `pasajeros`.\n\nCuando el personal del aeropuerto escanea el boleto para abordar, el sistema hace un **JOIN**: junta en la pantalla el boleto con la ficha del pasajero 104. Esto se llama **Normalización** y ahorra millones en almacenamiento y previene inconsistencias.',
        whyItMatters: 'Comprender cómo se relacionan los datos y cómo cruzarlos eficientemente con JOINs es lo que separa a un novato que hace 50 consultas lentas en bucle de un desarrollador senior que resuelve todo en una sola consulta optimizada.',
        iconName: 'Network',
      },
      explanation: {
        sections: [
          {
            heading: 'Los Tres Tipos de Relaciones en el Mundo Real',
            content: '1. **Uno a Uno (1:1):** Cada usuario tiene exactamente un perfil privado o un carnet de conducir.\n\n2. **Uno a Muchos (1:N):** Un autor escribe muchos artículos, pero cada artículo pertenece a un solo autor.\n```sql\nCREATE TABLE articulos (\n  id SERIAL PRIMARY KEY,\n  titulo VARCHAR(200) NOT NULL,\n  autor_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE\n);\n```\n\n3. **Muchos a Muchos (N:M):** Un estudiante se inscribe en muchos cursos, y cada curso tiene muchos estudiantes. Se resuelve creando una **Tabla Intermedia (Pivot / Junction Table)**:',
            codeSnippet: {
              language: 'javascript',
              description: 'Modelado SQL de una relación Muchos a Muchos con tabla intermedia:',
              code: `// En SQL:
// CREATE TABLE matriculas (
//   estudiante_id INTEGER REFERENCES estudiantes(id),
//   curso_id INTEGER REFERENCES cursos(id),
//   fecha_inscripcion TIMESTAMP DEFAULT NOW(),
//   PRIMARY KEY (estudiante_id, curso_id)
// );`,
            },
          },
          {
            heading: 'La Cláusula ON DELETE CASCADE',
            content: '¿Qué pasa si un usuario cierra su cuenta y se borra de la tabla `usuarios`? Sus artículos no pueden quedar con un `autor_id` apuntando a la nada.\n\n• `ON DELETE CASCADE`: Borra automáticamente los artículos que le pertenecían al usuario.\n• `ON DELETE SET NULL`: Deja los artículos, pero pone el campo `autor_id` en NULL (anónimo).\n• `ON DELETE RESTRICT`: Prohíbe borrar al usuario si todavía tiene artículos asociados.',
          },
          {
            heading: 'INNER JOIN vs LEFT JOIN: La Diferencia Visual',
            content: '• **INNER JOIN:** Trae únicamente los registros donde existe coincidencia en ambas tablas. Si un usuario no ha escrito ningún artículo, no aparece en el resultado.\n\n```sql\nSELECT usuarios.nombre, articulos.titulo\nFROM usuarios\nINNER JOIN articulos ON usuarios.id = articulos.autor_id;\n```\n\n• **LEFT JOIN:** Trae **todos** los usuarios de la tabla de la izquierda, y si alguno no tiene artículos, las columnas del artículo vendrán con `NULL`:\n\n```sql\nSELECT usuarios.nombre, articulos.titulo\nFROM usuarios\nLEFT JOIN articulos ON usuarios.id = articulos.autor_id;\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Demostración interactiva de INNER JOIN vs LEFT JOIN en JavaScript:
const usuarios = [
  { id: 1, nombre: "Andrés" },
  { id: 2, nombre: "Beatriz" },
  { id: 3, nombre: "Cristian" } // No tiene pedidos
];

const pedidos = [
  { id: 101, usuarioId: 1, total: 50 },
  { id: 102, usuarioId: 1, total: 30 },
  { id: 103, usuarioId: 2, total: 95 }
];

// 1. Simulación de INNER JOIN: solo usuarios CON pedidos
function innerJoin(users, orders) {
  const resultado = [];
  for (const u of users) {
    for (const o of orders) {
      if (u.id === o.usuarioId) {
        resultado.push({ usuario: u.nombre, pedidoId: o.id, total: o.total });
      }
    }
  }
  return resultado;
}

// 2. Simulación de LEFT JOIN: TODOS los usuarios, pedidos o null
function leftJoin(users, orders) {
  const resultado = [];
  for (const u of users) {
    const pedidosDelUsuario = orders.filter(o => o.usuarioId === u.id);
    if (pedidosDelUsuario.length > 0) {
      for (const o of pedidosDelUsuario) {
        resultado.push({ usuario: u.nombre, pedidoId: o.id, total: o.total });
      }
    } else {
      resultado.push({ usuario: u.nombre, pedidoId: null, total: null });
    }
  }
  return resultado;
}

console.log("--- RESULTADO INNER JOIN (Cristian queda fuera) ---");
console.log(innerJoin(usuarios, pedidos));

console.log("--- RESULTADO LEFT JOIN (Cristian aparece con null) ---");
console.log(leftJoin(usuarios, pedidos));`,
        explanation: 'Fíjate cómo Cristian no aparece en el INNER JOIN porque no tiene pedidos, pero sí aparece en el LEFT JOIN preservando la información del usuario.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm4-l3-ex1',
          title: 'Cruce de 1 a Muchos con Foreign Key',
          level: 'facil',
          instruction: 'Crea una función `obtenerComentariosConAutor(comentarios, usuarios)` que reciba una lista de comentarios y una lista de usuarios. Cada comentario tiene `{ id, texto, autorId }`. La función debe retornar un array donde cada elemento tenga `{ id, texto, autorNombre }`, buscando el nombre correspondiente en la tabla de usuarios. Si no encuentra el autor, debe asignar "Anónimo". Imprime el resultado.',
          starterCode: `const usuariosDB = [
  { id: 1, nombre: "Valeria" },
  { id: 2, nombre: "Gustavo" }
];

const comentariosDB = [
  { id: 10, texto: "¡Gran artículo!", autorId: 1 },
  { id: 11, texto: "Muy claro todo", autorId: 2 }
];

function obtenerComentariosConAutor(comentarios, usuarios) {
  // Realiza el cruce de autorId con usuario.id
}

const resultado = obtenerComentariosConAutor(comentariosDB, usuariosDB);
console.log("Comentarios con autor:", resultado);`,
          hints: [
            'Usa comentarios.map(...)',
            'Dentro busca const autor = usuarios.find(u => u.id === c.autorId);',
            'Retorna { id: c.id, texto: c.texto, autorNombre: autor ? autor.nombre : "Anónimo" }'
          ],
          solutionCode: `const usuariosDB = [
  { id: 1, nombre: "Valeria" },
  { id: 2, nombre: "Gustavo" }
];

const comentariosDB = [
  { id: 10, texto: "¡Gran artículo!", autorId: 1 },
  { id: 11, texto: "Muy claro todo", autorId: 2 }
];

function obtenerComentariosConAutor(comentarios, usuarios) {
  return comentarios.map(c => {
    const autor = usuarios.find(u => u.id === c.autorId);
    return {
      id: c.id,
      texto: c.texto,
      autorNombre: autor ? autor.nombre : "Anónimo"
    };
  });
}

const resultado = obtenerComentariosConAutor(comentariosDB, usuariosDB);
console.log("Comentarios con autor:", resultado);`,
          solutionExplanation: 'Este cruce representa exactamente un INNER JOIN entre comentarios y usuarios vinculado por autorId = usuarios.id.',
          testCheck: {
            type: 'output-contains',
            expected: 'Valeria',
          },
        },
        {
          id: 'm4-l3-ex2',
          title: 'Agrupación relacional (LEFT JOIN con array anidado)',
          level: 'medio',
          instruction: 'Crea una función `obtenerClientesConSusFacturas(clientes, facturas)` que retorne cada cliente con su propiedad `facturas: [...]`. Si el cliente no tiene facturas, el array debe quedar vacío `[]`. Además, calcula la propiedad `gastoTotal` sumando el monto de sus facturas (0 si no tiene). Imprime el resultado para comprobar.',
          starterCode: `const clientes = [
  { id: 1, nombre: "Tech Corp" },
  { id: 2, nombre: "Startup X" }
];

const facturas = [
  { id: 501, clienteId: 1, monto: 1200 },
  { id: 502, clienteId: 1, monto: 800 }
];

function obtenerClientesConSusFacturas(clientes, facturas) {
  // Retorna cada cliente con sus facturas y gastoTotal
}

const reporte = obtenerClientesConSusFacturas(clientes, facturas);
console.log("Reporte de clientes:", reporte);`,
          hints: [
            'Para cada cliente filtra facturas.filter(f => f.clienteId === c.id)',
            'Calcula el gasto total con facturasCliente.reduce((sum, f) => sum + f.monto, 0)'
          ],
          solutionCode: `const clientes = [
  { id: 1, nombre: "Tech Corp" },
  { id: 2, nombre: "Startup X" }
];

const facturas = [
  { id: 501, clienteId: 1, monto: 1200 },
  { id: 502, clienteId: 1, monto: 800 }
];

function obtenerClientesConSusFacturas(clientes, facturas) {
  return clientes.map(c => {
    const facturasCliente = facturas.filter(f => f.clienteId === c.id);
    const gastoTotal = facturasCliente.reduce((acc, f) => acc + f.monto, 0);
    return {
      ...c,
      facturas: facturasCliente,
      gastoTotal
    };
  });
}

const reporte = obtenerClientesConSusFacturas(clientes, facturas);
console.log("Reporte de clientes:", reporte);`,
          solutionExplanation: 'En SQL esto se logra con LEFT JOIN combinado con GROUP BY y la función agregada SUM(monto).',
          testCheck: {
            type: 'output-contains',
            expected: '2000',
          },
        },
        {
          id: 'm4-l3-ex3',
          title: 'Resolución de relación Muchos a Muchos (Reto)',
          level: 'reto',
          instruction: 'Dado el modelo de estudiantes, cursos y la tabla intermedia `matriculas`, escribe una función `obtenerCursosDeEstudiante(estudianteId, estudiantes, cursos, matriculas)` que retorne un array con los nombres de todos los cursos en los que está matriculado dicho estudiante. Si el estudiante no tiene cursos o no existe, retorna un array vacío `[]`. Prueba con el estudianteId 1.',
          starterCode: `const estudiantes = [
  { id: 1, nombre: "Santiago" },
  { id: 2, nombre: "Mariana" }
];

const cursos = [
  { id: 10, titulo: "JavaScript Moderno" },
  { id: 20, titulo: "PostgreSQL Avanzado" },
  { id: 30, titulo: "Docker & Kubernetes" }
];

const matriculas = [
  { estudianteId: 1, cursoId: 10 },
  { estudianteId: 1, cursoId: 20 },
  { estudianteId: 2, cursoId: 30 }
];

function obtenerCursosDeEstudiante(estudianteId, estudiantes, cursos, matriculas) {
  // Cruza matriculas con cursos para obtener los títulos
}

const cursosSantiago = obtenerCursosDeEstudiante(1, estudiantes, cursos, matriculas);
console.log("Cursos inscritos:", cursosSantiago);`,
          hints: [
            'Filtra matriculas: matriculas.filter(m => m.estudianteId === estudianteId)',
            'Mapea cada matrícula buscando el curso: cursos.find(c => c.id === m.cursoId)?.titulo'
          ],
          solutionCode: `const estudiantes = [
  { id: 1, nombre: "Santiago" },
  { id: 2, nombre: "Mariana" }
];

const cursos = [
  { id: 10, titulo: "JavaScript Moderno" },
  { id: 20, titulo: "PostgreSQL Avanzado" },
  { id: 30, titulo: "Docker & Kubernetes" }
];

const matriculas = [
  { estudianteId: 1, cursoId: 10 },
  { estudianteId: 1, cursoId: 20 },
  { estudianteId: 2, cursoId: 30 }
];

function obtenerCursosDeEstudiante(estudianteId, estudiantes, cursos, matriculas) {
  const idsCursos = matriculas
    .filter(m => m.estudianteId === estudianteId)
    .map(m => m.cursoId);
  
  return cursos
    .filter(c => idsCursos.includes(c.id))
    .map(c => c.titulo);
}

const cursosSantiago = obtenerCursosDeEstudiante(1, estudiantes, cursos, matriculas);
console.log("Cursos inscritos:", cursosSantiago);`,
          solutionExplanation: 'En SQL esta consulta une 3 tablas en un solo comando: SELECT cursos.titulo FROM estudiantes JOIN matriculas ON estudiantes.id = matriculas.estudiante_id JOIN cursos ON matriculas.curso_id = cursos.id WHERE estudiantes.id = 1;',
          testCheck: {
            type: 'output-contains',
            expected: 'PostgreSQL Avanzado',
          },
        },
      ],
      quiz: [
        {
          id: 'm4-l3-q1',
          question: '¿Qué diferencia principal existe entre un INNER JOIN y un LEFT JOIN en SQL?',
          options: [
            'INNER JOIN solo funciona con números; LEFT JOIN solo funciona con texto.',
            'INNER JOIN retorna solo filas con coincidencias en ambas tablas; LEFT JOIN retorna todas las filas de la tabla izquierda aunque no tengan coincidencias.',
            'LEFT JOIN borra los datos que no coincidan en la tabla derecha.',
            'No hay ninguna diferencia; son dos palabras para la misma operación.',
          ],
          correctIndex: 1,
          explanation: 'LEFT JOIN conserva todas las filas de la tabla principal (izquierda) y rellena con valores NULL cuando no hay filas coincidentes en la tabla secundaria.',
        },
        {
          id: 'm4-l3-q2',
          question: '¿Cómo se modela técnicamente una relación de Muchos a Muchos (N:M) en una base de datos relacional?',
          options: [
            'Guardando una lista de IDs separados por comas dentro de una columna de texto.',
            'Creando una tabla intermedia (pivote) que almacena las claves foráneas de ambas entidades.',
            'Duplicando la tabla de usuarios tantas veces como cursos existan.',
            'Las bases de datos relacionales no soportan relaciones de muchos a muchos.',
          ],
          correctIndex: 1,
          explanation: 'Una tabla intermedia (Junction/Pivot table) descompone la relación N:M en dos relaciones 1:N limpias y normalizadas.',
        },
        {
          id: 'm4-l3-q3',
          question: '¿Qué efecto produce la regla "ON DELETE CASCADE" en una clave foránea?',
          options: [
            'Evita que el registro padre sea eliminado si tiene hijos asociados.',
            'Elimina automáticamente los registros hijos asociados cuando el registro padre es eliminado.',
            'Pone en mayúsculas los nombres de las tablas relacionadas.',
            'Envía una notificación por correo electrónico al administrador.',
          ],
          correctIndex: 1,
          explanation: 'ON DELETE CASCADE asegura que al eliminar una fila padre (ej. un usuario), todas las filas hijas vinculadas (ej. sus artículos o sesiones) se eliminen en cascada.',
        },
      ],
      summary: {
        keyTakeaways: [
          'La normalización evita redundancias y mantiene una única fuente de verdad para cada dato mediante llaves foráneas.',
          'Las relaciones 1:1 y 1:N usan llaves foráneas directas; las relaciones N:M requieren una tabla intermedia.',
          'INNER JOIN filtra solo coincidencias exactas; LEFT JOIN preserva la totalidad de filas de la tabla izquierda completando con NULL.',
        ],
        commonPitfalls: [
          'Guardar listas de IDs separadas por comas (ej. "1,4,7") en una columna VARCHAR en lugar de usar una tabla relacional adecuada.',
          'El problema del N+1: ejecutar una consulta para traer usuarios y luego hacer una consulta adicional en bucle por cada usuario en vez de un solo JOIN.',
          'Olvidar crear índices (INDEX) en las columnas de Foreign Key, ralentizando los JOINs drásticamente a medida que las tablas crecen.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 4: MONGODB Y EL MODELO DE DOCUMENTOS (BSON, CRUD Y MONGOOSE)
    {
      id: 'm4-l4-mongodb-y-documentos',
      moduleId: 4,
      slug: 'mongodb-modelo-de-documentos-bson-crud',
      title: 'MongoDB y el Modelo de Documentos: Agilidad con JSON y Mongoose',
      order: 4,
      estimatedTime: '22 min',
      difficulty: 'Intermedio',
      objective: 'Dominar la filosofía de las bases de datos NoSQL basadas en documentos con MongoDB: entender el formato BSON y el campo _id, ejecutar operaciones CRUD nativas con operadores de actualización y modelar esquemas flexibles con Mongoose en Node.js.',
      realWorldAnalogy: {
        title: 'El Pasaporte Digital con Sellos y Visas Estampadas',
        analogy: 'Piensa en tu pasaporte físico:\n\n• En el mundo SQL tendrías: una tabla para el Ciudadano, otra tabla para las Visas, otra tabla para los Sellos de Entrada, y otra para los Sellos de Salida. Para saber si puedes abordar un avión, el oficial de migración tendría que hacer un cruce de 4 tablas en distintos libros.\n• En MongoDB tienes **un solo documento completo**: al abrir tu perfil en pantalla, el documento contiene tus datos personales y una lista embebida de sellos `sellos: [{ pais: "Japón", fecha: "2024-05" }, { pais: "España", fecha: "2025-08" }]`.\n\nToda la información viaja unida de manera natural. Leer el documento toma una sola lectura de disco en milisegundos.',
        whyItMatters: 'MongoDB es el estándar NoSQL por excelencia del stack MERN (MongoDB, Express, React, Node.js). Es ideal para iterar rápido en startups, almacenar configuraciones dinámicas y manejar grandes volúmenes de documentos jerárquicos.',
        iconName: 'Layers',
      },
      explanation: {
        sections: [
          {
            heading: 'Terminología: De SQL a MongoDB',
            content: 'Si ya conoces SQL, la transición a MongoDB es directa:\n\n• Base de Datos ➔ **Base de Datos**\n• Tabla ➔ **Colección (Collection)**\n• Fila / Registro ➔ **Documento (Document BSON)**\n• Columna ➔ **Campo (Field)**\n• Primary Key (`id`) ➔ **`_id` (ObjectId)**\n• JOIN ➔ **Documento Embebido** o agregación `$lookup`\n\nEl identificador `_id` es un `ObjectId` único de 12 bytes generado automáticamente que incluye la fecha exacta de creación en sus primeros 4 bytes.',
          },
          {
            heading: 'Operaciones CRUD Nativas en MongoDB',
            content: 'En el controlador de Node.js interactuamos con las colecciones usando métodos asíncronos:\n\n```javascript\n// 1. Crear (Insert)\nawait db.collection("articulos").insertOne({\n  titulo: "Aprende NoSQL",\n  vistas: 0,\n  etiquetas: ["backend", "mongo"],\n  autor: { nombre: "Leo", rol: "Editor" } // Objeto anidado\n});\n\n// 2. Leer con filtros y operadores ($gt, $in)\nconst articulosPopulares = await db.collection("articulos").find({\n  vistas: { $gte: 1000 },\n  etiquetas: { $in: ["javascript", "backend"] }\n}).toArray();\n\n// 3. Actualizar con operadores atómicos ($set, $inc, $push)\nawait db.collection("articulos").updateOne(\n  { _id: new ObjectId("64f1a2b3c4d5") },\n  {\n    $inc: { vistas: 1 }, // Incrementa en 1 sin sobreescribir\n    $push: { etiquetas: "tutorial" } // Añade al array\n  }\n);\n```',
          },
          {
            heading: 'Modelado con Mongoose en Node.js',
            content: 'Aunque MongoDB es libre de esquemas (schemaless), en aplicaciones reales necesitamos validar que los datos no vengan vacíos o corruptos. Para eso usamos **Mongoose ODM**:\n\n```javascript\nconst mongoose = require("mongoose");\n\nconst ProductoSchema = new mongoose.Schema({\n  nombre: { type: String, required: [true, "El nombre es obligatorio"], trim: true },\n  precio: { type: Number, required: true, min: [0, "El precio no puede ser negativo"] },\n  categoria: { type: String, enum: ["electronica", "ropa", "hogar"] },\n  activo: { type: Boolean, default: true }\n}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente\n\nconst Producto = mongoose.model("Producto", ProductoSchema);\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando una colección de MongoDB con operadores $gte, $set y $push:
const coleccionPosts = [
  { _id: "post_1", titulo: "Bienvenido a Mongo", vistas: 150, tags: ["intro"], comentarios: [] },
  { _id: "post_2", titulo: "Async/Await en Node", vistas: 820, tags: ["node", "js"], comentarios: ["¡Excelente!"] },
  { _id: "post_3", titulo: "Diseño con Tailwind", vistas: 340, tags: ["css", "frontend"], comentarios: [] }
];

// Simulador de db.collection.find()
function simularFind(coleccion, filtro) {
  return coleccion.filter(doc => {
    let coincide = true;
    if (filtro.vistasMin && doc.vistas < filtro.vistasMin) coincide = false;
    if (filtro.tag && !doc.tags.includes(filtro.tag)) coincide = false;
    return coincide;
  });
}

// Simulador de db.collection.updateOne() con $inc y $push
function simularUpdateOne(coleccion, id, updateOps) {
  const doc = coleccion.find(d => d._id === id);
  if (!doc) return { modifiedCount: 0 };

  if (updateOps.$inc) {
    for (const [campo, valor] of Object.entries(updateOps.$inc)) {
      doc[campo] = (doc[campo] || 0) + valor;
    }
  }
  if (updateOps.$push) {
    for (const [campo, valor] of Object.entries(updateOps.$push)) {
      if (!Array.isArray(doc[campo])) doc[campo] = [];
      doc[campo].push(valor);
    }
  }
  return { modifiedCount: 1, docActualizado: doc };
}

console.log("1. Posts con más de 300 vistas:");
console.log(simularFind(coleccionPosts, { vistasMin: 300 }));

console.log("\\n2. Actualizando post_1 con nueva vista y comentario:");
const resultado = simularUpdateOne(coleccionPosts, "post_1", {
  $inc: { vistas: 1 },
  $push: { comentarios: "Buen artículo para empezar" }
});
console.log(resultado);`,
        explanation: 'Observa cómo los operadores $inc y $push modifican propiedades numéricas y arrays directamente sin necesidad de reemplazar todo el documento.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm4-l4-ex1',
          title: 'Simulación de consulta con operadores de comparación',
          level: 'facil',
          instruction: 'Crea una función `buscarProductosPorRango(coleccion, precioMin, precioMax)` que retorne todos los documentos cuyo `precio >= precioMin` y `precio <= precioMax`, y que además estén marcados como `disponible: true`. Prueba la función con el rango de 50 a 200 e imprime los resultados.',
          starterCode: `const catalogo = [
  { _id: "p1", nombre: "Audífonos Pro", precio: 120, disponible: true },
  { _id: "p2", nombre: "Parlante Mini", precio: 35, disponible: true },
  { _id: "p3", nombre: "Smartwatch", precio: 199, disponible: false },
  { _id: "p4", nombre: "Cámara Web", precio: 85, disponible: true }
];

function buscarProductosPorRango(coleccion, precioMin, precioMax) {
  // Retorna documentos filtrados
}

const resultado = buscarProductosPorRango(catalogo, 50, 200);
console.log("Productos encontrados:", resultado);`,
          hints: [
            'Usa coleccion.filter(...)',
            'Comprueba doc.precio >= precioMin && doc.precio <= precioMax && doc.disponible === true'
          ],
          solutionCode: `const catalogo = [
  { _id: "p1", nombre: "Audífonos Pro", precio: 120, disponible: true },
  { _id: "p2", nombre: "Parlante Mini", precio: 35, disponible: true },
  { _id: "p3", nombre: "Smartwatch", precio: 199, disponible: false },
  { _id: "p4", nombre: "Cámara Web", precio: 85, disponible: true }
];

function buscarProductosPorRango(coleccion, precioMin, precioMax) {
  return coleccion.filter(doc => 
    doc.precio >= precioMin && 
    doc.precio <= precioMax && 
    doc.disponible === true
  );
}

const resultado = buscarProductosPorRango(catalogo, 50, 200);
console.log("Productos encontrados:", resultado);`,
          solutionExplanation: 'En MongoDB nativo esto equivale a: db.productos.find({ precio: { $gte: 50, $lte: 200 }, disponible: true });',
          testCheck: {
            type: 'output-contains',
            expected: 'Audífonos Pro',
          },
        },
        {
          id: 'm4-l4-ex2',
          title: 'Simulación del operador atómico $push para comentarios',
          level: 'medio',
          instruction: 'Crea una función `agregarComentario(coleccion, postId, nuevoComentario)` que reciba una lista de posts. La función debe buscar el post por `_id`. Si lo encuentra, debe añadir al array `comentarios` un objeto con `{ autor, texto, fecha }` (donde fecha sea la fecha actual en ISO string `new Date().toISOString()`). Debe retornar el documento modificado. Si el post no existe, retorna `null`. Pruébalo agregando un comentario al post con id "art_1".',
          starterCode: `const articulos = [
  { _id: "art_1", titulo: "Guía de Mongoose", comentarios: [] },
  { _id: "art_2", titulo: "Express y Rutas", comentarios: [] }
];

function agregarComentario(coleccion, postId, nuevoComentario) {
  // Busca el artículo y añade el comentario con timestamp
}

const postActualizado = agregarComentario(articulos, "art_1", { autor: "Clara", texto: "¡Súper útil!" });
console.log("Post con comentario:", postActualizado);`,
          hints: [
            'Busca con coleccion.find(p => p._id === postId)',
            'doc.comentarios.push({ ...nuevoComentario, fecha: new Date().toISOString() })',
            'Retorna doc'
          ],
          solutionCode: `const articulos = [
  { _id: "art_1", titulo: "Guía de Mongoose", comentarios: [] },
  { _id: "art_2", titulo: "Express y Rutas", comentarios: [] }
];

function agregarComentario(coleccion, postId, nuevoComentario) {
  const post = coleccion.find(p => p._id === postId);
  if (!post) return null;
  
  post.comentarios.push({
    ...nuevoComentario,
    fecha: new Date().toISOString()
  });
  
  return post;
}

const postActualizado = agregarComentario(articulos, "art_1", { autor: "Clara", texto: "¡Súper útil!" });
console.log("Post con comentario:", postActualizado);`,
          solutionExplanation: 'En MongoDB esta operación se realiza de forma atómica en el servidor con: db.articulos.updateOne({ _id: "art_1" }, { $push: { comentarios: nuevoComentario } });',
          testCheck: {
            type: 'output-contains',
            expected: 'Clara',
          },
        },
        {
          id: 'm4-l4-ex3',
          title: 'Simulación de agregación de estadísticas (Reto)',
          level: 'reto',
          instruction: 'En MongoDB usamos el Aggregation Pipeline para calcular métricas. Crea una función `calcularMetricasPorCategoria(productos)` que procese una lista de productos y retorne un array de objetos con `{ categoria, totalProductos, precioPromedio }`. El precio promedio debe estar redondeado a 2 decimales (`Number(promedio.toFixed(2))`). Prueba la función con la lista dada.',
          starterCode: `const inventarioTienda = [
  { _id: "1", nombre: "Mouse", categoria: "Tecnología", precio: 30 },
  { _id: "2", nombre: "Teclado", categoria: "Tecnología", precio: 70 },
  { _id: "3", nombre: "Silla", categoria: "Muebles", precio: 150 },
  { _id: "4", nombre: "Escritorio", categoria: "Muebles", precio: 250 }
];

function calcularMetricasPorCategoria(productos) {
  // Agrupa por categoría y calcula totales y promedios
}

const metricas = calcularMetricasPorCategoria(inventarioTienda);
console.log("Métricas agrupadas:", metricas);`,
          hints: [
            'Usa un objeto acumulador para agrupar por producto.categoria',
            'Guarda la suma de precios y el conteo de items',
            'Mapea a un array calculando precioPromedio: Number((suma / conteo).toFixed(2))'
          ],
          solutionCode: `const inventarioTienda = [
  { _id: "1", nombre: "Mouse", categoria: "Tecnología", precio: 30 },
  { _id: "2", nombre: "Teclado", categoria: "Tecnología", precio: 70 },
  { _id: "3", nombre: "Silla", categoria: "Muebles", precio: 150 },
  { _id: "4", nombre: "Escritorio", categoria: "Muebles", precio: 250 }
];

function calcularMetricasPorCategoria(productos) {
  const grupos = {};
  
  for (const p of productos) {
    if (!grupos[p.categoria]) {
      grupos[p.categoria] = { suma: 0, conteo: 0 };
    }
    grupos[p.categoria].suma += p.precio;
    grupos[p.categoria].conteo += 1;
  }

  return Object.keys(grupos).map(categoria => ({
    categoria,
    totalProductos: grupos[categoria].conteo,
    precioPromedio: Number((grupos[categoria].suma / grupos[categoria].conteo).toFixed(2))
  }));
}

const metricas = calcularMetricasPorCategoria(inventarioTienda);
console.log("Métricas agrupadas:", metricas);`,
          solutionExplanation: 'En MongoDB esto equivale a: db.productos.aggregate([ { $group: { _id: "$categoria", totalProductos: { $sum: 1 }, precioPromedio: { $avg: "$precio" } } } ]);',
          testCheck: {
            type: 'output-contains',
            expected: '50',
          },
        },
      ],
      quiz: [
        {
          id: 'm4-l4-q1',
          question: '¿Qué es BSON en el ecosistema de MongoDB?',
          options: [
            'Un lenguaje de programación alternativo a JavaScript.',
            'Binary JSON: una representación binaria de documentos JSON que añade tipos de datos como Date y enteros de 64 bits.',
            'Un servidor web similar a Nginx.',
            'El protocolo de red para conectar bases de datos PostgreSQL.',
          ],
          correctIndex: 1,
          explanation: 'BSON (Binary JSON) permite a MongoDB codificar y decodificar datos rápidamente en disco, soportando fechas nativas, tipos numéricos precisos y ObjectIds.',
        },
        {
          id: 'm4-l4-q2',
          question: '¿Para qué sirve el operador "$inc" en una actualización de MongoDB?',
          options: [
            'Para incluir una relación foránea con otra colección.',
            'Para incrementar atómicamente el valor numérico de un campo sin necesidad de leer y reescribir todo el documento.',
            'Para incorporar un nuevo archivo comprimido en la base de datos.',
            'Para convertir un texto a minúsculas.',
          ],
          correctIndex: 1,
          explanation: '$inc realiza un incremento seguro a nivel de motor de base de datos, evitando condiciones de carrera cuando muchos usuarios actualizan el mismo contador a la vez.',
        },
        {
          id: 'm4-l4-q3',
          question: '¿Cuál es la función principal de Mongoose ODM al trabajar con MongoDB en Node.js?',
          options: [
            'Convertir MongoDB en una base de datos SQL con tablas relacionales.',
            'Aportar modelado con esquemas tipados, validaciones de campos obligatorios y middlewares de ciclo de vida.',
            'Comprimir los archivos de la computadora para que ocupen menos espacio.',
            'Evitar tener que instalar Node.js.',
          ],
          correctIndex: 1,
          explanation: 'Mongoose agrega orden y estructura al mundo flexible de MongoDB garantizando que los documentos cumplan reglas de negocio estrictas antes de ser guardados.',
        },
      ],
      summary: {
        keyTakeaways: [
          'MongoDB almacena documentos jerárquicos BSON agrupados en colecciones; cada documento tiene un _id único.',
          'Operadores atómicos como $set, $inc y $push permiten modificar documentos en disco sin sobreescribir el resto de datos.',
          'Mongoose proporciona esquemas fuertemente tipados, validaciones de entrada y hooks para Node.js.',
        ],
        commonPitfalls: [
          'Embeber arreglos que crecen indefinidamente (ej. millones de registros de logs en un solo documento), superando el límite de 16 MB por documento de MongoDB.',
          'Olvidar crear índices con collection.createIndex() en campos que se usan frecuentemente en filtros de búsqueda find().',
          'Pensar que "schemaless" significa no tener arquitectura: sin reglas claras de modelo, la base de datos se vuelve inmanejable.',
        ],
      },
      xpReward: 50,
    },

    // LECCIÓN 5: PRISMA ORM Y MIGRACIONES: TIPADO SEGURO Y PRODUCTIVIDAD
    {
      id: 'm4-l5-prisma-orm-y-migraciones',
      moduleId: 4,
      slug: 'prisma-orm-modelado-schema-migraciones-typescript',
      title: 'Prisma ORM y Migraciones: Tipado Seguro y Productividad en el Backend',
      order: 5,
      estimatedTime: '25 min',
      difficulty: 'Intermedio',
      objective: 'Integrar Prisma ORM en un entorno Node.js con TypeScript: diseñar modelos de datos en schema.prisma, versionar cambios de esquema mediante migraciones automáticas y ejecutar consultas seguras sin errores de tipado.',
      realWorldAnalogy: {
        title: 'El Copiloto Diplomático con Detector de Obstáculos',
        analogy: 'Escribir consultas SQL a mano como texto suelto dentro de tu código JavaScript (`db.query("SELECT nombree FROM usuaarios WHERE...")`) es como conducir en una autopista de noche sin luces:\n\n• Un error de ortografía en una sola letra ("nombree" o "usuaarios") pasa completamente desapercibido hasta que un usuario real entra a tu app en producción y la pantalla se pone en blanco con un error 500.\n• **Prisma ORM** es tu copiloto inteligente: lee tu base de datos y genera automáticamente tipos de TypeScript. En el momento en que comienzas a escribir `prisma.user.find`, tu editor autocompleta las opciones, te sugiere los campos exactos y te marca una línea roja de advertencia antes de que siquiera guardes el archivo si cometiste una equivocación.',
        whyItMatters: 'Prisma es el ORM moderno predilecto en la industria (usado masivamente con Next.js, Express y NestJS). Te ahorra cientos de horas de depuración de errores tipográficos en SQL y sincroniza automáticamente las bases de datos de todo tu equipo de trabajo.',
        iconName: 'ShieldCheck',
      },
      explanation: {
        sections: [
          {
            heading: '¿Qué es un ORM y cómo funciona Prisma?',
            content: 'Un **ORM (Object-Relational Mapping)** es un traductor que mapea las tablas relacionales de la base de datos a objetos y tipos en tu lenguaje de programación.\n\nPrisma se compone de 3 herramientas integradas:\n1. **Prisma Schema (`schema.prisma`):** El archivo declarativo donde defines la conexión y los modelos de datos.\n2. **Prisma Migrate:** El motor que traduce tus modelos a comandos SQL (`CREATE TABLE`, `ALTER TABLE`) y guarda un historial de cambios versionado.\n3. **Prisma Client:** Un cliente de consultas autogenerado y 100% tipado para TypeScript y JavaScript.',
          },
          {
            heading: 'Anatomía del Archivo `schema.prisma`',
            content: 'Aquí declaras tus tablas y sus relaciones de forma limpia y legible:\n\n```prisma\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String?\n  role      Role     @default(USER)\n  posts     Post[]   // Relación 1 a Muchos con el modelo Post\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String?\n  published Boolean  @default(false)\n  authorId  Int\n  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n```',
          },
          {
            heading: 'Migraciones: El Git de tu Base de Datos',
            content: 'Cuando modificas `schema.prisma`, ejecutas en la terminal:\n```bash\nnpx prisma migrate dev --name agregar_posts_y_roles\n```\nPrisma genera automáticamente un archivo `.sql` dentro de `prisma/migrations/` con los cambios exactos y los aplica a tu base de datos PostgreSQL. Todo tu equipo de desarrollo solo tiene que hacer `git pull` y `prisma migrate dev` para tener la misma estructura exacta.',
          },
          {
            heading: 'Consultas Tipadas con Prisma Client: Cero Faltas de Ortografía',
            content: 'En tus controladores de Express, usas `prisma` de forma intuitiva y sin escribir SQL plano:\n\n```typescript\nimport { PrismaClient } from "@prisma/client";\nconst prisma = new PrismaClient();\n\n// 1. Crear un usuario con un post anidado en una sola transacción\nconst nuevoUsuario = await prisma.user.create({\n  data: {\n    email: "carla@empresa.com",\n    name: "Carla",\n    posts: {\n      create: [\n        { title: "Mi primer post con Prisma", published: true }\n      ]\n    }\n  },\n  include: { posts: true } // ¡Trae los posts creados en la misma respuesta!\n});\n\n// 2. Buscar con filtros y ordenamiento\nconst usuariosActivos = await prisma.user.findMany({\n  where: { role: "ADMIN" },\n  orderBy: { createdAt: "desc" },\n  select: { id: true, name: true, email: true } // Proyección selectiva\n});\n```',
          },
        ],
      },
      interactivePlayground: {
        language: 'javascript',
        initialCode: `// Simulando el funcionamiento del cliente de Prisma con validación de tipos y relaciones:
class SimuladorPrismaClient {
  constructor() {
    this.usuarios = [
      { id: 1, email: "ana@dev.com", name: "Ana", role: "USER" },
      { id: 2, email: "carlos@dev.com", name: "Carlos", role: "ADMIN" }
    ];
    this.posts = [
      { id: 101, title: "Aprende Prisma ORM", authorId: 1 },
      { id: 102, title: "Guía de PostgreSQL", authorId: 1 }
    ];
  }

  // Simulación de prisma.user.findUnique({ where: { id }, include: { posts: true } })
  async findUniqueUser({ where, include }) {
    console.log(\`🔍 Ejecutando prisma.user.findUnique por: \${JSON.stringify(where)}\`);
    const usuario = this.usuarios.find(u => {
      if (where.id) return u.id === where.id;
      if (where.email) return u.email === where.email;
      return false;
    });

    if (!usuario) return null;
    const resultado = { ...usuario };

    // Si se solicita include: { posts: true }
    if (include && include.posts) {
      resultado.posts = this.posts.filter(p => p.authorId === usuario.id);
    }
    return resultado;
  }

  // Simulación de prisma.post.create({ data: { title, authorId } })
  async createPost({ data }) {
    if (!data.title || !data.authorId) {
      throw new Error("Validation Error: title y authorId son campos obligatorios.");
    }
    const nuevoPost = { id: this.posts.length + 101, ...data };
    this.posts.push(nuevoPost);
    console.log("✅ Post creado exitosamente:", nuevoPost);
    return nuevoPost;
  }
}

const prisma = new SimuladorPrismaClient();

// Probando consulta con inclusión de relación:
async function ejecutarDemostracion() {
  const usuarioConPosts = await prisma.findUniqueUser({
    where: { id: 1 },
    include: { posts: true }
  });
  console.log("Usuario obtenido con sus posts:", usuarioConPosts);
}

ejecutarDemostracion();`,
        explanation: 'Observa cómo Prisma abstrae los JOINs de SQL convirtiéndolos en un simple parámetro { include: { posts: true } } completamente legible.',
        mode: 'code',
      },
      exercises: [
        {
          id: 'm4-l5-ex1',
          title: 'Definición de modelo en schema.prisma',
          level: 'facil',
          instruction: 'Crea una función `generarDefinicionModeloPrisma(nombreModelo, campos)` que reciba el nombre del modelo y un array de objetos `{ nombre, tipo, modificadores }`. Debe retornar la cadena formateada del modelo de Prisma. Prueba generando un modelo "Categoria" con los campos dados e imprime el resultado.',
          starterCode: `function generarDefinicionModeloPrisma(nombreModelo, campos) {
  // Construye la cadena con la sintaxis model Nombre { ... }
}

const camposCategoria = [
  { nombre: "id", tipo: "Int", modificadores: "@id @default(autoincrement())" },
  { nombre: "nombre", tipo: "String", modificadores: "@unique" },
  { nombre: "activa", tipo: "Boolean", modificadores: "@default(true)" }
];

const schemaStr = generarDefinicionModeloPrisma("Categoria", camposCategoria);
console.log(schemaStr);`,
          hints: [
            'Usa template literals: \`model \${nombreModelo} {\\n\`',
            'Para cada campo añade: \`  \${c.nombre} \${c.tipo} \${c.modificadores}\\n\`',
            'Cierra con \`}\`'
          ],
          solutionCode: `function generarDefinicionModeloPrisma(nombreModelo, campos) {
  let resultado = \`model \${nombreModelo} {\\n\`;
  for (const c of campos) {
    resultado += \`  \${c.nombre} \${c.tipo} \${c.modificadores}\\n\`;
  }
  resultado += \`}\`;
  return resultado;
}

const camposCategoria = [
  { nombre: "id", tipo: "Int", modificadores: "@id @default(autoincrement())" },
  { nombre: "nombre", tipo: "String", modificadores: "@unique" },
  { nombre: "activa", tipo: "Boolean", modificadores: "@default(true)" }
];

const schemaStr = generarDefinicionModeloPrisma("Categoria", camposCategoria);
console.log(schemaStr);`,
          solutionExplanation: 'Los modelos en schema.prisma son concisos, limpios y son la fuente única de verdad para generar las tablas y los tipos de TypeScript.',
          testCheck: {
            type: 'output-contains',
            expected: 'model Categoria',
          },
        },
        {
          id: 'm4-l5-ex2',
          title: 'Simulación de prisma.user.create con validación de unicidad',
          level: 'medio',
          instruction: 'Crea una función `crearUsuarioPrisma(db, datos)` que reciba una base de datos simulada `{ usuarios: [...] }` y `{ email, name }`. La función debe comprobar si ya existe un usuario con ese email (simulando la restricción `@unique` de Prisma). Si existe, debe lanzar o imprimir "Error: El email ya está en uso". Si no existe, debe crear el usuario asignándole un id autoincremental y añadirlo a `db.usuarios`. Retorna el usuario creado. Pruébalo creando un nuevo usuario.',
          starterCode: `const baseDatos = {
  usuarios: [
    { id: 1, email: "admin@empresa.com", name: "Administrador" }
  ]
};

function crearUsuarioPrisma(db, datos) {
  // Valida unicidad de email e inserta nuevo usuario
}

const nuevo = crearUsuarioPrisma(baseDatos, { email: "dev@empresa.com", name: "Desarrollador" });
console.log("Usuario registrado:", nuevo);`,
          hints: [
            'Verifica db.usuarios.some(u => u.email === datos.email)',
            'Calcula nuevo ID: db.usuarios.length + 1',
            'Añade el nuevo usuario con db.usuarios.push(...) y retórnalo'
          ],
          solutionCode: `const baseDatos = {
  usuarios: [
    { id: 1, email: "admin@empresa.com", name: "Administrador" }
  ]
};

function crearUsuarioPrisma(db, datos) {
  const existe = db.usuarios.some(u => u.email === datos.email);
  if (existe) {
    console.log("Error: El email ya está en uso");
    return null;
  }

  const id = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
  const usuario = { id, ...datos };
  db.usuarios.push(usuario);
  return usuario;
}

const nuevo = crearUsuarioPrisma(baseDatos, { email: "dev@empresa.com", name: "Desarrollador" });
console.log("Usuario registrado:", nuevo);`,
          solutionExplanation: 'Cuando intentas registrar un valor duplicado en un campo @unique, Prisma arroja el código de error P2002 (Unique constraint failed).',
          testCheck: {
            type: 'output-contains',
            expected: 'dev@empresa.com',
          },
        },
        {
          id: 'm4-l5-ex3',
          title: 'Consulta anidada con select selectivo y relaciones (Reto)',
          level: 'reto',
          instruction: 'Implementa una función `consultarArticulosConAutor(articulos, usuarios, categoriaFiltro)` que simule una consulta de Prisma con `where` y `include`: debe filtrar los artículos por `categoriaFiltro` y para cada artículo incluir un objeto `autor: { id, name }` (omitiendo la contraseña o email privado del autor). Si el autor no existe, `autor` debe ser `null`. Prueba filtrando por la categoría "Tech".',
          starterCode: `const usuariosDB = [
  { id: 10, name: "Patricia", email: "patricia@mail.com", hashPassword: "secret123_hash" },
  { id: 20, name: "Lucas", email: "lucas@mail.com", hashPassword: "secret456_hash" }
];

const articulosDB = [
  { id: 1, title: "Novedades de TypeScript", categoria: "Tech", authorId: 10 },
  { id: 2, title: "Recetas Rápidas", categoria: "Cocina", authorId: 20 },
  { id: 3, title: "Arquitectura Hexagonal", categoria: "Tech", authorId: 10 }
];

function consultarArticulosConAutor(articulos, usuarios, categoriaFiltro) {
  // Filtra por categoría y añade el autor con proyección segura { id, name }
}

const resultado = consultarArticulosConAutor(articulosDB, usuariosDB, "Tech");
console.log("Artículos Tech:", JSON.stringify(resultado));`,
          hints: [
            'Filtra articulos: articulos.filter(a => a.categoria === categoriaFiltro)',
            'Mapea cada artículo buscando el autor: usuarios.find(u => u.id === a.authorId)',
            'Asigna autor: u ? { id: u.id, name: u.name } : null'
          ],
          solutionCode: `const usuariosDB = [
  { id: 10, name: "Patricia", email: "patricia@mail.com", hashPassword: "secret123_hash" },
  { id: 20, name: "Lucas", email: "lucas@mail.com", hashPassword: "secret456_hash" }
];

const articulosDB = [
  { id: 1, title: "Novedades de TypeScript", categoria: "Tech", authorId: 10 },
  { id: 2, title: "Recetas Rápidas", categoria: "Cocina", authorId: 20 },
  { id: 3, title: "Arquitectura Hexagonal", categoria: "Tech", authorId: 10 }
];

function consultarArticulosConAutor(articulos, usuarios, categoriaFiltro) {
  return articulos
    .filter(a => a.categoria === categoriaFiltro)
    .map(a => {
      const u = usuarios.find(usr => usr.id === a.authorId);
      return {
        id: a.id,
        title: a.title,
        categoria: a.categoria,
        author: u ? { id: u.id, name: u.name } : null
      };
    });
}

const resultado = consultarArticulosConAutor(articulosDB, usuariosDB, "Tech");
console.log("Artículos Tech:", JSON.stringify(resultado));`,
          solutionExplanation: 'En Prisma esto se logra con: prisma.post.findMany({ where: { categoria: "Tech" }, include: { author: { select: { id: true, name: true } } } });',
          testCheck: {
            type: 'output-contains',
            expected: 'Patricia',
          },
        },
      ],
      quiz: [
        {
          id: 'm4-l5-q1',
          question: '¿Qué es una migración en Prisma (`prisma migrate dev`)?',
          options: [
            'Un script que traslada los archivos de la app de una computadora a otra.',
            'Un historial de cambios versionado en archivos SQL que aplica las modificaciones de tu esquema a la base de datos de forma controlada.',
            'Una función que convierte código TypeScript a Python.',
            'Un comando para eliminar la base de datos entera cada vez que se reinicia el servidor.',
          ],
          correctIndex: 1,
          explanation: 'Las migraciones son el historial de cambios tipo Git para tu base de datos: registran cada cambio de columna o tabla para que todo el equipo esté sincronizado.',
        },
        {
          id: 'm4-l5-q2',
          question: '¿Cuál es la principal ventaja de Prisma Client al usarse con TypeScript?',
          options: [
            'Convierte automáticamente la base de datos a formato Excel.',
            'Genera tipos de TypeScript estrictos para cada modelo, previniendo errores de tipeo y autocompletando consultas.',
            'Elimina la necesidad de tener contraseñas en la base de datos.',
            'Solo funciona con bases de datos en memoria RAM.',
          ],
          correctIndex: 1,
          explanation: 'Prisma Client lee tu schema.prisma y genera tipos exactos de TypeScript para que el editor te alerte inmediatamente si escribes mal el nombre de una columna.',
        },
        {
          id: 'm4-l5-q3',
          question: '¿Qué comando de Prisma se debe ejecutar para regenerar el cliente de TypeScript tras modificar `schema.prisma`?',
          options: [
            'npx prisma generate',
            'npm start prisma',
            'git commit prisma',
            'node prisma.js',
          ],
          correctIndex: 0,
          explanation: 'npx prisma generate lee el archivo schema.prisma actualizado y genera los nuevos tipos y métodos dentro de node_modules/@prisma/client.',
        },
      ],
      summary: {
        keyTakeaways: [
          'Prisma ORM une la seguridad del tipado estricto de TypeScript con consultas intuitivas a bases de datos relacionales.',
          'El archivo schema.prisma es la fuente única de verdad para la estructura de datos, atributos (@id, @unique) y relaciones.',
          'Prisma Migrate registra cambios en archivos .sql versionados y Prisma Client proporciona autocompletado y validación en tiempo de compilación.',
        ],
        commonPitfalls: [
          'Modificar tablas manualmente en pgAdmin o la consola sin correr migraciones de Prisma, causando desincronización de esquema.',
          'Olvidar ejecutar "npx prisma generate" tras añadir un campo en schema.prisma, provocando que TypeScript no reconozca la nueva propiedad.',
          'Incluir relaciones anidadas masivas con "include: { ... }" en consultas de alto tráfico, provocando sobrecarga de memoria.',
        ],
      },
      xpReward: 50,
    },
  ],
};
