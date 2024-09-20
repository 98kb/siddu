import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeDeleteOne = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("deletes the object", async () => {
    const payload = toPayload(adapter);
    const id = await adapter.add(payload);
    await adapter.delete(id);
    const retrievedFact = await adapter.get(id);
    expect(retrievedFact).toBeUndefined();
  });
};
