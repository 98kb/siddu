import {IAdapter, MutationSubscription} from "@repo/facts-service";
import {IO} from "fp-ts/lib/IO";
import {TableSchemas, Tables} from "@repo/facts-db";
import {createChromeRuntimeClient} from "@repo/facts-service-trpc";

type Client = ReturnType<typeof createChromeRuntimeClient>;

export class TRPCService<T extends keyof Tables> implements IAdapter<T> {
  private subscribers: IO<void>[] = [];

  constructor(
    readonly entity: T,
    private client: Client,
  ) {
    // TODO: handle errors
    client[entity as keyof Client].onMutation$.subscribe(undefined, {
      onData: () => {
        for (const subscriber of this.subscribers) {
          subscriber();
        }
      },
    });
  }

  onMutation(callback: () => void): MutationSubscription {
    this.subscribers.push(callback);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      },
    };
  }

  async get(id: number): Promise<TableSchemas[T]["schema"] | undefined> {
    try {
      return await this.client[this.entity as keyof Client].get.query({id});
    } catch {
      // TODO: only catch 404 and rethrow other errors
      return undefined;
    }
  }

  getAll(): Promise<TableSchemas[T]["schema"][]> {
    return this.client[this.entity as keyof Client].list.query({
      limit: 9_999_999,
      offset: 0,
    });
  }

  async add(obj: TableSchemas[T]["insertSchema"]): Promise<number> {
    const {id} =
      await this.client[this.entity as keyof Client].create.mutate(obj);
    return id;
  }

  delete(id: number): Promise<void> {
    return this.client[this.entity as keyof Client].delete.mutate({id});
  }

  deleteAll(): Promise<void> {
    return this.client[this.entity as keyof Client].deleteAll.mutate();
  }
}
