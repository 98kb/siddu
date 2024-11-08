import {ActionItem} from "./ActionItem";
import {IconButton} from "~/components/IconButton";
import {UploadCloudIcon} from "lucide-react";
import {cn} from "~/lib/utils";

type TProps = {
  loading: boolean;
  disabled: boolean;
  onBackup: () => void;
};

export function BackupAction({loading, disabled, onBackup}: TProps) {
  return (
    <ActionItem
      label="Backup your library"
      subtext="Your data will be store in your own Google Drive"
    >
      <IconButton
        tooltip="Backup"
        className={cn(loading && "animate-bounce")}
        disabled={disabled}
        onClick={onBackup}
      >
        <UploadCloudIcon />
      </IconButton>
    </ActionItem>
  );
}
