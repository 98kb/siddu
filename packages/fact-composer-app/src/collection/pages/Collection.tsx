import {Button} from "~/components/ui/button";
import {CollectionNav} from "../features/CollectionNav";
import {PlusIcon} from "lucide-react";
import {FactsGrid} from "../components/FactsGrid";
import {useFactsDb} from "~/db/useFactsDb";
import {useCallback, useMemo} from "react";
import {useLiveQuery} from "~/db/useLiveQuery";
import {FactCardActions} from "../components/FactCardActions";
import {DbClient, Fact} from "@repo/facts-db";
import {useLocation} from "react-router-dom";

export function Collection() {
  const db = useFactsDb();
  const facts = useFactsByQuery(db);

  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <div className="flex flex-col gap-2 w-full h-full py-5 px-4 overflow-y-scroll max-h-[540px] pb-14">
        <div className="flex w-full">
          <Button variant="ghost" size="sm" onClick={() => {}}>
            <PlusIcon size="15" /> Add Fact
          </Button>
        </div>
        <FactsGrid facts={facts} highlightedFacts={[]} onClick={() => {}}>
          {fact => (
            <FactCardActions
              key={fact.id}
              onArchive={() => db?.facts.delete(fact.id)}
            />
          )}
        </FactsGrid>
      </div>
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
