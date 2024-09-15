import {DexieAdapter} from "../src/DexieAdapter";
import {MemoryAdapter} from "../src/MemoryAdapter";
import {Server} from "node:http";
import {TRPCService} from "../src/TRPCService";
import {Tables, createFactsDB} from "@repo/facts-db";
import {afterAll, beforeAll, beforeEach, describe} from "vitest";
import {createTestClient, createTestServer} from "./util/createTestServer";
import {describeAdapter} from "./describeAdapter";

type TableNames = keyof Tables;
const tableNames = ["facts"] satisfies TableNames[];

for (const tableName of tableNames) {
  const adapters = [
    new TRPCService(tableName, createTestClient()),
    new DexieAdapter(tableName, createFactsDB("test")),
    new MemoryAdapter(tableName),
  ];

  for (const adapter of adapters) {
    describe(adapter.constructor.name, () => {
      if (adapter instanceof TRPCService) {
        let server: Server;
        beforeAll(async () => {
          server = await createTestServer();
        });
        afterAll(() => {
          server.close();
        });
      }
      beforeEach(async () => {
        await adapter.deleteAll();
      });
      describeAdapter(adapter);
    });
  }
}
