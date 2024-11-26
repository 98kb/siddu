import type {
  FactSchema,
  InsertFactSchema,
  LabelSchema,
} from "@repo/collection-service-defs";
import {IO} from "fp-ts/lib/IO";
import {Reader} from "fp-ts/lib/Reader";
import {ArchiveXIcon, TagIcon} from "lucide-react";
import {useCallback} from "react";
import {IconButton} from "~/components/IconButton";
import {Button} from "~/components/ui/button";
import {SelectLabels} from "~/pages/labels/components/SelectLabels";
import {useArchiveFact} from "../hooks/useArchiveFact";

type TProps = {
  fact: FactSchema | InsertFactSchema;
  onChange: Reader<FactSchema | InsertFactSchema, void>;
  onClose: IO<void>;
};

export function FactEditorToolbar({fact, onChange, onClose}: TProps) {
  const {archiveFact} = useArchiveFact();
  const updateLabels = useCallback(
    (label: LabelSchema) =>
      onChange({...fact, labels: [...fact.labels, label]}),
    [onChange, fact],
  );
  const archive = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    "_id" in fact && archiveFact(fact as FactSchema);
    onClose();
  }, [fact, archiveFact, onClose]);

  return (
    <div className="flex w-full">
      <div className="flex items-center">
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
          <IconButton tooltip="Archive" onClick={archive}>
            <ArchiveXIcon className="w-4 h-4" />
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
