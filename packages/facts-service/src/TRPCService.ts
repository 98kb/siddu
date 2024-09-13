import {AbstractAdapter} from "./AbstractAdapter";
import {TableSchemas, Tables} from "@repo/facts-db";
import {createChromeRuntimeClient} from "@repo/facts-service-trpc";

export class TRPCService<T extends keyof Tables> extends AbstractAdapter<T> {
  constructor(
    readonly entity: T,
    private client: ReturnType<typeof createChromeRuntimeClient>,
  ) {
    super(entity);
  }

  get(id: number): Promise<TableSchemas[T]["schema"] | undefined> {
    return this.client[this.entity].get.query({id});
  }

  getAll(): Promise<TableSchemas[T]["schema"][]> {
    return this.client[this.entity].list.query({
      limit: 9_999_999,
      offset: 0,
    });
  }

  async addItem(obj: TableSchemas[T]["insertSchema"]): Promise<number> {
    const {id} = await this.client[this.entity].create.mutate(obj);
    return id;
  }

  deleteItem(id: number): Promise<void> {
    return this.client[this.entity].delete.mutate({id});
  }

  deleteAllItems(): Promise<void> {
    return this.client[this.entity].deleteAll.mutate();
  }
}
