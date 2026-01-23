import type { BotModule } from "../../types/module";
import { commandHandler } from "../../handlers/commandHandler";
import { logger } from "../../infra/logger";

import { devStatusCommand } from "./commands/status";
import { devModulesCommand } from "./commands/modules";
import { devReloadCommand } from "./commands/reload";

export const devToolsModule: BotModule = {
    name: "devTools",
    version: "1.0.0",

    async onLoad() {
        commandHandler.register(devStatusCommand);
        commandHandler.register(devModulesCommand);
        commandHandler.register(devReloadCommand);
        logger.info("dev", "DevTools commands registered");
    }
};
