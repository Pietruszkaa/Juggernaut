import type { BotCommand } from "../../../types/command";
import { CommandResponse } from "../../../utils/commandResponse";

export const pingCommand: BotCommand = {
    name: "ping",
    description: "Check if bot is alive",

    async execute(interaction) {
        await CommandResponse.ephemeral(interaction, "🏓 Pong!");
    }
};
