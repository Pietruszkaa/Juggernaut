import fs from "fs";
import path from "path";
import type { Guild } from "discord.js";

const DATA_DIR = path.resolve(process.cwd(), "data/guilds");

export function onGuildDelete(guild: Guild) {
    const file = path.join(DATA_DIR, `${guild.id}.json`);

    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`[guildDelete] removed config for ${guild.id}`);
    }
}
