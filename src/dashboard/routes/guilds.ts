import { Router } from "express";
import { Client } from "discord.js";
import { logger } from "../../infra/logger";

// UWAGA: tymczasowo przekazujemy client
let discordClient: Client | null = null;

export function setDiscordClient(client: Client) {
    discordClient = client;
}

export const guildsRouter = Router();

guildsRouter.get("/", (_req, res) => {
    if (!discordClient) {
        logger.warn("dashboard", "Discord client not ready");
        return res.status(503).json({ error: "Client not ready" });
    }

    const guilds = discordClient.guilds.cache.map(g => ({
        id: g.id,
        name: g.name,
        memberCount: g.memberCount
    }));

    res.json(guilds);
});
