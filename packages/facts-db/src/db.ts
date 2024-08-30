import {Fact} from "./Fact";
import Dexie, {EntityTable} from "dexie";

export const db = new Dexie("notes") as Dexie & {
  notes: EntityTable<Fact, "id">;
};

db.version(1).stores({
  notes: "++id, content",
});
