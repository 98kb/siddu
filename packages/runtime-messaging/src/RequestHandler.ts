import {Requests} from "./Requests";
import {TableObjects} from "./../../facts-db/src/TableObjects";
import type {Reader} from "fp-ts/lib/Reader";

export type RequestHandler<
  T extends keyof TableObjects,
  M extends keyof Requests<T> = keyof Requests<T>,
> = (
  payload: Requests<T>[M]["payload"],
  sendResponse: Reader<Requests<T>[M]["result"], void>,
) => void;
