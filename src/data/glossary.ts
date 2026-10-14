import { GlossaryTerm } from '../types/curriculum';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'api',
    term: 'API (Interfaz de Programación de Aplicaciones)',
    category: 'Backend / Redes',
    analogy: 'El camarero de un restaurante. Tú (cliente) no entras a la cocina a cocinar; le dices al camarero lo que quieres, él va a la cocina (servidor) y te trae el plato listo.',
    technicalDefinition: 'Conjunto de reglas, endpoints y formatos (generalmente JSON) que permite que dos programas de software se comuniquen e intercambien datos.',
    codeExample: `// Consumiendo una API con fetch:
const respuesta = await fetch("https://api.ejemplo.com/productos");
const productos = await respuesta.json();`,
    relatedLessonId: 'm1-l1-como-funciona-internet',
  },
  {
    id: 'frontend',
    term: 'Frontend',
    category: 'Arquitectura Web',
    analogy: 'El salón y decoración de una tienda: el escaparate, los maniquíes, los probadores y la música ambiental. Todo lo que el cliente ve y toca directamente.',
    technicalDefinition: 'La capa cliente de una aplicación web o móvil que se ejecuta en el navegador o dispositivo del usuario final (construida con HTML, CSS, JavaScript/React).',
    relatedLessonId: 'm1-l2-que-hace-un-programador',
  },
  {
    id: 'backend',
    term: 'Backend',
    category: 'Arquitectura Web',
    analogy: 'El motor bajo el capó de un automóvil o la bóveda de seguridad de un banco. El usuario no lo ve, pero si no funciona, nada se mueve.',
    technicalDefinition: 'La capa del servidor encargada de procesar lógica de negocio, validaciones, consultas a bases de datos, seguridad y autenticación.',
    relatedLessonId: 'm1-l2-que-hace-un-programador',
  },
  {
    id: 'git',
    term: 'Git',
    category: 'Herramientas',
    analogy: 'Una máquina del tiempo o los puntos de control (checkpoints) en un videojuego antes de enfrentarte al jefe final.',
    technicalDefinition: 'Sistema de control de versiones distribuido que rastrea los cambios en los archivos de código a lo largo del tiempo, permitiendo revertir errores y colaborar.',
    codeExample: `git init
git add .
git commit -m "Agregada barra de navegación"`,
    relatedLessonId: 'm1-l5-git-y-github',
  },
  {
    id: 'variable',
    term: 'Variable',
    category: 'Lógica / Fundamentos',
    analogy: 'Una caja de zapatos con una etiqueta pegada en el frente donde guardas un objeto. Puedes cambiar lo que hay dentro de la caja en cualquier momento.',
    technicalDefinition: 'Un espacio reservado en la memoria de la computadora con un identificador (nombre) para almacenar temporalmente un valor mutable o constante.',
    codeExample: `let edad = 24;
edad = 25; // Cambiamos el valor dentro de la caja`,
    relatedLessonId: 'm1-l3-logica-y-algoritmos',
  },
  {
    id: 'algoritmo',
    term: 'Algoritmo',
    category: 'Lógica / Fundamentos',
    analogy: 'Una receta de cocina paso a paso para preparar lasaña o las instrucciones de montaje de un mueble de Ikea.',
    technicalDefinition: 'Conjunto ordenado, finito e inequívoco de pasos e instrucciones lógicas diseñadas para resolver un problema o realizar una tarea específica.',
    relatedLessonId: 'm1-l3-logica-y-algoritmos',
  },
  {
    id: 'terminal',
    term: 'Terminal (Línea de Comandos / CLI)',
    category: 'Herramientas',
    analogy: 'Enviar mensajes de texto directos al cerebro de tu computadora en lugar de tener que hacerle señas y apuntar con el ratón.',
    technicalDefinition: 'Interfaz de usuario basada en texto donde el usuario escribe comandos que son interpretados y ejecutados directamente por el sistema operativo.',
    codeExample: `mkdir mi-nuevo-proyecto
cd mi-nuevo-proyecto`,
    relatedLessonId: 'm1-l4-la-terminal-sin-miedo',
  },
  {
    id: 'dns',
    term: 'DNS (Domain Name System)',
    category: 'Redes',
    analogy: 'La agenda de contactos de tu teléfono móvil. Tú no recuerdas los 10 dígitos numéricos de tu abuela; buscas "Abuela" y el teléfono sabe a qué número llamar.',
    technicalDefinition: 'Sistema jerárquico de servidores que traduce nombres de dominio legibles por humanos (como wikipedia.org) a direcciones IP numéricas (como 198.35.26.96).',
    relatedLessonId: 'm1-l1-como-funciona-internet',
  },
  {
    id: 'jwt',
    term: 'JWT (JSON Web Token)',
    category: 'Seguridad / Backend',
    analogy: 'El brazalete o pulsera VIP que te ponen en la entrada de un festival de música para que los guardias de seguridad sepan que ya pagaste sin volver a pedir tu DNI.',
    technicalDefinition: 'Estándar abierto (RFC 7519) que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON firmado digitalmente.',
  },
  {
    id: 'orm',
    term: 'ORM (Object-Relational Mapping)',
    category: 'Bases de Datos',
    analogy: 'Un traductor simultáneo en las Naciones Unidas: traduce el idioma de los objetos de JavaScript al idioma de tablas y filas de las bases de datos SQL.',
    technicalDefinition: 'Herramienta que permite consultar y manipular datos de una base de datos utilizando el paradigma orientado a objetos del lenguaje de programación en lugar de escribir SQL puro.',
    codeExample: `// Con Prisma ORM en JavaScript:
const usuario = await prisma.user.findUnique({
  where: { email: "ana@ejemplo.com" }
});`,
  },
];
