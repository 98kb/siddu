import {AdapterOption} from "./AdapterOption";
import {IAdapter} from "./IAdapter";
import {IO} from "fp-ts/lib/IO";
import {MutationSubscription} from "./MutationSubscription";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {createChromeRuntimeClient} from "../service/createChromeRuntimeClient";

import {RequireExactlyOne} from "type-fest";
import {z} from "zod";

type Client = ReturnType<typeof createChromeRuntimeClient>;

export class TRPCService<T extends keyof Tables> implements IAdapter<T> {
  private subscribers: IO<void>[] = [];
  private readonly entity: Client[keyof Client];

  constructor(
    readonly options: AdapterOption<T>,
    private client: Client,
  ) {
    this.entity = client[options.entity as keyof Client];
    // TODO: handle errors
    this.entity.onMutation$.subscribe(undefined, {
      onData: () => {
        for (const subscriber of this.subscribers) {
          subscriber();
        }
      },
    });
  }

  async put(
    payload: RequireExactlyOne<
      Partial<z.infer<TableSchemas[T]["schema"]>>,
      "id"
    >,
  ): Promise<void> {
    await this.entity.put.mutate(payload);
  }

  onMutation(callback: () => void): MutationSubscription {
    this.subscribers.push(callback);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      },
    };
  }

  async get(
    id: number,
  ): Promise<z.infer<TableSchemas[T]["schema"]> | undefined> {
    try {
      return await this.entity.get.query({id});
    } catch {
      // TODO: only catch 404 and rethrow other errors
      return undefined;
    }
  }

  getAll(): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return this.entity.list.query({limit: 9_999_999, offset: 0});
  }

  async add(
    obj: Parameters<typeof this.entity.create.mutate>[0],
  ): Promise<number> {
    // TODO: This is a hack to make the type checker happy but it's the ugliest thing I've ever seen
    const entity = this.entity as Client["collections"];
    const {id} = await entity.create.mutate(obj as any);
    return id;
  }

  delete(id: number): Promise<void> {
    return this.entity.delete.mutate({id});
  }

  deleteAll(): Promise<void> {
    return this.entity.deleteAll.mutate();
  }
}
