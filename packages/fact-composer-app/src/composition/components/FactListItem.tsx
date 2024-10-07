import {Fact} from "@repo/facts-db";
import {ComponentProps} from "react";
import {LabelPills} from "~/labels/components/LabelPills";
import {cn} from "~/lib/utils";

type TProps = ComponentProps<"div"> & {
  fact: Fact;
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
      <span className="text-sm cursor-default">{fact.content}</span>
      <div className="flex gap-1">
        <LabelPills labels={fact.labels} />
      </div>
    </div>
  );
}
