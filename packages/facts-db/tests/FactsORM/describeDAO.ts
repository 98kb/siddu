import {DAO} from "../../src/DAO";
import {Fact} from "../../src/Fact";
import {FactsORM} from "../../src/FactsORM";
import {Reader} from "fp-ts/lib/Reader";
import {beforeEach, describe} from "vitest";
import {describeAddOne} from "./features/describeAddOne";
import {describeDeleteAll} from "./features/describeDeleteAll";
import {describeDeleteOne} from "./features/describeDeleteOne";
import {describeFilter} from "./features/describeFilter";
import {describeGetAll} from "./features/describeGetAll";
import {describeGetOne} from "./features/describeGetOne";
import {describeToObservable} from "./features/describeToObservable";
import {describeUpdateOne} from "./features/describeUpdateOne";

type Features = Exclude<keyof FactsORM["objects"] | keyof FactsORM, "objects">;

export const describeDAO = (adapter: DAO<Fact>) => {
  describe(adapter.constructor.name, () => {
    let orm = new FactsORM(adapter);
    beforeEach(async () => {
      orm = new FactsORM(adapter);
      await orm.objects.deleteAll();
    });

    const features: Record<Features, Reader<FactsORM, void>> = {
      addOne: describeAddOne,
      deleteAll: describeDeleteAll,
      deleteOne: describeDeleteOne,
      filter: describeFilter,
      getAll: describeGetAll,
      getOne: describeGetOne,
      toObservable: describeToObservable,
      updateOne: describeUpdateOne,
    };

    for (const [feature, test] of Object.entries(features)) {
      describe(feature, () => test(orm));
    }
  });
};
