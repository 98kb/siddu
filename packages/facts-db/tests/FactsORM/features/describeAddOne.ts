import {FactsORM} from "../../../src/FactsORM";
import {expect, it} from "vitest";

export const describeAddOne = (orm: FactsORM) => {
  const fact: Parameters<typeof orm.objects.addOne>[0] = {
    content: "test",
  };
  it("adds an ID and returns the object", async () => {
    const savedFact = await orm.objects.addOne(fact);
    expect(savedFact.id).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...factWithoutId} = savedFact;
    expect(fact).toEqual(factWithoutId);
  });

  it("does not mutate the input object", async () => {
    await orm.objects.addOne(fact);
    expect(Object.keys(fact)).not.toContain("id");
  });
};
