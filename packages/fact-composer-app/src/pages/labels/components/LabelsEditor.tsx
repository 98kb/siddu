import {XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {LabelPills} from "./LabelPills";
import type {LabelSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {useCallback} from "react";

type TProps = {
  labels: LabelSchema[];
  onChange: Reader<LabelSchema[], void>;
};

export function LabelsEditor({labels, onChange}: TProps) {
  const removeLabel = useCallback(
    (id: LabelSchema["_id"]) => {
      onChange(labels.filter(label => label._id !== id));
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
