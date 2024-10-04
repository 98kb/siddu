import {Fact, InsertFact, Label} from "@repo/facts-db";
import {ArchiveXIcon, TagIcon} from "lucide-react";
import {ComponentProps, forwardRef} from "react";
import {EasyTooltip} from "~/components/EasyTooltip";
import {Button} from "~/components/ui/button";
import {TooltipProvider} from "~/components/ui/tooltip";
import {SelectLabels} from "~/labels/components/SelectLabels";
import {cn} from "~/lib/utils";

type TProps = {
  fact: Fact | InsertFact;
  onChange: (fact: Fact | InsertFact) => void;
  onArchive: (factId: Fact["id"]) => void;
  onClose: () => void;
};

export function FactEditorToolbar({
  fact,
  onArchive,
  onChange,
  onClose,
}: TProps) {
  const updateLabels = (labels: Label[]) => onChange({...fact, labels});
  return (
    <TooltipProvider>
      <div className="flex w-full">
        <div className="flex">
          <SelectLabels
            selected={fact.labels}
            onSelect={label => updateLabels([...fact.labels, label])}
          >
            {({open}) => (
              <ToolbarButton
                tooltip="Add Label"
                role="combobox"
                aria-expanded={open}
              >
                <TagIcon className="h-4 w-4" />
              </ToolbarButton>
            )}
          </SelectLabels>
          {"id" in fact && (
            <ToolbarButton
              tooltip="Archive"
              onClick={async () => {
                await onArchive(fact.id);
                onClose();
              }}
            >
              <ArchiveXIcon className="h-4 w-4" />
            </ToolbarButton>
          )}
        </div>
        <div className="grow"></div>
        <Button variant="link" onClick={onClose}>
          Close
        </Button>
      </div>
    </TooltipProvider>
  );
}

type ToolbarButtonProps = ComponentProps<typeof Button> & {
  tooltip: string;
  className?: string;
  openDelay?: number;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
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
