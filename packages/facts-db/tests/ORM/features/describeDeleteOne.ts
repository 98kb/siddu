import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeDeleteOne = (orm: FactsORM) => {
  it("deletes the object", async () => {
    const fact: Parameters<typeof orm.objects.addOne>[0] = {
      content: "test",
    };
    const savedFact = await orm.objects.addOne(fact);
    await orm.objects.deleteOne(savedFact.id);
    const retrievedFact = await orm.objects.getOne(savedFact.id);
    expect(retrievedFact).toBeUndefined();
  });
};
