import {IAdapter} from "../../IAdapter";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeDeleteAll = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("deletes all objects", async () => {
    const fact1: Parameters<typeof adapter.add>[0] = {
      content: "test1",
    };
    const fact2: Parameters<typeof adapter.add>[0] = {
      content: "test2",
    };
    await adapter.add(fact1);
    await adapter.add(fact2);
    await adapter.deleteAll();
    const facts = await adapter.getAll();
    expect(facts).toEqual([]);
  });
};
