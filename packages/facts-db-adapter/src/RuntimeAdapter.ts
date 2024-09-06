import {type Fact, InsertObject, TableObjects} from "@repo/facts-db";
import {ObservableDAO} from "./ObservableDAO";
import {createMessenger} from "@repo/runtime-messaging";

export class RuntimeAdapter<
  T extends keyof TableObjects,
> extends ObservableDAO<T> {
  private readonly sendRequest: ReturnType<typeof createMessenger>;

  constructor() {
    super();
    this.sendRequest = createMessenger(chrome.runtime);
  }

  getOne(id: string): Promise<Fact | undefined> {
    return this.sendRequest("getOne", {id});
  }

  filter(predicate: (fact: Fact) => boolean): Promise<Fact[]> {
    return this.sendRequest("filter", {predicate});
  }

  getAll(): Promise<Fact[]> {
    return this.sendRequest("getAll");
  }

  protected addObj(fact: InsertObject<T>): Promise<TableObjects[T]> {
    return this.sendRequest("addOne", fact);
  }

  protected updateObj(id: string, obj: InsertObject<T>): Promise<void> {
    return this.sendRequest("updateOne", {id, obj});
  }

  protected deleteObj(id: string): Promise<void> {
    return this.sendRequest("deleteOne", {id});
  }

  protected deleteAllObj(): Promise<void> {
    return this.sendRequest("deleteAll");
  }
}
