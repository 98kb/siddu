import {useAtom, useAtomValue} from "jotai";
import {useCallback, useContext} from "react";
import {BackupContext} from "~/db/context/BackupContext";
import {isBackingUpAtom} from "../stores/isBackingUpAtom";
import {isRestoringAtom} from "../stores/isRestoringAtom";
import {FileSchema} from "@repo/facts-db-backup";

// eslint-disable-next-line max-statements
export function useBackup() {
  const client = useContext(BackupContext);
  const [isBackupBusy, setIsBackupBusy] = useAtom(isBackingUpAtom);
  const isRestoreBusy = useAtomValue(isRestoringAtom);
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

  const fetchBackupFiles = useCallback(
    () => client?.fetchBackupFiles.query(),
    [client],
  );

  const deleteBackup = useCallback(
    async (backup: FileSchema) => {
      await client?.delete.mutate(backup);
    },
    [client],
  );

  return {
    fetchBackupFiles,
    isBackupBusy,
    backup,
    deleteBackup,
  };
}
