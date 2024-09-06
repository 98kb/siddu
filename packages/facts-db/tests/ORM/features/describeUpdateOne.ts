import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeUpdateOne = (orm: FactsORM) => {
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
};
