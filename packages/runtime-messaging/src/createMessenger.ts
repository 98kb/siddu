import {Requests} from "./Requests";
import {TableObjects} from "@repo/facts-db";

// TODO: Decouple generics from facts-db
export const createMessenger =
  (runtime: typeof chrome.runtime) =>
  <T extends keyof TableObjects, M extends keyof Requests<T>>(
    type: M,
    payload?: Requests<T>[M]["payload"],
  ): Promise<Requests<T>[M]["result"]> =>
    new Promise<Requests<T>[M]["result"]>(resolve => {
      runtime.sendMessage({type, payload}, result => {
        resolve(result);
      });
    });
