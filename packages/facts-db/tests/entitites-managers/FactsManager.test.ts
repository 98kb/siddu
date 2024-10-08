import {DbClient} from "../../src/DbClient";
import {FactSchema} from "../../src/schema/fact/FactSchema";
import {FactsManager} from "../../src/entities/FactsManager";
import {InsertFactSchema} from "../../src/schema/fact/InsertFactSchema";
import {afterEach, beforeEach, describe} from "vitest";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {describeAdapter} from "../adapters/describeAdapter";
import {describeFactFilter} from "./fact-manager/describeFactFilter";
import {describeImport} from "./fact-manager/describeImport";

const createFactManager = () =>
  new FactsManager(
    createMemoryAdapter({
      entity: "facts",
      schema: FactSchema,
      insertSchema: InsertFactSchema,
    }),
    new DbClient(createMemoryAdapter),
  );

// eslint-disable-next-line max-statements
describe(FactsManager.name, () => {
  let manager = createFactManager();
  beforeEach(() => {
    manager = createFactManager();
  });
  afterEach(() => manager.deleteAll());
  describeAdapter(manager);
  describeFactFilter(manager);
  describeImport(manager);
});
