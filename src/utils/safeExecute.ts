// src/utils/safeExecute.ts

import { logger } from "../infra/logger";

interface SafeExecuteContext {
    guildId?: string;
    module?: string;
    event?: string;
}

export async function safeExecute(
    source: string,
    fn: () => Promise<void>,
    context?: SafeExecuteContext
): Promise<void> {
    try {
        await fn();
    } catch (error) {
        logger.error(source, "Unhandled error caught by safeExecute", {
            ...context,
            error:
                error instanceof Error
                    ? {
                          name: error.name,
                          message: error.message,
                          stack: error.stack
                      }
                    : error
        });
    }
}
