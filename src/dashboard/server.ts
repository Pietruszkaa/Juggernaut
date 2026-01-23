import express from "express";
import { logger } from "../infra/logger";

import { healthRouter } from "./routes/health";
import { modulesRouter } from "./routes/modules";
import { guildsRouter } from "./routes/guilds";
import { configsRouter } from "./routes/configs";

export function startDashboardApi(port = 3000) {
    const app = express();

    app.use(express.json());

    app.use("/api/health", healthRouter);
    app.use("/api/modules", modulesRouter);
    app.use("/api/guilds", guildsRouter);
    app.use("/api/configs", configsRouter);

    app.listen(port, () => {
        logger.info("dashboard", `Dashboard API listening on :${port}`);
    });
}
