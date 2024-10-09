// eslint-disable-next-line import/named
import {EntityTable} from "dexie";
import {TableSchemas} from "./TableSchemas";
import {z} from "zod";

export type Tables = {
  [Table in keyof TableSchemas]: EntityTable<
    z.infer<TableSchemas[Table]["schema"]>,
    "id",
    z.infer<TableSchemas[Table]["insertSchema"]>
  >;
};
