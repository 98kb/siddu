import {DexieRepository} from "./DexieRepository";
import {FactsRepository} from "./FactsRepository";
import {Reader} from "fp-ts/lib/Reader";
import type {
  ILabelsRepository,
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";

export class LabelsRepository
  extends DexieRepository<
    "labels",
    LabelSchema,
    InsertLabelSchema,
    Partial<LabelSchema>,
    LabelsQuerySchema
  >
  implements ILabelsRepository
{
  constructor(
    readonly db: DexieRepository<
      "labels",
      LabelSchema,
      InsertLabelSchema,
      Partial<InsertLabelSchema>,
      LabelsQuerySchema
    >["db"],
    private facts: FactsRepository,
  ) {
    super(db, "labels");
  }

  async softDeleteIfOrphan(id: LabelSchema["_id"]): Promise<void> {
    if (await this.isOrphan(id)) {
      await this.update(id, {isDeleted: true, deletedAt: Date.now()});
    }
  }

  async isOrphan(id: LabelSchema["_id"]): Promise<boolean> {
    const parents = await this.facts.list({
      pagination: {offset: 0, limit: 1},
      isDeleted: false,
      labelIds: [id],
    });
    return parents.length === 0;
  }

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
