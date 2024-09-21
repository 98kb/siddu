import {AdapterFactory} from "./adapters/AdapterFactory";
import {CollectionSchema} from "./schema/collection/CollectionSchema";
import {FactSchema} from "./schema/fact/FactSchema";
import {IAdapter} from "./adapters/IAdapter";
import {InsertCollectionSchema} from "./schema/collection/InsertCollectionSchema";
import {InsertFactSchema} from "./schema/fact/InsertFactSchema";
import {InsertLabelSchema} from "./schema/label/InsertLabelSchema";
import {LabelSchema} from "./schema/label/LabelSchema";

export class DbClient {
  readonly facts: IAdapter<"facts">;
  readonly collections: IAdapter<"collections">;
  readonly labels: IAdapter<"labels">;

  constructor(factory: AdapterFactory) {
    this.facts = factory({
      entity: "facts",
      schema: FactSchema,
      insertSchema: InsertFactSchema,
    });
    this.collections = factory({
      entity: "collections",
      schema: CollectionSchema,
      insertSchema: InsertCollectionSchema,
    });
    this.labels = factory({
      entity: "labels",
      schema: LabelSchema,
      insertSchema: InsertLabelSchema,
    });
  }
}
