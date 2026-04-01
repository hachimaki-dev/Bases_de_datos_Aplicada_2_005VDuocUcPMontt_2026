// js/join-data.js
// 8 Micro-Misiones Incrementales para aprender JOIN
// Basadas en la BD de streaming: usuarios, contenidos, visualizaciones

// ─── Datos de referencia visibles para el alumno ───
const DB_TABLES = {
  usuarios: {
    icon: '👤', color: 'blue',
    cols: ['id_usuario', 'nombre', 'pais', 'fecha_registro'],
    rows: [
      [1, 'ana torres', 'Chile', '2023-01-10'],
      [2, 'LUIS ROJAS', 'Chile', '2023-03-22'],
      [3, 'mika tanaka', 'Japón', '2022-11-05'],
      [4, 'john smith', 'USA', '2023-06-30']
    ]
  },
  contenidos: {
    icon: '🎬', color: 'purple',
    cols: ['id_contenido', 'titulo', 'genero', 'duracion_min', 'rating'],
    rows: [
      [1, 'Attack on Titan', 'Anime', 24, 9.5],
      [2, 'Breaking Bad', 'Drama', 47, 9.7],
      [3, 'Demon Slayer', 'Anime', 23, 8.9],
      [4, 'Stranger Things', 'Sci-Fi', 50, 8.8],
      [5, 'One Piece', 'Anime', 22, 9.0]
    ]
  },
  visualizaciones: {
    icon: '👁️', color: 'emerald',
    cols: ['id_visualizacion', 'id_usuario', 'id_contenido', 'fecha', 'progreso'],
    rows: [
      [1, 1, 1, '2024-01-01', 100],
      [2, 1, 3, '2024-01-02', 50],
      [3, 2, 2, '2024-01-03', 100],
      [4, 3, 1, '2024-01-04', 80],
      [5, 4, 4, '2024-01-05', 100],
      [6, 2, 5, '2024-01-06', 30],
      [7, 3, 3, '2024-01-07', 100]
    ]
  }
};

