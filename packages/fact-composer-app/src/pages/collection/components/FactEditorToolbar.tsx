import type {
  FactSchema,
  InsertFactSchema,
  LabelSchema,
} from "@repo/collection-service-defs";
import {IO} from "fp-ts/lib/IO";
import {Reader} from "fp-ts/lib/Reader";
import {ArchiveXIcon, TagIcon} from "lucide-react";
import {IconButton} from "~/components/IconButton";
import {Button} from "~/components/ui/button";
import {SelectLabels} from "~/pages/labels/components/SelectLabels";

type TProps = {
  fact: FactSchema | InsertFactSchema;
  onChange: Reader<FactSchema | InsertFactSchema, void>;
  onArchive: Reader<FactSchema["_id"], void>;
  onClose: IO<void>;
};

export function FactEditorToolbar({
  fact,
  onArchive,
  onChange,
  onClose,
}: TProps) {
  const updateLabels = (label: LabelSchema) =>
    onChange({...fact, labels: [...fact.labels, label]});
  return (
    <div className="flex w-full">
      <div className="flex">
        <SelectLabels selected={fact.labels} onSelect={updateLabels}>
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
        {"_id" in fact && (
          <IconButton
            tooltip="Archive"
            onClick={async () => {
              await onArchive(fact._id);
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
  );
}
