import {AbstractAdapter} from "./AbstractAdapter";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

export class MemoryAdapter<T extends keyof Tables> extends AbstractAdapter<T> {
  private objects: Record<number, z.infer<TableSchemas[T]["schema"]>> = {};

  async get(
    id: number,
  ): Promise<z.infer<TableSchemas[T]["schema"]> | undefined> {
    return this.objects[id];
  }

  async getAll(): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return Object.values(this.objects);
  }

  async addItem(
    obj: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<number> {
    const id = Object.keys(this.objects).length + 1;
    this.objects[id] = {...obj, id} as z.infer<TableSchemas[T]["schema"]>;
    return id;
  }

  async deleteItem(id: number): Promise<void> {
    delete this.objects[id];
  }

  async deleteAllItems(): Promise<void> {
    this.objects = {};
  }
}
