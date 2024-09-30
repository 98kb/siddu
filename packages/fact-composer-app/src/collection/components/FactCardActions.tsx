import {ArchiveXIcon} from "lucide-react";
import {EasyTooltip} from "~/components/EasyTooltip";
import {Button} from "~/components/ui/button";
import {TooltipProvider} from "~/components/ui/tooltip";

export function FactCardActions() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <EasyTooltip side="bottom" tooltip="Archive" openDelay={50}>
          <Button variant="ghost" size="icon-sm">
            <ArchiveXIcon />
          </Button>
        </EasyTooltip>
      </div>
    </TooltipProvider>
  );
}
