import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeGet = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  it("returns the object", async () => {
    const payload = toPayload(adapter);
    const {id} = await adapter.add(payload);
    const retrievedItem = await adapter.get(id);
    expect(retrievedItem?.id).toEqual(id);
  });

  it("returns undefined if the object does not exist", async () => {
    const retrievedFact = await adapter.get(123);
    expect(retrievedFact).toBeUndefined();
  });
};
