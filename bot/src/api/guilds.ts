// bot/src/api/guilds.ts
import { Router } from "express";
import { getAllGuildConfigs, getGuildConfig } from "../config/configManager";
import { updateGuildConfig } from "../config/configManager";

export const guildsRouter = Router();

guildsRouter.get("/", (_req, res) => {
  const data = getAllGuildConfigs().map(g => ({
    id: g.guildId,
    config: g.config
  }));
  res.json(data);
});

guildsRouter.get("/", (_req, res) => {
  const data = getAllGuildConfigs().map(g => ({
    id: g.guildId
  }));
  res.json(data);
});

// nowy endpoint:
guildsRouter.put("/:guildId/config", (req, res) => {
  const updated = updateGuildConfig(req.params.guildId, req.body);
  res.json(updated);
});
