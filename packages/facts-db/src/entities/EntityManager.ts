import {AdapterOption} from "../adapters/AdapterOption";
import {DbClient} from "../DbClient";
import {IAdapter} from "../adapters/IAdapter";
import {MutationSubscription} from "../adapters/MutationSubscription";
import {Reader} from "fp-ts/lib/Reader";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {z} from "zod";

export class EntityManager<T extends keyof Tables> implements IAdapter<T> {
  readonly options: AdapterOption<T>;

  constructor(
    readonly crud: IAdapter<T>,
    readonly db: DbClient,
  ) {
    this.options = crud.options;
  }

  put(
    id: number,
    payload: Partial<z.infer<TableSchemas[T]["schema"]>>,
  ): Promise<void> {
    return this.crud.put(id, payload);
  }

  add(
    payload: z.infer<TableSchemas[T]["insertSchema"]>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>> {
    return this.crud.add(payload);
  }

  addMany(
    payload: z.TypeOf<TableSchemas[T]["insertSchema"]>[],
  ): Promise<z.TypeOf<TableSchemas[T]["schema"]>[]> {
    return this.crud.addMany(payload);
  }

  delete(id: number): Promise<void> {
    return this.crud.delete(id);
  }

  deleteAll(): Promise<void> {
    return this.crud.deleteAll();
  }

  get(id: number): Promise<z.infer<TableSchemas[T]["schema"]> | undefined> {
    return this.crud.get(id);
  }

  getAll(
    predicate?: Reader<z.infer<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<z.infer<TableSchemas[T]["schema"]>[]> {
    return this.crud.getAll(predicate);
  }

  onMutation(callback: () => void): MutationSubscription {
    return this.crud.onMutation(callback);
  }
}
