import { Guild } from "discord.js";
import type { BotEvent } from "../types/event";
import { guildService } from "../services/guildService";

export const guildCreateEvent: BotEvent<[Guild]> = {
    name: "guildCreate",
    once: false,
    async execute(guild) {
        guildService.onGuildCreate(guild);
    }
};
