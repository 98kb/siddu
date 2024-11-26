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
  const Icon = useMemo(() => {
    return restore ? (
      <BookUpIcon className="h-4 w-4" />
    ) : (
      <BookDownIcon className="h-4 w-4" />
    );
  }, [restore]);
  const btnProps = useMemo<ComponentProps<typeof IconButton>>(() => {
    return {
      size: btnSize,
      openDelay: 50,
      children: Icon,
    };
  }, [btnSize, Icon]);
  const label = useMemo(
    () => <span className="text-sm">{restore ? "Restore?" : "Archive?"}</span>,
    [restore],
  );
  return (
    <WithConfirmation
      label={label}
      For={IconButton}
      onConfirm={onConfirm}
      onCancel={event => event.stopPropagation()}
      {...btnProps}
    />
  );
}
