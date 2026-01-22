import express from "express";
import { guildsRouter } from "./guilds";

export function startApiServer() {
    const app = express();

    app.use(express.json());

    app.use("/api/guilds", guildsRouter);

    const port = 3001;
    app.listen(port, () => {
        console.log(`[API] Listening on :${port}`);
    });
}
