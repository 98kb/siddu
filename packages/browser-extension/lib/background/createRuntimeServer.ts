import {
  ChromeAuth,
  createAppRouter as createAuthRouter,
} from "@repo/chrome-auth-service";
import {DbClient, createAppRouter as createDbRouter} from "@repo/facts-db";
import {createChromeHandler} from "trpc-chrome/adapter";
import {router as createRouter} from "../trpc";

export function createRuntimeServer(dbClient: DbClient) {
  const db = createDbRouter(dbClient);
  const auth = createAuthRouter(new ChromeAuth());
  const router = createRouter({auth, db});
  return createChromeHandler({
    createContext: () => ({}),
    router,
    onError: console.error,
  });
}
