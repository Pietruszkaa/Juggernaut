import fs from "fs";
import path from "path";
import chokidar, { FSWatcher } from "chokidar";
import { fileURLToPath } from "url";

type LocaleData = Record<string, string>;
type AllLocales = Record<string, LocaleData>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const I18N_PATH = path.join(__dirname, "locales");
const DEFAULT_LANG = "en";

let locales: AllLocales = {};


function loadLocale(lang: string) {
    const langPath = path.join(I18N_PATH, lang);
    if (!fs.existsSync(langPath)) return;

    const files = fs.readdirSync(langPath);
    const data: LocaleData = {};

    for (const file of files) {
        if (!file.endsWith(".json")) continue;

        const filePath = path.join(langPath, file);
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            const json = JSON.parse(content);
            Object.assign(data, json);
        } catch (err) {
            console.error(`[i18n] Failed to load ${filePath}`);
            console.error(err);
        }

    }

    locales[lang] = data;
}

export function loadI18n() {
    locales = {};

    const langs = fs.readdirSync(I18N_PATH, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

    for (const lang of langs) {
        loadLocale(lang);
    }

    console.log("[i18n] loaded");
}


export function t(
    lang: string,
    key: string,
    vars?: Record<string, string | number>
): string {
    const value =
        locales[lang]?.[key] ??
        locales[DEFAULT_LANG]?.[key] ??
        key;

    if (!vars) return value;

    return value.replace(/\{\{(\w+)\}\}/g, (_, v) =>
        String(vars[v] ?? `{{${v}}}`)
    );
}

/* HOT RELOAD */
let watcher: FSWatcher | null = null;

export function watchI18n() {
    watcher = chokidar.watch(I18N_PATH, {
        ignoreInitial: true
    });

    let timeout: NodeJS.Timeout | null = null;

    watcher.on("all", () => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            loadI18n();
            console.log(t(DEFAULT_LANG, "system.i18n_reloaded"));
        }, 100);
    });
}

export async function stopI18nWatcher() {
    if (watcher) {
        await watcher.close();
        watcher = null;
    }
}