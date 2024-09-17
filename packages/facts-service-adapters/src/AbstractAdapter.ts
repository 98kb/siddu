import {IAdapter, MutationSubscription} from "@repo/facts-service";
import {TableSchemas, Tables} from "@repo/facts-db";

export abstract class AbstractAdapter<T extends keyof Tables>
  implements IAdapter<T>
{
  private mutationListeners: (() => void)[] = [];

  constructor(readonly entity: T) {}

  onMutation(callback: () => void): MutationSubscription {
    this.mutationListeners.push(callback);
    return this.createSubscription(callback);
  }

  async add(payload: TableSchemas[T]["insertSchema"]): Promise<number> {
    const id = await this.addItem(payload);
    this.notifyMutation();
    return id;
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

  abstract get(id: number): Promise<TableSchemas[T]["schema"] | undefined>;
  abstract getAll(): Promise<TableSchemas[T]["schema"][]>;
  abstract addItem(obj: TableSchemas[T]["insertSchema"]): Promise<number>;
  abstract deleteItem(id: number): Promise<void>;
  abstract deleteAllItems(): Promise<void>;
}
