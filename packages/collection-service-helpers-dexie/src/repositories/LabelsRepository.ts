import {DexieRepository} from "./DexieRepository";
import {Reader} from "fp-ts/lib/Reader";
import type {
  ILabelsQuery,
  InsertLabelSchema,
  LabelSchema,
} from "@repo/collection-service-defs";

export class LabelsRepository extends DexieRepository<
  "labels",
  LabelSchema,
  InsertLabelSchema,
  Partial<InsertLabelSchema>,
  ILabelsQuery
> {
  toQueryPredicates({
    query,
    isDeleted,
  }: ILabelsQuery): Reader<LabelSchema, boolean>[] {
    const predicates = [
      (label: LabelSchema) => Boolean(label.isDeleted) === Boolean(isDeleted),
    ];

    if (query) {
      predicates.push((label: LabelSchema) => label.name.includes(query));
    }
    return predicates;
  }
}
