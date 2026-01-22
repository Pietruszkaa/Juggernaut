import { GuildConfig } from "./types";

export const DEFAULT_CONFIG: GuildConfig = {
    language: "en",
    features: {
        welcome: { enabled: true, channelId: null },
        goodbye: { enabled: false, channelId: null },
        server_stats: { enabled: true, channelId: null },
        mc_status: { enabled: false, address: "", port: "", interval: 60 },
        levels: { enabled: true, xpRate: 1, channelId: null },
        moderation: { enabled: true },
        auto_roles: { enabled: false, roles: [] },
        reaction_roles: { enabled: false, messageId: null },
        logs: { enabled: true, channelId: null },
        giveaways: { enabled: false },
        polls: { enabled: false },
        reminders: { enabled: false },
        tickets: { enabled: false },
        economy: { enabled: false },
        profile: { enabled: true },
        custom_commands: { enabled: false },
        announcements: { enabled: false },
        music: { enabled: false, defaultVolume: 50, allowSpotify: true }
    }
};
