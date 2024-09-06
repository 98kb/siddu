import {MemoryAdapter} from "./../../src/MemoryAdapter";
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-statements */
import "fake-indexeddb/auto";
import {DAO} from "../../src/DAO";
import {DexieAdapter} from "../../src/DexieAdapter";
import {IO} from "fp-ts/lib/IO";
import {LocalAdapter} from "../../src/LocalAdapter";
import {createFactsDB} from "../../src/createFactsDB";
import {describeDAO} from "./describeDAO";

const adapters: IO<DAO<"facts">>[] = [
  () => new LocalAdapter("test"),
  () => new DexieAdapter(createFactsDB("test"), "facts"),
  () => new MemoryAdapter(),
];
for (const createAdapter of adapters) {
  const adapter = createAdapter();
  describeDAO(adapter);
}
