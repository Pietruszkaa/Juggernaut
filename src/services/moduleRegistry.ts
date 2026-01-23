import type { BotModule } from "../types/module";
import { logger } from "../infra/logger";

class ModuleRegistry {
    private modules = new Map<string, BotModule>();

    register(module: BotModule) {
        if (this.modules.has(module.name)) {
            throw new Error(`Module ${module.name} already registered`);
        }

        this.modules.set(module.name, module);
        logger.info("modules", `Registered module ${module.name}`);
    }

    async loadAll() {
        for (const module of this.modules.values()) {
            if (module.onLoad) {
                await module.onLoad();
            }
        }
    }

    async reloadAll() {
        for (const module of this.modules.values()) {
            if (module.onDisable) {
                await module.onDisable();
            }
            if (module.onEnable) {
                await module.onEnable();
            }
        }
    }

    async enableAll() {
        for (const module of this.modules.values()) {
            if (module.onEnable) {
                await module.onEnable();
            }
        }
    }

    list() {
        return Array.from(this.modules.values()).map(m => ({
            name: m.name,
            version: m.version
        }));
    }
}

export const moduleRegistry = new ModuleRegistry();
