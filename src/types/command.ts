import { ChatInputCommandInteraction, PermissionResolvable } from "discord.js";

export interface BotCommand {
    name: string;
    description: string;

     // permissions
    defaultMemberPermissions?: bigint;
    ownerOnly?: boolean;

    // per-guild config
    configKey?: string; // np. "core.ping.enabled"

    execute(
        interaction: ChatInputCommandInteraction
    ): Promise<void>;
}
