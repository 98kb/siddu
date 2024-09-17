import {TRPCService} from "../src/TRPCService";
import {Tables} from "@repo/facts-db";
import {afterAll, beforeAll, beforeEach, describe} from "vitest";
import {createTestClient, createTestServer} from "./util/createTestServer";
import {describeAdapter} from "@repo/facts-service";

type TableNames = keyof Tables;
const tableNames = ["facts"] satisfies TableNames[];
const port = 3333;

for (const tableName of tableNames) {
  const {server, listen} = createTestServer();
  const trpc = new TRPCService(tableName, createTestClient(port));
  describe(TRPCService.name, () => {
    beforeAll(async () => {
      listen(port);
    });
    afterAll(() => {
      server.close();
    });
    beforeEach(async () => {
      await trpc.deleteAll();
    });
    describeAdapter(trpc);
  });
}
