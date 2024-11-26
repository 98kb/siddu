import {FactCard} from "../components/FactCard";
import {FactsGridPlaceholder} from "../components/FactsGridPlaceholder";
import {AddFactButton} from "./AddFactButton";
import {FactCardActions} from "./FactCardActions";
import {useSelectedFact} from "../hooks/useSelectedFacts";
import {EasyPagination} from "~/components/EasyPagination";
import {useFactsPagination} from "../hooks/useFactsPagination";
import {useAtomValue} from "jotai";
import {factsAtom} from "../stores/factsAtom";

export function FactsGrid() {
  const facts = useAtomValue(factsAtom);
  const {pagination, total, nextPage, prevPage} = useFactsPagination();
  const {selectFact, isSelected} = useSelectedFact();

  return facts.length ? (
    <div className="flex flex-col gap-2 w-full h-full max-h-[548px] box-border py-5 px-6 overflow-y-scroll">
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
            <FactCard
              key={fact._id}
              fact={fact}
              isHighlighted={isSelected(fact)}
              className="break-inside-avoid mb-4 animate-fade-in mx-auto"
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
