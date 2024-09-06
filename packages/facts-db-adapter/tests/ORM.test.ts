import "fake-indexeddb/auto";
import {DAO, createFactsDB} from "@repo/facts-db";
import {DexieAdapter} from "../src/DexieAdapter";
import {IO} from "fp-ts/lib/IO";
import {LocalAdapter} from "../src/LocalAdapter";
import {MemoryAdapter} from "../src/MemoryAdapter";
import {describeDAO} from "./describeDAO";

const adapters: IO<DAO<"facts">>[] = [
  () => new LocalAdapter("test"),
  () => new DexieAdapter(createFactsDB("test"), "facts"),
  () => new MemoryAdapter(),
  // TODO: test runtime adapter
  // () => new RuntimeAdapter(),
];
for (const createAdapter of adapters) {
  const adapter = createAdapter();
  describeDAO(adapter);
}
