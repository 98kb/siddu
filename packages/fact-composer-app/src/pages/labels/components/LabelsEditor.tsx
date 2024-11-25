import {XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {LabelPills} from "./LabelPills";
import type {LabelSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {useCallback} from "react";

export type TChangePayload = {
  labels: LabelSchema[];
  removed: LabelSchema["_id"];
};

type TProps = {
  labels: LabelSchema[];
  onChange: Reader<TChangePayload, void>;
};

export function LabelsEditor({labels, onChange}: TProps) {
  const removeLabel = useCallback(
    (id: LabelSchema["_id"]) => {
      onChange({labels: labels.filter(label => label._id !== id), removed: id});
    },
    [labels, onChange],
  );

  return (
    <LabelPills labels={labels}>
      {label => (
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-full"
          onClick={() => removeLabel(label._id)}
        >
          <XIcon className="w-3 h-3" />
        </Button>
      )}
    </LabelPills>
  );
}
