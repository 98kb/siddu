import {AdapterOption} from "../../src/adapters/AdapterOption";
import {CollectionSchema} from "../../src/schema/collection/CollectionSchema";
import {DexieAdapter} from "../../src/adapters/DexieAdapter";
import {FactSchema} from "../../src/schema/fact/FactSchema";
import {InsertCollectionSchema} from "../../src/schema/collection/InsertCollectionSchema";
import {InsertFactSchema} from "../../src/schema/fact/InsertFactSchema";
import {InsertLabelSchema} from "../../src/schema/label/InsertLabelSchema";
import {LabelSchema} from "../../src/schema/label/LabelSchema";
import {TRPCService} from "../../src/adapters/TRPCService";
import {Tables} from "../../src/schema/Tables";
import {afterAll, beforeEach, describe} from "vitest";
import {createFactsDB} from "../../src/createFactsDb";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {createTestClient, createTestServer} from "../utils/createTestServer";
import {describeAdapter} from "./describeAdapter";

const adapterOptions = [
  {
    entity: "facts",
    schema: FactSchema,
    insertSchema: InsertFactSchema,
  },
  {
    entity: "collections",
    schema: CollectionSchema,
    insertSchema: InsertCollectionSchema,
  },
  {
    entity: "labels",
    schema: LabelSchema,
    insertSchema: InsertLabelSchema,
  },
] satisfies AdapterOption<keyof Tables>[];

const port = 3333;
const {listen, server} = createTestServer();
listen(port);

afterAll(() => {
  server.close();
});

for (const options of adapterOptions) {
  const adapters = [
    () => new DexieAdapter(options, createFactsDB("test")),
    () => createMemoryAdapter(options),
    () => new TRPCService(options, createTestClient(port)),
  ];

  for (const factory of adapters) {
    const adapter = factory();
    describe(`${adapter.constructor.name} > ${options.entity}`, () => {
      beforeEach(async () => {
        await adapter.deleteAll();
      });
      describeAdapter(adapter);
    });
  }
}
