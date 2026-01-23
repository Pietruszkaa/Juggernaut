import type { BotCommand } from "../../../types/command";
import { CommandResponse } from "../../../utils/commandResponse";
import { moduleRegistry } from "../../../services/moduleRegistry";
import { logger } from "../../../infra/logger";

export const devReloadCommand: BotCommand = {
    name: "dev-reload",
    description: "Reload configs and modules",
    ownerOnly: true,

    async execute(interaction) {
        logger.info("dev", "Reload triggered by owner");

        await moduleRegistry.reloadAll();

        await CommandResponse.ephemeral(
            interaction,
            "🔁 Reload complete (modules re-enabled)"
        );
    }
};
