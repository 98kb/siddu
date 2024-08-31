import {BaseObject} from "./BaseObject";
import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {Task} from "fp-ts/lib/Task";

export interface DAO<T extends BaseObject> {
  addOne(note: Omit<T, "id">): Promise<void>;
  getOne(id: string): Promise<T | undefined>;
  getAll(): Promise<T[]>;
  filter(predicate: Reader<T, boolean>): Promise<T[]>;
  updateOne(id: string, note: Partial<T>): Promise<void>;
  deleteOne(id: string): Promise<void>;
  toObservable<R>(fn: Task<R>): Observable<R>;
}
