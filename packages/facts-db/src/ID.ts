import {IDType} from "dexie";
import {TableObjects} from "./TableObjects";
import {TableSchema} from "./TableSchema";

export type ID<T extends keyof TableObjects> = IDType<
  TableObjects[T],
  TableSchema[T]
>;
