import { Guild } from "discord.js";
import { configService } from "./config/configService";
import { logger } from "../infra/logger";

class GuildService {
    onGuildCreate(guild: Guild) {
        logger.info("guild", "Initializing guild", {
            guildId: guild.id,
            name: guild.name
        });

        configService.get(guild.id);
    }

    onGuildDelete(guild: Guild) {
        logger.info("guild", "Guild removed", {
            guildId: guild.id,
            name: guild.name
        });

        // Na razie nic nie usuwamy – tylko log
        // przyszłość: archiwizacja / cleanup
    }
}

export const guildService = new GuildService();
