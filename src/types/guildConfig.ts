export interface GuildConfig {
    guildId: string;

    configVersion: number;

    language: string;
    
    commands: Record<string, boolean>;
    modules: Record<string, boolean>;
}
