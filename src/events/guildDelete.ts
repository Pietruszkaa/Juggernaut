import { Guild } from "discord.js";
import fs from "fs";
import path from "path";
import { GUILDS_PATH, configs } from "../config/configManager";

export async function onGuildDelete(guild: Guild) {
    const guildId = guild.id;

    // usuń z pamięci
    configs.delete(guildId);

    // usuń plik JSON
    const file = path.join(GUILDS_PATH, `${guildId}.json`);
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`[config] deleted config for guild ${guildId}`);
    }
}
