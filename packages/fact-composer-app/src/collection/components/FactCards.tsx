import {Fact, Label} from "@repo/facts-db";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
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
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{320: 1, 400: 2, 750: 4, 900: 5}}
    >
      <Masonry gutter="0.5rem">
        {facts.map(fact => (
          <FactCard
            key={fact.id}
            fact={fact}
            isHighlighted={isHighlighted(fact, highlightedFacts)}
            highlightedLabels={highlightedLabels}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
