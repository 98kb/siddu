import {EntityTable} from "dexie";
import {TableObjects} from "./TableObjects";
import {TableSchema} from "./TableSchema";

export type FactsDbSchema = {
  // facts: EntityTable<Fact, "id">;
  [T in keyof TableObjects]: EntityTable<TableObjects[T], TableSchema[T]>;
};
