import {type Fact, ObservableDAO} from "@repo/facts-db";
import {sendMessage} from "./sendMessage";

export class RuntimeAdapter extends ObservableDAO<Fact> {
  getOne(id: string): Promise<Fact | undefined> {
    return sendMessage("getOne", {id});
  }

  filter(predicate: (fact: Fact) => boolean): Promise<Fact[]> {
    return sendMessage("filter", predicate);
  }

  getAll(): Promise<Fact[]> {
    return sendMessage("getAll");
  }

  protected addObj(fact: Omit<Fact, "id">): Promise<void> {
    return sendMessage("addOne", fact);
  }

  protected updateObj(id: string, note: Partial<Fact>): Promise<void> {
    return sendMessage("updateOne", {id, note});
  }

  protected deleteObj(id: string): Promise<void> {
    return sendMessage("deleteOne", {id});
  }
}
