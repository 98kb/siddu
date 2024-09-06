import {TableObjects} from "./TableObjects";

export type InsertObject<T extends keyof TableObjects> = Omit<
  TableObjects[T],
  "id"
>;
