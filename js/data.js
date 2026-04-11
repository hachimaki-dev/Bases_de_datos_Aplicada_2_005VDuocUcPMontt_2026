// js/data.js
// Aquí radica la información de cada entrada/clase.
// Las IAs pueden limitarse a agregar un nuevo objeto en este arreglo al crear nuevo contenido,
// reduciendo la posibilidad de romper el código HTML principal de index.html a cero.

const appData = {
    entries: [
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
        }
    ]
};
