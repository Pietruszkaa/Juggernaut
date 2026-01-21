import "dotenv/config";
import { createClient } from "./client";
import { loadI18n, watchI18n, t, stopI18nWatcher } from "./i18n/i18n";
import { shutdown, registerShutdownHandler } from "./shutdown";
import { loadAllConfigs } from "./config/configManager";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/guildDelete";

const DEFAULT_LANG = "en";

async function main() {
    if (!process.env.BOT_TOKEN) {
        throw new Error("BOT_TOKEN is not set");
    }

    loadI18n();
    loadAllConfigs();
    watchI18n();

    const client = createClient();

    // --- Zarejestruj eventy tutaj ---
    client.once("clientReady", () => {
        console.log(t(DEFAULT_LANG, "system.bot_ready"));
    });

    client.on("guildCreate", onGuildCreate);
    client.on("guildDelete", onGuildDelete);

    // --- Shutdown handler ---
    registerShutdownHandler(async () => {
        await stopI18nWatcher();
    });

    process.on("SIGINT", () => shutdown(client));
    process.on("SIGTERM", () => shutdown(client));

    // --- Login ---
    await client.login(process.env.BOT_TOKEN);

    console.log(t(DEFAULT_LANG, "system.bot_starting"));
}


main().catch(err => {
    console.error(
        t(DEFAULT_LANG, "system.unknown_error", { error: err.message })
    );
});
