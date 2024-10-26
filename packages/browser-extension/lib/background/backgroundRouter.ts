import {
  ChromeAuth,
  createAppRouter as createAuthRouter,
} from "@repo/chrome-auth-service";
import {createAppRouter as createDbRouter} from "@repo/facts-db";
import {router as createRouter} from "../trpc";
import {db as dbClient} from "../db";

const db = createDbRouter(dbClient);
const auth = createAuthRouter(new ChromeAuth());
export const backgroundRouter = createRouter({auth, db});
