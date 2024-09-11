import {IAdapter} from "../../src/IAdapter";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeGetAll = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("returns an empty array if there are no objects", async () => {
    const facts = await adapter.getAll();
    expect(facts).toEqual([]);
  });
  it("returns all objects", async () => {
    const fact1: Parameters<typeof adapter.add>[0] = {
      content: "test1",
    };
    const fact2: Parameters<typeof adapter.add>[0] = {
      content: "test2",
    };
    const id1 = await adapter.add(fact1);
    const id2 = await adapter.add(fact2);
    const facts = await adapter.getAll();
    expect(facts).toEqual([await adapter.get(id1), await adapter.get(id2)]);
  });
};