const CHALLENGES = [
  // ──────────────────────────────────────────────
  // MISIÓN 1: Conoce tus Islas
  // ──────────────────────────────────────────────
  {
    id: 1, title: 'Conoce tus Islas', emoji: '🏝️', skill: 'Explorar las tablas',
    description: 'Antes de cruzar información, necesitas saber qué hay en cada isla de datos.',
    type: 'select-island',
    hints: [
      'Cada tabla guarda un tipo de información diferente.',
      'Los nombres de los usuarios están en la tabla "usuarios", no en "visualizaciones".',
      'Piensa: ¿Qué tipo de "cosa" describe cada tabla?'
    ],
    exercises: [
      {
        prompt: '¿En qué tabla encuentras el NOMBRE de un usuario?',
        correctIsland: 'usuarios',
        explanation: '¡Correcto! La tabla "usuarios" guarda los datos personales: nombre, país y fecha de registro.'
      },
      {
        prompt: '¿En qué tabla puedes ver el GÉNERO de una película o serie?',
        correctIsland: 'contenidos',
        explanation: '¡Exacto! La tabla "contenidos" tiene toda la info de las películas: título, género, duración y rating.'
      },
      {
        prompt: '¿En qué tabla está registrado el PROGRESO de visualización de un usuario?',
        correctIsland: 'visualizaciones',
        explanation: '¡Bien! La tabla "visualizaciones" registra quién vio qué y cuánto avanzó (progreso).'
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 2: El Correo Imposible
  // ──────────────────────────────────────────────
  {
    id: 2, title: 'El Correo Imposible', emoji: '📧', skill: 'Conflicto cognitivo',
    description: 'Tu gerente te pide algo que no puedes responder con una sola tabla.',
    type: 'manual-join',
    hints: [
      'Busca en "visualizaciones" quién vio id_contenido = 1...',
      'Ahora busca ese id_usuario en la tabla "usuarios". ¿Ves lo tedioso que es?',
      'Imagina hacer esto con 10.000 registros...'
    ],
    exercises: [
      {
        prompt: '🔴 CORREO DEL GERENTE: "¿Quién vio Attack on Titan?" — Busca en las tablas. Attack on Titan tiene id_contenido = 1. ¿Qué NOMBRES de usuarios lo vieron?',
        // El alumno debe buscar manualmente: visualizaciones donde id_contenido=1 → id_usuario 1 y 3 → usuarios → ana torres y mika tanaka
        steps: [
          { instruction: 'Paso 1: Busca en la tabla "visualizaciones" las filas donde id_contenido = 1. ¿Qué id_usuario aparecen?', answer: '1 y 3', acceptAlso: ['1, 3', '1,3', '1 , 3'] },
          { instruction: 'Paso 2: Ahora busca esos IDs en la tabla "usuarios". ¿Cómo se llaman?', answer: 'ana torres y mika tanaka', acceptAlso: ['ana torres, mika tanaka', 'ana torres,mika tanaka', 'mika tanaka y ana torres', 'mika tanaka, ana torres'] }
        ],
        revelation: '¡Acabas de hacer un JOIN con los ojos y las manos! Fuiste tú quien cruzó las tablas mentalmente. SQL puede hacer esto automáticamente con una sola línea de código. Para eso existe el JOIN.'
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 3: Las Llaves Mágicas
  // ──────────────────────────────────────────────
  {
    id: 3, title: 'Las Llaves Mágicas', emoji: '🔑', skill: 'Foreign Keys',
    description: 'Descubre las columnas que funcionan como puentes entre las islas.',
    type: 'connect-keys',
    hints: [
      'Busca columnas que se llamen parecido en ambas tablas.',
      'id_usuario aparece en "usuarios" Y en "visualizaciones". ¡Es el puente!',
      'id_contenido aparece en "contenidos" Y en "visualizaciones". ¡Otro puente!'
    ],
    exercises: [
      {
        prompt: 'Conecta: ¿Qué columna de "visualizaciones" actúa como puente hacia la tabla "usuarios"?',
        sourceTable: 'visualizaciones',
        targetTable: 'usuarios',
        correctSource: 'id_usuario',
        correctTarget: 'id_usuario',
        errorMsg: '¡Cuidado! Si conectas columnas que no corresponden, SQL emparejará datos sin sentido. Imagina que "ana torres" se vuelve una película de 24 minutos...'
      },
      {
        prompt: 'Conecta: ¿Qué columna de "visualizaciones" actúa como puente hacia la tabla "contenidos"?',
        sourceTable: 'visualizaciones',
        targetTable: 'contenidos',
        correctSource: 'id_contenido',
        correctTarget: 'id_contenido',
        errorMsg: '¡Esa conexión no tiene sentido! Estarías mezclando IDs de tipo distinto. Busca columnas que representen la misma "cosa".'
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 4: Tu Primer Puente
  // ──────────────────────────────────────────────
  {
    id: 4, title: 'Tu Primer Puente', emoji: '🌉', skill: 'Sintaxis JOIN + ON',
    description: 'Traduce a código SQL la conexión manual que hiciste en la Misión 2.',
    type: 'fillgaps',
    hints: [
      'La palabra mágica para cruzar tablas es INNER JOIN.',
      'La regla de cruce se escribe con la palabra ON.',
      'Recuerda: FROM tabla1 INNER JOIN tabla2 ON tabla1.columna = tabla2.columna'
    ],
    exercises: [
      {
        prompt: 'Completa la query para unir "usuarios" con "visualizaciones" usando su columna puente.',
        template: 'SELECT u.nombre, v.progreso FROM usuarios u ___ visualizaciones v ___ u.id_usuario = v.id_usuario;',
        gaps: [
          { id: 'g1', answer: 'INNER JOIN', acceptAlso: ['inner join', 'JOIN', 'join'] },
          { id: 'g2', answer: 'ON', acceptAlso: ['on'] }
        ]
      },
      {
        prompt: 'Ahora completa la query para unir "contenidos" con "visualizaciones".',
        template: 'SELECT c.titulo, v.fecha FROM ___ c INNER JOIN ___ v ON c.id_contenido = v.id_contenido;',
        gaps: [
          { id: 'g1', answer: 'contenidos', acceptAlso: ['CONTENIDOS'] },
          { id: 'g2', answer: 'visualizaciones', acceptAlso: ['VISUALIZACIONES'] }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 5: Responde al Gerente
  // ──────────────────────────────────────────────
  {
    id: 5, title: 'Responde al Gerente', emoji: '📊', skill: 'Práctica guiada',
    description: 'Usa INNER JOIN para resolver preguntas reales sobre la BD de streaming.',
    type: 'tracetable',
    hints: [
      'Primero mira las tablas y encuentra las coincidencias de id_usuario.',
      'Solo las filas donde progreso = 100 sobreviven al WHERE.',
      'Cruza mentalmente: id_usuario de visualizaciones → nombre en usuarios.'
    ],
    exercises: [
      {
        prompt: 'El gerente pregunta: "¿Qué usuarios completaron (progreso=100) un contenido?" Predice el resultado de esta query:',
        code: 'SELECT u.nombre, v.progreso\nFROM usuarios u\nINNER JOIN visualizaciones v\n  ON u.id_usuario = v.id_usuario\nWHERE v.progreso = 100;',
        vars: ['u.nombre', 'v.progreso'],
        table: [
          { row: 1, values: ['ana torres', 100] },
          { row: 2, values: ['LUIS ROJAS', 100] },
          { row: 3, values: ['john smith', 100] },
          { row: 4, values: ['mika tanaka', 100] }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 6: El Triple Salto (3 tablas)
  // ──────────────────────────────────────────────
  {
    id: 6, title: 'El Triple Salto', emoji: '🚀', skill: 'JOIN de 3 tablas',
    description: 'Encadena dos JOINs para responder la gran pregunta: ¿Qué usuario vio qué película?',
    type: 'reorder',
    hints: [
      'Piensa en cadena: usuarios ← unión → visualizaciones ← unión → contenidos.',
      'El primer JOIN conecta usuarios con visualizaciones por id_usuario.',
      'El segundo JOIN conecta visualizaciones con contenidos por id_contenido.',
      'Orden: SELECT → FROM → INNER JOIN → ON → INNER JOIN → ON'
    ],
    exercises: [
      {
        prompt: 'Ordena esta query de 3 tablas para saber QUÉ USUARIO vio QUÉ TÍTULO.',
        correct: [
          'SELECT u.nombre, c.titulo',
          'FROM usuarios u',
          'INNER JOIN visualizaciones v ON u.id_usuario = v.id_usuario',
          'INNER JOIN contenidos c ON v.id_contenido = c.id_contenido;'
        ],
        shuffled: [
          'INNER JOIN contenidos c ON v.id_contenido = c.id_contenido;',
          'FROM usuarios u',
          'INNER JOIN visualizaciones v ON u.id_usuario = v.id_usuario',
          'SELECT u.nombre, c.titulo'
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 7: El Fantasma NULL (LEFT JOIN)
  // ──────────────────────────────────────────────
  {
    id: 7, title: 'El Fantasma NULL', emoji: '👻', skill: 'LEFT JOIN',
    description: 'Descubre qué pasa con los usuarios que no han visto nada.',
    type: 'toggle-join',
    hints: [
      'INNER JOIN es estricto: si no hay pareja, la fila desaparece.',
      'LEFT JOIN protege la tabla izquierda: SIEMPRE aparece.',
      'Cuando no hay pareja a la derecha, SQL rellena con NULL.'
    ],
    exercises: [
      {
        prompt: 'Imagina que agregamos a una nueva usuaria: Camila Vega (id 5, Argentina). Camila NO ha visto nada aún. Cambia entre INNER y LEFT JOIN para ver qué le pasa.',
        baseUsers: [
          { id: 1, nombre: 'ana torres', pais: 'Chile' },
          { id: 2, nombre: 'LUIS ROJAS', pais: 'Chile' },
          { id: 5, nombre: 'camila vega', pais: 'Argentina' }
        ],
        viewings: [
          { id_usuario: 1, titulo: 'Attack on Titan' },
          { id_usuario: 2, titulo: 'Breaking Bad' }
        ],
        question: 'Después de probar ambos, responde: ¿Con cuál tipo de JOIN aparece Camila en el resultado?',
        options: [
          'Solo con INNER JOIN',
          'Solo con LEFT JOIN',
          'Con ambos tipos de JOIN',
          'Con ninguno, siempre da error'
        ],
        answer: 'Solo con LEFT JOIN'
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MISIÓN 8: Misión Final
  // ──────────────────────────────────────────────
  {
    id: 8, title: 'Misión Final', emoji: '🏆', skill: 'Escritura libre',
    description: 'Escribe una query completa sin ayuda. ¡Demuestra lo que aprendiste!',
    type: 'writecode',
    hints: [
      'Necesitas 3 tablas: usuarios, visualizaciones y contenidos.',
      'Usa dos INNER JOIN encadenados con sus respectivos ON.',
      'Filtra con WHERE: pais = \'Chile\' AND progreso = 100.',
      'Estructura: SELECT ... FROM usuarios u JOIN visualizaciones v ON ... JOIN contenidos c ON ... WHERE ...'
    ],
    exercises: [
      {
        prompt: '🔴 CORREO FINAL DEL GERENTE: "Necesito el nombre del usuario y el título del contenido, pero SOLO de usuarios chilenos que hayan completado el contenido (progreso = 100). ¡Es urgente!"',
        mustContain: ['select', 'from usuarios', 'join visualizaciones', 'join contenidos', 'on', 'where', 'progreso', '100', 'chile']
      }
    ]
  }
];
