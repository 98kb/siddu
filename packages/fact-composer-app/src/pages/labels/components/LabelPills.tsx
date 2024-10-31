import {Label} from "@repo/facts-db";
import {Pill} from "~/components/Pill";
import {Reader} from "fp-ts/Reader";
import _isequal from "lodash.isequal";

type TProps = {
  labels: Label[];
  highlightedLabels?: Label[];
  onClick?: Reader<Label, void>;
  children?: Reader<Label, React.ReactNode>;
  className?: string;
};

export function LabelPills({
  labels,
  highlightedLabels,
  children,
  onClick,
  className,
}: TProps) {
  return labels
    .map(label => (
      <Pill
        key={label.id}
        name={label.name}
        className={className}
        variant={toVariant(label, highlightedLabels)}
        onClick={() => onClick?.(label)}
      >
        {children?.(label)}
      </Pill>
    ))
    .sort((a, b) => {
      if (a.props.variant === "default") {
        return -1;
      }
      if (b.props.variant === "default") {
        return 1;
      }
      return 0;
    });
}

function toVariant(label: Label, highlightedLabels?: Label[]) {
  return highlightedLabels?.some($label => _isequal($label, label))
    ? "default"
    : "outline";
}
