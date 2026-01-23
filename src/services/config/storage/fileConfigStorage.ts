import fs from "fs/promises";
import path from "path";
import type { GuildConfig } from "../../../types/guildConfig";
import type { ConfigStorage } from "./configStorage";

const DATA_DIR = path.resolve(process.cwd(), "data/guilds");

export class FileConfigStorage implements ConfigStorage {
    private async ensureDir() {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }

    private getFilePath(guildId: string) {
        return path.join(DATA_DIR, `${guildId}.json`);
    }

    async get(guildId: string): Promise<GuildConfig> {
        await this.ensureDir();
        const file = this.getFilePath(guildId);

        try {
            const raw = await fs.readFile(file, "utf-8");
            return JSON.parse(raw) as GuildConfig;
        } catch {
            const fresh: GuildConfig = {
                guildId,
                configVersion: 1,
                language: "en",
                modules: {}
            };

            await fs.writeFile(file, JSON.stringify(fresh, null, 2));
            return fresh;
        }
    }

    async getAll() {
        await this.ensureDir();
        const files = await fs.readdir(DATA_DIR);

        const results = [];
        for (const file of files) {
            if (!file.endsWith(".json")) continue;
            const guildId = file.replace(".json", "");
            const config = await this.get(guildId);
            results.push({ guildId, config });
        }

        return results;
    }

    async update(
        guildId: string,
        partial: Partial<GuildConfig>
    ): Promise<GuildConfig> {
        const current = await this.get(guildId);
        const updated = { ...current, ...partial };

        await fs.writeFile(
            this.getFilePath(guildId),
            JSON.stringify(updated, null, 2)
        );

        return updated;
    }
}
