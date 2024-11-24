import {DexieRepository} from "./DexieRepository";
import {Reader} from "fp-ts/lib/Reader";
import type {
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";

export class LabelsRepository extends DexieRepository<
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
      predicates.push(label => label.name.includes(query));
    }
    if (exclude?.length) {
      predicates.push(label => !exclude.includes(label._id));
    }
    return predicates;
  }
}
