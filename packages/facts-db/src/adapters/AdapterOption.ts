import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";

export type AdapterOption<T extends keyof Tables> = {
  entity: T;
  schema: TableSchemas[T]["schema"];
  insertSchema: TableSchemas[T]["insertSchema"];
};
