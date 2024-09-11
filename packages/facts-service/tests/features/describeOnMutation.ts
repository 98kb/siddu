import {IAdapter} from "../../src";
import {Tables} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeOnMutation = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("emits on every mutation", async () => {
    let mutationCount = 0;
    const sub = adapter.onMutation$.subscribe(() => mutationCount++);
    const actions = [
      await adapter.add({content: "test"}),
      await adapter.add({content: "test"}),
      await adapter.deleteAll(),
    ];
    sub.unsubscribe();
    expect(mutationCount).toEqual(actions.length);
  });
};
