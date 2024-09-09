import {FactsDB} from "./FactsDB";
import {Tables} from "./Tables";
import Dexie from "dexie";

const dexieSchema: Record<keyof Tables, string> = {
  facts: "++id, content",
};

export function createFactsDB(name: string): FactsDB {
  const db = new Dexie(name);
  db.version(1).stores(dexieSchema);
  return db as FactsDB;
}
