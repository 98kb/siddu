import {IAdapter} from "../../../src/adapters/IAdapter";
import {Tables} from "../../../src/schema/Tables";
import {it} from "vitest";
import {toPayload} from "../../utils/toPayload";

export const describeOnMutation = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  it("emits on every mutation", () =>
    new Promise<void>(resolve => {
      let mutationCount = 0;
      const actions = [
        () => adapter.add(toPayload(adapter)),
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
