import {DexieAdapter} from "@repo/facts-service-adapters";
import {FactsService} from "@repo/facts-service";
import {createFactsDB} from "@repo/facts-db";

export const db = new FactsService(
  table => new DexieAdapter(table, createFactsDB("facts")),
);
