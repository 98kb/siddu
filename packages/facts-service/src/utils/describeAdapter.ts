import {IAdapter} from "../IAdapter";
import {Reader} from "fp-ts/lib/Reader";
import {Tables} from "@repo/facts-db";
import {describe, expect, it} from "vitest";
import {describeAdd} from "./features/describeAdd";
import {describeDeleteAll} from "./features/describeDeleteAll";
import {describeDeleteOne} from "./features/describeDeleteOne";
import {describeGet} from "./features/describeGet";
import {describeGetAll} from "./features/describeGetAll";
import {describeOnMutation} from "./features/describeOnMutation";

type Features = keyof IAdapter<keyof Tables>;

export const describeAdapter = <T extends keyof Tables>(
  adapter: IAdapter<T>,
) => {
  const features: Record<Features, Reader<IAdapter<T>, void>> = {
    add: describeAdd,
    deleteAll: describeDeleteAll,
    delete: describeDeleteOne,
    getAll: describeGetAll,
    get: describeGet,
    onMutation: describeOnMutation,
    entity: adapter => {
      it("has an entity", () => {
        expect(adapter.entity).toBeDefined();
      });
    },
  };

  for (const [feature, test] of Object.entries(features)) {
    describe(feature, () => test(adapter));
  }
};
