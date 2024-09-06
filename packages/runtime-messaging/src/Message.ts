import {Requests} from "./Requests";
import {TableObjects} from "@repo/facts-db";

export type Message<T extends keyof TableObjects> = {
  type: keyof Requests<T>;
  payload: Requests<T>[keyof Requests<T>]["payload"];
};
