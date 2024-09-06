import {EntityTable} from "dexie";
import {TableObjects} from "./TableObjects";
import {TableSchema} from "./TableSchema";

export type Table<T extends keyof TableObjects> = EntityTable<
  TableObjects[T],
  TableSchema[T]
>;
