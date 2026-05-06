// js/components.js
// Este script define componentes web nativos para poder reusar el Layout.
// Funciona nativamente en el navegador por CDN y sin necesidad de bundlers.

class AppNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="max-w-5xl mx-auto px-6 py-8">
            <a href="index.html" class="inline-flex items-center text-pink-500 hover:text-pink-700 font-bold transition-transform hover:-translate-x-1 bg-white px-6 py-3 rounded-full shadow-md border-2 border-pink-100 text-lg relative z-10">
                <i class="fa-solid fa-arrow-left mr-3"></i> Volver al Inicio
            </a>
            
            <!-- FAB FAQ Global -->
            <a href="faq.html" class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all hover:scale-110 z-50 group" title="Base de Conocimiento (FAQ)">
                <i class="fa-solid fa-book-bookmark text-2xl group-hover:animate-bounce"></i>
                <span class="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Dudas? Lee la FAQ
                </span>
            </a>
        </nav>
    }
}
customElements.define('app-nav', AppNav);

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="text-center bg-white/50 border-t-2 border-pink-100 mt-20 py-12 flex flex-col items-center">
            <div class="mb-4">
                <img src="avatar.png" alt="HachiMaki-dev avatar" class="w-28 h-28 rounded-full border-4 border-pink-300 shadow-lg object-cover">
            </div>
            <h2 class="text-3xl font-bold text-pink-600 mb-2">HachiMaki-dev</h2>
            <div class="flex items-center justify-center space-x-2 text-pink-500 text-xl font-bold">
                <span>Bases de datos aplicada 2</span>
            </div>
            <div class="mt-4 bg-pink-200 text-pink-900 font-bold px-6 py-2.5 rounded-full text-base shadow-sm inline-block">
                DuocUC Puerto Montt 2026
            </div>
        </footer>
        `;
    }
}
customElements.define('app-footer', AppFooter);
