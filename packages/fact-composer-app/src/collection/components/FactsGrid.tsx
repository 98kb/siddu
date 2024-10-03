import {Fact} from "@repo/facts-db";
import {FactCard} from "./FactCard";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  facts: Fact[];
  highlightedFacts: Fact[];
  onClick: Reader<Fact, void>;
  children?: Reader<Fact, React.ReactNode>;
};

export function FactsGrid({
  children,
  facts,
  highlightedFacts,
  onClick,
}: TProps) {
  return (
    <div className="columns-1 lg:columns-3 xl:columns-4">
      {facts.map(fact => (
        <FactCard
          key={fact.id}
          fact={fact}
          isHighlighted={isHighlighted(fact, highlightedFacts)}
          className="break-inside-avoid mb-4"
          onClick={() => onClick?.(fact)}
        >
          {children?.(fact)}
        </FactCard>
      ))}
    </div>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
