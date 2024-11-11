import {useBackup} from "~/db/hooks/useBackup";
import {useRestore} from "~/db/hooks/useRestore";
import {useEffect, useState} from "react";
import {FileSchema} from "@repo/facts-db-backup";
import {DbSyncAction} from "../components/DbSyncAction";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {cn} from "~/lib/utils";
import {ChevronsUpDownIcon} from "lucide-react";
import {DeleteBackupAction} from "../organisms/DeleteBackupAction";

export function DbSync() {
  const {isBackupBusy, backup, deleteBackup, fetchBackupFiles} = useBackup();
  const [backupFiles, setBackupFiles] = useState<FileSchema[]>([]);
  const {isRestoreBusy, restore} = useRestore();
  const syncDb = async () => {
    if (backupFiles.length) {
      await restore(backupFiles[0]);
    }
    backup();
  };

  useEffect(() => {
    fetchBackupFiles()?.then(setBackupFiles);
  }, [fetchBackupFiles]);

  return (
    <div className="flex flex-col gap-4">
      <DbSyncAction loading={isBackupBusy || isRestoreBusy} onSync={syncDb} />
      {backupFiles.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                "flex items-center w-full justify-between",
                "hover:bg-gray-50 px-4 py-2",
                "cursor-pointer",
              )}
            >
              <small>Advanced</small>
              <ChevronsUpDownIcon className="w-5" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <DeleteBackupAction
              onDelete={async () => deleteBackup(backupFiles[0])}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
