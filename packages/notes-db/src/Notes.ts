import {DAO} from "./DAO";
import {Note} from "./Note";
import {db} from "./db";

export class Notes implements DAO<Note> {
  async softDelete(id: string): Promise<void> {
    await db.notes.update(id, {isDeleted: true});
  }

  delete(id: string): Promise<void> {
    return db.notes.delete(id);
  }

  async add(note: Note): Promise<void> {
    await db.notes.add(note);
  }

  async getAll(): Promise<Note[]> {
    return db.notes.toArray();
  }

  async search(query: string): Promise<Note[]> {
    const filterNotes = (note: Note) => note.content.includes(query);
    return db.notes.filter(note => filterNotes(note)).toArray();
  }
}
