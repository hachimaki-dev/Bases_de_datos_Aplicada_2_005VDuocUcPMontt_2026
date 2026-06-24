// js/data.js
// Aquí radica la información de cada entrada/clase.
// Las IAs pueden limitarse a agregar un nuevo objeto en este arreglo al crear nuevo contenido,
// reduciendo la posibilidad de romper el código HTML principal de index.html a cero.

const appData = {
    entries: [
        {
            id: 'activacion-ev3',
            unit: 'EA3',
            type: 'hero',
            href: 'prepracion ev3/presentacion_html/activacion.html',
            colSpan: 2,
            date: '2026-06-25T09:30:00',
            dateText: '25 Jun 2026',
            tag: 'PASO 1: CALENTAMIENTO', tagIcon: 'fa-fire text-amber-400',
            badge: 'Dinámica Rápida',
            title: 'Activación de Conocimientos Previos',
            description: 'Mini-retos rápidos para calentar motores. Repasaremos funciones de grupo, fechas, JOINs y haremos un mini bloque PL/SQL simplificado antes de programar en serio.',
            btnText: 'Iniciar Calentamiento', btnIcon: 'fa-bolt',
            theme: {
                outerBorder: 'border-amber-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-amber-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-amber-500/20', circle2: 'bg-orange-500/20',
                tagBox: 'bg-amber-900/50 text-amber-200 border-amber-700 backdrop-blur-sm', tagText: 'text-amber-200', badgeTheme: 'bg-amber-600 text-white border-amber-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-amber-100', btn: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 w-full justify-center text-white shadow-lg border border-amber-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]'
            },
            icon: 'fa-stopwatch', iconContainer: 'bg-amber-900/40 border-amber-500/30', iconColor: 'text-amber-400'
        },
        {
            id: 'simulacro-ev3-legos',
            unit: 'EA3',
            type: 'hero',
            href: 'prepracion ev3/presentacion_html/simulacro.html',
            colSpan: 2,
            date: '2026-06-25T10:00:00',
            dateText: '25 Jun 2026',
            tag: 'SIMULACRO INTERACTIVO', tagIcon: 'fa-puzzle-piece text-cyan-300',
            badge: 'Taller Guiado',
            title: 'Metodología Lego:<br>Mantenimiento Preventivo',
            description: 'Aprende a programar PL/SQL desde cero sin frustraciones. Taller guiado paso a paso donde probamos las consultas SQL por separado antes de ensamblar el bloque final.',
            btnText: 'Iniciar Simulacro Guiado', btnIcon: 'fa-gamepad',
            theme: {
                outerBorder: 'border-cyan-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-cyan-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-cyan-500/20', circle2: 'bg-blue-500/20',
                tagBox: 'bg-cyan-900/50 text-cyan-200 border-cyan-700 backdrop-blur-sm', tagText: 'text-cyan-200', badgeTheme: 'bg-cyan-600 text-white border-cyan-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-cyan-100', btn: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 w-full justify-center text-white shadow-lg border border-cyan-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]'
            },
            icon: 'fa-cubes-stacked', iconContainer: 'bg-cyan-900/40 border-cyan-500/30', iconColor: 'text-cyan-400'
        },
        {
            id: 'presentacion-ev3-resolucion',
            unit: 'EA3',
            type: 'hero',
            href: 'prepracion ev3/presentacion_html/index.html',
            colSpan: 2,
            date: '2026-06-24T12:00:00',
            dateText: '24 Jun 2026',
            tag: 'AULA INTERACTIVA', tagIcon: 'fa-chalkboard-user text-pink-300',
            badge: 'Resolución EV3',
            title: 'Análisis y Resolución:<br>Caso Urban Wheels',
            description: 'Clase interactiva con revelación progresiva. Analiza el problema del negocio y construye la solución PL/SQL paso a paso (cursores, funciones de grupo y excepciones).',
            btnText: 'Iniciar Presentación', btnIcon: 'fa-desktop',
            theme: {
                outerBorder: 'border-pink-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-pink-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-pink-500/20', circle2: 'bg-purple-500/20',
                tagBox: 'bg-pink-900/50 text-pink-200 border-pink-700 backdrop-blur-sm', tagText: 'text-pink-200', badgeTheme: 'bg-pink-600 text-white border-pink-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-pink-100', btn: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full justify-center text-white shadow-lg border border-pink-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]'
            },
            icon: 'fa-chalkboard-user', iconContainer: 'bg-pink-900/40 border-pink-500/30', iconColor: 'text-pink-400'
        },
        {
            id: 'preparacion-ev3-c2',
            unit: 'EA3',
            type: 'hero',
            href: 'prepracion ev3/preparacion-ev3-clase2.html',
            colSpan: 2,
            date: '2026-06-17T20:00:00',
            dateText: '17 Jun 2026',
            tag: 'SIMULACRO EV3', tagIcon: 'fa-fire text-orange-300',
            badge: 'Clase 2',
            title: 'Preparación EV3:<br>Cursores y Simulacro',
            description: 'Aprende a dominar los cursores explícitos y resuelve el Desafío Clon: un simulacro completo de la Evaluación 3 sobre la base de datos Urban Wheels.',
            btnText: 'Iniciar Clase 2', btnIcon: 'fa-rocket',
            theme: {
                outerBorder: 'border-orange-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-orange-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-orange-500/20', circle2: 'bg-red-500/20',
                tagBox: 'bg-orange-900/50 text-orange-200 border-orange-700 backdrop-blur-sm', tagText: 'text-orange-200', badgeTheme: 'bg-orange-600 text-white border-orange-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-orange-100', btn: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 w-full justify-center text-white shadow-lg border border-orange-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]'
            },
            icon: 'fa-fire-flame-curved', iconContainer: 'bg-orange-900/40 border-orange-500/30', iconColor: 'text-orange-400'
        },
        {
            id: 'preparacion-ev3-c1',
            unit: 'EA3',
            type: 'hero',
            href: 'prepracion ev3/preparacion-ev3-clase1.html',
            colSpan: 2,
            date: '2026-06-17',
            dateText: '17 Jun 2026',
            tag: 'PREPARACIÓN EV3', tagIcon: 'fa-shield-halved text-emerald-300',
            badge: 'Clase 1',
            title: 'Preparación EV3:<br>Select INTO y Excepciones',
            description: 'Refuerza los cimientos del PL/SQL. Aprende a tomar decisiones con variables y descubre cómo evitar que tu código explote atrapando Excepciones (NO_DATA_FOUND, TOO_MANY_ROWS).',
            btnText: 'Iniciar Clase 1', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-emerald-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-emerald-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-emerald-500/20', circle2: 'bg-teal-500/20',
                tagBox: 'bg-emerald-900/50 text-emerald-200 border-emerald-700 backdrop-blur-sm', tagText: 'text-emerald-200', badgeTheme: 'bg-emerald-600 text-white border-emerald-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-emerald-100', btn: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 w-full justify-center text-white shadow-lg border border-emerald-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]'
            },
            icon: 'fa-building-shield', iconContainer: 'bg-emerald-900/40 border-emerald-500/30', iconColor: 'text-emerald-400'
        },
        {
            id: 'taller-plsql-sonidolatino',
            unit: 'EA3',
            type: 'hero',
            href: 'taller_plsql_sonidolatino.html',
            colSpan: 2,
            date: '2026-06-13',
            dateText: '13 Jun 2026',
            tag: 'TALLER PRÁCTICO', tagIcon: 'fa-music text-violet-300',
            badge: 'Taller M3',
            title: 'Taller PL/SQL:<br>SonidoLatino',
            description: 'Caso tipo taller con 10 requerimientos progresivos de DML con control de flujo (FOR, WHILE, IF) sobre una plataforma de streaming de música chilena y andina.',
            btnText: 'Abrir Taller SonidoLatino', btnIcon: 'fa-laptop-code',
            theme: {
                outerBorder: 'border-violet-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-violet-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-violet-500/20', circle2: 'bg-fuchsia-500/20',
                tagBox: 'bg-violet-900/50 text-violet-200 border-violet-700 backdrop-blur-sm', tagText: 'text-violet-200', badgeTheme: 'bg-violet-600 text-white border-violet-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-violet-100', btn: 'bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 w-full justify-center text-white shadow-lg border border-violet-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]'
            },
            icon: 'fa-music', iconContainer: 'bg-violet-900/40 border-violet-500/30', iconColor: 'text-violet-400'
        },
        {
            id: 'taller-plsql',
            unit: 'EA3',
            type: 'hero',
            href: 'taller-plsql.html',
            colSpan: 2,
            date: '2026-06-10',
            dateText: '10 Jun 2026',
            tag: 'TALLER PRÁCTICO', tagIcon: 'fa-laptop-code text-yellow-300',
            badge: 'Taller',
            title: 'Taller de Práctica:<br>Ciclos y DML en PL/SQL',
            description: 'Pon a prueba tu lógica construyendo bucles (FOR, FOR REVERSE, WHILE) e integrando operaciones DML de forma progresiva sobre una base de datos de Tienda.',
            btnText: 'Abrir Taller Práctico', btnIcon: 'fa-laptop-code',
            theme: {
                outerBorder: 'border-emerald-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-emerald-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-emerald-500/20', circle2: 'bg-teal-500/20',
                tagBox: 'bg-emerald-900/50 text-emerald-200 border-emerald-700 backdrop-blur-sm', tagText: 'text-emerald-200', badgeTheme: 'bg-emerald-600 text-white border-emerald-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-emerald-100', btn: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 w-full justify-center text-white shadow-lg border border-emerald-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]'
            },
            icon: 'fa-laptop-code', iconContainer: 'bg-emerald-900/40 border-emerald-500/30', iconColor: 'text-emerald-400'
        },
        {
            id: 'presentacion-taller-plsql',
            unit: 'EA3',
            type: 'hero',
            href: 'presentacion-taller-plsql.html',
            colSpan: 2,
            date: '2026-06-10',
            dateText: '10 Jun 2026',
            tag: 'AULA INTERACTIVA', tagIcon: 'fa-chalkboard-user text-yellow-300',
            badge: 'Proyector 2',
            title: 'Presentación: Ciclos y DML Progresivo',
            description: 'Clase de apoyo interactiva sobre el control de flujo con FOR/WHILE, DML procedural en PL/SQL y el uso de atributos como SQL%ROWCOUNT.',
            btnText: 'Iniciar Presentación de Apoyo', btnIcon: 'fa-desktop',
            theme: {
                outerBorder: 'border-indigo-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-indigo-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-indigo-500/20', circle2: 'bg-purple-500/20',
                tagBox: 'bg-indigo-900/50 text-indigo-200 border-indigo-700 backdrop-blur-sm', tagText: 'text-indigo-200', badgeTheme: 'bg-indigo-600 text-white border-indigo-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-indigo-200', btn: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full justify-center text-white shadow-lg border border-indigo-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]'
            },
            icon: 'fa-chalkboard-user', iconContainer: 'bg-indigo-900/40 border-indigo-500/30', iconColor: 'text-indigo-400'
        },
        {
            id: 'presentacion-plsql',
            unit: 'EA3',
            type: 'hero',
            href: 'presentacion-plsql.html',
            colSpan: 2,
            date: '2026-06-03',
            dateText: '3 Jun 2026',
            tag: 'AULA INTERACTIVA', tagIcon: 'fa-chalkboard-user text-yellow-300',
            badge: 'Proyector PL/SQL',
            title: 'Presentación: PL/SQL Avanzado y Control de Flujo',
            description: 'Aprende a conectar la base de datos con tus variables usando SELECT INTO. Domina las estructuras IF, bucles (LOOP, WHILE, FOR), y el ámbito en bloques anidados.',
            btnText: 'Iniciar Presentación PL/SQL', btnIcon: 'fa-desktop',
            theme: {
                outerBorder: 'border-cyan-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-indigo-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-cyan-500/20', circle2: 'bg-indigo-500/20',
                tagBox: 'bg-cyan-900/50 text-cyan-200 border-cyan-700 backdrop-blur-sm', tagText: 'text-cyan-200', badgeTheme: 'bg-cyan-600 text-white border-cyan-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-indigo-200', btn: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 w-full justify-center text-white shadow-lg border border-cyan-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]'
            },
            icon: 'fa-chalkboard-user', iconContainer: 'bg-cyan-900/40 border-cyan-500/30', iconColor: 'text-cyan-400'
        },
        {
            id: 'taller-preparacion-ep2',
            unit: 'EA2',
            type: 'hero',
            href: 'taller-preparacion-ep2.html',
            colSpan: 2,
            date: '2026-05-26',
            dateText: '26 May 2026',
            tag: 'PREPARACIÓN EP2', tagIcon: 'fa-graduation-cap text-yellow-300',
            badge: 'Taller',
            title: 'Taller de Práctica:<br>Preparación EP2',
            description: 'Entrena tu lógica para la Evaluación Parcial 2 (EP2). Escenarios 100% éticos y distintos a la prueba que evalúan exactamente los mismos conceptos: DML con CASE, Vistas analíticas y optimización mediante índices.',
            btnText: 'Abrir Taller Práctico', btnIcon: 'fa-laptop-code',
            theme: {
                outerBorder: 'border-yellow-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-yellow-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-yellow-500/20', circle2: 'bg-amber-500/20',
                tagBox: 'bg-yellow-900/50 text-yellow-200 border-yellow-700 backdrop-blur-sm', tagText: 'text-yellow-200', badgeTheme: 'bg-yellow-600 text-white border-yellow-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-yellow-100', btn: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 w-full justify-center text-white shadow-lg border border-yellow-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]'
            },
            icon: 'fa-graduation-cap', iconContainer: 'bg-yellow-900/40 border-yellow-500/30', iconColor: 'text-yellow-400'
        },
        {
            id: 'clase-1',
            type: 'standard',
            href: 'clase-1.html',
            colSpan: 1,
            date: '2026-03-10', // YYYY-MM-DD
            dateText: '10 Mar 2026',
            tag: 'HOY', tagIcon: 'fa-calendar-day',
            badge: 'Entrada 1',
            title: '🧪 Funciones de Fila en Oracle SQL',
            description: 'Aprende sobre funciones de texto, numéricas y fechas en Oracle SQL. Un taller interactivo con ejemplos y desafíos geniales sobre una plataforma tipo streaming.',
            btnText: 'Leer entrada', btnIcon: 'fa-arrow-right',
            theme: {
                border: 'border-pink-200', circle: 'bg-pink-50',
                tagBox: 'bg-blue-50 text-blue-600 border-blue-100', badgeTheme: 'text-blue-500 border-blue-200',
                title: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600'
            }
        },
        {
            id: 'repaso-1',
            type: 'hero',
            href: 'repaso-clase-1.html',
            colSpan: 2,
            date: '2026-03-15',
            dateText: '15 Mar 2026',
            tag: 'Misión Intermedia', tagIcon: 'fa-bolt',
            title: 'Simulador de Base de Datos',
            description: '¿Sobrevivirás a los reportes del gerente? Demuestra que dominas las funciones de fila en este mini-juego interactivo de 3 niveles con tiempo real.',
            btnText: 'Iniciar Desafío', btnIcon: 'fa-play',
            icon: 'fa-gamepad', iconContainer: 'bg-white/20', iconColor: 'text-yellow-300',
            theme: {
                bg: 'bg-gradient-to-r from-indigo-500 to-purple-600', border: 'border-indigo-400/30',
                circle1: 'bg-white/10', circle2: 'bg-black/10',
                tagBox: 'bg-white/20 border-white/30', tagText: 'text-yellow-300',
                title: 'text-white', desc: 'text-indigo-100', btn: 'bg-yellow-300 text-indigo-900 hover:bg-yellow-400',
                iconShadow: 'drop-shadow-md group-hover:animate-bounce'
            }
        },
        {
            id: 'anatomia-sql',
            type: 'standard',
            href: 'anatomia-sql.html',
            colSpan: 1,
            date: '2026-03-20',
            dateText: '20 Mar 2026',
            tag: 'GUÍA VISUAL', tagIcon: 'fa-glasses',
            badge: 'Entrada 2',
            title: '🍕 Anatomía de una Query SQL',
            description: 'Antes de escribir código, aprende a leerlo e interpretarlo. Desglosamos una consulta compleja usando la técnica de la pizzería.',
            btnText: 'Ver traductor', btnIcon: 'fa-arrow-right',
            theme: {
                border: 'border-violet-200', circle: 'bg-violet-50',
                tagBox: 'bg-violet-50 text-violet-600 border-violet-100', badgeTheme: 'text-violet-500 border-violet-200',
                title: 'text-violet-600', btn: 'bg-violet-500 hover:bg-violet-600'
            }
        },
        {
            id: 'clase-2',
            type: 'standard',
            href: 'clase-2.html',
            colSpan: 1,
            date: '2026-03-25',
            dateText: '25 Mar 2026',
            tag: 'IMPORTANTE', tagIcon: 'fa-fire text-orange-400',
            badge: 'Entrada 3',
            title: '📊 Funciones de Grupo en SQL',
            description: 'Aprende a resumir millones de registros en reportes usando COUNT, SUM, AVG, GROUP BY y HAVING. Usado en Spotify, Netflix y más.',
            btnText: 'Leer entrada', btnIcon: 'fa-arrow-right',
            theme: {
                border: 'border-teal-200', circle: 'bg-teal-50',
                tagBox: 'bg-teal-50 text-teal-600 border-teal-100', badgeTheme: 'text-teal-500 border-teal-200',
                title: 'text-teal-600', btn: 'bg-teal-500 hover:bg-teal-600'
            }
        },
        {
            id: 'ahora-tu',
            type: 'special',
            href: 'ahora-tu.html',
            colSpan: 1,
            date: '2026-03-28',
            dateText: '28 Mar 2026',
            tag: 'LABORATORIO', tagIcon: 'fa-laptop-code',
            badge: 'Reto Final',
            title: '¡Ahora Tú! ⚡<br>Caso Proyecto',
            description: 'Recibe 4 correos de gerencia reales y resuélvelos operando <strong>tu propia base de datos</strong>. Equivócate hoy para no botar Producción mañana.',
            btnText: 'Iniciar mi turno', btnIcon: 'fa-arrow-right',
            theme: {
                outerBorder: 'border-rose-300', outerBg: 'bg-white',
                innerBg: 'bg-rose-50', circle: 'bg-rose-200',
                tagBox: 'bg-white text-rose-600 border-rose-100', badgeTheme: 'bg-rose-100 text-rose-700 border-rose-200 text-sm shadow-inner',
                title: 'text-rose-600', btn: 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 w-full justify-center text-white'
            }
        },
        {
            id: 'flujo-sql',
            type: 'special',
            href: 'flujo-sql.html',
            colSpan: 2,
            date: '2026-04-01',
            dateText: '1 Abr 2026',
            tag: 'PARADIGMA', tagIcon: 'fa-brain',
            badge: 'Clave',
            title: '🧠 Piensa en SQL: El Flujo Lógico',
            description: 'Olvídate de leer línea por línea. Descubre el verdadero orden en que la base de datos ejecuta tus consultas mediante un simulador interactivo de pipelines.',
            btnText: 'Ver Simulador', btnIcon: 'fa-wand-magic-sparkles',
            theme: {
                outerBorder: 'border-cyan-300', outerBg: 'bg-white',
                innerBg: 'bg-cyan-50', circle: 'bg-cyan-200',
                tagBox: 'bg-white text-cyan-700 border-cyan-200', badgeTheme: 'bg-cyan-100 text-cyan-800 border-cyan-300 text-sm shadow-inner',
                title: 'text-cyan-800', btn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 w-full justify-center text-white'
            }
        },
        {
            id: 'join-basico',
            type: 'special',
            href: 'join-basico.html',
            colSpan: 2,
            date: '2026-04-02',
            dateText: '2 Abr 2026',
            tag: 'FUNDAMENTAL', tagIcon: 'fa-link',
            badge: 'Nueva Clase',
            title: '🧩 El Arte de Unir: SQL JOIN',
            description: 'Aprende a conectar islas separadas de información. Juega con el simulador de llaves interactivas y descubre la diferencia real entre el INNER y el LEFT Join.',
            btnText: 'Entrar al Laboratorio', btnIcon: 'fa-gamepad',
            theme: {
                outerBorder: 'border-emerald-300', outerBg: 'bg-white',
                innerBg: 'bg-emerald-50', circle: 'bg-emerald-200',
                tagBox: 'bg-white text-emerald-700 border-emerald-200', badgeTheme: 'bg-emerald-100 text-emerald-800 border-emerald-300 text-sm shadow-inner',
                title: 'text-emerald-800', btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 w-full justify-center text-white'
            }
        },
        {
            id: 'clase-3',
            type: 'standard',
            href: 'clase-3.html',
            colSpan: 1,
            date: '2026-04-03',
            dateText: '3 Abr 2026',
            tag: 'NUEVO', tagIcon: 'fa-star text-yellow-400',
            badge: 'Entrada 4',
            title: '🧩 Semántica Relacional: El Arte del JOIN',
            description: 'Conoce cómo interpretar la relación de tablas del mundo real y construir queries de JOIN sin sufrir pánico. Incluye laboratorio de toma de decisiones éticas.',
            btnText: 'Leer entrada', btnIcon: 'fa-arrow-right',
            theme: {
                border: 'border-emerald-200', circle: 'bg-emerald-50',
                tagBox: 'bg-emerald-50 text-emerald-600 border-emerald-100', badgeTheme: 'text-emerald-500 border-emerald-200',
                title: 'text-emerald-600', btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
            }
        },
        {
            id: 'git-basics',
            type: 'horizontal',
            href: 'git-basics.html',
            colSpan: 2,
            date: '2026-03-12', // Let's pretend Git happened earlier
            dateText: '12 Mar 2026',
            tag: 'HERRAMIENTA BONUS', tagTheme: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            title: 'Magia con Git y GitHub',
            description: 'Aprende a hacer commit de tus scripts SQL y subir tus avances al repositorio del curso para no perder tu código jamás.',
            btnText: 'Leer anexo', btnIcon: 'fa-book-open',
            icon: 'fa-git-alt', iconColor: 'text-orange-500',
            theme: {
                mainBg: 'bg-slate-800', border: 'border-slate-700', circle: 'bg-slate-700',
                iconBox: 'bg-slate-700 border-slate-600',
                title: 'text-white', desc: 'text-slate-300',
                btn: 'bg-white hover:bg-slate-200 text-slate-900'
            }
        },
        {
            id: 'presentacion-join',
            type: 'hero',
            href: 'presentacion-join.html',
            colSpan: 2,
            date: '2026-04-07',
            dateText: '7 Abr 2026',
            tag: 'AULA INTERACTIVA', tagIcon: 'fa-chalkboard-user text-yellow-300',
            badge: 'Proyector 1',
            title: 'Presentación: Fundamentos de SQL JOIN',
            description: 'Aborda la teoría y la práctica de las uniones básicas e intermedias (INNER, LEFT, RIGHT JOIN) con analogías visuales enfocadas en el DUA.',
            btnText: 'Iniciar Acto 1', btnIcon: 'fa-desktop',
            theme: {
                outerBorder: 'border-fuchsia-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-indigo-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-fuchsia-500/20', circle2: 'bg-indigo-500/20',
                tagBox: 'bg-fuchsia-900/50 text-fuchsia-200 border-fuchsia-700 backdrop-blur-sm', tagText: 'text-fuchsia-200', badgeTheme: 'bg-fuchsia-600 text-white border-fuchsia-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-indigo-200', btn: 'bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:from-fuchsia-600 hover:to-indigo-700 w-full justify-center text-white shadow-lg border border-fuchsia-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]'
            },
            icon: 'fa-chalkboard', iconContainer: 'bg-fuchsia-900/40 border-fuchsia-500/30', iconColor: 'text-fuchsia-400'
        },
        {
            id: 'presentacion-join-avanzado',
            type: 'hero',
            href: 'presentacion-join-avanzado.html',
            colSpan: 2,
            date: '2026-04-08',
            dateText: '8 Abr 2026',
            tag: 'AULA INTERACTIVA', tagIcon: 'fa-laptop-code text-rose-300',
            badge: 'Proyector 2',
            title: 'Presentación: JOINs Avanzados',
            description: 'Explora cruces complejos y productos cartesianos (FULL, CROSS, SELF JOIN y Tablas Puente) con animaciones CSS y elementos didácticos.',
            btnText: 'Iniciar Acto 2', btnIcon: 'fa-rocket',
            theme: {
                outerBorder: 'border-rose-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-rose-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-rose-500/20', circle2: 'bg-orange-500/20',
                tagBox: 'bg-rose-900/50 text-rose-200 border-rose-700 backdrop-blur-sm', tagText: 'text-rose-200', badgeTheme: 'bg-rose-600 text-white border-rose-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-rose-200', btn: 'bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 w-full justify-center text-white shadow-lg border border-rose-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]'
            },
            icon: 'fa-microscope', iconContainer: 'bg-rose-900/40 border-rose-500/30', iconColor: 'text-rose-400'
        },
        {
            id: 'taller-cyberdrone',
            type: 'hero',
            href: 'taller-cyberdrone.html',
            colSpan: 2,
            date: '2026-04-09',
            dateText: '9 Abr 2026',
            tag: 'SIMULADOR', tagIcon: 'fa-robot text-purple-300',
            badge: 'Taller Evaluable',
            title: 'Taller: CyberDrone Rentals',
            description: 'Participa en una simulación interactiva con un sistema de ayuda por IA progresiva. Prepara tu lógica SQL resolviendo misiones para una flota robótica de Neo-Tokyo.',
            btnText: 'Iniciar Misiones', btnIcon: 'fa-gamepad',
            theme: {
                outerBorder: 'border-purple-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-purple-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-purple-500/20', circle2: 'bg-blue-500/20',
                tagBox: 'bg-purple-900/50 text-purple-200 border-purple-700 backdrop-blur-sm', tagText: 'text-purple-200', badgeTheme: 'bg-purple-600 text-white border-purple-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-purple-200', btn: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 w-full justify-center text-white shadow-lg border border-purple-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            },
            icon: 'fa-user-astronaut', iconContainer: 'bg-purple-900/40 border-purple-500/30', iconColor: 'text-purple-400'
        },
        {
            id: 'clase-ea2-1',
            unit: 'EA2',
            type: 'hero',
            href: 'clase-ea2-1.html',
            colSpan: 2,
            date: '2026-04-22',
            dateText: '22 Abr 2026',
            tag: 'NUEVA UNIDAD', tagIcon: 'fa-rocket text-orange-300',
            badge: 'Clase 1',
            title: 'Introducción al RA2:<br>Manipulación Básica de Datos',
            description: 'Comprende cómo modificar la información de una base de datos sin romperla. Aprende sobre INSERT, UPDATE, DELETE, transacciones y los errores más comunes de integridad.',
            btnText: 'Iniciar Unidad 2', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-orange-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-orange-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-orange-500/20', circle2: 'bg-red-500/20',
                tagBox: 'bg-orange-900/50 text-orange-200 border-orange-700 backdrop-blur-sm', tagText: 'text-orange-200', badgeTheme: 'bg-orange-600 text-white border-orange-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-orange-100', btn: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 w-full justify-center text-white shadow-lg border border-orange-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]'
            },
            icon: 'fa-database', iconContainer: 'bg-orange-900/40 border-orange-500/30', iconColor: 'text-orange-400'
        },
        {
            id: 'clase-ea2-2',
            unit: 'EA2',
            type: 'hero',
            href: 'clase-ea2-2.html',
            colSpan: 2,
            date: '2026-04-29',
            dateText: '29 Abr 2026',
            tag: 'AVANZADO', tagIcon: 'fa-bolt text-blue-300',
            badge: 'Clase 2',
            title: 'Control Avanzado:<br>SAVEPOINT e Inserciones Condicionales',
            description: 'Domina el arte de retroceder en el tiempo dentro de una transacción con SAVEPOINT y aprende a insertar datos de forma masiva y condicional usando INSERT ALL y subconsultas.',
            btnText: 'Iniciar Clase 2', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-blue-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-blue-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-blue-500/20', circle2: 'bg-cyan-500/20',
                tagBox: 'bg-blue-900/50 text-blue-200 border-blue-700 backdrop-blur-sm', tagText: 'text-blue-200', badgeTheme: 'bg-blue-600 text-white border-blue-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-blue-100', btn: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 w-full justify-center text-white shadow-lg border border-blue-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]'
            },
            icon: 'fa-code-branch', iconContainer: 'bg-blue-900/40 border-blue-500/30', iconColor: 'text-blue-400'
        },
        {
            id: 'clase-ea2-3',
            unit: 'EA2',
            type: 'hero',
            href: 'clase-ea2-3.html',
            colSpan: 2,
            date: '2026-05-02',
            dateText: '2 May 2026',
            tag: 'ESTRUCTURA Y SEGURIDAD', tagIcon: 'fa-shield-halved text-indigo-300',
            badge: 'Clase 3',
            title: 'Control y Manipulación:<br>Vistas, Secuencias y Roles',
            description: 'Estructura la base de datos más allá de las tablas básicas para mejorar la seguridad, la automatización y la experiencia del usuario con Vistas, Secuencias y Control de Acceso (Privilegios).',
            btnText: 'Iniciar Clase 3', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-indigo-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-indigo-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-indigo-500/20', circle2: 'bg-violet-500/20',
                tagBox: 'bg-indigo-900/50 text-indigo-200 border-indigo-700 backdrop-blur-sm', tagText: 'text-indigo-200', badgeTheme: 'bg-indigo-600 text-white border-indigo-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-indigo-100', btn: 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 w-full justify-center text-white shadow-lg border border-indigo-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]'
            },
            icon: 'fa-user-lock', iconContainer: 'bg-indigo-900/40 border-indigo-500/30', iconColor: 'text-indigo-400'
        },
        {
            id: 'clase-ea2-4',
            unit: 'EA2',
            type: 'hero',
            href: 'clase-ea2-4.html',
            colSpan: 2,
            date: '2026-05-06',
            dateText: '6 May 2026',
            tag: 'OPTIMIZACIÓN', tagIcon: 'fa-bolt text-emerald-300',
            badge: 'Clase 4',
            title: 'Rendimiento y Optimización:<br>El Poder de los Índices',
            description: 'Descubre cómo evitar los escaneos completos de tabla (Full Table Scan) y haz que Oracle busque información a la velocidad de la luz mediante el uso de índices B-tree.',
            btnText: 'Iniciar Clase 4', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-emerald-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-emerald-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-emerald-500/20', circle2: 'bg-teal-500/20',
                tagBox: 'bg-emerald-900/50 text-emerald-200 border-emerald-700 backdrop-blur-sm', tagText: 'text-emerald-200', badgeTheme: 'bg-emerald-600 text-white border-emerald-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-emerald-100', btn: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 w-full justify-center text-white shadow-lg border border-emerald-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]'
            },
            icon: 'fa-magnifying-glass-chart', iconContainer: 'bg-emerald-900/40 border-emerald-500/30', iconColor: 'text-emerald-400'
        },
        {
            id: 'clase-ea2-5',
            unit: 'EA2',
            type: 'hero',
            href: 'clase-ea2-5.html',
            colSpan: 2,
            date: '2026-05-09',
            dateText: '9 May 2026',
            tag: 'SEGURIDAD', tagIcon: 'fa-shield-halved text-blue-300',
            badge: 'Clase 5',
            title: 'Seguridad y Acceso:<br>Usuarios y Privilegios',
            description: 'Implementa el Principio de Menor Privilegio. Aprende a crear usuarios, otorgar permisos de sistema y de objeto usando GRANT/REVOKE, y organiza el acceso mediante Roles.',
            btnText: 'Iniciar Clase 5', btnIcon: 'fa-play',
            theme: {
                outerBorder: 'border-blue-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-blue-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-blue-500/20', circle2: 'bg-cyan-500/20',
                tagBox: 'bg-blue-900/50 text-blue-200 border-blue-700 backdrop-blur-sm', tagText: 'text-blue-200', badgeTheme: 'bg-blue-600 text-white border-blue-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-blue-100', btn: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 w-full justify-center text-white shadow-lg border border-blue-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]'
            },
            icon: 'fa-users-gear', iconContainer: 'bg-blue-900/40 border-blue-500/30', iconColor: 'text-blue-400'
        },
        {
            id: 'faq-ea2',
            unit: 'RECURSO',
            type: 'hero',
            href: 'faq.html',
            colSpan: 2,
            date: 'Permanente',
            dateText: 'Recurso Extra',
            tag: 'WIKI', tagIcon: 'fa-book-bookmark text-purple-300',
            badge: 'Extra',
            title: 'Base de Conocimiento:<br>FAQ Oracle SQL',
            description: 'Las respuestas definitivas a las dudas más comunes sobre índices, rendimiento, llaves, privilegios y el mundo laboral real. Ideal para prepararse antes de un examen.',
            btnText: 'Abrir Base de Conocimiento', btnIcon: 'fa-book-open',
            theme: {
                outerBorder: 'border-purple-400', outerBg: 'bg-slate-900', bg: 'bg-gradient-to-r from-slate-900 to-purple-900',
                innerBg: 'bg-transparent text-white', circle1: 'bg-purple-500/20', circle2: 'bg-fuchsia-500/20',
                tagBox: 'bg-purple-900/50 text-purple-200 border-purple-700 backdrop-blur-sm', tagText: 'text-purple-200', badgeTheme: 'bg-purple-600 text-white border-purple-400 font-mono text-sm shadow-inner',
                title: 'text-white', desc: 'text-purple-100', btn: 'bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 w-full justify-center text-white shadow-lg border border-purple-400/50',
                iconShadow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            },
            icon: 'fa-circle-question', iconContainer: 'bg-purple-900/40 border-purple-500/30', iconColor: 'text-purple-400'
        }
    ]
};
