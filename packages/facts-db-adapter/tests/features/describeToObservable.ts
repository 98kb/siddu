import {Fact, ORM} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";
import {expect, it} from "vitest";

export const describeToObservable = (orm: ORM<"facts">) => {
  it("returns an observable that emits on subscription", () =>
    new Promise<void>(resolve => {
      const allFacts$ = orm.toObservable(() => orm.objects.getAll());
      const sub = allFacts$.subscribe(async facts => {
        expect(facts).toHaveLength(0);
        sub?.unsubscribe();
        resolve();
      });
    }));

  it("returns an observable that emits on addOne", () =>
    new Promise<void>(resolve => {
      const content = "test";
      const facts$ = orm.toObservable(() =>
        orm.objects.filter(contentEquals(content)),
      );
      orm.objects.addOne({content});
      const sub = facts$.subscribe(async facts => {
        if (sideEffects.addOne(facts)) {
          sub?.unsubscribe();
          resolve();
        }
      });
    }));

  it("returns an observable that emits on updateOne", () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async resolve => {
      const {id} = await orm.objects.addOne({content: "test"});
      const allObjs$ = orm.toObservable(() => orm.objects.getOne(id));
      orm.objects.updateOne(id, {content: "test2"});
      const sub = allObjs$.subscribe(async fact => {
        if (fact?.content === "test2") {
          sub?.unsubscribe();
          resolve();
        }
      });
    }));

  it("returns an observable that emits on deleteOne", () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async resolve => {
      const allObjs$ = orm.toObservable(() => orm.objects.getAll());
      const {id} = await orm.objects.addOne({content: "test"});
      orm.objects.deleteOne(id);
      const sub = allObjs$.subscribe(async facts => {
        if (sideEffects.deleteOne(facts)) {
          sub?.unsubscribe();
          resolve();
        }
      });
    }));

  it("returns an observable that emits on deleteAll", () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async resolve => {
      const allObjs$ = orm.toObservable(() => orm.objects.getAll());
      await orm.objects.addOne({content: "test"});
      orm.objects.deleteAll();
      const sub = allObjs$.subscribe(async facts => {
        if (sideEffects.deleteAll(facts)) {
          sub.unsubscribe();
          resolve();
        }
      });
    }));
};

type SideEffect = "addOne" | "deleteOne" | "deleteAll";

const contentEquals = (content: string) => (fact: Fact) =>
  fact.content === content;

const sideEffects: Record<SideEffect, Reader<Fact[], boolean>> = {
  addOne: facts => facts.length === 1,
  deleteOne: facts => facts.length === 0,
  deleteAll: facts => facts.length === 0,
};
