import {IAdapter} from "../..";
import {Tables} from "@repo/facts-db";
import {it} from "vitest";

export const describeOnMutation = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  // TODO: Fix flaky test
  /**
   * This is a flaky test. Sometimes it never resolves.
   */
  it("emits on every mutation", () =>
    new Promise<void>(resolve => {
      let mutationCount = 0;
      const actions = [
        () => adapter.add({content: "test"}),
        () => adapter.deleteAll(),
      ];

      const sub = adapter.onMutation(() => {
        mutationCount++;
        if (mutationCount === actions.length) {
          sub.unsubscribe();
          resolve();
        }
      });

      for (const action of actions) {
        action();
      }
    }));
};
