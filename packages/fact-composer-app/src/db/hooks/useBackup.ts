import {useAtom} from "jotai";
import {useCallback, useContext} from "react";
import {BackupContext} from "~/context/BackupContext";
import {isBackingUpAtom} from "../stores/isBackingUpAtom";
import {isRestoringAtom} from "../stores/isRestoringAtom";

export function useBackup() {
  const client = useContext(BackupContext);
  const [isBackingUp, setIsBackingUp] = useAtom(isBackingUpAtom);
  const [isRestoring, setIsRestoring] = useAtom(isRestoringAtom);
  const isBusy = isBackingUp || isRestoring;

  const backup = useCallback(async () => {
    if (isBusy) {
      return;
    }
    setIsBackingUp(true);
    try {
      await client?.backup.mutate();
    } finally {
      setIsBackingUp(false);
    }
  }, [client, isBusy, setIsBackingUp]);

  const restore = useCallback(async () => {
    if (isBusy) {
      return;
    }
    setIsRestoring(true);
    try {
      await client?.restore.mutate();
    } finally {
      setIsRestoring(false);
    }
  }, [client, isBusy, setIsRestoring]);

  return {isBusy, backup, restore};
}
