import {ComponentProps} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "~/components/ui/tooltip";

type TProps = {
  children: React.ReactNode;
  openDelay?: number;
  side: ComponentProps<typeof TooltipContent>["side"];
  sideOffset?: number;
  tooltip: string;
};

export function EasyTooltip({
  children,
  openDelay,
  tooltip,
  ...contentProps
}: TProps) {
  return (
    <Tooltip delayDuration={openDelay}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...contentProps}>
        <span className="capitalize">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
