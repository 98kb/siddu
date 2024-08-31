import {Fact} from "./Fact";
import {ObservableDAO} from "./ObservableDAO";
import {Reader} from "fp-ts/lib/Reader";
import {nanoid} from "nanoid";

export class LocalAdapter extends ObservableDAO<Fact> {
  constructor(private key: string) {
    super();
  }

  async getOne(id: string): Promise<Fact | undefined> {
    const note = localStorage.getItem(this.toPath(id));
    return note ? JSON.parse(note) : undefined;
  }

  getAll(): Promise<Fact[]> {
    const index = localStorage.getItem(this.key) || "[]";
    return Promise.all(
      JSON.parse(index)
        .map((id: string) => this.getOne(id))
        .filter(Boolean),
    );
  }

  async filter(predicate: Reader<Fact, boolean>): Promise<Fact[]> {
    const facts = await this.getAll();
    return facts.filter(fact => predicate(fact));
  }

  protected async addObj(partial: Omit<Fact, "id">): Promise<void> {
    const id = nanoid();
    const note = {...partial, id};
    localStorage.setItem(this.toPath(note.id), JSON.stringify(note));
    this.addToIndex(note.id);
  }

  protected async updateObj(id: string, partial: Partial<Fact>): Promise<void> {
    const fact = await this.getOne(id);
    localStorage.setItem(
      this.toPath(id),
      JSON.stringify({...fact, ...partial}),
    );
  }

  protected async deleteObj(id: string): Promise<void> {
    localStorage.removeItem(this.toPath(id));
    this.removeFromIndex(id);
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
