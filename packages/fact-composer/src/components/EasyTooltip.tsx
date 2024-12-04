import {ComponentProps} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "~/components/ui/tooltip";

type TProps = ComponentProps<typeof TooltipContent> & {
  children: React.ReactNode;
  openDelay?: number;
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
