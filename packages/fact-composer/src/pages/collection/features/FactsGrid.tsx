import {FactCard} from "./FactCard";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {AddFactButton} from "./AddFactButton";
import {EasyPagination} from "~/components/EasyPagination";
import {useFactsPagination} from "../hooks/useFactsPagination";
import {useFactsQuery} from "../hooks/useFactsQuery";
import {useEffect} from "react";
import {useErrorBoundary} from "react-error-boundary";
import {useLocation} from "react-router-dom";

export function FactsGrid() {
  const {facts, revalidate} = useFactsQuery();
  const {pagination, total, nextPage, prevPage} = useFactsPagination();
  const location = useLocation();
  const {resetBoundary} = useErrorBoundary();

  useEffect(() => {
    resetBoundary();
  }, [location, resetBoundary]);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  return facts.length ? (
    <div className="flex flex-col gap-2 w-full h-full max-h-[548px] box-border py-5 px-6 overflow-y-auto">
      <EasyPagination
        className="flex w-full items-center justify-between"
        limit={pagination.limit}
        offset={pagination.offset}
        total={total}
        onNext={nextPage}
        onPrevious={prevPage}
      />
      <div className="w-full h-full @container">
        <div className="mx-auto pb-5 @lg:px-10 @xl:p-0 columns-1 @sm:columns-2 @xl:columns-3 @3xl:columns-4 @4xl:columns-5">
          {facts.map(fact => (
            <FactCard key={fact._id} fact={fact} />
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
