import {CollectionSchema} from "./collection/CollectionSchema";
import {FactSchema} from "../schema/fact/FactSchema";
import {InsertCollectionSchema} from "./collection/InsertCollectionSchema";
import {InsertFactSchema} from "../schema/fact/InsertFactSchema";

export type TableSchemas = {
  facts: {
    schema: typeof FactSchema;
    insertSchema: typeof InsertFactSchema;
  };
  collections: {
    schema: typeof CollectionSchema;
    insertSchema: typeof InsertCollectionSchema;
  };
};
