import {Note} from "./Note";
import Dexie, {EntityTable} from "dexie";

export const db = new Dexie("notes") as Dexie & {
  notes: EntityTable<Note, "id">;
};

db.version(1).stores({
  notes: "++id, content",
});
