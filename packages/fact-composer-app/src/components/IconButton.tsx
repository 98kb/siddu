import {ComponentProps, forwardRef} from "react";
import {Button} from "./ui/button";
import {EasyTooltip} from "./EasyTooltip";
import {cn} from "~/lib/utils";

type TProps = ComponentProps<typeof Button> & {
  tooltip: string;
  openDelay?: number;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
};

export const IconButton = forwardRef<HTMLButtonElement, TProps>(
  function ToolbarButton(
    {children, tooltip, openDelay, side, sideOffset, className, ...buttonProps},
    ref,
  ) {
    return (
      <EasyTooltip
        tooltip={tooltip}
        openDelay={openDelay}
        side={side}
        sideOffset={sideOffset}
      >
        <Button
          ref={ref}
          size="icon"
          variant="ghost"
          className={cn("rounded-full", className)}
          {...buttonProps}
        >
          {children}
        </Button>
      </EasyTooltip>
    );
  },
);
