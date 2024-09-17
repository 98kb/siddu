import {AbstractAdapter} from "./AbstractAdapter";
import {TableSchemas, Tables} from "@repo/facts-db";

export class MemoryAdapter<T extends keyof Tables> extends AbstractAdapter<T> {
  private objects: Record<number, TableSchemas[T]["schema"]> = {};

  async get(id: number): Promise<TableSchemas[T]["schema"] | undefined> {
    return this.objects[id];
  }

  async getAll(): Promise<TableSchemas[T]["schema"][]> {
    return Object.values(this.objects);
  }

  async addItem(obj: TableSchemas[T]["insertSchema"]): Promise<number> {
    const id = Object.keys(this.objects).length + 1;
    this.objects[id] = {...obj, id};
    return id;
  }

  async deleteItem(id: number): Promise<void> {
    delete this.objects[id];
  }

  async deleteAllItems(): Promise<void> {
    this.objects = {};
  }
}
