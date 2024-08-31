import {DexieAdapter} from "./DexieAdapter";
import {FactsORM} from "./FactsORM";
import {createFactsDB} from "./createFactsDB";

export function createFactsORM(dbName: string): FactsORM {
  const db = createFactsDB(dbName);
  const adapter = new DexieAdapter(db);
  return new FactsORM(adapter);
}
