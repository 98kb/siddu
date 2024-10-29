import {useContext} from "react";
import {BackupContext} from "~/context/BackupContext";

export function useBackup() {
  return useContext(BackupContext);
}
