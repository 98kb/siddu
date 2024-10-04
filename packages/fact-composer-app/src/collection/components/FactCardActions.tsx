import {ArchiveXIcon} from "lucide-react";
import {ComponentProps} from "react";
import {EasyTooltip} from "~/components/EasyTooltip";
import {Button} from "~/components/ui/button";
import {TooltipProvider} from "~/components/ui/tooltip";

type TProps = {
  onArchive?: ComponentProps<typeof Button>["onClick"];
};

export function FactCardActions({onArchive}: TProps) {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <EasyTooltip side="bottom" tooltip="Archive" openDelay={50}>
          <Button variant="ghost" size="icon-sm" onClick={onArchive}>
            <ArchiveXIcon />
          </Button>
        </EasyTooltip>
      </div>
    </TooltipProvider>
  );
}
