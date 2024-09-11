/* eslint-disable max-nested-callbacks */
import {Fact, InsertFactSchema, createFactsDB} from "@repo/facts-db";
import {beforeEach, describe, expect, it} from "vitest";
import {createCallerFactory} from "../../src/lib/trpc";
import {createContextInner} from "../../src/lib/createContextInner";
import {createFactsRouter} from "../../src/routers/createFactsRouter";
import {inferProcedureInput} from "@trpc/server";

const ctx = createContextInner({});
const db = createFactsDB("test");
const router = createFactsRouter(db.facts);
const createCaller = createCallerFactory(router);
const caller = createCaller(ctx);

type Router = typeof router;
type Input = inferProcedureInput<Router["create"]>;

describe("facts/router", () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  describe("all$", () => {
    it("subscribes to all facts", () =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise<void>(async resolve => {
        const addFact = {content: "test"} satisfies Input;
        const createRequests = [
          await caller.create(addFact),
          await caller.create(addFact),
          await caller.create(addFact),
        ];
        const facts$ = await caller.all$();
        const subscription = facts$.subscribe({
          next: facts => {
            expect(facts).toHaveLength(createRequests.length);
            for (const fact of facts) {
              expect(fact.content).toBe(addFact.content);
            }
            subscription.unsubscribe();
            resolve();
          },
        });
      }));
  });

  describe("create", () => {
    it("adds a valid input", async () => {
      const addFact = {content: "test"} satisfies Input;
      const result = await caller.create(addFact);
      expect(result.id).toBeDefined();
      expect(result.content).toBe(addFact.content);
    });

    it(`throws if content length is less than ${InsertFactSchema.shape.content.minLength}`, async () => {
      const addFact = {content: ""} satisfies Input;
      await expect(caller.create(addFact)).rejects.toThrow();
    });
  });

  describe("get", () => {
    it("gets a existing fact", async () => {
      const addFact = {content: "test"} satisfies Input;
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
      const addFact = {content: "test"} satisfies Input;
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

  describe("update", () => {
    it("updates a fact", async () => {
      const addFact = {content: "test"} satisfies Input;
      const {id} = await caller.create(addFact);
      const updateFact = {id, content: "updated"} satisfies Fact;
      await caller.update(updateFact);
      const result = await caller.get({id});
      expect(result.id).toBe(id);
      expect(result.content).toBe(updateFact.content);
    });

    it("throws if fact does not exist", async () => {
      const updateFact = {id: 1, content: "updated"} satisfies Fact;
      await expect(caller.update(updateFact)).rejects.toThrow();
    });
  });

  describe("delete", () => {
    it("deletes a fact", async () => {
      const addFact = {content: "test"} satisfies Input;
      const {id} = await caller.create(addFact);
      await caller.delete({id});
      await expect(caller.get({id})).rejects.toThrow();
    });

    it("stay silent if fact does not exist", async () => {
      const id = 1;
      await caller.delete({id});
    });
  });
});
