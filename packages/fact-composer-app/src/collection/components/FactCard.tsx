import {Fact, Label} from "@repo/facts-db";
import {Card, CardContent, CardFooter} from "~/components/ui/card";
import {cn} from "~/lib/utils";
import {Button} from "~/components/ui/button";
import {ArchiveXIcon} from "lucide-react";
import {EasyTooltip} from "~/components/EasyTooltip";
import {TooltipProvider} from "~/components/ui/tooltip";
import {LabelPills} from "~/labels/components/LabelPills";

type TProps = {
  fact: Fact;
  isHighlighted?: boolean;
  highlightedLabels?: Label[];
  onClick?: () => void;
};

export function FactCard({
  fact,
  highlightedLabels,
  isHighlighted,
  onClick,
}: TProps) {
  return (
    <TooltipProvider>
      <Card
        className={cn([
          "max-w-[200px] min-w-[200px] w-full",
          "group",
          "select-none",
          "shadow-none hover:shadow hover:border-gray-400",
          "transition-shadow duration-100 ease-in-out",
          {"border-black hover:border-black": isHighlighted},
        ])}
        onClick={onClick}
      >
        <CardContent>
          <div className="w-full">
            <p className="min-h-[100px] line-clamp-5 cursor-default pt-4 mb-2">
              {fact.content}
            </p>
            <div className="flex gap-1 flex-wrap">
              <LabelPills
                labels={fact.labels}
                highlightedLabels={highlightedLabels}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="opacity-0 pb-4 group-hover:opacity-100">
          <FactCardActions />
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}

function FactCardActions() {
  return (
    <div className="flex gap-2">
      <EasyTooltip side="bottom" tooltip="Archive" openDelay={50}>
        <Button variant="ghost" size="icon-sm">
          <ArchiveXIcon />
        </Button>
      </EasyTooltip>
    </div>
  );
}
