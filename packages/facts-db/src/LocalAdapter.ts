import {DAO} from "./DAO";
import {Fact} from "./Fact";
import {IO} from "fp-ts/lib/IO";
import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";
import {Task} from "fp-ts/lib/Task";
import {nanoid} from "nanoid";

export class LocalAdapter implements DAO<Fact> {
  private subjects: [ReplaySubject<any>, IO<any> | Task<any>][] = [];

  constructor(private key: string) {}

  toObservable<R>(fn: Task<R>): Observable<R> {
    const subject = new ReplaySubject<R>();
    this.subjects.push([subject, fn]);
    fn().then((res: R) => subject.next(res));
    return subject.asObservable() as unknown as Observable<R>;
  }

  async addOne(partial: Omit<Fact, "id">): Promise<void> {
    const id = nanoid();
    const note = {...partial, id};
    localStorage.setItem(this.toPath(note.id), JSON.stringify(note));
    this.addToIndex(note.id);
    this.sync();
  }

  async updateOne(id: string, partial: Partial<Fact>): Promise<void> {
    const fact = this.getOne(id);
    localStorage.setItem(
      this.toPath(id),
      JSON.stringify({...fact, ...partial}),
    );
    this.sync();
  }

  async deleteOne(id: string): Promise<void> {
    localStorage.removeItem(this.toPath(id));
    this.removeFromIndex(id);
    this.sync();
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

  private async sync() {
    for (const [subject, fn] of this.subjects) {
      const res = await fn();
      subject.next(res);
    }
  }
}
