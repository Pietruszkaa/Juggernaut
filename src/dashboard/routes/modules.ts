import { Router } from "express";
import { moduleRegistry } from "../../services/moduleRegistry";

export const modulesRouter = Router();

modulesRouter.get("/", (_req, res) => {
    res.json(moduleRegistry.list());
});
