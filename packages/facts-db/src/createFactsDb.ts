import {BaseSchema} from "./schema/core/BaseSchemas";
import {FactsDB} from "./FactsDb";
import {dbSchema} from "./schema/dbSchema";
import {z} from "zod";
import Dexie from "dexie";

export function createFactsDB(name: string): FactsDB {
  const db = new Dexie(name) as FactsDB;
  db.version(1).stores(dbSchema);
  addUpdatedAtHook(db);
  return db as FactsDB;
}

function addUpdatedAtHook(db: FactsDB) {
  for (const table of [db.facts, db.labels, db.collections]) {
    table.hook("creating", function (_, obj) {
      obj.updatedAt = Date.now();
    });
    table.hook("updating", function (modifications) {
      (modifications as z.infer<typeof BaseSchema>).updatedAt = Date.now();
      return modifications;
    });
  }
}
