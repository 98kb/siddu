import {DexieAdapter} from "./DexieAdapter";
import {ORM} from "./ORM";
import {TableObjects} from "./TableObjects";
import {createFactsDB} from "./createFactsDB";

export function createORM<T extends keyof TableObjects>(
  dbName: string,
  tableName: T,
) {
  const db = createFactsDB(dbName);
  const dexie = new DexieAdapter(db, tableName);
  return new ORM(dexie);
}
