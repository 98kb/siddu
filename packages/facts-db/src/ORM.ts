import {DAO} from "./DAO";
import {Observable} from "dexie";
import {T_ORM} from "./T_ORM";
import {TableObjects} from "./TableObjects";
import {Task} from "fp-ts/lib/Task";

export class ORM<T extends keyof TableObjects> implements T_ORM<T> {
  constructor(readonly objects: DAO<T>) {}

  toObservable<R>(fn: Task<R>): Observable<R> {
    return this.objects.toObservable(fn);
  }
}
