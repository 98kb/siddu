import type {FactSchema} from "@repo/collection-service-defs";
import {useCallback, useState} from "react";
import {Card, CardContent, CardFooter} from "~/components/ui/card";
import {cn} from "~/lib/utils";
import {LabelPills} from "~/pages/labels/components/LabelPills";
import {ArchiveRestoreFact} from "./ArchiveRestoreFact";
import {useSelectedFact} from "../hooks/useSelectedFacts";

type TProps = {
  fact: FactSchema;
};

export function FactCard({fact}: TProps) {
  const [classes, setClasses] = useState("");
  const {selectFact, isSelected, clearSelectedFact} = useSelectedFact();
  const $selectFact = useCallback(() => selectFact(fact), [selectFact, fact]);
  const onArchiveToggle = useCallback(
    (fact: FactSchema) => {
      if (isSelected(fact)) {
        clearSelectedFact();
      }
      setClasses("animate-fade-out scale-90 opacity-50");
    },
    [isSelected, clearSelectedFact],
  );

  return (
    <Card
      className={cn(
        "group w-full max-w-[220px] min-w-[195px]",
        "select-none shadow-none hover:shadow hover:border-gray-400",
        "break-inside-avoid mb-4 animate-fade-in mx-auto",
        "transition-all duration-100 ease-in",
        {"border-black hover:border-black": isSelected(fact)},
        classes,
      )}
      onClick={$selectFact}
    >
      <CardContent>
        <div className="w-full">
          <p className="min-h-[100px] line-clamp-5 cursor-default pt-4 mb-2">
            {fact.content}
          </p>
          <div className="flex gap-1 flex-wrap">
            <LabelPills labels={fact.labels} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="opacity-0 px-3 pb-2 group-hover:opacity-100">
        <ArchiveRestoreFact fact={fact} size="icon" onClick={onArchiveToggle} />
      </CardFooter>
    </Card>
  );
}
