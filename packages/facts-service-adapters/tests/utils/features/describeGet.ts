import {IAdapter} from "@repo/facts-service";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeGet = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  it("returns the object", async () => {
    const fact: Parameters<typeof adapter.add>[0] = {
      content: "test",
    };
    const id = await adapter.add(fact);
    const retrievedFact = await adapter.get(id);
    expect(retrievedFact).toEqual({...fact, id});
  });

  it("returns undefined if the object does not exist", async () => {
    const retrievedFact = await adapter.get(123);
    expect(retrievedFact).toBeUndefined();
  });
};
