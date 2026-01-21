import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const GUILDS_PATH = path.resolve("../bot/src/config/guilds");

router.get("/", (_req: Request, res: Response) => {
    const files = fs.readdirSync(GUILDS_PATH);
    res.json(files.map(f => f.replace(".json", "")));
});

router.get("/:id", (req: Request, res: Response) => {
    const file = path.join(GUILDS_PATH, `${req.params.id}.json`);
    res.json(JSON.parse(fs.readFileSync(file, "utf-8")));
});

router.post("/:id", (req: Request, res: Response) => {
    const file = path.join(GUILDS_PATH, `${req.params.id}.json`);
    fs.writeFileSync(file, JSON.stringify(req.body, null, 4));
    res.json({ ok: true });
});

export default router;
