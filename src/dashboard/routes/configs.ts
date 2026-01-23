import { Router } from "express";
import { configService } from "../../services/config/configService";

export const configsRouter = Router();

configsRouter.get("/", async (_req, res) => {
    const configs = await configService.getAll();
    res.json(configs);
});
