import {EntityManager} from "./EntityManager";
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
}

type FilterFactsRequest = {
  query: string;
  labels: Label[];
};

function isSubset<T extends {id: number}>(superset: T[], subset: T[]): boolean {
  const supersetIds = new Set(superset.map(item => item.id));
  return subset.every(item => supersetIds.has(item.id));
}
