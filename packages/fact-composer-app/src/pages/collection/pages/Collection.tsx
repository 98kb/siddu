import {CollectionNav} from "../features/CollectionNav";
import {FactsGrid} from "../features/FactsGrid";
import {SaveFact} from "../features/SaveFact";
import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {AddFactButton} from "../features/AddFactButton";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {useFacts} from "../hooks/useFacts";

// eslint-disable-next-line complexity
export function Collection() {
  const facts = useFacts();
  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const highlightedFacts =
    selectedFact && "id" in selectedFact ? [selectedFact] : [];

  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <div className="flex flex-col gap-2 w-full h-full py-5 px-8 overflow-y-scroll max-h-[540px] pb-14">
        {facts.length ? (
          <>
            <div className="flex w-full">
              <AddFactButton variant="ghost" size="sm" />
            </div>
            <FactsGrid
              facts={facts}
              highlightedFacts={highlightedFacts}
              onClick={setSelectedFact}
            />
          </>
        ) : (
          <FactsGridPlaceholder>
            <AddFactButton size="lg" variant="ghost" />
          </FactsGridPlaceholder>
        )}
      </div>
      {selectedFact && (
        <div className="max-w-[25vw] min-w-[25vw] border-l p-3 pb-0">
          <SaveFact
            fact={selectedFact}
            onClose={() => setSelectedFact(undefined)}
            onChange={setSelectedFact}
          />
        </div>
      )}
    </div>
  );
}
