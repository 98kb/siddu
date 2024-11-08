import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {expect, it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describePut = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  // eslint-disable-next-line max-statements
  it("updates an existing object", async () => {
    const payload = toPayload(adapter);
    const {id} = await adapter.add(payload);

    let key = "content";
    if (
      adapter.options.entity === "collections" ||
      adapter.options.entity === "labels"
    ) {
      key = "name";
    }
    payload[key] = "updated";

    await adapter.put(id, payload as any);
    const modifiedItem = await adapter.get(id);
    expect(modifiedItem?.id).toEqual(id);
    expect(modifiedItem?.[key]).toEqual("updated");
  });
};
