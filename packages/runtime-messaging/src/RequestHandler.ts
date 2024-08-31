import {Requests} from "./Requests";
import type {Reader} from "fp-ts/lib/Reader";

export type RequestHandler<M extends keyof Requests = keyof Requests> = (
  payload: Requests[M]["payload"],
  sendResponse: Reader<Requests[M]["result"], void>,
) => void;
