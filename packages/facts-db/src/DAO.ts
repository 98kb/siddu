import {BaseObject} from "./BaseObject";
import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {Task} from "fp-ts/lib/Task";

export interface DAO<T extends BaseObject> {
  addOne(obj: Omit<T, "id">): Promise<T>;
  getOne(id: string): Promise<T | undefined>;
  getAll(): Promise<T[]>;
  filter(predicate: Reader<T, boolean>): Promise<T[]>;
  updateOne(id: string, obj: Partial<T>): Promise<void>;
  deleteOne(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  toObservable<R>(fn: Task<R>): Observable<R>;
}
