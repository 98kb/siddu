import {AbstractAdapter} from "./AbstractAdapter";
import {Reader} from "fp-ts/lib/Reader";
import {RequireExactlyOne} from "type-fest";
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

  async getAll(
    predicate?: Reader<z.infer<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return Object.values(this.objects).filter(
      item => predicate?.(item) ?? true,
    );
  }

  async addItem(
    obj: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>> {
    const id = Object.keys(this.objects).length + 1;
    this.objects[id] = {...obj, id} as z.infer<TableSchemas[T]["schema"]>;
    return this.objects[id];
  }

  async addManyItems(
    objs: z.infer<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return Promise.all(objs.map(obj => this.addItem(obj)));
  }

  async putItem(
    payload: RequireExactlyOne<
      Partial<z.infer<TableSchemas[T]["schema"]>>,
      "id"
    >,
  ): Promise<void> {
    this.objects[payload.id as number] = payload as z.infer<
      TableSchemas[T]["schema"]
    >;
  }

  async deleteItem(id: number): Promise<void> {
    delete this.objects[id];
  }

  async deleteAllItems(): Promise<void> {
    this.objects = {};
  }
}
