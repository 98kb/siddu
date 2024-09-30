import {Fact, Label} from "@repo/facts-db";
import {FactCard} from "./FactCard";
import {ComponentProps} from "react";

type TProps = {
  facts: Fact[];
  highlightedFacts?: Fact[];
  highlightedLabels?: Label[];
  children?: ComponentProps<typeof FactCard>["children"];
};

export function FactCards({
  facts,
  children,
  highlightedFacts,
  highlightedLabels,
}: TProps) {
  return facts.map(fact => (
    <FactCard
      key={fact.id}
      fact={fact}
      isHighlighted={isHighlighted(fact, highlightedFacts)}
      highlightedLabels={highlightedLabels}
    >
      {children}
    </FactCard>
  ));
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
