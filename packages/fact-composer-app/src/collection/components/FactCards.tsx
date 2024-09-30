import {Fact, Label} from "@repo/facts-db";
import {FactCard} from "./FactCard";

type TProps = {
  facts: Fact[];
  highlightedFacts?: Fact[];
  highlightedLabels?: Label[];
};

export function FactCards({
  facts,
  highlightedFacts,
  highlightedLabels,
}: TProps) {
  return facts.map(fact => (
    <FactCard
      key={fact.id}
      fact={fact}
      isHighlighted={isHighlighted(fact, highlightedFacts)}
      highlightedLabels={highlightedLabels}
    />
  ));
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
