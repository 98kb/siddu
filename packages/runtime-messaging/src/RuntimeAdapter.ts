import {type Fact, ObservableDAO} from "@repo/facts-db";
import {sendRequest} from "./sendRequest";

export class RuntimeAdapter extends ObservableDAO<Fact> {
  getOne(id: string): Promise<Fact | undefined> {
    return sendRequest("getOne", {id});
  }

  filter(predicate: (fact: Fact) => boolean): Promise<Fact[]> {
    return sendRequest("filter", {predicate});
  }

  getAll(): Promise<Fact[]> {
    return sendRequest("getAll");
  }

  protected addObj(fact: Omit<Fact, "id">): Promise<void> {
    return sendRequest("addOne", fact);
  }

  protected updateObj(id: string, note: Partial<Fact>): Promise<void> {
    return sendRequest("updateOne", {id, note});
  }

  protected deleteObj(id: string): Promise<void> {
    return sendRequest("deleteOne", {id});
  }
}
