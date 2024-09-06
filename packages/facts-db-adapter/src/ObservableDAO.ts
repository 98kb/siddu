import {DAO, InsertObject, TableObjects} from "@repo/facts-db";
import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";
import {Task} from "fp-ts/lib/Task";
import type {Subject} from "rxjs/internal/Subject";

// TODO: add decorator for sync
export abstract class ObservableDAO<T extends keyof TableObjects>
  implements DAO<T>
{
  private subjects: [Subject<any>, Task<any>][] = [];

  toObservable<R>(fn: Task<R>): Observable<R> {
    const subject = new ReplaySubject<R>();
    this.subjects.push([subject, fn]);
    this.publish(fn, subject);
    return subject.asObservable() as unknown as Observable<R>;
  }

  async addOne(obj: InsertObject<T>): Promise<TableObjects[T]> {
    const savedObj = await this.addObj(obj);
    this.sync();
    return savedObj;
  }

  async updateOne(id: string, payload: InsertObject<T>): Promise<void> {
    await this.updateObj(id, payload);
    this.sync();
  }

  async deleteOne(id: string): Promise<void> {
    await this.deleteObj(id);
    this.sync();
  }

  async deleteAll(): Promise<void> {
    await this.deleteAllObj();
    this.sync();
  }

  abstract getOne(id: string): Promise<TableObjects[T] | undefined>;
  abstract getAll(): Promise<TableObjects[T][]>;
  abstract filter(
    predicate: Reader<TableObjects[T], boolean>,
  ): Promise<TableObjects[T][]>;

  protected abstract addObj(obj: InsertObject<T>): Promise<TableObjects[T]>;
  protected abstract updateObj(
    id: string,
    payload: InsertObject<T>,
  ): Promise<void>;

  protected abstract deleteObj(id: string): Promise<void>;
  protected abstract deleteAllObj(): Promise<void>;

  private async sync(): Promise<void> {
    for (const [subject, fn] of this.subjects) {
      this.publish(fn, subject);
    }
  }

  private async publish<R>(fn: Task<R>, subject: Subject<R>): Promise<void> {
    const res = await fn();
    subject.next(res);
  }
}
