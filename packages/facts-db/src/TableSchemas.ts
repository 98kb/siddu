import {Fact} from "./fact/Fact";
import {InsertFact} from "./fact/InsertFact";

export type TableSchemas = {
  facts: {
    schema: Fact;
    insertSchema: InsertFact;
  };
};
