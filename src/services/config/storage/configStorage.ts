import type { GuildConfig } from "../../../types/guildConfig";

export interface ConfigStorage {
    get(guildId: string): Promise<GuildConfig>;
    getAll(): Promise<{ guildId: string; config: GuildConfig }[]>;
    update(
        guildId: string,
        partial: Partial<GuildConfig>
    ): Promise<GuildConfig>;
}
