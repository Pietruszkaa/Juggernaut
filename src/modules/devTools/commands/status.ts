import type { BotCommand } from "../../../types/command";
import { CommandResponse } from "../../../utils/commandResponse";
import os from "os";
import process from "process";

export const devStatusCommand: BotCommand = {
    name: "dev-status",
    description: "Show bot runtime status",
    ownerOnly: true,

    async execute(interaction) {
        const uptime = process.uptime();
        const memory = process.memoryUsage();

        const message = [
            "**🧠 Juggernaut – status**",
            `🕒 Uptime: ${Math.floor(uptime)}s`,
            `💾 Memory: ${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
            `🖥️ Platform: ${os.platform()}`
        ].join("\n");

        await CommandResponse.ephemeral(interaction, message);
    }
};
