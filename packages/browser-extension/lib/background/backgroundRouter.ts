import {
  GoogleChromeAuth,
  createChromeAuthRouter,
} from "@repo/chrome-auth-service";
import {createBackupRouter, createBackupService} from "@repo/facts-db-backup";
import {createAppRouter as createDbRouter} from "@repo/facts-db";
import {router as createRouter} from "../trpc";
import {db} from "../db";
import {factsDb} from "../factsDb";

const auth = new GoogleChromeAuth();

export const backgroundRouter = createRouter({
  db: createDbRouter(db),
  auth: createChromeAuthRouter(auth),
  backup: createBackupRouter(createBackupService(factsDb, auth)),
});
