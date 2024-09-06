import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeDeleteAll = (orm: FactsORM) => {
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
};
