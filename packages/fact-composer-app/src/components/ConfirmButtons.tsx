import {CheckIcon, XIcon} from "lucide-react";
import {IconButton} from "./IconButton";
import {ComponentProps} from "react";

type TProps = {
  size?: ComponentProps<typeof IconButton>["size"];
  onConfirm: ComponentProps<"button">["onClick"];
  onCancel: ComponentProps<"button">["onClick"];
};

export function ConfirmButtons({size, onCancel, onConfirm}: TProps) {
  return (
    <>
      <IconButton size={size} onClick={onConfirm}>
        <CheckIcon />
      </IconButton>
      <IconButton size={size} onClick={onCancel}>
        <XIcon />
      </IconButton>
    </>
  );
}
