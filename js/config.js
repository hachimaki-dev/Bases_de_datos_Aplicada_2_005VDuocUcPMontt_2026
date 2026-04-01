// js/config.js
// Archivo central para inyectar recursos (Tailwind, Fonts, Prism) en todas las hojas.
// Así la IA solo necesita incluir este archivo en el <head> de las nuevas vistas.

const headContent = `
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- PrismJS (Syntax Highlighting) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Quicksand', 'sans-serif'] },
                    colors: {
                        kawaii: {
                            pink: '#FFE4E1', blue: '#E0F7FA', yellow: '#FFF9C4',
                            green: '#E8F5E9', purple: '#F3E5F5', text: '#3E2723', card: '#FFFFFF'
                        }
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        body { background-color: #FFF0F5; color: #4A3B32; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(255,182,193,0.5); }
        
        /* Estilos base de clases */
        .content-box { @apply bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg mb-12 border-2 border-pink-100/50 relative overflow-hidden; }
        .section-title { @apply text-3xl font-bold mb-8 flex items-center gap-4 border-b-2 pb-4; }
        
        pre[class*="language-"] { 
            border-radius: 1.5rem !important; 
            margin: 1.5rem 0 !important; 
            padding: 1.5rem !important;
            overflow-x: auto !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        
        .badge-pink { @apply inline-block bg-pink-100 text-pink-700 font-bold px-4 py-1.5 rounded-xl border border-pink-200 shadow-sm whitespace-nowrap; }
        .badge-blue { @apply inline-block bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-xl border border-blue-200 shadow-sm whitespace-nowrap; }
        .badge-green { @apply inline-block bg-emerald-100 text-emerald-700 font-bold px-4 py-1.5 rounded-xl border border-emerald-200 shadow-sm whitespace-nowrap; }
        .badge-purple { @apply inline-block bg-purple-100 text-purple-700 font-bold px-4 py-1.5 rounded-xl border border-purple-200 shadow-sm whitespace-nowrap; }
    </style>
`;
document.write(headContent);
