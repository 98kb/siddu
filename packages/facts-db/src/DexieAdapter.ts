import {DAO} from "./DAO";
import {Fact} from "./Fact";
import {FactsDB} from "./FactsDB";
import {Observable, liveQuery} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {Task} from "fp-ts/lib/Task";

export class DexieAdapter implements DAO<Fact> {
  constructor(private db: FactsDB) {}
  toObservable<R>(fn: Task<R>): Observable<R> {
    return liveQuery(() => fn()) as Observable<Awaited<R>>;
  }

  async addOne(fact: Fact): Promise<void> {
    await this.db.facts.add(fact);
  }

  getOne(id: string): Promise<Fact | undefined> {
    return this.db.facts.get(id);
  }

  getAll(): Promise<Fact[]> {
    return this.db.facts.toArray();
  }

  filter(predicate: Reader<Fact, boolean>): Promise<Fact[]> {
    return this.db.facts.filter(fact => predicate(fact)).toArray();
  }

  async updateOne(id: string, note: Partial<Fact>): Promise<void> {
    await this.db.facts.update(id, note);
  }

  async deleteOne(id: string): Promise<void> {
    await this.db.facts.delete(id);
  }
}
