import {EntityTable} from "dexie";
import {TableSchemas} from "./TableSchemas";

export type Tables = {
  [Table in keyof TableSchemas]: EntityTable<
    TableSchemas[Table]["schema"],
    "id",
    TableSchemas[Table]["insertSchema"]
  >;
};
