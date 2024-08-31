import {createRequestHandlers} from "./createRequestHandlers";
import type {FactsORM} from "@repo/facts-db";
import type {Reader} from "fp-ts/lib/Reader";
import type {Router} from "./Router";

export const createRouter: Reader<FactsORM, Router> = db => {
  const handlers = createRequestHandlers(db);
  return (message, sendResponse) => {
    const handler = handlers[message.type];
    const payload = message.payload as Parameters<typeof handler>[0];
    handler?.(payload, sendResponse);
  };
};
