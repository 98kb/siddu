import {BookDownIcon, BookUpIcon} from "lucide-react";
import {IconButton} from "./IconButton";
import {ComponentProps} from "react";

type TProps = {
  restore: boolean;
  size?: ComponentProps<typeof IconButton>["size"];
  onClick?: ComponentProps<typeof IconButton>["onClick"];
};

export function ArchiveRestoreButton({restore, onClick, ...props}: TProps) {
  const Icon = restore ? BookUpIcon : BookDownIcon;
  return (
    <IconButton
      {...props}
      onClick={onClick}
      tooltip={restore ? "Restore" : "Archive"}
    >
      <Icon className="h-4 w-4" />
    </IconButton>
  );
}
