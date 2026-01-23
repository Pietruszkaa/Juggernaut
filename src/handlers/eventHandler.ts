import { Client } from "discord.js";
import { logger } from "../infra/logger";
import { safeExecute } from "../utils/safeExecute";
import type { BotEvent } from "../types/event";

import { clientReadyEvent } from "../events/clientReady";
import { guildCreateEvent } from "../events/guildCreate";
import { guildDeleteEvent } from "../events/guildDelete";
import { interactionCreateEvent } from "../events/interactionCreate";

const events: BotEvent<any[]>[] = [
    clientReadyEvent,
    guildCreateEvent,
    guildDeleteEvent,
    interactionCreateEvent
];

export function registerEventHandlers(client: Client) {
    for (const event of events) {
        const handler = (...args: any[]) =>
            safeExecute(`event:${event.name}`, () =>
                event.execute(...args)
            );

        if (event.once) {
            client.once(event.name as any, handler);
        } else {
            client.on(event.name as any, handler);
        }

        logger.debug("events", `Registered event ${event.name}`);
    }
}
