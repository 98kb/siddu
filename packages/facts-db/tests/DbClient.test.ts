import {DbClient} from "../src/DbClient";
import {Tables} from "../src/schema/Tables";
import {describe, expect, it} from "vitest";

const tables: (keyof Tables)[] = ["facts", "collections", "labels"];
const adapterFactory = (() => ({})) as any;

describe(DbClient.name, () => {
  it("includes an adapter for every FactsDB table", () => {
    const service = new DbClient(adapterFactory);
    expect(Object.keys(service)).toEqual(tables);
    for (const adapter of Object.values(service)) {
      expect(adapter).toBeDefined();
    }
  });
});
