import type { BotModule } from "../../types/module";
import { logger } from "../../infra/logger";
import { commandHandler } from "../../handlers/commandHandler";
import { pingCommand } from "./commands/ping";

export const coreModule: BotModule = {
    name: "core",
    version: "1.0.0",

    async onLoad() {
        commandHandler.register(pingCommand);
        logger.info("core", "Core commands registered");
    },

    async onEnable() {
        logger.info("core", "Core module enabled");
    }
};
