import { LevelTestQuestion } from '../types/curriculum';

export const LEVEL_TEST_QUESTIONS: LevelTestQuestion[] = [
  {
    id: 'test-q1',
    question: '1. ¿Qué es exactamente una dirección IP en Internet?',
    options: [
      'El modelo de la tarjeta gráfica de tu ordenador.',
      'Un número identificador único asignado a cada dispositivo conectado a la red, como una dirección postal.',
      'Una contraseña secreta para acceder a Google.',
      'Un cable que conecta tu monitor con la corriente eléctrica.',
    ],
    correctIndex: 1,
    moduleTarget: 1,
    difficultyWeight: 1,
  },
  {
    id: 'test-q2',
    question: '2. En programación, si tenemos: let x = 10; x = x + 5; ¿cuál es el valor final de x?',
    options: [
      '10',
      '5',
      '15',
      'Genera un error porque una variable no puede sumarse a sí misma.',
    ],
    correctIndex: 2,
    moduleTarget: 1,
    difficultyWeight: 1,
  },
  {
    id: 'test-q3',
    question: '3. En desarrollo web, ¿cuál es el rol principal de CSS?',
    options: [
      'Crear la estructura del documento y los textos.',
      'Dar estilo visual, colores, diseño tipográfico y disposición espacial a los elementos HTML.',
      'Guardar los datos en una base de datos en el servidor.',
      'Conectar el teclado con el navegador.',
    ],
    correctIndex: 1,
    moduleTarget: 2,
    difficultyWeight: 2,
  },
  {
    id: 'test-q4',
    question: '4. ¿Qué es una API REST y para qué se usa comúnmente?',
    options: [
      'Un programa para formatear discos duros.',
      'Una interfaz estandarizada mediante HTTP para que aplicaciones clientes envíen y reciban datos (usualmente JSON) de un servidor.',
      'Un tipo de pantalla táctil para teléfonos móviles.',
      'Un juego de ordenador antiguo.',
    ],
    correctIndex: 1,
    moduleTarget: 3,
    difficultyWeight: 2,
  },
  {
    id: 'test-q5',
    question: '5. ¿Cuál es la diferencia principal entre una base de datos SQL (como PostgreSQL) y una NoSQL (como MongoDB)?',
    options: [
      'SQL no puede almacenar texto y NoSQL solo almacena imágenes.',
      'SQL usa tablas relacionales con esquemas estrictos y NoSQL suele almacenar documentos flexibles tipo JSON o pares clave-valor.',
      'SQL solo funciona en servidores apagados.',
      'No existe ninguna diferencia técnica entre ellas.',
    ],
    correctIndex: 1,
    moduleTarget: 4,
    difficultyWeight: 3,
  },
  {
    id: 'test-q6',
    question: '6. ¿Qué problema resuelve Docker en el desarrollo y despliegue de software?',
    options: [
      'Evita tener que escribir código.',
      'Empaqueta una aplicación con todas sus dependencias en un contenedor aislado, garantizando que corra igual en tu laptop que en el servidor de producción.',
      'Aumenta el volumen de los altavoces de la computadora.',
      'Descarga películas más rápido de Internet.',
    ],
    correctIndex: 1,
    moduleTarget: 6,
    difficultyWeight: 3,
  },
];

export function calculateTestRecommendation(answers: Record<string, number>): {
  score: number;
  maxScore: number;
  percentage: number;
  recommendedModuleId: number;
  recommendationTitle: string;
  recommendationText: string;
} {
  let score = 0;
  const maxScore = LEVEL_TEST_QUESTIONS.length;

  LEVEL_TEST_QUESTIONS.forEach((q) => {
    if (answers[q.id] === q.correctIndex) {
      score += 1;
    }
  });

  const percentage = Math.round((score / maxScore) * 100);

  if (score <= 2) {
    return {
      score,
      maxScore,
      percentage,
      recommendedModuleId: 1,
      recommendationTitle: 'Nivel Principiante: ¡El mejor momento para empezar desde cero!',
      recommendationText:
        'Te recomendamos comenzar directamente por el Módulo 1 (Fundamentos). Construirás bases sólidas de Internet, lógica, la terminal y Git que te evitarán dolores de cabeza y te harán avanzar con total confianza.',
    };
  } else if (score <= 4) {
    return {
      score,
      maxScore,
      percentage,
      recommendedModuleId: 2,
      recommendationTitle: 'Nivel Intermedio: Tienes buenas bases intuitivas',
      recommendationText:
        'Ya cuentas con conceptos elementales de computación y lógica. Puedes dar un vistazo rápido al Módulo 1 para afianzar la terminal y Git, y lanzarte de lleno al Módulo 2 (Frontend Moderno con React y TypeScript).',
    };
  } else {
    return {
      score,
      maxScore,
      percentage,
      recommendedModuleId: 3,
      recommendationTitle: 'Nivel Avanzado: Conocimientos sólidos de desarrollo',
      recommendationText:
        'Demuestras un dominio claro de la arquitectura web y herramientas esenciales. Te recomendamos explorar desde el Módulo 3 (Backend y APIs) o el Módulo 5 (Desarrollo Multiplataforma con React Native y Tauri).',
    };
  }
}
