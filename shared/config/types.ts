export interface FeatureBase {
    enabled: boolean;
}

export interface GuildConfig {
    language: string;
    features: {
        welcome: FeatureBase & { channelId: string | null };
        goodbye: FeatureBase & { channelId: string | null };
        server_stats: FeatureBase & { channelId: string | null };
        mc_status: FeatureBase & {
            address: string;
            port: string;
            interval: number;
        };
        levels: FeatureBase & {
            xpRate: number;
            channelId: string | null;
        };
        moderation: FeatureBase;
        auto_roles: FeatureBase & { roles: string[] };
        reaction_roles: FeatureBase & { messageId: string | null };
        logs: FeatureBase & { channelId: string | null };
        giveaways: FeatureBase;
        polls: FeatureBase;
        reminders: FeatureBase;
        tickets: FeatureBase;
        economy: FeatureBase;
        profile: FeatureBase;
        custom_commands: FeatureBase;
        announcements: FeatureBase;
        music: FeatureBase & {
            defaultVolume: number;
            allowSpotify: boolean;
        };
    };
}
