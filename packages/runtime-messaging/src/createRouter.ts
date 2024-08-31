import {FactsORM} from "@repo/facts-db";
import {IO} from "fp-ts/lib/IO";
import {RuntimeAdapter} from "./RuntimeAdapter";
import {createRequestHandlers} from "./createRequestHandlers";
import type {Router} from "./Router";

export const createRouter: IO<Router> = () => {
  const db = new FactsORM(new RuntimeAdapter());
  const handlers = createRequestHandlers(db);
  return (message, sendResponse) => {
    const handler = handlers[message.type];
    handler?.(message.payload, sendResponse);
  };
};
