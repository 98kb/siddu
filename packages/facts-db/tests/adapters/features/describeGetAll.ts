import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeGetAll = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("returns an empty array if there are no objects", async () => {
    const facts = await adapter.getAll();
    expect(facts).toEqual([]);
  });
  it("returns all objects", async () => {
    const payload1 = toPayload(adapter);
    const payload2 = toPayload(adapter);
    const id1 = await adapter.add(payload1);
    const id2 = await adapter.add(payload2);
    const facts = await adapter.getAll();
    expect(facts).toEqual([await adapter.get(id1), await adapter.get(id2)]);
  });
};
