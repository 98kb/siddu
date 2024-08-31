import {EntityTable} from "dexie";
import {Fact} from "./Fact";

export type FactsDbSchema = {
  facts: EntityTable<Fact, "id">;
};
