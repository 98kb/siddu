import {IAdapter} from "./IAdapter";
import {Tables} from "@repo/facts-db";

export class FactsService {
  readonly facts: IAdapter<"facts">;

  constructor(
    private factory: <T extends keyof Tables>(tableName: T) => IAdapter<T>,
  ) {
    this.facts = this.factory("facts");
  }
}
