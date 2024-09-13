import {DexieAdapter} from "../src/DexieAdapter";
import {MemoryAdapter} from "../src/MemoryAdapter";
import {Tables, createFactsDB} from "@repo/facts-db";
import {beforeEach, describe} from "vitest";
import {describeAdapter} from "./describeAdapter";

type TableNames = keyof Tables;
const tableNames = ["facts"] satisfies TableNames[];

for (const tableName of tableNames) {
  const adapters = [
    new DexieAdapter(tableName, createFactsDB("test")),
    new MemoryAdapter(tableName),
  ];

  for (const adapter of adapters) {
    describe(adapter.constructor.name, () => {
      beforeEach(async () => await adapter.deleteAll());
      describeAdapter(adapter);
    });
  }
}
