import {IAdapter} from "./IAdapter";
import {Tables} from "../schema/Tables";

export type AdapterFactory = <$TableName extends keyof Tables>(
  tableName: $TableName,
) => IAdapter<$TableName>;
