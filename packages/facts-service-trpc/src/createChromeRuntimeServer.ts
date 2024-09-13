// background.ts
import {createAppRouter} from "./routers/createAppRouter";
import {createChromeHandler} from "trpc-chrome/adapter";
import {createFactsDB} from "@repo/facts-db";

export const createChromeRuntimeServer = () =>
  createChromeHandler({
    router: createAppRouter(createFactsDB("facts")),
    onError: console.error,
  });
