import { ChatInputCommandInteraction, REST, Routes } from "discord.js";
import type { BotCommand } from "../types/command";
import { logger } from "../infra/logger";
import { configService } from "../services/config/configService";
import { CommandResponse } from "../utils/commandResponse";
import { isOwner } from "../utils/permissionChecker";

export class CommandHandler {
    private commands = new Map<string, BotCommand>();

    register(command: BotCommand) {
        if (this.commands.has(command.name)) {
            throw new Error(`Command ${command.name} already registered`);
        }

        this.commands.set(command.name, command);
        logger.info("commands", `Registered command /${command.name}`);
    }

    async handle(interaction: ChatInputCommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (!command) return;

    // OWNER ONLY
    if (command.ownerOnly && !isOwner(interaction)) {
        return CommandResponse.ephemeral(
            interaction,
            "❌ Only the bot owner can use this command."
        );
    }

    // DISCORD PERMISSIONS
    if (command.defaultMemberPermissions) {
    const memberPerms = interaction.memberPermissions;

    if (!memberPerms || !memberPerms.has(command.defaultMemberPermissions)) {
        return CommandResponse.ephemeral(
            interaction,
            "❌ You don't have permission to use this command."
        );
    }
}

    // PER-GUILD CONFIG
    if (interaction.guildId && command.configKey) {
        const config = await configService.get(interaction.guildId);
        const enabled = config.commands?.[command.name] ?? true;

        if (!enabled) {
            return CommandResponse.ephemeral(
                interaction,
                "⚠️ This command is disabled on this server."
            );
        }
    }

    await command.execute(interaction);
}


    async deploy(clientId: string, token: string) {
        const rest = new REST({ version: "10" }).setToken(token);

        const data = Array.from(this.commands.values()).map(cmd => ({
            name: cmd.name,
            description: cmd.description
        }));

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: data }
        );

        logger.info("commands", "Slash commands deployed");
    }
}

export const commandHandler = new CommandHandler();
