import {CollectionDB} from "./CollectionDB";
import {v4} from "uuid";
import Dexie from "dexie";
import type {BaseSchema} from "@repo/collection-service-defs";

export function createCollectionDB(name: string): CollectionDB {
  const db = new Dexie(name) as CollectionDB;
  db.version(1).stores({
    facts: "++_id, title, content, updatedAt",
    labels: "++_id, name, updatedAt",
  });
  addUpdatedAtHook(db);
  return db;
}

function addUpdatedAtHook(db: CollectionDB) {
  for (const table of [db.facts, db.labels]) {
    table.hook("creating", function (_, obj) {
      obj.updatedAt = Date.now();
      obj._id = v4();
    });
    table.hook("updating", function (modifications) {
      (modifications as BaseSchema).updatedAt = Date.now();
      return modifications;
    });
  }
}
