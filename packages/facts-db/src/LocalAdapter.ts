import {InsertObject} from "./InsertObject";
import {ObservableDAO} from "./ObservableDAO";
import {Reader} from "fp-ts/lib/Reader";
import {TableObjects} from "./TableObjects";
import {nanoid} from "nanoid";

export class LocalAdapter<
  T extends keyof TableObjects,
> extends ObservableDAO<T> {
  constructor(private key: string) {
    super();
  }

  async getOne(id: string): Promise<TableObjects[T] | undefined> {
    const obj = localStorage.getItem(this.toPath(id));
    return obj ? JSON.parse(obj) : undefined;
  }

  getAll(): Promise<TableObjects[T][]> {
    const index = localStorage.getItem(this.key) || "[]";
    return Promise.all(
      JSON.parse(index)
        .map((id: string) => this.getOne(id))
        .filter(Boolean),
    );
  }

  async filter(
    predicate: Reader<TableObjects[T], boolean>,
  ): Promise<TableObjects[T][]> {
    const obj = await this.getAll();
    return obj.filter(fact => predicate(fact));
  }

  protected async addObj(partial: InsertObject<T>): Promise<TableObjects[T]> {
    const id = nanoid();
    const obj = {...partial, id} as TableObjects[T];
    localStorage.setItem(this.toPath(obj.id), JSON.stringify(obj));
    this.addToIndex(obj.id);
    return obj;
  }

  protected async updateObj(
    id: string,
    partial: InsertObject<T>,
  ): Promise<void> {
    const obj = await this.getOne(id);
    localStorage.setItem(this.toPath(id), JSON.stringify({...obj, ...partial}));
  }

  protected async deleteObj(id: string): Promise<void> {
    localStorage.removeItem(this.toPath(id));
    this.removeFromIndex(id);
  }

  protected async deleteAllObj(): Promise<void> {
    const index = localStorage.getItem(this.key) || "[]";
    const ids = JSON.parse(index);
    for (const id of ids) {
      localStorage.removeItem(this.toPath(id));
    }
    localStorage.setItem(this.key, "[]");
  }

  private toPath(id: string): string {
    return `${this.key}/${id}`;
  }

  private addToIndex(id: string) {
    const index = localStorage.getItem(this.key) || "[]";
    localStorage.setItem(this.key, JSON.stringify([...JSON.parse(index), id]));
  }

  private removeFromIndex(id: string) {
    const index = localStorage.getItem(this.key) || "[]";
    localStorage.setItem(
      this.key,
      JSON.stringify(JSON.parse(index).filter((i: string) => i !== id)),
    );
  }
}
