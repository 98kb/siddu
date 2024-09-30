import {Fact, Label} from "@repo/facts-db";
import {FactCard} from "./FactCard";
import {ComponentProps} from "react";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  facts: Fact[];
  highlightedFacts?: Fact[];
  highlightedLabels?: Label[];
  children?: ComponentProps<typeof FactCard>["children"];
  onClick?: Reader<Fact, void>;
};

export function FactCards({
  facts,
  children,
  highlightedFacts,
  highlightedLabels,
  onClick,
}: TProps) {
  return facts.map(fact => (
    <FactCard
      key={fact.id}
      fact={fact}
      isHighlighted={isHighlighted(fact, highlightedFacts)}
      highlightedLabels={highlightedLabels}
      onClick={() => onClick?.(fact)}
    >
      {children}
    </FactCard>
  ));
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
