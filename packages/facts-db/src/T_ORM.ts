import {DAO} from "./DAO";
import {Observable} from "dexie";
import {TableObjects} from "./TableObjects";
import {Task} from "fp-ts/lib/Task";

export interface T_ORM<T extends keyof TableObjects> {
  readonly objects: DAO<T>;
  toObservable<R>(fn: Task<R>): Observable<R>;
}
