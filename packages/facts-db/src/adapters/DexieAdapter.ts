import {AbstractAdapter} from "./AbstractAdapter";
import {AdapterOption} from "./AdapterOption";
import {FactsDB} from "../FactsDb";
import {Reader} from "fp-ts/lib/Reader";
import {RequireExactlyOne} from "type-fest";
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
  ): Promise<z.infer<TableSchemas[T]["schema"]>> {
    const id = await this.table.add({...payload});
    return (await this.get(id as number))!;
  }

  async addManyItems(
    payload: z.infer<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    const ids = (await this.table.bulkAdd(payload, {
      allKeys: true,
    })) as number[];
    return await this.getAll(item => ids.includes(item.id));
  }

  get(id: number): Promise<z.infer<TableSchemas[T]["schema"]> | undefined> {
    return this.db[this.options.entity].get(id);
  }

  getAll(
    predicate?: Reader<z.infer<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return this.db[this.options.entity]
      .filter(item => predicate?.(item) ?? true)
      .toArray();
  }

  async putItem(
    payload: RequireExactlyOne<
      Partial<z.infer<TableSchemas[T]["schema"]>>,
      "id"
    >,
  ): Promise<void> {
    await this.db[this.options.entity].put({...payload} as any);
  }

  deleteItem(id: number): Promise<void> {
    return this.db[this.options.entity].delete(id);
  }

  deleteAllItems(): Promise<void> {
    return this.db[this.options.entity].clear();
  }
}
