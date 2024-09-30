import {ComponentProps} from "react";
import {Badge} from "./ui/badge";
import {cn} from "~/lib/utils";

type TProps = {
  name: string;
  children?: React.ReactNode;
  variant?: ComponentProps<typeof Badge>["variant"];
  onClick?: () => void;
  className?: string;
};

export function Pill({name, children, variant, onClick, className}: TProps) {
  return (
    <Badge
      variant={variant}
      onClick={onClick}
      className={cn(
        "inline-flex gap-1 items-center cursor-default select-none",
        className,
      )}
    >
      {name}
      {children}
    </Badge>
  );
}
