import { FileConfigStorage } from "./storage/fileConfigStorage";
import type { GuildConfig } from "../../types/guildConfig";
import type { ConfigStorage } from "./storage/configStorage";
import { logger } from "../../infra/logger";

class ConfigService {
    constructor(private storage: ConfigStorage) {}

    async get(guildId: string): Promise<GuildConfig> {
        logger.debug("config", "Get guild config", { guildId });
        return this.storage.get(guildId);
    }

    async getAll() {
        logger.debug("config", "Get all guild configs");
        return this.storage.getAll();
    }

    async update(
        guildId: string,
        partial: Partial<GuildConfig>
    ): Promise<GuildConfig> {
        logger.info("config", "Update guild config", { guildId });
        return this.storage.update(guildId, partial);
    }
}

export const configService = new ConfigService(
    new FileConfigStorage()
);
