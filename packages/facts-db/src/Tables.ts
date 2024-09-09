import {EntityTable} from "dexie";
import {Fact} from "./fact/Fact";

export type Tables = {
  facts: EntityTable<Fact, "id">;
};
