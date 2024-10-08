import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {beforeEach, expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeGetAll = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  beforeEach(() => adapter.deleteAll());
  it("returns an empty array if there are no objects", async () => {
    const facts = await adapter.getAll();
    expect(facts).toEqual([]);
  });
  it("returns all objects", async () => {
    const payload1 = toPayload(adapter);
    const payload2 = toPayload(adapter);
    const fact1 = await adapter.add(payload1);
    const fact2 = await adapter.add(payload2);
    const facts = await adapter.getAll();
    expect(facts).toEqual([fact1, fact2]);
  });
  it("filter objects if predicate is provided", async () => {
    const payload1 = toPayload(adapter);
    const payload2 = toPayload(adapter);
    const {id} = await adapter.add(payload1);
    await adapter.add(payload2);
    const facts = await adapter.getAll(item => item.id === id);
    expect(facts.length).toBe(1);
    expect(facts).toEqual([await adapter.get(id)]);
  });
};
