import {AbstractAdapter} from "./AbstractAdapter";
import {type FactsDB, TableSchemas, Tables} from "@repo/facts-db";

export class DexieAdapter<T extends keyof Tables> extends AbstractAdapter<T> {
  constructor(
    readonly entity: T,
    private db: FactsDB,
  ) {
    super(entity);
  }

  addItem(payload: TableSchemas[T]["insertSchema"]): Promise<number> {
    return this.db[this.entity].add({...payload});
  }

  get(id: number): Promise<TableSchemas[T]["schema"] | undefined> {
    return this.db[this.entity].get(id);
  }

  getAll(): Promise<TableSchemas[T]["schema"][]> {
    return this.db[this.entity].toArray();
  }

  deleteItem(id: number): Promise<void> {
    return this.db[this.entity].delete(id);
  }

  deleteAllItems(): Promise<void> {
    return this.db[this.entity].clear();
  }
}
