import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeTimestamps = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("adds timestamps to the object on creation", async () => {
    const payload = toPayload(adapter);
    const {id} = await adapter.add(payload);
    const retrievedItem = await adapter.get(id);
    expect(retrievedItem?.updatedAt).toBeDefined();
    expect(retrievedItem?.updatedAt).toBeGreaterThan(0);
  });

  it("updates the updatedAt timestamp on modification", async () => {
    const payload = toPayload(adapter);
    const {id, updatedAt} = await adapter.add(payload);
    await sleep(100);
    await adapter.put(id, payload as any);
    const modifiedItem = await adapter.get(id);
    expect(modifiedItem!.updatedAt).toBeGreaterThan(updatedAt!);
  });
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
