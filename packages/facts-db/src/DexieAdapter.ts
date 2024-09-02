import {DAO} from "./DAO";
import {Fact} from "./Fact";
import {FactsDB} from "./FactsDB";
import {Reader} from "fp-ts/lib/Reader";
import {liveQuery} from "dexie";

export class DexieAdapter implements DAO<Fact> {
  constructor(private db: FactsDB) {}

  toObservable = liveQuery;

  deleteAll(): Promise<void> {
    return this.db.facts.clear();
  }

  async addOne(fact: Fact): Promise<Fact> {
    // spread to avoid mutation of fact object in argument
    const payload = {...fact};
    const id = await this.db.facts.add(payload);
    return {...fact, id};
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
