import {BackupService} from "./services/BackupService";
import {publicProcedure, router} from "./lib/trpc";

export const createBackupRouter = (backup: BackupService) =>
  router({
    backup: publicProcedure.mutation(() => backup.backup()),
    restore: publicProcedure.mutation(() => backup.restore()),
  });
