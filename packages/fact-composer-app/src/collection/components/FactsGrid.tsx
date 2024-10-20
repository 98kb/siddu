import {Fact} from "@repo/facts-db";
import {FactCard} from "./FactCard";
import {Reader} from "fp-ts/lib/Reader";
import {useFactsDb} from "~/db/useFactsDb";
import {FactCardActions} from "./FactCardActions";

type TProps = {
  facts: Fact[];
  highlightedFacts: Fact[];
  onClick: Reader<Fact | undefined, void>;
};

export function FactsGrid({facts, highlightedFacts, onClick}: TProps) {
  const db = useFactsDb();
  return (
    <div className="w-full h-full @container">
      <div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4">
        {facts.map(fact => (
          <FactCard
            key={fact.id}
            fact={fact}
            isHighlighted={isHighlighted(fact, highlightedFacts)}
            className="break-inside-avoid mb-4 animate-fade-in"
            onClick={() => onClick(fact)}
          >
            <FactCardActions
              key={fact.id}
              onArchive={async event => {
                event.stopPropagation();
                await db?.facts.delete(fact.id);
                onClick(undefined);
              }}
            />
          </FactCard>
        ))}
      </div>
    </div>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
