import express from "express";
import { guildsRouter } from "./guilds";
import type { Client } from "discord.js";

let discordClient: Client;

export function startApiServer(client: Client) {
    discordClient = client;
    const app = express();

    app.use(express.json());

    app.use("/api/guilds", guildsRouter);

    const port = 3001;
    app.listen(port, () => {
        console.log(`[API] Listening on :${port}`);
    });
}
