import {AbstractAdapter} from "./AbstractAdapter";
import {FactsDB} from "@repo/facts-db/dist/FactsDB";
import {TableSchemas, Tables} from "@repo/facts-db";

export class DexieAdapter<T extends keyof Tables> extends AbstractAdapter<T> {
  constructor(
    readonly table: T,
    private db: FactsDB,
  ) {
    super(table);
  }

  addItem(payload: TableSchemas[T]["insertSchema"]): Promise<number> {
    return this.db[this.table].add({...payload});
  }

  get(id: number): Promise<TableSchemas[T]["schema"] | undefined> {
    return this.db[this.table].get(id);
  }

  getAll(): Promise<TableSchemas[T]["schema"][]> {
    return this.db[this.table].toArray();
  }

  deleteItem(id: number): Promise<void> {
    return this.db[this.table].delete(id);
  }

  deleteAllItems(): Promise<void> {
    return this.db[this.table].clear();
  }
}
