import type { BotCommand } from "../../../types/command";
import { CommandResponse } from "../../../utils/commandResponse";
import { moduleRegistry } from "../../../services/moduleRegistry";

export const devModulesCommand: BotCommand = {
    name: "dev-modules",
    description: "List loaded modules",
    ownerOnly: true,

    async execute(interaction) {
        const modules = moduleRegistry.list();

        const message = [
            "**📦 Loaded modules**",
            ...modules.map(
                m => `• ${m.name} (v${m.version})`
            )
        ].join("\n");

        await CommandResponse.ephemeral(interaction, message);
    }
};
