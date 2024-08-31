import {BaseObject} from "./BaseObject";
import {DAO} from "./DAO";
import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";
import {Task} from "fp-ts/lib/Task";

export abstract class ObservableDAO<T extends BaseObject> implements DAO<T> {
  private subjects: [ReplaySubject<any>, Task<any>][] = [];

  toObservable<R>(fn: Task<R>): Observable<R> {
    const subject = new ReplaySubject<R>(1);
    this.subjects.push([subject, fn]);
    this.publish(fn, subject);
    return subject.asObservable() as unknown as Observable<R>;
  }

  async addOne(obj: Omit<T, "id">): Promise<void> {
    await this.addObj(obj);
    this.sync();
  }

  async updateOne(id: string, note: Partial<T>): Promise<void> {
    await this.updateObj(id, note);
    this.sync();
  }

  async deleteOne(id: string): Promise<void> {
    await this.deleteObj(id);
    this.sync();
  }

  abstract getOne(id: string): Promise<T | undefined>;
  abstract getAll(): Promise<T[]>;
  abstract filter(predicate: Reader<T, boolean>): Promise<T[]>;
  protected abstract addObj(obj: Omit<T, "id">): Promise<void>;
  protected abstract updateObj(id: string, note: Partial<T>): Promise<void>;
  protected abstract deleteObj(id: string): Promise<void>;

  private async sync(): Promise<void> {
    for (const [subject, fn] of this.subjects) {
      this.publish(fn, subject);
    }
  }

  private async publish<R>(
    fn: Task<R>,
    subject: ReplaySubject<R>,
  ): Promise<void> {
    const res = await fn();
    subject.next(res);
  }
}
