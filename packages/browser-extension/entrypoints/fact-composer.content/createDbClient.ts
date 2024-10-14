import {
  DbClient,
  TRPCService,
  createChromeRuntimeClient,
} from "@repo/facts-db";

export function createDbClient() {
  return new DbClient(
    (table) => new TRPCService(table, createChromeRuntimeClient()),
  );
}
