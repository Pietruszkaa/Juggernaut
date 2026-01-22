import type { Guild } from "discord.js";
import { getGuildConfig } from "../config/configManager";

export function onGuildCreate(guild: Guild) {
    getGuildConfig(guild.id);
    console.log(`[guildCreate] initialized config for ${guild.id}`);
}
