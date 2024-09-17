import {FactsService} from "./../src/FactsService";
import {Tables} from "@repo/facts-db";
import {describe, expect, it} from "vitest";

const tables: (keyof Tables)[] = ["facts"];
const adapterFactory = (() => ({})) as any;

describe(FactsService.name, () => {
  it("includes an adapter for every FactsDB table", () => {
    const service = new FactsService(adapterFactory);
    expect(Object.keys(service)).toEqual(tables);
    for (const adapter of Object.values(service)) {
      expect(adapter).toBeDefined();
    }
  });
});
