import {useBackup} from "~/db/hooks/useBackup";
import {BackupRestoreButtons} from "../components/BackupRestoreButtons";

// TODO: implement conflict resolution
export function DbSync() {
  const {isBackupBusy, isRestoreBusy, backup, restore} = useBackup();
  return (
    <div className="flex items-center w-full justify-around">
      <div className="inline-flex flex-col">
        Backup/Restore your data
        <small className="text-gray-500">
          Your data will be store in your own Google Drive
        </small>
      </div>
      <div className="flex gap-2">
        <BackupRestoreButtons
          isBackupBusy={isBackupBusy}
          isRestoreBusy={isRestoreBusy}
          onBackup={backup}
          onRestore={restore}
        />
      </div>
    </div>
  );
}
