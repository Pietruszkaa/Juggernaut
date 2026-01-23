// src/infra/logger.ts

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

const LOG_LEVELS: Record<LogLevel, number> = {
    DEBUG: 10,
    INFO: 20,
    WARN: 30,
    ERROR: 40,
    FATAL: 50
};

const CURRENT_LEVEL: LogLevel =
    process.env.NODE_ENV === "development" ? "DEBUG" : "INFO";

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LEVEL];
}

function formatTimestamp(): string {
    return new Date().toISOString();
}

function formatContext(context?: unknown): string {
    if (!context) return "";
    try {
        return JSON.stringify(context);
    } catch {
        return "[unserializable context]";
    }
}

function log(
    level: LogLevel,
    source: string,
    message: string,
    context?: unknown
) {
    if (!shouldLog(level)) return;

    const timestamp = formatTimestamp();
    const ctx = formatContext(context);

    const output = `[${timestamp}] [${level}] [${source}] ${message}${
        ctx ? " | " + ctx : ""
    }`;

    switch (level) {
        case "WARN":
            console.warn(output);
            break;
        case "ERROR":
        case "FATAL":
            console.error(output);
            break;
        default:
            console.log(output);
    }
}

export const logger = {
    debug: (source: string, message: string, context?: unknown) =>
        log("DEBUG", source, message, context),

    info: (source: string, message: string, context?: unknown) =>
        log("INFO", source, message, context),

    warn: (source: string, message: string, context?: unknown) =>
        log("WARN", source, message, context),

    error: (source: string, message: string, context?: unknown) =>
        log("ERROR", source, message, context),

    fatal: (source: string, message: string, context?: unknown) =>
        log("FATAL", source, message, context)
};
