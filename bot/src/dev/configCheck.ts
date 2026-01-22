import type { ChatInputCommandInteraction, Client } from "discord.js";
import { ensureConfigsForAllGuilds } from "../config/configManager";

export async function handleConfigCheck(
    client: Client,
    interaction: ChatInputCommandInteraction
) {
    ensureConfigsForAllGuilds(client);
    await interaction.reply({
        content: "Config check complete.",
        ephemeral: true
    });
}
