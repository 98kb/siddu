import {Fact, ORM} from "@repo/facts-db";
import {expect, it} from "vitest";

export const describeFilter = (orm: ORM<"facts">) => {
  it("returns the objects that match the predicate", async () => {
    const fact1: Parameters<typeof orm.objects.addOne>[0] = {
      content: "test1",
    };
    const fact2: Parameters<typeof orm.objects.addOne>[0] = {
      content: "test2",
    };
    const savedFact1 = await orm.objects.addOne(fact1);
    await orm.objects.addOne(fact2);
    const predicate = matchContent(fact1.content);
    const facts = await orm.objects.filter(fact => predicate(fact));
    expect(facts).toEqual([savedFact1]);
  });
};

const matchContent = (content: string) => (fact: Fact) =>
  fact.content === content;
