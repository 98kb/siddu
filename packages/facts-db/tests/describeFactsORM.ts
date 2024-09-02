/* eslint-disable max-nested-callbacks */
import {DAO} from "../src/DAO";
import {Fact} from "../src/Fact";
import {FactsORM} from "../src/FactsORM";
import {beforeEach, describe, expect, it} from "vitest";
import {subscriptions} from "./subscriptions";
import {withDone} from "./withDone";

/* eslint-disable max-statements */
export const describeFactsORM = (adapter: DAO<Fact>) => {
  describe(adapter.constructor.name, () => {
    let orm: FactsORM;
    beforeEach(async () => {
      orm = new FactsORM(adapter);
      await orm.objects.deleteAll();
    });

    describe(adapter.addOne.name, () => {
      it("adds an ID and returns the object", async () => {
        const fact: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test",
        };
        const savedFact = await orm.objects.addOne(fact);
        expect(savedFact.id).toBeDefined();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id, ...factWithoutId} = savedFact;
        expect(fact).toEqual(factWithoutId);
      });
    });

    describe(adapter.getOne.name, () => {
      it("returns undefined if the object does not exist", async () => {
        const retrievedFact = await orm.objects.getOne("test");
        expect(retrievedFact).toBeUndefined();
      });
      it("returns the object if it exists", async () => {
        const fact: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test",
        };
        const savedFact = await orm.objects.addOne(fact);
        const retrievedFact = await orm.objects.getOne(savedFact.id);
        expect(retrievedFact).toEqual(savedFact);
      });
    });

    describe(adapter.getAll.name, () => {
      it("returns an empty array if there are no objects", async () => {
        const facts = await orm.objects.getAll();
        expect(facts).toEqual([]);
      });
      it("returns all objects", async () => {
        const fact1: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test1",
        };
        const fact2: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test2",
        };
        const savedFact1 = await orm.objects.addOne(fact1);
        const savedFact2 = await orm.objects.addOne(fact2);
        const facts = await orm.objects.getAll();
        expect(facts).toEqual([savedFact1, savedFact2]);
      });
    });

    describe(adapter.updateOne.name, () => {
      it("updates the object", async () => {
        const fact: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test",
        };
        const savedFact = await orm.objects.addOne(fact);
        const updatedFact = {...savedFact, content: "test2"};
        await orm.objects.updateOne(savedFact.id, updatedFact);
        const retrievedFact = await orm.objects.getOne(savedFact.id);
        expect(retrievedFact).toEqual(updatedFact);
      });
    });

    describe(adapter.deleteOne.name, () => {
      it("deletes the object", async () => {
        const fact: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test",
        };
        const savedFact = await orm.objects.addOne(fact);
        await orm.objects.deleteOne(savedFact.id);
        const retrievedFact = await orm.objects.getOne(savedFact.id);
        expect(retrievedFact).toBeUndefined();
      });
    });

    describe(adapter.deleteAll.name, () => {
      it("deletes all objects", async () => {
        const fact1: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test1",
        };
        const fact2: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test2",
        };
        await orm.objects.addOne(fact1);
        await orm.objects.addOne(fact2);
        await orm.objects.deleteAll();
        const facts = await orm.objects.getAll();
        expect(facts).toEqual([]);
      });
    });

    describe(adapter.filter.name, () => {
      it("returns the objects that match the predicate", async () => {
        const fact1: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test1",
        };
        const fact2: Parameters<typeof orm.objects.addOne>[0] = {
          content: "test2",
        };
        const savedFact1 = await orm.objects.addOne(fact1);
        await orm.objects.addOne(fact2);
        const facts = await orm.objects.filter(
          fact => fact.content === "test1",
        );
        expect(facts).toEqual([savedFact1]);
      });
    });

    describe(adapter.toObservable.name, () => {
      it.only(
        "returns an observable",
        withDone(async done => {
          const allObjs$ = orm.objects.toObservable(() => orm.objects.getAll()); // #0
          subscriptions(allObjs$, [
            // subscribed to #0
            facts => {
              expect(facts).toBeDefined();
              expect(facts).toHaveLength(0);
            },
            // subscribed to #1
            facts => {
              expect(facts).toHaveLength(1);
            },
            // subscribed to #2
            facts => {
              expect(facts).toHaveLength(0);
              done();
            },
          ]);
          const {id} = await orm.objects.addOne({content: "test"}); // #1
          orm.objects.deleteOne(id); // #2
        }),
      );
    });
  });
};
