import {FactsDB} from "./FactsDB";
import {schema} from "./schema";
import Dexie from "dexie";

export function createFactsDB(name: string): FactsDB {
  const db = new Dexie(name) as FactsDB;
  db.version(1).stores(schema);
  return db;
}
