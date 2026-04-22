// core/app.js
// Punto de entrada global de Vue

import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js';
window.Vue = Vue; // Exponemos Vue globalmente para facilitar la vida a plugins inyectados

import logger from './core/logger.js';
import pluginManager from './core/plugins.js';
import { state } from './core/store.js';

import DebugPanel from './components/DebugPanel.js';
import Workspace from './components/Workspace.js';

const App = {
    components: {
        DebugPanel,
        Workspace
    },
    template: `
        <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
            <!-- Background Decorations -->
            <div class="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 z-50"></div>
            
            <header class="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <h1 class="text-xl font-bold tracking-tight text-white flex items-baseline gap-2">
                                VirtualLab 
                                <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">v1.2-CDN</span>
                            </h1>
                        </div>
                        <div class="flex items-center gap-5">
                            <div class="hidden sm:flex text-xs font-mono text-cyan-400 bg-cyan-900/20 px-3 py-1.5 rounded-full border border-cyan-800/50 items-center justify-center gap-2 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                <div class="relative flex h-2 w-2">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </div>
                                AI Agent Interface Ready
                            </div>
                            <div class="text-sm border-l border-slate-700 pl-5 text-slate-300 flex items-center gap-3">
                                <div class="bg-indigo-900/40 p-1.5 rounded-full text-indigo-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-medium leading-none">{{ state.user.name }}</span>
                                    <span class="text-xs text-slate-500 mt-1 uppercase font-mono tracking-wider">{{ state.user.role }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 h-[calc(100vh-4rem)]">
                <!-- Zona del Workspace principal -->
                <Workspace />
            </main>

            <!-- Panel Observabilidad IA -->
            <DebugPanel />
        </div>
    `,
    setup() {
        logger.info('Application bootstrap initialized');
        return { state };
    }
};

// Montaje principal
const app = Vue.createApp(App);

// Manejador global de errores para inyectarlos al logger
app.config.errorHandler = (err, instance, info) => {
    logger.error('Vue Component Error', { error: err.message, info, component: instance?.$options?.name });
    console.error(err);
};

app.mount('#app');
logger.info('Vue application successfully mounted on #app');
