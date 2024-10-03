import {DbClient} from "../../src/DbClient";
import {FactsManager} from "../../src/entities/FactsManager";
import {InsertLabelSchema} from "../../src/schema/label/InsertLabelSchema";
import {LabelSchema} from "../../src/schema/label/LabelSchema";
import {LabelsManager} from "../../src/entities/LabelsManager";
import {afterEach, beforeEach, describe} from "vitest";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {describeAdapter} from "../adapters/describeAdapter";

const db = new DbClient(createMemoryAdapter);
const createManager = () =>
  new LabelsManager(
    createMemoryAdapter({
      entity: "labels",
      schema: LabelSchema,
      insertSchema: InsertLabelSchema,
    }),
    db,
  );

describe(FactsManager.name, () => {
  let manager = createManager();
  beforeEach(() => {
    manager = createManager();
  });
  afterEach(() => manager.deleteAll());
  describeAdapter(manager);
});
