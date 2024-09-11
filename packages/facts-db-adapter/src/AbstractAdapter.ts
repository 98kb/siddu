import {IAdapter} from "./IAdapter";
import {Subject} from "rxjs";
import {TableSchemas, Tables} from "@repo/facts-db";

export abstract class AbstractAdapter<T extends keyof Tables>
  implements IAdapter<T>
{
  private onUpdated = new Subject<void>();

  onUpdated$ = this.onUpdated.asObservable();

  constructor(readonly table: T) {}

  async add(payload: TableSchemas[T]["insertSchema"]): Promise<number> {
    const id = await this.addItem(payload);
    this.onUpdated.next();
    return id;
  }

  async delete(id: number): Promise<void> {
    await this.deleteItem(id);
    this.onUpdated.next();
  }

  async deleteAll(): Promise<void> {
    await this.deleteAllItems();
    this.onUpdated.next();
  }

  abstract get(id: number): Promise<TableSchemas[T]["schema"] | undefined>;
  abstract getAll(): Promise<TableSchemas[T]["schema"][]>;
  abstract addItem(obj: TableSchemas[T]["insertSchema"]): Promise<number>;
  abstract deleteItem(id: number): Promise<void>;
  abstract deleteAllItems(): Promise<void>;
}
