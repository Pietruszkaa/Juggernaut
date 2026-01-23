import {
    ChatInputCommandInteraction,
    InteractionReplyOptions,
    MessageFlags
} from "discord.js";

export class CommandResponse {
    private static async reply(
        interaction: ChatInputCommandInteraction,
        options: InteractionReplyOptions
    ) {
        if (interaction.replied || interaction.deferred) {
            return interaction.followUp(options);
        }

        return interaction.reply(options);
    }

    static async ephemeral(
        interaction: ChatInputCommandInteraction,
        content: string
    ) {
        return this.reply(interaction, {
            content,
            flags: MessageFlags.Ephemeral
        });
    }

    static async public(
        interaction: ChatInputCommandInteraction,
        content: string
    ) {
        return this.reply(interaction, {
            content
        });
    }
}
