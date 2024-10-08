import {AdapterOption} from "./AdapterOption";
import {MutationSubscription} from "./MutationSubscription";
import {Reader} from "fp-ts/lib/Reader";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

// TODO: add async error handling
export interface IAdapter<T extends keyof Tables> {
  readonly options: AdapterOption<T>;

  add(
    payload: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>>;
  addMany(
    payload: z.infer<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
  get(id: number): Promise<z.infer<TableSchemas[T]["schema"]> | undefined>;
  getAll(
    predicate?: Reader<z.infer<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]>;
  put(
    id: number,
    payload: Partial<z.infer<TableSchemas[T]["schema"]>>,
  ): Promise<void>;

  /**
   * omits on every mutation (add, update, delete)
   */
  onMutation(callback: () => void): MutationSubscription;
}
