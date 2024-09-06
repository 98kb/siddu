import {ORM} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeAddOne = (orm: ORM<"facts">) => {
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
