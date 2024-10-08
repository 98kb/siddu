import {AdapterOption} from "./AdapterOption";
import {IAdapter} from "./IAdapter";
import {MutationSubscription} from "./MutationSubscription";
import {Reader} from "fp-ts/lib/Reader";
import {RequireExactlyOne} from "type-fest";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

export abstract class AbstractAdapter<T extends keyof Tables>
  implements IAdapter<T>
{
  private mutationListeners: (() => void)[] = [];

  constructor(readonly options: AdapterOption<T>) {}

  onMutation(callback: () => void): MutationSubscription {
    this.mutationListeners.push(callback);
    return this.createSubscription(callback);
  }

  async add(
    payload: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>> {
    const item = await this.addItem(payload);
    this.notifyMutation();
    return item;
  }

  async addMany(
    payload: z.infer<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    const items = await this.addManyItems(payload);
    this.notifyMutation();
    return items;
  }

  async put(
    id: number,
    payload: Partial<z.infer<TableSchemas[T]["schema"]>>,
  ): Promise<void> {
    await this.putItem({...payload, id});
    this.notifyMutation();
  }

  async delete(id: number): Promise<void> {
    await this.deleteItem(id);
    this.notifyMutation();
  }

  async deleteAll(): Promise<void> {
    await this.deleteAllItems();
    this.notifyMutation();
  }

  private notifyMutation() {
    for (const listener of this.mutationListeners) {
      listener();
    }
  }

  private createSubscription(listener: () => void): MutationSubscription {
    return {
      unsubscribe: () => {
        this.mutationListeners = this.mutationListeners.filter(
          l => l !== listener,
        );
      },
    };
  }

  abstract get(
    id: number,
  ): Promise<z.infer<TableSchemas[T]["schema"]> | undefined>;

  abstract getAll(
    predicate?: Reader<z.infer<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]>;

  abstract addItem(
    obj: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>>;

  abstract addManyItems(
    obj: z.infer<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]>;

  abstract deleteItem(id: number): Promise<void>;
  abstract deleteAllItems(): Promise<void>;
  abstract putItem(
    payload: RequireExactlyOne<
      Partial<z.infer<TableSchemas[T]["schema"]>>,
      "id"
    >,
  ): Promise<void>;
}
