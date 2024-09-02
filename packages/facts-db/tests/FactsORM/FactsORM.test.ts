/* eslint-disable max-nested-callbacks */
/* eslint-disable max-statements */
import "fake-indexeddb/auto";
import {DAO} from "../../src/DAO";
import {DexieAdapter} from "../../src/DexieAdapter";
import {Fact} from "../../src/Fact";
import {IO} from "fp-ts/lib/IO";
import {LocalAdapter} from "../../src/LocalAdapter";
import {createFactsDB} from "../../src/createFactsDB";
import {describeDAO} from "./describeDAO";

const adapters: IO<DAO<Fact>>[] = [
  () => new LocalAdapter("test"),
  // () => new DexieAdapter(createFactsDB("test")),
];
for (const createAdapter of adapters) {
  const adapter = createAdapter();
  describeDAO(adapter);
}
