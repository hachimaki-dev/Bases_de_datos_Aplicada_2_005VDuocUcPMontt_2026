// core/logger.js
// Propósito: Mantener un registro estructurado y predecible para depuración por IA y por usuarios

import { reactive } from 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js';

export const loggerState = reactive({
    logs: []
});

class Logger {
    constructor() {
        this.maxLogs = 100; // mantener ligero
    }

    _log(level, message, meta = {}) {
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            timestamp: new Date().toISOString(),
            level,
            message,
            meta
        };
        
        loggerState.logs.unshift(entry);
        
        if (loggerState.logs.length > this.maxLogs) {
            loggerState.logs.pop();
        }

        // Output a la consola nativa para facilidad
        console.log(`[${level.toUpperCase()}] ${message}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
    }

    info(message, meta) {
        this._log('info', message, meta);
    }

    action(message, meta) {
        this._log('action', message, meta);
    }

    error(message, meta) {
        this._log('error', message, meta);
    }

    clear() {
        loggerState.logs.splice(0, loggerState.logs.length);
    }
}

export const logger = new Logger();
export default logger;
