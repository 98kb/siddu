import {DexieAdapter} from "./DexieAdapter";
import {FactsDb} from "./FactsDb";
import {createDexieDb} from "./createDexieDb";

export function createFactsDb() {
  return new FactsDb(new DexieAdapter(createDexieDb()));
}
