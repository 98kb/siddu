import {Reader} from "fp-ts/lib/Reader";
import type {ID, InsertObject, TableObjects} from "@repo/facts-db";

// TODO: Use higher-kinded types when TypeScript supports them
// Ugly and verbose, but it works
export type Requests<T extends keyof TableObjects> = {
  addOne: {
    payload: InsertObject<T>;
    result: TableObjects[T];
  };
  getOne: {
    payload: {id: ID<T>};
    result: TableObjects[T] | undefined;
  };
  getAll: {
    payload: undefined;
    result: TableObjects[T][];
  };
  updateOne: {
    payload: {id: ID<T>; obj: InsertObject<T>};
    result: void;
  };
  deleteOne: {
    payload: {id: ID<T>};
    result: void;
  };
  deleteAll: {
    payload: undefined;
    result: void;
  };
  filter: {
    payload: {predicate: Reader<TableObjects[T], boolean>};
    result: TableObjects[T][];
  };
};
