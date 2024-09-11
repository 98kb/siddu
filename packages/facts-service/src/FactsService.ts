import {AdapterFactory} from "./AdapterFactory";
import {IAdapter} from "./IAdapter";

export class FactsService {
  readonly facts: IAdapter<"facts">;

  constructor(factory: AdapterFactory) {
    this.facts = factory("facts");
  }
}
