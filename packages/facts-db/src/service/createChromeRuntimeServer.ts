import {DbClient} from "../DbClient";
import {createAppRouter} from "./routers/createAppRouter";
import {createChromeHandler} from "trpc-chrome/adapter";

export const createChromeRuntimeServer = (db: DbClient) =>
  createChromeHandler({
    router: createAppRouter(db),
    onError: console.error,
  });
