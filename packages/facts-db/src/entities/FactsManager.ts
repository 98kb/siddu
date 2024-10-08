import {EntityManager} from "./EntityManager";
import {Fact} from "../schema/fact/Fact";
import {ImportFact} from "../schema/fact/ImportFact";
import {InsertFact} from "../schema/fact/InsertFact";
import {Label} from "../schema/label/Label";

export class FactsManager extends EntityManager<"facts"> {
  async filter({query, labels}: FilterFactsRequest) {
    return this.getAll(fact => {
      return (
        fact.content.toLowerCase().includes(query.toLowerCase()) &&
        isSubset(fact.labels, labels)
      );
    });
  }

  async import(factsData: ImportFact[]): Promise<Fact[]> {
    const facts: InsertFact[] = [];
    for await (const factData of factsData) {
      facts.push(await this.toInsertFact(factData));
    }
    return this.addMany(facts);
  }

  private async toInsertFact(fact: ImportFact): Promise<InsertFact> {
    const labels: Label[] = [];
    for await (const label of fact.labels ?? []) {
      labels.push(await this.db.labels.getOrCreate(label));
    }
    return this.add({...fact, labels});
  }
}

type FilterFactsRequest = {
  query: string;
  labels: Label[];
};

function isSubset<T extends {id: number}>(superset: T[], subset: T[]): boolean {
  const supersetIds = new Set(superset.map(item => item.id));
  return subset.every(item => supersetIds.has(item.id));
}
