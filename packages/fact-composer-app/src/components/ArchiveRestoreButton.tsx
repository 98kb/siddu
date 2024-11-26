import {BookDownIcon, BookUpIcon} from "lucide-react";
import {IconButton} from "./IconButton";
import {ComponentProps, useMemo} from "react";
import {WithConfirmation} from "./HOC/WithConfirmation";

type TProps = {
  restore: boolean;
  size?: ComponentProps<typeof IconButton>["size"];
  onArchive: ComponentProps<typeof WithConfirmation>["onConfirm"];
  onRestore: ComponentProps<typeof WithConfirmation>["onConfirm"];
};

export function ArchiveRestoreButton({
  size,
  restore,
  onArchive,
  onRestore,
}: TProps) {
  const btnSize = size ?? "icon";
  const onConfirm = useMemo(
    () => (restore ? onRestore : onArchive),
    [restore, onRestore, onArchive],
  );
  const Icon = useMemo(() => (restore ? BookUpIcon : BookDownIcon), [restore]);
  return (
    <IconButton size={btnSize} onClick={onConfirm}>
      <Icon className="h-4 w-4" />
    </IconButton>
  );
}
