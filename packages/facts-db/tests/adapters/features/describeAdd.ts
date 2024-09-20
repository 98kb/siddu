import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeAdd = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  const payload = toPayload(adapter);
  it("adds an object and returns it's ID", async () => {
    const id = await adapter.add(payload);
    expect(id).not.toBeNaN();
  });

  it("does not mutate the input object", async () => {
    await adapter.add(payload);
    expect(Object.keys(payload)).not.toContain("id");
  });
};
