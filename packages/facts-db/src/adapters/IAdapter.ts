import {AdapterOption} from "./AdapterOption";
import {MutationSubscription} from "./MutationSubscription";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

// TODO: add async error handling
export interface IAdapter<T extends keyof Tables> {
  readonly options: AdapterOption<T>;

  add(payload: z.infer<TableSchemas[T]["insertSchema"]>): Promise<number>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
  get(id: number): Promise<z.infer<TableSchemas[T]["schema"]> | undefined>;
  getAll(): Promise<z.infer<TableSchemas[T]["schema"]>[]>;

  /**
   * omits on every mutation (add, update, delete)
   */
  onMutation(callback: () => void): MutationSubscription;
}
