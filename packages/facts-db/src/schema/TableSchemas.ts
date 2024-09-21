import {CollectionSchema} from "./collection/CollectionSchema";
import {FactSchema} from "../schema/fact/FactSchema";
import {InsertCollectionSchema} from "./collection/InsertCollectionSchema";
import {InsertFactSchema} from "../schema/fact/InsertFactSchema";
import {InsertLabelSchema} from "./label/InsertLabelSchema";
import {LabelSchema} from "./label/LabelSchema";

export type TableSchemas = {
  facts: {
    schema: typeof FactSchema;
    insertSchema: typeof InsertFactSchema;
  };
  collections: {
    schema: typeof CollectionSchema;
    insertSchema: typeof InsertCollectionSchema;
  };
  labels: {
    schema: typeof LabelSchema;
    insertSchema: typeof InsertLabelSchema;
  };
};
