import {IAdapter} from "../../src/adapters/IAdapter";
import {Reader} from "fp-ts/lib/Reader";
import {Tables} from "../../src/schema/Tables";
import {describe, expect, it} from "vitest";
import {describeAdd} from "./features/describeAdd";
import {describeDeleteAll} from "./features/describeDeleteAll";
import {describeDeleteOne} from "./features/describeDeleteOne";
import {describeGet} from "./features/describeGet";
import {describeGetAll} from "./features/describeGetAll";
import {describeOnMutation} from "./features/describeOnMutation";
import {describePut} from "./features/describePut";
import {describeTimestamps} from "./features/describeTimestamps";

type Features = keyof IAdapter<keyof Tables> & "timestamps";

// TODO: simplify unit tests of adapters

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
    put: describePut,
    options: adapter => {
      it("has options", () => {
        expect(adapter.options.entity).toBeDefined();
        expect(adapter.options.schema).toBeDefined();
        expect(adapter.options.insertSchema).toBeDefined();
      });
    },
    timestamps: describeTimestamps,
  };

  for (const [feature, test] of Object.entries(features)) {
    describe(feature, () => (test as Reader<IAdapter<T>, void>)(adapter));
  }
};
