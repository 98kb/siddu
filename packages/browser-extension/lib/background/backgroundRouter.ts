import {
  GoogleChromeAuth,
  createChromeAuthRouter,
} from "@repo/chrome-auth-service";
import {createBackupRouter, createBackupService} from "@repo/facts-db-backup";
import {createAppRouter as createDbRouter} from "@repo/facts-db";
import {router as createRouter} from "../trpc";
import {db} from "../db";
import {factsDb} from "../factsDb";

export const backgroundRouter = createRouter({
  db: createDbRouter(db),
  auth: createChromeAuthRouter(new GoogleChromeAuth()),
  backup: createBackupRouter(
    createBackupService(factsDb, {
      drive: {
        scopes: [
          "https://www.googleapis.com/auth/drive.appdata",
          "https://www.googleapis.com/auth/drive.appfolder",
        ],
      },
    }),
  ),
});
