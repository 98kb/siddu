import {Fact} from "@repo/facts-db";
import {FactCard} from "./FactCard";
import {Reader} from "fp-ts/lib/Reader";
import {useFactsDb} from "~/db/useFactsDb";
import {FactCardActions} from "./FactCardActions";
import {TooltipProvider} from "~/components/ui/tooltip";

type TProps = {
  facts: Fact[];
  highlightedFacts: Fact[];
  onClick: Reader<Fact, void>;
};

export function FactsGrid({facts, highlightedFacts, onClick}: TProps) {
  const db = useFactsDb();
  return (
    <div className="w-full h-full @container">
      <TooltipProvider>
        <div
          id="facts-grid"
          className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4"
        >
          {facts.map(fact => (
            <FactCard
              key={fact.id}
              fact={fact}
              isHighlighted={isHighlighted(fact, highlightedFacts)}
              className="break-inside-avoid mb-4 animate-fade-in"
              onClick={() => onClick?.(fact)}
            >
              <FactCardActions
                key={fact.id}
                onArchive={event => {
                  event.stopPropagation();
                  db?.facts.delete(fact.id);
                }}
              />
            </FactCard>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
