import {FactsService} from "@repo/facts-service";
import {createAppRouter} from "./routers/createAppRouter";
import {createChromeHandler} from "trpc-chrome/adapter";

export const createChromeRuntimeServer = (db: FactsService) =>
  createChromeHandler({
    router: createAppRouter(db),
    onError: console.error,
  });
