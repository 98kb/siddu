import {useBackup} from "~/db/hooks/useBackup";
import {useRestore} from "~/db/hooks/useRestore";
import {useEffect, useState} from "react";
import {FileSchema} from "@repo/facts-db-backup";
import {DbSyncAction} from "../components/DbSyncAction";

export function DbSync() {
  const {fetchBackupFiles} = useBackup();
  const [backupFilesPromise, setBackupFilesPromise] =
    useState<Promise<FileSchema[]>>();
  // const [backupFiles, setBackupFiles] = useState<FileSchema[]>([]);

  useEffect(() => {
    setBackupFilesPromise(fetchBackupFiles());
  }, [fetchBackupFiles]);

  // useEffect(() => {
  //   backupFilesPromise?.then(setBackupFiles);
  // }, [backupFilesPromise]);

  // const handleDelete = async (backup: FileSchema) => {
  //   setBackupFiles($backupFiles =>
  //     $backupFiles.filter(file => file.id !== backup.id),
  //   );
  //   await deleteBackup(backup);
  // };

  return (
    <div className="flex flex-col gap-4">
      <SyncAction backupFilesPromise={backupFilesPromise} />
      {/* {backupFiles.map(file => (
        <RestoreAction key={file.id} file={file} onDelete={handleDelete} />
      ))} */}
    </div>
  );
}

function SyncAction({
  backupFilesPromise,
}: {
  backupFilesPromise?: Promise<FileSchema[]>;
}) {
  const {isBackupBusy, backup} = useBackup();
  const {isRestoreBusy, restore} = useRestore();
  const syncDb = async () => {
    const maybeBackupFiles = await backupFilesPromise;
    if (maybeBackupFiles?.length) {
      await restore(maybeBackupFiles[0]);
    }
    backup();
  };
  return (
    <DbSyncAction loading={isBackupBusy || isRestoreBusy} onSync={syncDb} />
  );
}
