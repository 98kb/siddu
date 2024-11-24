import {MemoryRepo} from "./MemoryRepo";
import {Reader} from "fp-ts/lib/Reader";
import type {
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";

// TODO: re-organize dexie and memory repos to avoid code duplication
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
    exclude,
  }: LabelsQuerySchema): Reader<LabelSchema, boolean>[] {
    const predicates: Reader<LabelSchema, boolean>[] = [
      label => Boolean(label.isDeleted) === Boolean(isDeleted),
    ];
    if (query) {
      predicates.push(label =>
        label.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (exclude?.length) {
      predicates.push(label => !exclude.includes(label._id));
    }
    return predicates;
  }
}
