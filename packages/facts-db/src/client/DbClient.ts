import {AdapterFactory} from "./AdapterFactory";
import {IAdapter} from "./IAdapter";

export class DbClient {
  readonly facts: IAdapter<"facts">;
  readonly collections: IAdapter<"collections">;

  constructor(factory: AdapterFactory) {
    this.facts = factory("facts");
    this.collections = factory("collections");
  }
}
