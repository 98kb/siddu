import {IAdapter} from "../../src/IAdapter";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeAdd = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  const fact: Parameters<typeof adapter.add>[0] = {
    content: "test",
  };
  it("adds an object and returns it's ID", async () => {
    const id = await adapter.add(fact);
    expect(id).not.toBeNaN();
  });

  it("does not mutate the input object", async () => {
    await adapter.add(fact);
    expect(Object.keys(fact)).not.toContain("id");
  });
};
