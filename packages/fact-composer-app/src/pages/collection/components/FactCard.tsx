import type {LabelSchema, FactSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {useCallback} from "react";
import {Card, CardContent, CardFooter} from "~/components/ui/card";
import {cn} from "~/lib/utils";
import {LabelPills} from "~/pages/labels/components/LabelPills";

type TProps = {
  fact: FactSchema;
  isHighlighted?: boolean;
  highlightedLabels?: LabelSchema[];
  onClick?: Reader<FactSchema, void>;
  children?: React.ReactNode;
  className?: string;
};

export function FactCard({
  fact,
  highlightedLabels,
  isHighlighted,
  children,
  className,
  onClick,
}: TProps) {
  const handleClick = useCallback(() => {
    onClick?.(fact);
  }, [onClick, fact]);
  return (
    <Card
      className={cn([
        "group w-full",
        "select-none",
        "shadow-none hover:shadow hover:border-gray-400",
        "transition-shadow duration-100 ease-in-out",
        {"border-black hover:border-black": isHighlighted},
        className,
      ])}
      onClick={handleClick}
    >
      <CardContent>
        <div className="w-full">
          <p className="min-h-[100px] line-clamp-5 cursor-default pt-4 mb-2">
            {fact.content}
          </p>
          <div className="flex gap-1 flex-wrap">
            <LabelPills
              labels={fact.labels}
              highlightedLabels={highlightedLabels}
            />
          </div>
        </div>
      </CardContent>
      {children && (
        <CardFooter className="opacity-0 pb-4 group-hover:opacity-100">
          {children}
        </CardFooter>
      )}
    </Card>
  );
}
