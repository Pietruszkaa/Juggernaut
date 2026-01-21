import { Client } from "discord.js";
import { t } from "./i18n/i18n";

const DEFAULT_LANG = "en";

type ShutdownHandler = () => Promise<void> | void;

const handlers: ShutdownHandler[] = [];

export function registerShutdownHandler(handler: ShutdownHandler) {
    handlers.push(handler);
}

export async function shutdown(client?: Client) {
    console.log(t(DEFAULT_LANG, "system.bot_shutdown"));

    for (const handler of handlers) {
        try {
            await handler();
        } catch (err) {
            console.error("[shutdown] handler failed", err);
        }
    }

    if (client) {
        try {
            await client.destroy();
        } catch (err) {
            console.error("[shutdown] client destroy failed", err);
        }
    }

    process.exit(0);
}
