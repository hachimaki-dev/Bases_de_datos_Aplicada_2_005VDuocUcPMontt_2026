// js/taller-data.js
// Motor de datos para el Taller CyberDrone Rentals
// Quizzes, DUA translations, progress engine

const TALLER = {
  // ========== QUIZZES POR MÓDULO ==========
  quizzes: {
    strings: {
      title: 'Checkpoint: Funciones de Texto',
      items: [
        { type:'vf', statement:"SUBSTR('CyberDrone', 3, 1) devuelve 'b'", answer: true, explain:"Correcto. Posición 3 = 'b' (C=1, y=2, b=3)." },
        { type:'vf', statement:"SUBSTR('Hola', -1, 1) devuelve 'H'", answer: false, explain:"Falso. -1 cuenta desde el FINAL, así que devuelve 'a'." },
        { type:'vf', statement:"LENGTH('SQL') devuelve 4", answer: false, explain:"Falso. 'SQL' tiene 3 caracteres, devuelve 3." },
        { type:'multi', prompt:"¿Qué resultado da: SUBSTR('12345678', 3, 1) || 'AB' ?", options:["'3AB'","'34AB'","'345AB'","Error"], answer:0, explain:"SUBSTR extrae 1 carácter desde posición 3 = '3', concatenado con 'AB' = '3AB'." },
        { type:'multi', prompt:"Para obtener la ÚLTIMA letra de un apellido, ¿cuál es correcta?", options:["SUBSTR(ap, LENGTH(ap), 1)","SUBSTR(ap, 0, 1)","SUBSTR(ap, -2, 1)","LENGTH(ap, -1)"], answer:0, explain:"LENGTH(ap) te da la posición del último carácter." }
      ]
    },
    dates: {
      title: 'Checkpoint: Funciones de Fecha',
      items: [
        { type:'match', prompt:'Conecta cada función con lo que hace:', pairs: [
          { left:'MONTHS_BETWEEN(f1, f2)', right:'Meses entre dos fechas' },
          { left:'LAST_DAY(SYSDATE)', right:'Último día del mes actual' },
          { left:'EXTRACT(YEAR FROM fecha)', right:'Obtener solo el año' },
          { left:'SYSDATE', right:'Fecha y hora actual del servidor' }
        ]},
        { type:'vf', statement:"MONTHS_BETWEEN devuelve siempre un número entero", answer: false, explain:"Falso. Puede devolver decimales (ej: 25.45 meses). Por eso a veces usamos TRUNC o ROUND." },
        { type:'multi', prompt:"Para calcular años de servicio al último día del mes, ¿cuál es correcta?", options:["MONTHS_BETWEEN(LAST_DAY(SYSDATE), fecha_contrato) / 12","SYSDATE - fecha_contrato","EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM fecha_contrato)","LAST_DAY(fecha_contrato) / 365"], answer:0, explain:"Solo MONTHS_BETWEEN/12 da precisión real. Restar fechas da DÍAS, no meses. EXTRACT ignora el mes exacto." }
      ]
    },
    agrupacion: {
      title: 'Checkpoint: Agrupación y Resumen',
      items: [
        { type:'vf', statement:"Puedo usar WHERE para filtrar el resultado de un COUNT(*)", answer: false, explain:"Falso. WHERE filtra ANTES de agrupar. Para filtrar resultados de funciones de grupo se usa HAVING." },
        { type:'vf', statement:"Si uso SUM(sueldo) en el SELECT, toda columna sin función de grupo debe ir en GROUP BY", answer: true, explain:"Correcto. Es la Regla de Oro del GROUP BY." },
        { type:'multi', prompt:"¿Cuál query ejecuta SIN error?",
          options:[
            "SELECT nombre, COUNT(*) FROM emp",
            "SELECT dept, COUNT(*) FROM emp GROUP BY dept",
            "SELECT dept, COUNT(*) FROM emp HAVING COUNT(*)>2",
            "SELECT COUNT(*) FROM emp GROUP BY nombre HAVING nombre='Ana'"
          ], answer:1, explain:"Opción B es correcta: la columna 'dept' está en el GROUP BY. A falta el GROUP BY. C no tiene GROUP BY. D usa HAVING con columna sin función." },
        { type:'vf', statement:"INSERT INTO tabla SELECT ... permite insertar múltiples filas de golpe", answer: true, explain:"Correcto. Es un patrón batch para poblar tablas históricas sin usar VALUES fila por fila." }
      ]
    },
    subconsultas: {
      title: 'Checkpoint: Subconsultas',
      items: [
        { type:'fill', prompt:'Completa la subconsulta escalar:', template:'SELECT nombre FROM emp WHERE sueldo > (SELECT ___ FROM emp)', gaps:[{id:'g1',answer:'AVG(sueldo)',acceptAlso:['avg(sueldo)','AVG (sueldo)']}], explain:"AVG(sueldo) calcula el promedio, y la query externa filtra los que ganan más que eso." },
        { type:'vf', statement:"Una Inline View es una subconsulta ubicada en la cláusula FROM", answer: true, explain:"Correcto. Se trata como una 'tabla virtual temporal' a la que puedes hacerle JOIN." },
        { type:'vf', statement:"Una subconsulta escalar puede devolver múltiples filas", answer: false, explain:"Falso. Una subconsulta ESCALAR devuelve exactamente 1 fila y 1 columna. Si devuelve más, Oracle lanza error." },
        { type:'multi', prompt:"¿Dónde se ubica una Inline View?", options:["En el WHERE","En el SELECT","En el FROM","En el ORDER BY"], answer:2, explain:"La Inline View va en el FROM, encerrada en paréntesis con un alias, y se usa como si fuera una tabla real." }
      ]
    }
  },

  // ========== DUA: VOCABULARIO SIMPLIFICADO ==========
  dua: {
    translations: {
      'SUBSTR': { emoji:'✂️', simple:'Tijeras de texto: corta un pedazo de una palabra' },
      'LENGTH': { emoji:'📏', simple:'Regla: mide cuántas letras tiene una palabra' },
      'Concatenación': { emoji:'🧩', simple:'Pegar: unir dos trozos de texto como piezas de puzzle' },
      'CASE WHEN': { emoji:'🔀', simple:'Semáforo: si pasa esto → haz esto, si no → haz lo otro' },
      'JOIN': { emoji:'🔗', simple:'Cadena: conectar dos tablas usando una llave que ambas comparten' },
      'MONTHS_BETWEEN': { emoji:'📅', simple:'Calendario: cuenta los meses exactos entre dos fechas' },
      'LAST_DAY': { emoji:'📆', simple:'Fin de mes: te dice cuál es el último día (28, 30 o 31)' },
      'EXTRACT': { emoji:'🔍', simple:'Lupa: saca SOLO el año, o SOLO el mes, de una fecha completa' },
      'BETWEEN': { emoji:'↔️', simple:'Entre: verifica si un número está dentro de un rango (desde X hasta Y)' },
      'GROUP BY': { emoji:'📦', simple:'Cajones: separar los datos en montoncitos por categoría' },
      'HAVING': { emoji:'🚫📦', simple:'Filtro de cajones: descarta montoncitos que no cumplan una condición' },
      'WHERE': { emoji:'🚫', simple:'Filtro individual: descarta filas una por una ANTES de agrupar' },
      'COUNT': { emoji:'🔢', simple:'Contador: cuenta cuántos hay en cada grupo' },
      'SUM': { emoji:'➕', simple:'Sumadora: suma todos los valores numéricos del grupo' },
      'INSERT SELECT': { emoji:'📥', simple:'Copiar y pegar masivo: toma el resultado de un SELECT y lo mete en otra tabla' },
      'Subconsulta': { emoji:'🪆', simple:'Muñeca rusa: una query DENTRO de otra query' },
      'Inline View': { emoji:'👻', simple:'Tabla fantasma: una subconsulta en el FROM que actúa como tabla temporal' },
      'Escalar': { emoji:'1️⃣', simple:'Un solo dato: una subconsulta que devuelve exactamente 1 número o texto' }
    }
  },

  // ========== ERRORES SQL COMUNES ==========
  errores: [
    { code:'ORA-00937', title:'not a single-group function', causa:'Mezclaste una columna normal con COUNT/SUM sin GROUP BY.', fix:'Agrega la columna "huérfana" al GROUP BY.' },
    { code:'ORA-00979', title:'not a GROUP BY expression', causa:'Tu SELECT tiene una columna que NO está en el GROUP BY.', fix:'Agrega TODAS las columnas sin función de grupo al GROUP BY.' },
    { code:'ORA-00904', title:'invalid identifier', causa:'Escribiste mal el nombre de una columna o usaste un alias donde no se puede.', fix:'Revisa la ortografía. Recuerda: HAVING no reconoce aliases del SELECT.' },
    { code:'ORA-01722', title:'invalid number', causa:'Intentaste comparar o calcular texto con un número.', fix:'Usa TO_NUMBER() o TO_CHAR() para convertir tipos.' },
    { code:'ORA-00936', title:'missing expression', causa:'Falta algo: una coma sobrante, un paréntesis sin cerrar, o un operador faltante.', fix:'Revisa comas antes del FROM y que todos los paréntesis de funciones estén cerrados.' },
    { code:'ORA-01427', title:'single-row subquery returns more than one row', causa:'Tu subconsulta escalar devolvió varias filas pero el WHERE esperaba solo 1.', fix:'Agrega condiciones al WHERE de la subconsulta, o usa IN en vez de = .' }
  ]
};
