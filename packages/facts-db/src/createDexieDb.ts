import {DexieDb} from "./DexieDb";
import Dexie from "dexie";

export const db = new Dexie("notes") as DexieDb;

db.version(1).stores({
  notes: "++id, content",
});

export const createDexieDb = () => db;
