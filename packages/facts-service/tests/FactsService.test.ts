import {AdapterFactory} from "../src/AdapterFactory";
import {FactsService} from "./../src/FactsService";
import {MemoryAdapter} from "../src/MemoryAdapter";
import {Tables} from "@repo/facts-db";
import {describe, expect, it} from "vitest";

const tables: (keyof Tables)[] = ["facts"];
const adapterFactory: AdapterFactory = table => new MemoryAdapter(table);

describe(FactsService.name, () => {
  it("includes an adapter for every FactsDB table", () => {
    const service = new FactsService(adapterFactory);
    expect(Object.keys(service)).toEqual(tables);
    for (const adapter of Object.values(service)) {
      expect(adapter).toBeInstanceOf(MemoryAdapter);
    }
  });
});
