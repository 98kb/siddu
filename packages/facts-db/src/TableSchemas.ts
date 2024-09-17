import {Collection} from "./tables/collection/Collection";
import {Fact} from "./tables/fact/Fact";
import {InsertCollection} from "./tables/collection/InsertCollection";
import {InsertFact} from "./tables/fact/InsertFact";

export type TableSchemas = {
  facts: {
    schema: Fact;
    insertSchema: InsertFact;
  };
  collections: {
    schema: Collection;
    insertSchema: InsertCollection;
  };
};
