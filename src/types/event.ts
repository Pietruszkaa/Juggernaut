export interface BotEvent<T extends any[] = any[]> {
    name: string;
    once: boolean;
    execute: (...args: T) => Promise<void>;
}
