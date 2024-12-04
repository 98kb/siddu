import {ComponentProps} from "react";
import {LabelPills} from "~/pages/labels/components/LabelPills";
import {cn} from "~/lib/utils";
import {FactSchema} from "@repo/collection-service-defs";

type TProps = ComponentProps<"div"> & {
  fact: FactSchema;
};

export function FactListItem({fact, ...props}: TProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col w-full gap-2 p-4 box-border",
        "border border-gray-200 rounded-lg",
        "transition",
        "hover:border-gray-400",
      )}
    >
      <span className="text-sm cursor-default line-clamp-5">
        {fact.content}
      </span>
      <div className="flex gap-1">
        <LabelPills labels={fact.labels} />
      </div>
    </div>
  );
}
