import {Fact, InsertFact, Label} from "@repo/facts-db";
import {ArchiveXIcon, TagIcon} from "lucide-react";
import {IconButton} from "~/components/IconButton";
import {Button} from "~/components/ui/button";
import {TooltipProvider} from "~/components/ui/tooltip";
import {SelectLabels} from "~/pages/labels/components/SelectLabels";

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
              <IconButton
                tooltip="Add Label"
                role="combobox"
                aria-expanded={open}
              >
                <TagIcon className="h-4 w-4" />
              </IconButton>
            )}
          </SelectLabels>
          {"id" in fact && (
            <IconButton
              tooltip="Archive"
              onClick={async () => {
                await onArchive(fact.id);
                onClose();
              }}
            >
              <ArchiveXIcon className="h-4 w-4" />
            </IconButton>
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
