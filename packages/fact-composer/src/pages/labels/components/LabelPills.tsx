import {Pill} from "~/components/Pill";
import {Reader} from "fp-ts/Reader";
import _isequal from "lodash.isequal";
import type {LabelSchema} from "@repo/collection-service-defs";

type TProps = {
  labels: LabelSchema[];
  highlightedLabels?: LabelSchema[];
  onClick?: Reader<LabelSchema, void>;
  children?: Reader<LabelSchema, React.ReactNode>;
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
        key={label._id}
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

function toVariant(label: LabelSchema, highlightedLabels?: LabelSchema[]) {
  return highlightedLabels?.some($label => _isequal($label, label))
    ? "default"
    : "outline";
}
