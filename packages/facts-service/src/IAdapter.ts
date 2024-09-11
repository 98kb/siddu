import {Observable} from "rxjs";
import {TableSchemas, Tables} from "@repo/facts-db";

export interface IAdapter<T extends keyof Tables> {
  add(payload: TableSchemas[T]["insertSchema"]): Promise<number>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
  get(id: number): Promise<TableSchemas[T]["schema"] | undefined>;
  getAll(): Promise<TableSchemas[T]["schema"][]>;

  /**
   * omits on every mutation (add, update, delete)
   */
  onMutation$: Observable<void>;
}
