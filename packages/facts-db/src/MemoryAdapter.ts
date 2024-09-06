import {DAO} from "./DAO";
import {IDType} from "dexie";
import {InsertObject} from "./InsertObject";
import {ObservableDAO} from "./ObservableDAO";
import {Reader} from "fp-ts/lib/Reader";
import {TableObjects} from "./TableObjects";
import {TableSchema} from "./TableSchema";
import {nanoid} from "nanoid";

export class MemoryAdapter<T extends keyof TableObjects>
  extends ObservableDAO<T>
  implements DAO<T>
{
  private objects: Record<string, TableObjects[T]> = {};

  async getOne(
    id: IDType<TableObjects[T], TableSchema[T]>,
  ): Promise<TableObjects[T] | undefined> {
    return this.objects[id];
  }

  async getAll(): Promise<TableObjects[T][]> {
    return Object.values(this.objects);
  }

  async filter(
    predicate: Reader<TableObjects[T], boolean>,
  ): Promise<TableObjects[T][]> {
    return Object.values(this.objects).filter(o => predicate(o));
  }

  protected async addObj(obj: InsertObject<T>): Promise<TableObjects[T]> {
    const id = nanoid();
    const newObject = {...obj, id};
    this.objects[id] = newObject;
    return newObject;
  }

  protected async updateObj(
    id: IDType<TableObjects[T], TableSchema[T]>,
    obj: InsertObject<T>,
  ): Promise<void> {
    this.objects[id] = {...obj, id};
  }

  protected async deleteObj(
    id: IDType<TableObjects[T], TableSchema[T]>,
  ): Promise<void> {
    delete this.objects[id];
  }

  protected async deleteAllObj(): Promise<void> {
    this.objects = {};
  }
}
