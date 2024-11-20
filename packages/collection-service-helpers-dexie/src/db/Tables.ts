// eslint-disable-next-line import/named
import {EntityTable} from "dexie";
import type {
  FactSchema,
  InsertFactSchema,
  InsertLabelSchema,
  LabelSchema,
} from "@repo/collection-service-defs";

export type Tables = {
  facts: EntityTable<FactSchema, "_id", InsertFactSchema>;
  labels: EntityTable<LabelSchema, "_id", InsertLabelSchema>;
};
