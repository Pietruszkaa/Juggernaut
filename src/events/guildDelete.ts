import { Guild } from "discord.js";
import type { BotEvent } from "../types/event";
import { guildService } from "../services/guildService";

export const guildDeleteEvent: BotEvent<[Guild]> = {
    name: "guildDelete",
    once: false,
    async execute(guild) {
        guildService.onGuildDelete(guild);
    }
};
