import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeGetAll = (orm: FactsORM) => {
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
};
