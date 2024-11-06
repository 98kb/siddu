import {BackupService} from "./services/BackupService";
import {FileSchema} from "./dto/FileSchema";
import {publicProcedure, router} from "./lib/trpc";

export const createBackupRouter = (backup: BackupService) =>
  router({
    backup: publicProcedure.mutation(() => backup.backup()),
    list: publicProcedure.query(() => backup.listBackups()),
    delete: publicProcedure
      .input(FileSchema)
      .mutation(({input}) => backup.deleteBackup(input)),
    restore: publicProcedure
      .input(FileSchema)
      .mutation(({input}) => backup.restore(input)),
  });
