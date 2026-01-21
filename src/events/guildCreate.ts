import { Guild } from "discord.js";
import { hasGuildConfig, initGuildConfig } from "../config/configManager";

export async function onGuildCreate(guild: Guild) {
    if (hasGuildConfig(guild.id)) return;

    initGuildConfig(guild.id);
    console.log(`[config] created for guild ${guild.id}`);
}
