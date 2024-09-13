import {DexieAdapter, FactsService} from "@repo/facts-service";
import {addContextMenus} from "./background/addContextMenus";
import {createChromeRuntimeServer} from "@repo/facts-service-trpc";
import {createFactsDB} from "@repo/facts-db";

export const db = new FactsService(
  table => new DexieAdapter(table, createFactsDB("facts")),
);

export default defineBackground(() => {
  addContextMenus(db);
  createChromeRuntimeServer(db);
});
