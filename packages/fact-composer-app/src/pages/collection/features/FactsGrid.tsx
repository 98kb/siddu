import {FactCard} from "../components/FactCard";
import {type FactSchema} from "@repo/collection-service-defs";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {AddFactButton} from "./AddFactButton";
import {useFacts} from "../hooks/useFacts";
import {FactCardActions} from "./FactCardActions";
import {useSelectedFact} from "../hooks/useSelectedFacts";
import {useHighlightedFacts} from "../hooks/useHighlightedFacts";
import {useFactsQuery} from "../hooks/useFactsQuery";

export function FactsGrid() {
  useFactsQuery();
  const {facts} = useFacts();
  const {setSelectedFact} = useSelectedFact();
  const highlightedFacts = useHighlightedFacts();
  return facts.length ? (
    <div className="flex flex-col gap-2 w-full h-full py-5 px-8 overflow-y-scroll max-h-[540px] pb-14">
      <div className="flex w-full">
        <AddFactButton variant="ghost" size="sm" />
      </div>
      <div className="w-full h-full @container">
        <div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4">
          {facts.map(fact => (
            <FactCard
              key={fact._id}
              fact={fact}
              isHighlighted={isHighlighted(fact, highlightedFacts)}
              className="break-inside-avoid mb-4 animate-fade-in"
              onClick={setSelectedFact}
            >
              <FactCardActions key={fact._id} fact={fact} />
            </FactCard>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <FactsGridPlaceholder>
      <AddFactButton size="lg" variant="ghost" />
    </FactsGridPlaceholder>
  );
}

function isHighlighted(fact: FactSchema, highlightedFacts?: FactSchema[]) {
  return highlightedFacts?.some(f => f._id === fact._id);
}
