import {useAtom, useAtomValue} from "jotai";
import {useCallback, useContext} from "react";
import {BackupContext} from "~/db/context/BackupContext";
import {isBackingUpAtom} from "../stores/isBackingUpAtom";
import {isRestoringAtom} from "../stores/isRestoringAtom";
import {backupFilesAtom} from "../stores/backupFilesAtom";
import {FileSchema} from "@repo/facts-db-backup";

// eslint-disable-next-line max-statements
export function useBackup() {
  const client = useContext(BackupContext);
  const [isBackupBusy, setIsBackupBusy] = useAtom(isBackingUpAtom);
  const isRestoreBusy = useAtomValue(isRestoringAtom);
  const [backupFiles, setBackupFiles] = useAtom(backupFilesAtom);
  const isBusy = isBackupBusy || isRestoreBusy;

  const backup = useCallback(async () => {
    if (isBusy) {
      return;
    }
    setIsBackupBusy(true);
    try {
      await client?.backup.mutate();
    } finally {
      setIsBackupBusy(false);
    }
  }, [client, isBusy, setIsBackupBusy]);

  const listBackups = useCallback(async () => {
    setBackupFiles((await client?.list.query()) ?? []);
  }, [client, setBackupFiles]);

  const deleteBackup = useCallback(
    async (backup: FileSchema) => {
      // eslint-disable-next-line max-nested-callbacks
      setBackupFiles(files => files.filter($file => $file.id !== backup.id));
      await client?.delete.mutate(backup);
    },
    [client, setBackupFiles],
  );

  return {
    isBackupBusy,
    backup,
    backupFiles,
    listBackups,
    deleteBackup,
  };
}
