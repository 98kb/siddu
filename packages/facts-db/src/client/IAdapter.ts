import {MutationSubscription} from "./MutationSubscription";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";

// TODO: add async error handling
export interface IAdapter<T extends keyof Tables> {
  readonly entity: T;
  readonly schema: TableSchemas[T]["schema"];
  readonly insertSchema: TableSchemas[T]["insertSchema"];

  add(payload: TableSchemas[T]["insertSchema"]): Promise<number>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
  get(id: number): Promise<TableSchemas[T]["schema"] | undefined>;
  getAll(): Promise<TableSchemas[T]["schema"][]>;

  /**
   * omits on every mutation (add, update, delete)
   */
  onMutation(callback: () => void): MutationSubscription;
}
