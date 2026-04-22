// core/store.js
// Propósito: Estado reactivo central, persistencia y adaptadores. Fácil de leer para LLMs.

import { reactive, watch } from 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js';
import logger from './logger.js';

// Adaptador de persistencia (Strategy pattern básico)
const persistence = {
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Persistence failed', e);
        }
    },
    load(key, defaultData) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultData;
        } catch (e) {
            return defaultData;
        }
    }
};

const STORE_KEY = 'lab_virtual_state_v1';

// Definición inicial del esquema de estado
const defaultState = {
    user: {
        name: 'Estudiante Coder',
        role: 'admin' // Posibles: admin, student, reader
    },
    workspace: {
        activeTab: 'summary',
        theme: 'dark'
    },
    metrics: {
        actionsTaken: 0,
        errorsFound: 0
    }
};

export const state = reactive(persistence.load(STORE_KEY, defaultState));

// Persistencia automática ante cualquier mutación
watch(state, (newState) => {
    persistence.save(STORE_KEY, Object.assign({}, newState));
    // No disparamos logger aquí automáticamente para evitar infinit loops.
}, { deep: true });

export const actions = {
    updateUserRole(newRole) {
        logger.action('Role updated', { from: state.user.role, to: newRole });
        state.user.role = newRole;
    },
    registerAction() {
        state.metrics.actionsTaken++;
    },
    registerError() {
        state.metrics.errorsFound++;
    },
    resetState() {
        logger.action('System reset', {});
        Object.assign(state, defaultState);
        persistence.save(STORE_KEY, defaultState);
    }
};

// Exponer en window para experimentación o manipulación por Agentes IA vía consola
window.__APP_STATE__ = state;
window.__APP_ACTIONS__ = actions;
