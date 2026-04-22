// components/DebugPanel.js
import { loggerState, logger } from '../core/logger.js';
import { state, actions } from '../core/store.js';

export default {
    name: 'DebugPanel',
    template: `
        <div class="fixed bottom-0 right-0 w-1/3 min-w-[350px] h-96 bg-gray-900 border-l border-t border-gray-700 text-green-400 font-mono text-xs z-50 flex flex-col shadow-2xl rounded-tl-lg transition-transform duration-300" v-show="isOpen">
            <div class="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700 rounded-tl-lg">
                <span class="font-bold flex items-center gap-2">📡 AI Observability Panel</span>
                <button @click="toggle" class="text-rose-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 px-2 rounded">Close [x]</button>
            </div>
            
            <div class="flex border-b border-gray-700 bg-gray-800">
                <button @click="activeTab = 'logs'" :class="['px-4 py-2 transition-colors', activeTab === 'logs' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700']">Logs</button>
                <button @click="activeTab = 'state'" :class="['px-4 py-2 transition-colors', activeTab === 'state' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700']">State</button>
                <button @click="clearLogs" class="ml-auto px-4 py-2 text-gray-400 hover:text-white transition-colors" v-if="activeTab==='logs'">Clear Logs</button>
            </div>

            <div class="flex-1 overflow-y-auto p-3 bg-gray-950">
                <div v-if="activeTab === 'logs'">
                    <div v-for="log in logs" :key="log.id" class="mb-3 border-b border-gray-800 pb-2">
                        <div class="flex items-start gap-2">
                            <span :class="levelColor(log.level)" class="px-1 bg-opacity-20 rounded">[{{ log.level.toUpperCase() }}]</span>
                            <span class="text-gray-500">[{{ formatTime(log.timestamp) }}]</span>
                        </div>
                        <div class="text-gray-300 mt-1 ml-1">{{ log.message }}</div>
                        <pre v-if="Object.keys(log.meta).length" class="ml-1 mt-1 text-cyan-600 bg-gray-900 p-2 rounded text-[10px] overflow-x-auto">{{ JSON.stringify(log.meta, null, 2) }}</pre>
                    </div>
                    <div v-if="logs.length === 0" class="text-gray-600 italic mt-2">Silence...</div>
                </div>
                <div v-if="activeTab === 'state'">
                    <pre class="text-amber-500 bg-gray-900 p-3 rounded mt-1">{{ JSON.stringify(appState, null, 2) }}</pre>
                    <div class="mt-4 border-t border-gray-800 pt-3 flex justify-end">
                         <button @click="resetApp" class="bg-rose-900 border border-rose-700 text-rose-100 px-3 py-1 rounded hover:bg-rose-800 hover:text-white transition-colors">Vape State (Reset)</button>
                    </div>
                </div>
            </div>
        </div>

        <button v-show="!isOpen" @click="toggle" class="fixed bottom-6 right-6 bg-slate-800 text-green-400 p-3 rounded-full shadow-[0_0_15px_rgba(72,187,120,0.2)] border border-slate-600 hover:bg-slate-700 hover:shadow-[0_0_20px_rgba(72,187,120,0.4)] transition-all font-mono text-sm z-50 flex items-center gap-2 group">
           <svg class="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
           <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">AI Debug View</span>
        </button>
    `,
    setup() {
        const isOpen = Vue.ref(false);
        const activeTab = Vue.ref('logs');

        const toggle = () => {
            isOpen.value = !isOpen.value;
            logger.action(isOpen.value ? 'Debug panel opened' : 'Debug panel closed');
        };

        const levelColor = (level) => ({
            'action': 'text-blue-400 bg-blue-900/30',
            'info': 'text-green-400 bg-green-900/30',
            'error': 'text-rose-500 bg-rose-900/30 font-bold'
        }[level] || 'text-gray-400');

        const formatTime = (iso) => {
            const d = new Date(iso);
            return d.toLocaleTimeString() + '.' + d.getMilliseconds().toString().padStart(3, '0');
        };
        
        const clearLogs = () => {
            logger.clear();
            logger.info('Logs cleared by user');
        }

        const resetApp = () => {
            if (confirm('¿Estás seguro de resetear todo el estado de la aplicación?')) {
                actions.resetState();
            }
        }

        return {
            isOpen,
            toggle,
            logs: loggerState.logs,
            appState: state,
            activeTab,
            levelColor,
            formatTime,
            clearLogs,
            resetApp
        };
    }
}
