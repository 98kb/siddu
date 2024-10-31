import {IO} from "fp-ts/lib/IO";
import {DownloadCloudIcon, UploadCloudIcon} from "lucide-react";
import {IconButton} from "~/components/IconButton";
import {cn} from "~/lib/utils";

type TProps = {
  isBackupBusy: boolean;
  isRestoreBusy: boolean;
  onBackup: IO<void>;
  onRestore: IO<void>;
};

export function BackupRestoreButtons({
  isBackupBusy,
  isRestoreBusy,
  onBackup,
  onRestore,
}: TProps) {
  const backupStyles = cn({
    "animate-bounce": isBackupBusy,
    "opacity-50": isRestoreBusy,
  });
  const restoreStyles = cn({
    "animate-bounce": isRestoreBusy,
    "opacity-50": isBackupBusy,
  });
  return (
    <>
      <IconButton tooltip="Backup" onClick={onBackup}>
        <UploadCloudIcon className={backupStyles} />
      </IconButton>
      <IconButton tooltip="Restore" onClick={onRestore}>
        <DownloadCloudIcon className={restoreStyles} />
      </IconButton>
    </>
  );
}
