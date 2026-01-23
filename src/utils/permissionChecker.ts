import { ChatInputCommandInteraction } from "discord.js";

export function isOwner(interaction: ChatInputCommandInteraction): boolean {
    const ownerId = process.env.OWNER_ID;
    if (!ownerId) return false;
    return interaction.user.id === ownerId;
}
