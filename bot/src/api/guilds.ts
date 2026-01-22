import { Router } from "express";
import { getGuildConfig } from "../config/configManager";

export const guildsRouter = Router();

// The "/" route is removed or should be implemented differently if needed.

guildsRouter.get("/:guildId", (req, res) => {
    const config = getGuildConfig(req.params.guildId);
    if (!config) {
        return res.status(404).json({ error: "Guild not found" });
    }
    res.json(config);
});
