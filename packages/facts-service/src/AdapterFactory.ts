import {IAdapter} from "./IAdapter";
import {Tables} from "@repo/facts-db";

export type AdapterFactory = <$TableName extends keyof Tables>(
  tableName: $TableName,
) => IAdapter<$TableName>;
