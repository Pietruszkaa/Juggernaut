import fs from "fs";
import path from "path";
import { DEFAULT_CONFIG, mergeWithDefaults } from "@shared/config";
import type { GuildConfig } from "@shared/config";
import { Client } from "discord.js";


const DATA_DIR = path.resolve(process.cwd(), "data/guilds");

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function getGuildFile(guildId: string) {
    return path.join(DATA_DIR, `${guildId}.json`);
}

/**
 * Wczytuje (lub tworzy) config dla jednej gildii
 */
export function getGuildConfig(guildId: string): GuildConfig {
    ensureDataDir();
    const file = getGuildFile(guildId);

    if (!fs.existsSync(file)) {
        const fresh = structuredClone(DEFAULT_CONFIG) as GuildConfig;
        fs.writeFileSync(file, JSON.stringify(fresh, null, 2));
        return fresh;
    }

    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
    const merged = mergeWithDefaults(DEFAULT_CONFIG, raw);

    // normalizacja przy starcie
    fs.writeFileSync(file, JSON.stringify(merged, null, 2));
    return merged;
}
export function ensureConfigsForAllGuilds(client: Client) {
    for (const guild of client.guilds.cache.values()) {
        getGuildConfig(guild.id);
    }

    console.log("[config] ensured configs for all guilds");
}



/**
 * Zwraca wszystkie configi (do API / dashboardu)
 */
export function getAllGuildConfigs(): {
    guildId: string;
    config: GuildConfig;
}[] {
    ensureDataDir();

    return fs.readdirSync(DATA_DIR)
        .filter(f => f.endsWith(".json"))
        .map(file => {
            const guildId = file.replace(".json", "");
            return {
                guildId,
                config: getGuildConfig(guildId)
            };
        });
}

/**
 * Aktualizacja configu (dashboard / API)
 */
export function updateGuildConfig(
    guildId: string,
    partial: Partial<GuildConfig>
): GuildConfig {
    const current = getGuildConfig(guildId);
    const updated = mergeWithDefaults(current, partial);

    fs.writeFileSync(
        getGuildFile(guildId),
        JSON.stringify(updated, null, 2)
    );

    return updated;
}

/**
 * Wołane przy starcie bota
 */
export function loadAllConfigs(): void {
    ensureDataDir();
    console.log("[config] ready");
}
