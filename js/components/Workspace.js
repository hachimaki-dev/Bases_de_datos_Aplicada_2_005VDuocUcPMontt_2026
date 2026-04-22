// components/Workspace.js
import { state, actions } from '../core/store.js';
import logger from '../core/logger.js';

export default {
    name: 'Workspace',
    template: `
        <div class="flex flex-col h-full bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 relative">
            <!-- Glassmorphism overlay decorator -->
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <!-- Header -->
            <div class="bg-slate-800/80 backdrop-blur pb-0 p-4 border-b border-slate-700/50 flex flex-col gap-4 relative z-10">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-2">
                            <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                            Oracle Interactive AI Environment
                        </h2>
                        <p class="text-sm text-slate-400 mt-1">Laboratorio Virtual de Base de Datos - Sandbox en Memoria</p>
                    </div>
                    
                    <div class="flex items-center gap-4 bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-700/50 shadow-inner">
                        <span class="text-sm text-slate-400 font-medium font-mono">Session Role:</span>
                        <select v-model="currentRole" @change="changeRole" class="bg-slate-800 text-indigo-300 border border-slate-600 rounded px-3 py-1 outline-none text-sm font-mono focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all cursor-pointer hover:bg-slate-700">
                            <option value="admin">DBA / Administrador</option>
                            <option value="student">Estudiante (DML)</option>
                            <option value="reader">Solo Lectura (Select)</option>
                        </select>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="flex gap-6 border-b border-slate-700/50 px-2 mt-2">
                     <button class="px-2 py-2 text-sm font-medium border-b-2 border-indigo-400 text-indigo-400 transition-colors">Panel Principal</button>
                     <button class="px-2 py-2 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">Esquema Relacional</button>
                     <button class="px-2 py-2 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">Query Runner</button>
                </div>
            </div>

            <!-- Body Area -->
            <div class="flex-1 flex flex-col p-6 overflow-y-auto relative z-10 space-y-6">
                <!-- Welcome/Placeholder Panel -->
                <div class="bg-slate-800/40 border border-slate-700/50 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm group hover:border-indigo-500/50 transition-colors">
                    <div class="w-20 h-20 bg-gradient-to-br from-indigo-900 to-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner border border-slate-700 group-hover:scale-110 transition-transform duration-500">
                        ✨
                    </div>
                    <h3 class="text-xl font-bold text-slate-200 mb-3">Entorno Preparado para Agentes IA</h3>
                    <p class="text-slate-400 max-w-lg leading-relaxed">
                        Este espacio dinámico ha sido diseñado para ser inyectado con lógica y renderizado. 
                        Un agente IA puede crear componentes como editores SQL o visualizadores de tablas e instrumentarlos mediante el archivo <b>js/core/plugins.js</b>.
                    </p>
                    
                    <div class="mt-8 flex gap-4">
                        <button @click="simulateAction" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] flex items-center gap-2 font-medium">
                            <span>Lanzar Acción Exitosa</span>
                        </button>
                        
                        <button @click="simulateError" class="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-rose-400 border border-rose-900/50 hover:border-rose-700 rounded-lg transition-all shadow-lg flex items-center gap-2 font-medium group">
                            <span class="group-hover:text-rose-300">Simular Fallo SQL</span>
                        </button>
                    </div>
                </div>
                
                <!-- Metrics Panel -->
                <div class="bg-slate-800/30 p-5 rounded-xl border border-slate-700/30 backdrop-blur-sm">
                     <div class="flex items-center gap-2 mb-4">
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        <h4 class="text-sm text-slate-300 font-semibold tracking-wide">MÉTRICAS DE SESIÓN</h4>
                     </div>
                     <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div class="bg-slate-900/80 p-4 rounded-lg flex items-center justify-between border border-slate-800 shadow-inner group transition-all hover:bg-slate-900">
                               <span class="text-slate-400 font-medium">Eventos DML Simulados</span> 
                               <div class="flex items-center gap-3">
                                   <div class="h-2 w-16 bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-indigo-500" :style="{ width: Math.min(metrics.actionsTaken * 5, 100) + '%' }"></div>
                                   </div>
                                   <span class="text-indigo-400 text-xl font-bold font-mono">{{ metrics.actionsTaken }}</span>
                               </div>
                          </div>
                          <div class="bg-slate-900/80 p-4 rounded-lg flex items-center justify-between border border-slate-800 shadow-inner group transition-all hover:bg-slate-900">
                               <span class="text-slate-400 font-medium">Errores Detectados</span> 
                               <div class="flex items-center gap-3">
                                   <div class="h-2 w-16 bg-slate-800 rounded-full overflow-hidden" v-if="metrics.errorsFound > 0">
                                        <div class="h-full bg-rose-500 animate-pulse" :style="{ width: Math.min(metrics.errorsFound * 10, 100) + '%' }"></div>
                                   </div>
                                   <span class="text-rose-400 text-xl font-bold font-mono">{{ metrics.errorsFound }}</span>
                               </div>
                          </div>
                     </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const currentRole = Vue.ref(state.user.role);

        const changeRole = () => {
            actions.updateUserRole(currentRole.value);
        };

        const simulateAction = () => {
            logger.action('Ejecutada acción de simulación', { 
                action: 'INSERT', 
                target: 'USERS', 
                payload: { id: 101, username: 'tester' },
                userRole: currentRole.value
            });
            actions.registerAction();
        };

        const simulateError = () => {
             logger.error('Fallo de constraint referencial simulado', { 
                code: 'ORA-02292',
                message: 'integrity constraint (ADMIN.FK_DEPT) violated - child record found',
                statement: 'DELETE FROM departments WHERE department_id = 10'
            });
            actions.registerError();
        }

        // Mantener sincronizado el selector si el estado cambia remotamente
        Vue.watch(() => state.user.role, (newRole) => {
            currentRole.value = newRole;
        });

        return {
            state,
            currentRole,
            changeRole,
            simulateAction,
            simulateError,
            metrics: Vue.computed(() => state.metrics)
        }
    }
}
