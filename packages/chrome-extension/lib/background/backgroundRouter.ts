import {
  GoogleChromeAuth,
  createChromeAuthRouter,
} from "@repo/chrome-auth-service";
import {
  createBackupRouter,
  createBackupService,
} from "@repo/collection-service-dexie-backup";
import {createCollectionsRouter} from "./collection/createCollectionsRouter";
import {router as createRouter} from "../trpc";
import {db} from "../db";

const auth = new GoogleChromeAuth();

export const backgroundRouter = createRouter({
  collection: createCollectionsRouter(db),
  auth: createChromeAuthRouter(auth),
  backup: createBackupRouter(createBackupService(db, auth)),
});
