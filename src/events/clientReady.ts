import { Client } from "discord.js";
import { logger } from "../infra/logger";
import { t } from "../i18n/i18n";
import type { BotEvent } from "../types/event";

const DEFAULT_LANG = "en";

export const clientReadyEvent: BotEvent<[Client]> = {
    name: "clientReady",
    once: true,
    async execute(client) {
        logger.info("core", t(DEFAULT_LANG, "system.bot_ready"));
        logger.info("core", `Connected as ${client.user?.tag}`);
    }
};
