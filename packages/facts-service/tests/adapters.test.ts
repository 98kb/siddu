import {DexieAdapter} from "../src/DexieAdapter";
import {Tables, createFactsDB} from "@repo/facts-db";
import {beforeEach, describe} from "vitest";
import {createMemoryAdapter} from "../src/createMemoryAdapter";
import {describeAdapter} from "../src/utils/describeAdapter";

type TableNames = keyof Tables;
const tableNames = ["facts"] satisfies TableNames[];

for (const tableName of tableNames) {
  const adapters = [
    new DexieAdapter(tableName, createFactsDB("test")),
    createMemoryAdapter(tableName),
  ];

  for (const adapter of adapters) {
    describe(adapter.constructor.name, () => {
      beforeEach(async () => {
        await adapter.deleteAll();
      });
      describeAdapter(adapter);
    });
  }
}
