import {IDType, Observable, UpdateSpec} from "dexie";
import {InsertObject} from "./InsertObject";
import {Reader} from "fp-ts/lib/Reader";
import {TableObjects} from "./TableObjects";
import {TableSchema} from "./TableSchema";
import {Task} from "fp-ts/lib/Task";

export interface DAO<T extends keyof TableObjects> {
  addOne(obj: InsertObject<T>): Promise<TableObjects[T]>;

  getOne(
    id: IDType<TableObjects[T], TableSchema[T]>,
  ): Promise<TableObjects[T] | undefined>;

  getAll(): Promise<TableObjects[T][]>;

  filter(
    predicate: Reader<TableObjects[T], boolean>,
  ): Promise<TableObjects[T][]>;

  updateOne(
    id: IDType<TableObjects[T], TableSchema[T]>,
    obj: UpdateSpec<InsertObject<T>>,
  ): Promise<void>;

  deleteOne(id: IDType<TableObjects[T], TableSchema[T]>): Promise<void>;

  deleteAll(): Promise<void>;

  toObservable<R>(fn: Task<R>): Observable<R>;
}
