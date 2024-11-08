import {IconButton} from "~/components/IconButton";
import {ActionItem} from "./ActionItem";
import {DownloadCloudIcon, Trash2Icon} from "lucide-react";
import {cn} from "~/lib/utils";

type TProps = {
  file: {
    id: string;
    name: string;
  };
  loading: boolean;
  disabled: boolean;
  onRestore: (file: {id: string; name: string}) => Promise<void>;
  onDelete: (file: {id: string; name: string}) => Promise<void>;
};

export function RestoreAction({
  file,
  loading,
  disabled,
  onDelete,
  onRestore,
}: TProps) {
  const restoreStyles = cn(
    "opacity-0",
    loading && "animate-bounce",
    `group-hover:opacity-${disabled ? 50 : 100}`,
  );

  return (
    <ActionItem
      key={file.id}
      label={file.name}
      subtext={file.id}
      className="group"
    >
      <div className="flex gap-2">
        <IconButton
          tooltip="Delete"
          className="opacity-0 group-hover:opacity-100"
          onClick={() => onDelete(file)}
        >
          <Trash2Icon />
        </IconButton>
        <IconButton
          tooltip="Restore"
          className={restoreStyles}
          onClick={() => onRestore(file)}
        >
          <DownloadCloudIcon />
        </IconButton>
      </div>
    </ActionItem>
  );
}
