import {AbstractAdapter} from "./AbstractAdapter";
import {AdapterOption} from "./AdapterOption";
import {FactsDB} from "../FactsDb";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

export class DexieAdapter<T extends keyof Tables> extends AbstractAdapter<T> {
  readonly table: Tables[T];
  constructor(
    readonly options: AdapterOption<T>,
    private db: FactsDB,
  ) {
    super(options);
    this.table = db[options.entity];
  }

  async addItem(
    payload: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<number> {
    return (await this.table.add({...payload})) as number;
  }

  get(id: number): Promise<z.infer<TableSchemas[T]["schema"]> | undefined> {
    return this.db[this.options.entity].get(id);
  }

  getAll(): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return this.db[this.options.entity].toArray();
  }

  deleteItem(id: number): Promise<void> {
    return this.db[this.options.entity].delete(id);
  }

  deleteAllItems(): Promise<void> {
    return this.db[this.options.entity].clear();
  }
}
