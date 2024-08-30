import {DAO} from "./DAO";
import {Fact} from "./Fact";
import {Observable} from "dexie";
import {Task} from "fp-ts/lib/Task";

export class FactsDb {
  constructor(readonly objects: DAO<Fact>) {}

  toObservable<R>(fn: Task<R>): Observable<R> {
    return this.objects.toObservable(fn);
  }
}
