import {Fact} from "./Fact";
import Dexie, {EntityTable} from "dexie";

export type DexieDb = Dexie & {
  facts: EntityTable<Fact, "id">;
};
