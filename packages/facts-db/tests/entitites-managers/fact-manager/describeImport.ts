import {FactsManager} from "../../../src/entities/FactsManager";
import {ImportFact} from "../../../src/schema/fact/ImportFact";
import {afterEach, expect, it} from "vitest";

export function describeImport(manager: FactsManager) {
  afterEach(async () => {
    await manager.deleteAll();
    await manager.db.labels.deleteAll();
  });
  const importData: ImportFact[] = [
    {
      content: "Fact about cats",
      labels: [{name: "animal"}],
    },
    {
      content: "Fact about dogs",
      labels: [{name: "animal"}, {name: "canine"}],
    },
  ];
  // eslint-disable-next-line max-statements
  it("imports facts", async () => {
    const facts = await manager.import(importData);
    expect(facts).toHaveLength(2);
    expect(facts[0].content).toBe("Fact about cats");
    expect(facts[1].content).toBe("Fact about dogs");
    expect(facts[0].labels).toHaveLength(1);
    expect(facts[0].labels[0].name).toBe("animal");
    expect(facts[1].labels).toHaveLength(2);
    expect(facts[1].labels[0].name).toBe("animal");
    expect(facts[1].labels[1].name).toBe("canine");
  });

  it("creates labels if they don't exist", async () => {
    expect((await manager.db.labels.getAll()).length).toBe(0);
    await manager.import(importData);
    expect((await manager.db.labels.getAll()).length).toBe(2);
  });

  it("reuses existing labels", async () => {
    await manager.db.labels.add({name: "animal"});
    expect((await manager.db.labels.getAll()).length).toBe(1);
    await manager.import(importData);
    expect((await manager.db.labels.getAll()).length).toBe(2);
  });
}
