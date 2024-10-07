/* eslint-disable sonarjs/no-duplicate-string */
import {FactsManager} from "../../../src/entities/FactsManager";
import {afterEach, expect, it} from "vitest";

export function describeFactFilter(manager: FactsManager) {
  afterEach(() => manager.deleteAll());

  it("returns facts that match the query and labels", async () => {
    await manager.add({
      content: "Fact about cats",
      labels: [{id: 1, name: "animal"}],
    });
    await manager.add({
      content: "Fact about dogs",
      labels: [{id: 2, name: "animal"}],
    });
    await manager.add({
      content: "Fact about cars",
      labels: [{id: 3, name: "vehicle"}],
    });

    const result = await manager.filter({
      query: "Fact",
      labels: [{id: 1, name: "animal"}],
    });
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe("Fact about cats");
  });

  it("returns an empty array if no facts match the query", async () => {
    await manager.add({
      content: "Fact about cats",
      labels: [{id: 1, name: "animal"}],
    });

    const result = await manager.filter({
      query: "dogs",
      labels: [{id: 1, name: "animal"}],
    });
    expect(result).toHaveLength(0);
  });

  it("return an empty array if no facts match the labels", async () => {
    console.log("here", (await manager.getAll()).length);

    await manager.add({
      content: "Fact about cats",
      labels: [{id: 1, name: "animal"}],
    });

    const result = await manager.filter({
      query: "Fact",
      labels: [{id: 2, name: "vehicle"}],
    });
    expect(result).toHaveLength(0);
  });

  it("return facts that match the query and multiple labels", async () => {
    await manager.add({
      content: "Fact about cats and dogs",
      labels: [
        {id: 1, name: "animal"},
        {id: 2, name: "pet"},
        {id: 3, name: "vehicle"},
      ],
    });
    await manager.add({
      content: "Fact about cars",
      labels: [{id: 3, name: "vehicle"}],
    });

    const result = await manager.filter({
      query: "Fact",
      labels: [
        {id: 1, name: "animal"},
        {id: 2, name: "pet"},
        {id: 3, name: "vehicle"},
      ],
    });
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe("Fact about cats and dogs");
  });
}
