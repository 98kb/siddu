import {Label} from "@repo/facts-db";
import {XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {LabelPills} from "~/labels/components/LabelPills";

type TProps = {
  labels: Label[];
  onChange: (labels: Label[]) => void;
};

export function LabelsEditor({labels, onChange}: TProps) {
  const removeLabel = (id: number) => {
    onChange(labels.filter(label => label.id !== id));
  };

  return (
    <LabelPills labels={labels}>
      {label => (
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-full"
          onClick={() => removeLabel(label.id)}
        >
          <XIcon className="w-3 h-3" />
        </Button>
      )}
    </LabelPills>
  );
}
