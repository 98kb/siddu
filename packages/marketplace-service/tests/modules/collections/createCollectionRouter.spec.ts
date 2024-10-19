import {Collection} from "../../../src/modules/collections/models/Collection";
import {LimitOffsetDto} from "../../../src/common/dto/LimitOffsetDto";
import {afterAll, beforeAll, describe, expect, test} from "vitest";
import {createCallerFactory} from "../../../src/lib/trpc";
import {createCollectionsRouter} from "./../../../src/modules/collections/createCollectionsRouter";
import {createContextInner} from "../../../src/lib/createContextInner";

const ctx = createContextInner({});
const router = createCollectionsRouter();
const createCaller = createCallerFactory(router);
const caller = createCaller(ctx);

describe(createCollectionsRouter.name, () => {
  beforeAll(async () => {
    Collection.insertMany([
      {
        name: "test",
        tags: [],
        facts: [{content: "content"}, {content: "content2"}],
      },
      {
        name: "test2",
        tags: [],
        facts: [],
      },
      {
        name: "test3",
        tags: [],
        facts: [],
      },
    ]);
  });

  afterAll(async () => {
    await Collection.deleteMany({});
  });

  describe("list", describeList);
  describe("get", describeGet);
  describe("listFacts", describeListFacts);
});

function describeList() {
  test("it lists all collections", async () => {
    const result = await caller.list({offset: 0, limit: 10});
    expect(result.length).toEqual(3);
    expect(result[0].name).toEqual("test");
  });
  test("it throws validation error if limit is less than 1", async () => {
    await expect(caller.list({limit: 0, offset: 0})).rejects.toThrowError();
  });
  test(`it throws validation error if limit is greater than ${LimitOffsetDto.shape.limit.maxValue!}`, async () => {
    await expect(
      caller.list({limit: LimitOffsetDto.shape.limit.maxValue! + 1, offset: 0}),
    ).rejects.toThrowError();
  });
  test("it throws validation error if offset is less than 0", async () => {
    await expect(caller.list({limit: 1, offset: -1})).rejects.toThrowError();
  });
  test("it can query with limit and offset", async () => {
    const result = await caller.list({limit: 1, offset: 1});
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual("test2");
  });
}

function describeGet() {
  test("it gets existing collection", async () => {
    const [collection] = await Collection.find();
    const result = await caller.get(collection.id);
    expect(result?.name).toEqual(collection.name);
  });

  test("it throws validation error for invalid ObjectId", async () => {
    await expect(caller.get("invalid")).rejects.toThrowError();
  });

  test("it returns nullish for non-existing collection", async () => {
    const result = await caller.get("5f9a0b7b1e7b3b4f4c6b4d9b");
    expect(result).toBeUndefined();
  });
}

function describeListFacts() {
  test("it lists facts of a collection", async () => {
    const [collection] = await Collection.find();
    const result = await caller.listFacts({
      collectionId: collection.id,
      limit: 1,
      offset: 1,
    });
    expect(result?.length).toEqual(1);
    expect(result?.[0]?.content).toEqual("content2");
  });
  test("it returns empty array if collection has no facts", async () => {
    const [, collection] = await Collection.find();
    const result = await caller.listFacts({
      collectionId: collection.id,
      limit: 1,
      offset: 1,
    });
    expect(result).toEqual([]);
  });
  test("it returns empty array if collection does not exist", async () => {
    const result = await caller.listFacts({
      collectionId: "5f9a0b7b1e7b3b4f4c6b4d9b",
      limit: 1,
      offset: 1,
    });
    expect(result).toEqual([]);
  });
  test("it throws validation error for invalid ObjectId", async () => {
    await expect(
      caller.listFacts({
        collectionId: "invalid",
        limit: 1,
        offset: 1,
      }),
    ).rejects.toThrowError();
  });
  test("it throws validation error if limit is less than 1", async () => {
    const [collection] = await Collection.find();
    await expect(
      caller.listFacts({
        collectionId: collection.id,
        limit: 0,
        offset: 1,
      }),
    ).rejects.toThrowError();
  });
  test(`it throws validation error if limit is greater than ${LimitOffsetDto.shape.limit.maxValue!}`, async () => {
    const [collection] = await Collection.find();
    await expect(
      caller.listFacts({
        collectionId: collection.id,
        limit: LimitOffsetDto.shape.limit.maxValue! + 1,
        offset: 1,
      }),
    ).rejects.toThrowError();
  });
  test("it throws validation error if offset is less than 0", async () => {
    const [collection] = await Collection.find();
    await expect(
      caller.listFacts({
        collectionId: collection.id,
        limit: 1,
        offset: -1,
      }),
    ).rejects.toThrowError();
  });
}
