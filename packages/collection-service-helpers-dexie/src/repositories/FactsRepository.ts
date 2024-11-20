import {DexieRepository} from "./DexieRepository";
import {Reader} from "fp-ts/lib/Reader";
import type {
  FactSchema,
  FactsQuerySchema,
  IFactsRepository,
  InsertFactSchema,
} from "@repo/collection-service-defs";

export class FactsRepository
  extends DexieRepository<
    "facts",
    FactSchema,
    InsertFactSchema,
    Partial<InsertFactSchema>,
    FactsQuerySchema
  >
  implements IFactsRepository
{
  toQueryPredicates({
    labelIds,
    query,
    isDeleted,
  }: FactsQuerySchema): Reader<FactSchema, boolean>[] {
    const predicates = [
      (fact: FactSchema) => Boolean(fact.isDeleted) === Boolean(isDeleted),
    ];

    if (query) {
      predicates.push((fact: FactSchema) => fact.content.includes(query));
    }

    if (labelIds) {
      predicates.push((fact: FactSchema) =>
        fact.labels.some(label => labelIds.includes(label._id)),
      );
    }
    return predicates;
  }
}
