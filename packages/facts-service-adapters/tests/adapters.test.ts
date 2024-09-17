import {DexieAdapter} from "../src/DexieAdapter";
import {TRPCService} from "../src/TRPCService";
import {Tables, createFactsDB} from "@repo/facts-db";
import {afterAll, beforeEach, describe} from "vitest";
import {createMemoryAdapter} from "../src/createMemoryAdapter";
import {createTestClient, createTestServer} from "./utils/createTestServer";
import {describeAdapter} from "./utils/describeAdapter";

type TableNames = keyof Tables;
const tableNames = ["facts"] satisfies TableNames[];
const {server, listen} = createTestServer();
const {port} = listen(0);

afterAll(() => {
  server.close();
});

for (const tableName of tableNames) {
  const adapters = [
    () => new DexieAdapter(tableName, createFactsDB("test")),
    () => createMemoryAdapter(tableName),
    () => new TRPCService(tableName, createTestClient(port as number)),
  ];

  for (const factory of adapters) {
    const adapter = factory();
    describe(adapter.constructor.name, () => {
      beforeEach(async () => {
        await adapter.deleteAll();
      });
      describeAdapter(adapter);
    });
  }
}
