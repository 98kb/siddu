import {MemoryRepo} from "./MemoryRepo";
import {Reader} from "fp-ts/lib/Reader";
import type {
  FactSchema,
  ILabelsRepository,
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";

// TODO: re-organize dexie and memory repos to avoid code duplication
export class LabelsRepository
  extends MemoryRepo<
    "labels",
    LabelSchema,
    InsertLabelSchema,
    Omit<Partial<LabelSchema>, "_id">,
    LabelsQuerySchema
  >
  implements ILabelsRepository
{
  async softDeleteIfOrphan(id: LabelSchema["_id"]): Promise<boolean> {
    const isOrphan = await this.isOrphan(id);
    if (isOrphan) {
      await this.update(id, {isDeleted: true, deletedAt: Date.now()});
    }
    return isOrphan;
  }

  async isOrphan(id: LabelSchema["_id"]): Promise<boolean> {
    const hasParent = Object.values(this.data.facts).some(fact => {
      return (fact as unknown as FactSchema).labels.some(
        label => label._id === id,
      );
    });
    console.log("isOrphan", hasParent);

    return !hasParent;
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
