import {Fact} from "@repo/facts-db";
import {FactCards} from "../components/FactCards";
import {useFacts} from "~/db/useFacts";
import {FactCardActions} from "../components/FactCardActions";
import {ComponentProps} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {FactCard} from "../components/FactCard";

type TProps = {
  highlightedFacts: Fact[];
  onClick: ComponentProps<typeof FactCards>["onClick"];
};

export function FactsGrid({highlightedFacts, onClick}: TProps) {
  const {facts, deleteFact} = useFacts();

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{300: 1, 350: 2, 500: 3, 700: 4, 900: 5}}
    >
      <Masonry gutter="0.75rem">
        {facts.map(fact => (
          <FactCard
            key={fact.id}
            fact={fact}
            isHighlighted={isHighlighted(fact, highlightedFacts)}
            onClick={() => onClick?.(fact)}
          >
            <FactCardActions key={fact.id} onArchive={() => deleteFact(fact)} />
          </FactCard>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
