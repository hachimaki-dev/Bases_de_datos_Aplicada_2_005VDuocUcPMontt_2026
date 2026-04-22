// core/plugins.js
// Propósito: Orquestar extensiones y módulos dinámicamente

import logger from './logger.js';

class PluginManager {
    constructor() {
        this.plugins = [];
    }

    async register(name, loaderFn) {
        logger.info(`Registering plugin: ${name}`);
        try {
            const plugin = await loaderFn();
            this.plugins.push({ name, plugin });
            logger.info(`Plugin registered successfully: ${name}`);
            return plugin;
        } catch (err) {
            logger.error(`Failed to load plugin: ${name}`, { error: err.message });
            return null;
        }
    }

    getPlugins() {
        return this.plugins;
    }
}

export const pluginManager = new PluginManager();
export default pluginManager;
