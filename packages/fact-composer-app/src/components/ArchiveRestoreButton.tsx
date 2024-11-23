import {ArchiveRestoreIcon, ArchiveXIcon} from "lucide-react";
import {IconButton} from "./IconButton";
import {ComponentProps} from "react";

type TProps = {
  restore: boolean;
  size?: ComponentProps<typeof IconButton>["size"];
  onArchive: ComponentProps<"button">["onClick"];
  onRestore: ComponentProps<"button">["onClick"];
};

export function ArchiveRestoreButton({
  size,
  restore,
  onArchive,
  onRestore,
}: TProps) {
  const btnSize = size ?? "icon";
  return restore ? (
    <IconButton
      tooltip="Restore"
      size={btnSize}
      openDelay={50}
      onClick={onRestore}
    >
      <ArchiveRestoreIcon className="h-4 w-4" />
    </IconButton>
  ) : (
    <IconButton
      tooltip="Archive"
      size={btnSize}
      openDelay={50}
      onClick={onArchive}
    >
      <ArchiveXIcon className="h-4 w-4" />
    </IconButton>
  );
}
