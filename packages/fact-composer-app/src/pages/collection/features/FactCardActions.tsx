import type {FactSchema} from "@repo/collection-service-defs";
import {ArchiveRestoreFact} from "./ArchiveRestoreFact";
import {useSelectedFact} from "../hooks/useSelectedFacts";

type TProps = {
  fact: FactSchema;
};

export function FactCardActions({fact}: TProps) {
  const {clearSelectedFact} = useSelectedFact();
  return (
    <div className="flex gap-2">
      <ArchiveRestoreFact
        fact={fact}
        size="icon"
        onChange={clearSelectedFact}
      />
    </div>
  );
}
