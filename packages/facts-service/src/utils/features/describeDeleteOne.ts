import {IAdapter} from "../../IAdapter";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeDeleteOne = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("deletes the object", async () => {
    const fact: Parameters<typeof adapter.add>[0] = {
      content: "test",
    };
    const id = await adapter.add(fact);
    await adapter.delete(id);
    const retrievedFact = await adapter.get(id);
    expect(retrievedFact).toBeUndefined();
  });
};
