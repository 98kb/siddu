import {MemoryRepo} from "./MemoryRepo";
import {Reader} from "fp-ts/lib/Reader";
import type {
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";

export class LabelsRepository extends MemoryRepo<
  "labels",
  LabelSchema,
  InsertLabelSchema,
  Partial<InsertLabelSchema>,
  LabelsQuerySchema
> {
  toQueryPredicates({
    query,
    isDeleted,
  }: LabelsQuerySchema): Reader<LabelSchema, boolean>[] {
    const predicates = [
      (label: LabelSchema) => Boolean(label.isDeleted) === Boolean(isDeleted),
    ];
    if (query) {
      predicates.push((label: LabelSchema) =>
        label.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return predicates;
  }
}
