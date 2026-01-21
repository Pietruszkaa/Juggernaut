import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { DEFAULT_CONFIG, mergeWithDefaults } from "../../shared/config";
import type { GuildConfig } from "../../shared/config";

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GUILDS_PATH = path.join(__dirname, "guilds");

const configs = new Map<string, GuildConfig>();

function loadGuildConfig(guildId: string): GuildConfig {
    const file = path.join(GUILDS_PATH, `${guildId}.json`);

    if (!fs.existsSync(file)) {
        return structuredClone(DEFAULT_CONFIG as GuildConfig);
    }

    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
    return mergeWithDefaults(DEFAULT_CONFIG as GuildConfig, raw);
}

export function loadAllConfigs() {
    configs.clear();

    if (!fs.existsSync(GUILDS_PATH)) {
        fs.mkdirSync(GUILDS_PATH, { recursive: true });
        return;
    }

    const files = fs.readdirSync(GUILDS_PATH);

    for (const file of files) {
        if (!file.endsWith(".json")) continue;

        const guildId = file.replace(".json", "");
        const config = loadGuildConfig(guildId);

        configs.set(guildId, config);
    }

    console.log("[config] loaded");
}

export function getGuildConfig(guildId: string): GuildConfig {
    if (!configs.has(guildId)) {
        const config = structuredClone(DEFAULT_CONFIG as GuildConfig);
        configs.set(guildId, config);
        return config;
    }

    return configs.get(guildId)!;
}

export function saveGuildConfig(guildId: string, config: GuildConfig) {
    if (!fs.existsSync(GUILDS_PATH)) {
        fs.mkdirSync(GUILDS_PATH, { recursive: true });
    }

    const file = path.join(GUILDS_PATH, `${guildId}.json`);
    fs.writeFileSync(file, JSON.stringify(config, null, 4), "utf-8");
}

export function hasGuildConfig(guildId: string): boolean {
    return configs.has(guildId);
}

export function initGuildConfig(guildId: string): GuildConfig {
    const config = structuredClone(DEFAULT_CONFIG as GuildConfig);

    saveGuildConfig(guildId, config);
    configs.set(guildId, config);

    return config;
}
export { GUILDS_PATH, configs };