export type Language = "en" | "pl";

// Base feature toggle
export interface FeatureToggle {
    enabled: boolean;
}

// Features with channel binding
export interface ChannelFeature extends FeatureToggle {
    channelId: string | null;
}

// Welcome / Goodbye
export type WelcomeConfig = ChannelFeature;
export type GoodbyeConfig = ChannelFeature;

// Server stats
export type ServerStatsConfig = ChannelFeature;

// Minecraft status
export interface McStatusConfig extends FeatureToggle {
    address: string;
    port: string;
    interval: number;
}

// Levels
export interface LevelsConfig extends FeatureToggle {
    xpRate: number;
    channelId: string | null;
}

// Moderation
export type ModerationConfig = FeatureToggle;

// Auto roles
export interface AutoRolesConfig extends FeatureToggle {
    roles: string[];
}

// Reaction roles
export interface ReactionRolesConfig extends FeatureToggle {
    messageId: string | null;
}

// Logs
export type LogsConfig = ChannelFeature;

// Simple toggles
export type GiveawaysConfig = FeatureToggle;
export type PollsConfig = FeatureToggle;
export type RemindersConfig = FeatureToggle;
export type TicketsConfig = FeatureToggle;
export type EconomyConfig = FeatureToggle;
export type ProfileConfig = FeatureToggle;
export type CustomCommandsConfig = FeatureToggle;
export type AnnouncementsConfig = FeatureToggle;

// Music
 
export interface MusicConfig extends FeatureToggle {
    defaultVolume: number;
    allowSpotify: boolean;
}

// All features
export interface FeaturesConfig {
    welcome: WelcomeConfig;
    goodbye: GoodbyeConfig;
    server_stats: ServerStatsConfig;
    mc_status: McStatusConfig;
    levels: LevelsConfig;
    moderation: ModerationConfig;
    auto_roles: AutoRolesConfig;
    reaction_roles: ReactionRolesConfig;
    logs: LogsConfig;
    giveaways: GiveawaysConfig;
    polls: PollsConfig;
    reminders: RemindersConfig;
    tickets: TicketsConfig;
    economy: EconomyConfig;
    profile: ProfileConfig;
    custom_commands: CustomCommandsConfig;
    announcements: AnnouncementsConfig;
    music: MusicConfig;
}

// Guild config
export interface GuildConfig {
    language: Language;
    features: FeaturesConfig;
}

export type FeatureKey = keyof FeaturesConfig;
