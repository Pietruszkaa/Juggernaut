import "dotenv/config";
import { createClient } from "./client";
import { loadI18n, watchI18n, stopI18nWatcher, t } from "./i18n/i18n";
import { shutdown, registerShutdownHandler } from "./shutdown";
import { loadAllConfigs } from "./config/configManager";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/guildDelete";
import { startApiServer } from "./api";

const DEFAULT_LANG = "en";

async function main() {
    if (!process.env.BOT_TOKEN) {
        throw new Error("BOT_TOKEN is not set");
    }

    // --- Init core ---
    loadI18n();
    watchI18n();
    loadAllConfigs();

    const client = createClient();

    // --- Discord events ---
    client.on("guildCreate", onGuildCreate);
    client.on("guildDelete", onGuildDelete);

    client.once("ready", () => {
        console.log(t(DEFAULT_LANG, "system.bot_ready"));

        // API startuje DOPIERO gdy bot jest gotowy
        startApiServer(client);
    });

    // --- Shutdown ---
    registerShutdownHandler(async () => {
        await stopI18nWatcher();
    });

    process.on("SIGINT", () => shutdown(client));
    process.on("SIGTERM", () => shutdown(client));

    console.log(t(DEFAULT_LANG, "system.bot_starting"));
    await client.login(process.env.BOT_TOKEN);
}

main().catch(err => {
    console.error(
        t(DEFAULT_LANG, "system.unknown_error", { error: err.message })
    );
});


