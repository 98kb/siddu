import {Fact} from "@repo/facts-db";
import {FactCardActions} from "../components/FactCardActions";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {FactCard} from "../components/FactCard";
import {Reader} from "fp-ts/lib/Reader";
import {useFactsDb} from "~/db/useFactsDb";
import {useLiveQuery} from "~/db/useLiveQuery";
import {useCallback} from "react";

type TProps = {
  highlightedFacts: Fact[];
  onClick: Reader<Fact, void>;
};

export function FactsGrid({highlightedFacts, onClick}: TProps) {
  const db = useFactsDb();
  const fetchFacts = useCallback(async () => db?.facts.getAll(), [db]);
  const facts = useLiveQuery("facts", fetchFacts);

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{300: 1, 350: 2, 500: 3, 700: 4, 900: 4}}
    >
      <Masonry gutter="0.75rem">
        {facts.map(fact => (
          <FactCard
            key={fact.id}
            fact={fact}
            isHighlighted={isHighlighted(fact, highlightedFacts)}
            onClick={() => onClick?.(fact)}
          >
            <FactCardActions
              key={fact.id}
              onArchive={() => db?.facts.delete(fact.id)}
            />
          </FactCard>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

function isHighlighted(fact: Fact, highlightedFacts?: Fact[]) {
  return highlightedFacts?.some(f => f.id === fact.id);
}
