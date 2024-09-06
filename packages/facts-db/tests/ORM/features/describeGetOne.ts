import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeGetOne = (orm: FactsORM) => {
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
};
