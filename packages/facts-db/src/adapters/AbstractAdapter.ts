import {AdapterOption} from "./AdapterOption";
import {IAdapter} from "./IAdapter";
import {MutationSubscription} from "./MutationSubscription";
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
  ): Promise<number> {
    const id = await this.addItem(payload);
    this.notifyMutation();
    return id;
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

  abstract getAll(): Promise<z.infer<TableSchemas[T]["schema"]>[]>;
  abstract addItem(
    obj: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<number>;

  abstract deleteItem(id: number): Promise<void>;
  abstract deleteAllItems(): Promise<void>;
  abstract putItem(
    payload: RequireExactlyOne<
      Partial<z.infer<TableSchemas[T]["schema"]>>,
      "id"
    >,
  ): Promise<void>;
}
