import { moduleRegistry } from "../services/moduleRegistry";
import { coreModule } from "./core";
import { devToolsModule } from "./devTools";

export function registerModules() {
    moduleRegistry.register(coreModule);
    moduleRegistry.register(devToolsModule);
}
