// js/components.js
// Este script define componentes web nativos para poder reusar el Layout.
// Funciona nativamente en el navegador por CDN y sin necesidad de bundlers.

class AppNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="max-w-5xl mx-auto px-6 py-8">
            <a href="index.html" class="inline-flex items-center text-pink-500 hover:text-pink-700 font-bold transition-transform hover:-translate-x-1 bg-white px-6 py-3 rounded-full shadow-md border-2 border-pink-100 text-lg">
                <i class="fa-solid fa-arrow-left mr-3"></i> Volver al Inicio
            </a>
        </nav>
        `;
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
