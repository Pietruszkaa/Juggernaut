export interface BotModule {
    name: string;
    version: string;

    onLoad?(): Promise<void>;
    onEnable?(): Promise<void>;
    onDisable?(): Promise<void>;
}
