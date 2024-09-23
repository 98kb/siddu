/* eslint-disable max-nested-callbacks */
import {DbClient} from "../../src/DbClient";
import {InsertCollectionSchema} from "../../src/schema/collection/InsertCollectionSchema";
import {beforeEach, describe, expect, it} from "vitest";
import {createCallerFactory} from "../../src/service/lib/trpc";
import {createCollectionsRouter} from "../../src/service/routers/createCollectionsRouter";
import {createContextInner} from "../../src/service/lib/createContextInner";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {createPayloads} from "../utils/toPayload";

const payload = createPayloads();
const ctx = createContextInner({});
const db = new DbClient(createMemoryAdapter);
const router = createCollectionsRouter(db.collections);
const createCaller = createCallerFactory(router);
const caller = createCaller(ctx);

describe("router > collections", () => {
  beforeEach(async () => {
    await db.facts.deleteAll();
  });

  describe("onMutation$", () => {
    it("subscribes to mutations", async () => {
      const observable = await caller.onMutation$();
      const promise = new Promise<unknown>(resolve => {
        observable.subscribe({next: resolve});
      });
      await caller.create(payload.collections);
      await promise;
    });
  });

  describe("create", () => {
    it("adds a valid input", async () => {
      const result = await caller.create(payload.collections);
      expect(result.id).toBeDefined();
      expect(result.name).toBe(payload.collections.name);
    });

    it(`throws if content length is less than ${InsertCollectionSchema.shape.name.minLength}`, async () => {
      await expect(
        caller.create({...payload.collections, name: ""}),
      ).rejects.toThrow();
    });
  });

  describe("get", () => {
    it("gets a existing fact", async () => {
      const {id} = await caller.create(payload.collections);
      const result = await caller.get({id});
      expect(result.id).toBe(id);
      expect(result.name).toBe(payload.collections.name);
    });

    it("throws if fact does not exist", async () => {
      const id = 999;
      await expect(caller.get({id})).rejects.toThrow();
    });
  });

  describe("list", () => {
    it("lists facts", async () => {
      await caller.deleteAll();
      const createRequests = [
        await caller.create(payload.collections),
        await caller.create(payload.collections),
        await caller.create(payload.collections),
      ];
      const result = await caller.list({limit: 10, offset: 0});
      expect(result).toHaveLength(createRequests.length);
      for (const {name} of result) {
        expect(name).toBe(payload.collections.name);
      }
    });
  });

  describe("delete", () => {
    it("deletes a fact", async () => {
      const {id} = await caller.create(payload.collections);
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
      await caller.create(payload.collections);
      await caller.create(payload.collections);
      await caller.deleteAll();
      const result = await caller.list({limit: 10, offset: 0});
      expect(result).toHaveLength(0);
    });
  });
});
