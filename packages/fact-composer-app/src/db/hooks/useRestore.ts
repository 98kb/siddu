import {useAtom, useAtomValue} from "jotai";
import {useCallback, useContext} from "react";
import {BackupContext} from "~/db/context/BackupContext";
import {isBackingUpAtom} from "../stores/isBackingUpAtom";
import {isRestoringAtom} from "../stores/isRestoringAtom";
import {FileSchema} from "@repo/facts-db-backup";

export function useRestore() {
  const client = useContext(BackupContext);
  const isBackupBusy = useAtomValue(isBackingUpAtom);
  const [isRestoreBusy, setIsRestoreBusy] = useAtom(isRestoringAtom);
  const isBusy = isBackupBusy || isRestoreBusy;

  const restore = useCallback(
    async (backup: FileSchema) => {
      if (isBusy) {
        return;
      }
      setIsRestoreBusy(true);
      try {
        await client?.restore.mutate(backup);
      } finally {
        setIsRestoreBusy(false);
      }
    },
    [client, isBusy, setIsRestoreBusy],
  );

  return {isRestoreBusy, restore};
}
