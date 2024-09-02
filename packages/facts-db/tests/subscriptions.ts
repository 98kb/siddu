import {Observable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
export function subscriptions<T>(
  observable: Observable<T>,
  subs: Reader<T, void>[],
) {
  let iter = 0;
  observable.subscribe(value => {
    const sub = subs[iter++];
    sub?.(value);
  });
}
