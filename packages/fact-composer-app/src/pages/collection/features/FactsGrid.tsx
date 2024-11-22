import {FactCard} from "../components/FactCard";
import {Reader} from "fp-ts/lib/Reader";
import {FactCardActions} from "./FactCardActions";
import {type FactSchema} from "@repo/collection-service-defs";

type TProps = {
  facts: FactSchema[];
  highlightedFacts: FactSchema[];
  onClick: Reader<FactSchema | undefined, void>;
};

export function FactsGrid({facts, highlightedFacts, onClick}: TProps) {
  return (
    <div className="w-full h-full @container">
      <div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4">
        {facts.map(fact => (
          <FactCard
            key={fact._id}
            fact={fact}
            isHighlighted={isHighlighted(fact, highlightedFacts)}
            className="break-inside-avoid mb-4 animate-fade-in"
            onClick={() => onClick(fact)}
          >
            <FactCardActions
              key={fact._id}
              fact={fact}
              onClickPropagation={async event => {
                event.stopPropagation();
                onClick(undefined);
              }}
            />
          </FactCard>
        ))}
      </div>
    </div>
  );
}

function isHighlighted(fact: FactSchema, highlightedFacts?: FactSchema[]) {
  return highlightedFacts?.some(f => f._id === fact._id);
}
