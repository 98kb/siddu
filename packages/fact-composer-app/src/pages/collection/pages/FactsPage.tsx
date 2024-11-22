import {FactsGrid} from "../features/FactsGrid";
import {SaveFact} from "../features/SaveFact";
import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {AddFactButton} from "../features/AddFactButton";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {useFactsQuery} from "../hooks/useFactsQuery";
import {useCallback} from "react";

// eslint-disable-next-line complexity
export function FactsPage() {
  const {facts} = useFactsQuery();
  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const highlightedFacts =
    selectedFact && "_id" in selectedFact ? [selectedFact] : [];
  const clearSelectedFact = useCallback(
    () => setSelectedFact(undefined),
    [setSelectedFact],
  );
  return (
    <>
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
            onClose={clearSelectedFact}
            onChange={setSelectedFact}
          />
        </div>
      )}
    </>
  );
}
