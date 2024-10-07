import {AdapterFactory} from "./adapters/AdapterFactory";
import {CollectionSchema} from "./schema/collection/CollectionSchema";
import {FactSchema} from "./schema/fact/FactSchema";
import {FactsManager} from "./entities/FactsManager";
import {IAdapter} from "./adapters/IAdapter";
import {InsertCollectionSchema} from "./schema/collection/InsertCollectionSchema";
import {InsertFactSchema} from "./schema/fact/InsertFactSchema";
import {InsertLabelSchema} from "./schema/label/InsertLabelSchema";
import {LabelSchema} from "./schema/label/LabelSchema";
import {LabelsManager} from "./entities/LabelsManager";

export class DbClient {
  readonly facts: FactsManager;
  readonly collections: IAdapter<"collections">;
  readonly labels: LabelsManager;

  constructor(factory: AdapterFactory) {
    this.collections = factory(options.collections);
    this.facts = new FactsManager(factory(options.facts), this);
    this.labels = new LabelsManager(factory(options.labels), this);
  }
}

const options = {
  facts: {
    entity: "facts",
    schema: FactSchema,
    insertSchema: InsertFactSchema,
  },
  collections: {
    entity: "collections",
    schema: CollectionSchema,
    insertSchema: InsertCollectionSchema,
  },
  labels: {
    entity: "labels",
    schema: LabelSchema,
    insertSchema: InsertLabelSchema,
  },
} as const;
