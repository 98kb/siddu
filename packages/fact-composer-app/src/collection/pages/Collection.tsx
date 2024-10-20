import {Button} from "~/components/ui/button";
import {CollectionNav} from "../features/CollectionNav";
import {PlusIcon} from "lucide-react";
import {FactsGrid} from "../components/FactsGrid";
import {useCallback, useMemo} from "react";
import {DbClient, Fact} from "@repo/facts-db";
import {useLocation} from "react-router-dom";
import {useLiveQuery} from "~/db/useLiveQuery";
import {useFactsDb} from "~/db/useFactsDb";
import {SaveFact} from "../features/SaveFact";
import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";

// eslint-disable-next-line complexity
export function Collection() {
  const db = useFactsDb();
  const facts = useFactsByQuery(db);

  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const highlightedFacts =
    selectedFact && "id" in selectedFact ? [selectedFact] : [];

  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <div className="flex flex-col gap-2 w-full h-full py-5 px-8 overflow-y-scroll max-h-[540px] pb-14">
        <div className="flex w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFact({content: "", labels: []})}
          >
            <PlusIcon size="15" /> Add Fact
          </Button>
        </div>
        <FactsGrid
          facts={facts}
          highlightedFacts={highlightedFacts}
          onClick={setSelectedFact}
        />
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

function useFilterByLabel() {
  const location = useLocation();
  const labelQuery = useMemo(
    () => new URLSearchParams(location.search).get("label"),
    [location.search],
  );

  return useCallback(
    (fact: Fact) => {
      return labelQuery
        ? fact.labels.map(({id}) => id).includes(+labelQuery)
        : true;
    },
    [labelQuery],
  );
}

function useFactsByQuery(db?: DbClient) {
  const filterByLabel = useFilterByLabel();
  const fetchFacts = useCallback(async () => {
    return db?.facts.getAll(filterByLabel);
  }, [db, filterByLabel]);
  return useLiveQuery("facts", fetchFacts);
}
