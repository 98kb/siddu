/* eslint-disable max-nested-callbacks */
import {DbClient} from "../../src/DbClient";
import {InsertFactSchema} from "../../src/schema/fact/InsertFactSchema";
import {beforeEach, describe, expect, it} from "vitest";
import {createCallerFactory} from "../../src/service/lib/trpc";
import {createContextInner} from "../../src/service/lib/createContextInner";
import {createFactsRouter} from "../../src/service/routers/createFactsRouter";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {inferProcedureInput} from "@trpc/server";

const ctx = createContextInner({});
const db = new DbClient(createMemoryAdapter);
const router = createFactsRouter(db.facts);
const createCaller = createCallerFactory(router);
const caller = createCaller(ctx);

type Router = typeof router;
type Input = inferProcedureInput<Router["create"]>;

describe("facts/router", () => {
  beforeEach(async () => {
    await db.facts.deleteAll();
  });

  describe("onMutation$", () => {
    it("subscribes to mutations", async () => {
      const observable = await caller.onMutation$();
      const promise = new Promise<unknown>(resolve => {
        observable.subscribe({next: resolve});
      });
      await caller.create({content: "test", labels: []} as Input);
      await promise;
    });
  });

  describe("create", () => {
    it("adds a valid input", async () => {
      const addFact = {content: "test", labels: []} satisfies Input;
      const result = await caller.create(addFact);
      expect(result.id).toBeDefined();
      expect(result.content).toBe(addFact.content);
    });

    it(`throws if content length is less than ${InsertFactSchema.shape.content.minLength}`, async () => {
      const addFact = {content: "", labels: []} satisfies Input;
      await expect(caller.create(addFact)).rejects.toThrow();
    });
  });

  describe("get", () => {
    it("gets a existing fact", async () => {
      const addFact = {content: "test", labels: []} satisfies Input;
      const {id} = await caller.create(addFact);
      const result = await caller.get({id});
      expect(result.id).toBe(id);
      expect(result.content).toBe(addFact.content);
    });

    it("throws if fact does not exist", async () => {
      const id = 1;
      await expect(caller.get({id})).rejects.toThrow();
    });
  });

  describe("list", () => {
    it("lists facts", async () => {
      const addFact = {content: "test", labels: []} satisfies Input;
      const createRequests = [
        await caller.create(addFact),
        await caller.create(addFact),
        await caller.create(addFact),
      ];
      const result = await caller.list({limit: 10, offset: 0});
      expect(result).toHaveLength(createRequests.length);
      for (const fact of result) {
        expect(fact.content).toBe(addFact.content);
      }
    });
  });

  describe("delete", () => {
    it("deletes a fact", async () => {
      const addFact = {content: "test", labels: []} satisfies Input;
      const {id} = await caller.create(addFact);
      await caller.delete({id});
      await expect(caller.get({id})).rejects.toThrow();
    });

    it("stay silent if fact does not exist", async () => {
      const id = 1;
      await caller.delete({id});
    });
  });

  describe("deleteAll", () => {
    it("deletes all facts", async () => {
      const addFact = {content: "test", labels: []} satisfies Input;
      await caller.create(addFact);
      await caller.create(addFact);
      await caller.deleteAll();
      const result = await caller.list({limit: 10, offset: 0});
      expect(result).toHaveLength(0);
    });
  });
});
