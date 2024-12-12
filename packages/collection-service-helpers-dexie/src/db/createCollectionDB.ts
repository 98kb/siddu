import {CollectionDB} from "./CollectionDB";
import {v4} from "uuid";
import Dexie, {DexieOptions} from "dexie";
import type {BaseSchema} from "@repo/collection-service-defs";

export function createCollectionDB(
  name: string,
  options?: DexieOptions,
): CollectionDB {
  const db = new Dexie(name, options) as CollectionDB;
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
      obj.createdAt = Date.now();
      obj._id = v4();
    });
    table.hook("updating", function (modifications) {
      (modifications as BaseSchema).updatedAt = Date.now();
      return modifications;
    });
  }
}
