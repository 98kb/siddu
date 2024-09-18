import {Collection} from "./collection/Collection";
import {Fact} from "./fact/Fact";
import {InsertCollection} from "./collection/InsertCollection";
import {InsertFact} from "./fact/InsertFact";

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
