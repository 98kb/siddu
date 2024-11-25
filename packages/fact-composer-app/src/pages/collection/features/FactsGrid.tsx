import {FactCard} from "../components/FactCard";
import {PaginationSchema, type FactSchema} from "@repo/collection-service-defs";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {AddFactButton} from "./AddFactButton";
import {useFacts} from "../hooks/useFacts";
import {FactCardActions} from "./FactCardActions";
import {useSelectedFact} from "../hooks/useSelectedFacts";
import {useHighlightedFacts} from "../hooks/useHighlightedFacts";
import {useFactsQuery} from "../hooks/useFactsQuery";
import {useCallback, useEffect} from "react";
import {EasyPagination} from "~/components/EasyPagination";
import {usePagination} from "~/lib/hooks/usePagination";

export function FactsGrid() {
  useFactsQuery();
  const {facts, refreshFacts, limit, offset, total, nextPage, prevPage} =
    useFactsGrid({limit: 10, offset: 0});
  const {selectFact} = useSelectedFact();
  const highlightedFacts = useHighlightedFacts();
  useEffect(() => {
    refreshFacts();
  }, [refreshFacts]);

  return facts.length ? (
    <div className="flex flex-col gap-2 w-full h-full py-5 px-8 overflow-y-scroll max-h-[540px] pb-14">
      <EasyPagination
        className="flex w-full items-center justify-between"
        limit={limit}
        offset={offset}
        total={total}
        onNext={nextPage}
        onPrevious={prevPage}
      />
      <div className="w-full h-full @container">
        <div className="columns-1 @sm:columns-2 @lg:columns-3 @xl:columns-4">
          {facts.map(fact => (
            <FactCard
              key={fact._id}
              fact={fact}
              isHighlighted={isHighlighted(fact, highlightedFacts)}
              className="break-inside-avoid mb-4 animate-fade-in"
              onClick={selectFact}
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

function useFactsGrid(pagination: PaginationSchema) {
  const {offset, limit, jump, total, setTotal} = usePagination(pagination);
  const {fetchFacts} = useFactsQuery();
  const {facts, setFacts} = useFacts();
  const refreshFacts = useCallback(
    () =>
      // eslint-disable-next-line complexity
      fetchFacts({limit, offset})?.then(result => {
        setFacts(result?.list ?? []);
        setTotal(Number(result?.total));
      }),
    [fetchFacts, setFacts, setTotal, limit, offset],
  );
  const nextPage = useCallback(
    () => jump(pagination.limit),
    [jump, pagination.limit],
  );
  const prevPage = useCallback(
    () => jump(-pagination.limit),
    [jump, pagination.limit],
  );
  return {
    facts,
    offset,
    limit,
    prevPage,
    nextPage,
    total,
    refreshFacts,
  };
}
