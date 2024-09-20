import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeDeleteAll = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("deletes all objects", async () => {
    const payload1 = toPayload(adapter);
    const payload2 = toPayload(adapter);
    await adapter.add(payload1);
    await adapter.add(payload2);
    await adapter.deleteAll();
    const facts = await adapter.getAll();
    expect(facts).toEqual([]);
  });
};
