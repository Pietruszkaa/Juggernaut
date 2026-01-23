import { Interaction } from "discord.js";
import type { BotEvent } from "../types/event";
import { commandHandler } from "../handlers/commandHandler";

export const interactionCreateEvent: BotEvent<[Interaction]> = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        await commandHandler.handle(interaction);
    }
};
