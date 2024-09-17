import {FactsDB} from "./FactsDb";
import {dbSchema} from "./dbSchema";
import Dexie from "dexie";

export function createFactsDB(name: string): FactsDB {
  const db = new Dexie(name);
  db.version(1).stores(dbSchema);
  return db as FactsDB;
}
