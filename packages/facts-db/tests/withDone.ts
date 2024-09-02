import {IO} from "fp-ts/lib/IO";
import {Reader} from "fp-ts/lib/Reader";
export function withDone(fn: Reader<IO<void>, void>): IO<Promise<void>> {
  return () => new Promise(fn);
}
