import {ComponentProps, forwardRef} from "react";
import {Button} from "./ui/button";
import {EasyTooltip} from "./EasyTooltip";
import {cn} from "~/lib/utils";

type TProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  openDelay?: number;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
};

export const IconButton = forwardRef<HTMLButtonElement, TProps>(
  (
    {children, tooltip, openDelay, side, sideOffset, className, ...buttonProps},
    ref,
  ) => {
    const Btn = (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        className={cn("rounded-full", className)}
        {...buttonProps}
      >
        {children}
      </Button>
    );
    return tooltip ? (
      <EasyTooltip
        tooltip={tooltip}
        openDelay={openDelay}
        side={side}
        sideOffset={sideOffset}
      >
        {Btn}
      </EasyTooltip>
    ) : (
      Btn
    );
  },
);
