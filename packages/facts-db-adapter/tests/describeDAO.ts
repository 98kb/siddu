import {DAO, ORM} from "@repo/facts-db";
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

type Features = Exclude<
  keyof ORM<"facts">["objects"] | keyof ORM<"facts">,
  "objects"
>;

export const describeDAO = (adapter: DAO<"facts">) => {
  describe(adapter.constructor.name, () => {
    let orm = new ORM(adapter);
    beforeEach(async () => {
      orm = new ORM(adapter);
      await orm.objects.deleteAll();
    });

    const features: Record<Features, Reader<ORM<"facts">, void>> = {
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
