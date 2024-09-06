import {DAO} from "./DAO";
import {Fact} from "./Fact";
import {FactsDB} from "./FactsDB";
import {InsertObject} from "./InsertObject";
import {Reader} from "fp-ts/lib/Reader";
import {TableObjects} from "./TableObjects";
import {liveQuery} from "dexie";

export class DexieAdapter<T extends keyof TableObjects> implements DAO<T> {
  constructor(
    private db: FactsDB,
    private readonly table: T,
  ) {}

  toObservable = liveQuery;

  async addOne(payload: InsertObject<T>): Promise<TableObjects[T]> {
    // spread to avoid mutation of payload in argument
    const id = await this.db[this.table].add({...payload});
    return {...payload, id};
  }

  getOne(id: string): Promise<TableObjects[T] | undefined> {
    return this.db[this.table].get(id);
  }

  getAll(): Promise<Fact[]> {
    return this.db[this.table].toArray();
  }

  filter(predicate: Reader<Fact, boolean>): Promise<Fact[]> {
    return this.db[this.table].filter(fact => predicate(fact)).toArray();
  }

  async updateOne(id: string, note: Partial<Fact>): Promise<void> {
    await this.db[this.table].update(id, note);
  }

  async deleteOne(id: string): Promise<void> {
    await this.db[this.table].delete(id);
  }

  deleteAll(): Promise<void> {
    return this.db[this.table].clear();
  }
}
