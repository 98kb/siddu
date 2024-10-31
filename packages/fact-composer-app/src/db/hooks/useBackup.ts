import {useAtom} from "jotai";
import {useCallback, useContext} from "react";
import {BackupContext} from "~/db/context/BackupContext";
import {isBackingUpAtom} from "../stores/isBackingUpAtom";
import {isRestoringAtom} from "../stores/isRestoringAtom";

export function useBackup() {
  const client = useContext(BackupContext);
  const [isBackupBusy, setIsBackupBusy] = useAtom(isBackingUpAtom);
  const [isRestoreBusy, setIsRestoreBusy] = useAtom(isRestoringAtom);
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

  const restore = useCallback(async () => {
    if (isBusy) {
      return;
    }
    setIsRestoreBusy(true);
    try {
      await client?.restore.mutate();
    } finally {
      setIsRestoreBusy(false);
    }
  }, [client, isBusy, setIsRestoreBusy]);

  return {isBackupBusy, isRestoreBusy, backup, restore};
}
