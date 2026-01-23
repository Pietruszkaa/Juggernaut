// src/bot.ts
import "dotenv/config";

import { createClient } from "./client";
import { loadI18n, watchI18n, stopI18nWatcher, t } from "./i18n/i18n";
import { logger } from "./infra/logger";
import { safeExecute } from "./utils/safeExecute";
import { registerEventHandlers } from "./handlers/eventHandler";
import { registerModules } from "./modules";
import { moduleRegistry } from "./services/moduleRegistry";
import { commandHandler } from "./handlers/commandHandler";
import { startDashboardApi } from "./dashboard/server";
import { setDiscordClient } from "./dashboard/routes/guilds";

const DEFAULT_LANG = "en";

async function main() {
    if (!process.env.BOT_TOKEN) {
        logger.fatal("core", "BOT_TOKEN is not set");
        process.exit(1);
    }

    // --- Init core ---
    loadI18n();
    watchI18n();

    const client = createClient();

    client.once("clientReady", async client => {
        logger.info("core", t(DEFAULT_LANG, "system.bot_ready"));
        registerEventHandlers(client);
        setDiscordClient(client);
        startDashboardApi(3000);
        await commandHandler.deploy(
            client.user.id,
            process.env.BOT_TOKEN!
        );
    });

    logger.info("core", t(DEFAULT_LANG, "system.bot_starting"));

    await safeExecute("core:login", async () => {
        await client.login(process.env.BOT_TOKEN!);
    });

    registerModules();
        await moduleRegistry.loadAll();
        await moduleRegistry.enableAll();

}

safeExecute("core:bootstrap", main);
