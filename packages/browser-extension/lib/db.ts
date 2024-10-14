import { DbClient, DexieAdapter, createFactsDB } from "@repo/facts-db";

export const db = new DbClient(
  (table) => new DexieAdapter(table, createFactsDB("facts")),
);
