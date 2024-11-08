import {useBackup} from "~/db/hooks/useBackup";
import {useRestore} from "~/db/hooks/useRestore";
import {useEffect} from "react";
import {BackupAction} from "../components/BackupAction";
import {RestoreAction} from "../components/RestoreAction";

// TODO: implement conflict resolution
export function DbSync() {
  const {isBackupBusy, backup, listBackups, backupFiles, deleteBackup} =
    useBackup();
  const {isRestoreBusy, restore} = useRestore();

  useEffect(() => {
    listBackups();
  }, [listBackups]);

  return (
    <div className="flex flex-col gap-2">
      <BackupAction
        loading={isBackupBusy}
        disabled={isRestoreBusy}
        onBackup={backup}
      />
      {backupFiles.map(file => (
        <RestoreAction
          key={file.id}
          file={file}
          loading={isRestoreBusy}
          disabled={isBackupBusy}
          onRestore={restore}
          onDelete={deleteBackup}
        />
      ))}
    </div>
  );
}
