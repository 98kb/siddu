import {AdapterOption} from "../adapters/AdapterOption";
import {DbClient} from "../DbClient";
import {IAdapter} from "../adapters/IAdapter";
import {MutationSubscription} from "../adapters/MutationSubscription";
import {Reader} from "fp-ts/lib/Reader";
import {TableSchemas} from "../schema/TableSchemas";
import {Tables} from "../schema/Tables";
import {TypeOf, z} from "zod";

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

  add(payload: TypeOf<TableSchemas[T]["insertSchema"]>): Promise<number> {
    return this.crud.add(payload);
  }

  delete(id: number): Promise<void> {
    return this.crud.delete(id);
  }

  deleteAll(): Promise<void> {
    return this.crud.deleteAll();
  }

  get(id: number): Promise<TypeOf<TableSchemas[T]["schema"]> | undefined> {
    return this.crud.get(id);
  }

  getAll(
    predicate?: Reader<TypeOf<TableSchemas[T]["schema"]>, boolean>,
  ): Promise<TypeOf<TableSchemas[T]["schema"]>[]> {
    return this.crud.getAll(predicate);
  }

  onMutation(callback: () => void): MutationSubscription {
    return this.crud.onMutation(callback);
  }
}
