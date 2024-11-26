import {CollectionNav} from "../features/CollectionNav";
import {useLocation} from "react-router-dom";
import {useFactMutationSignals} from "../hooks/useFactMutationSignals";
import {useFactsPagination} from "../hooks/useFactsPagination";
import {useEffect} from "react";
import {useFactsQuery} from "../hooks/useFactsQuery";
import {FactsGrid} from "../features/FactsGrid";
import {SaveFact} from "../features/SaveFact";

export function CollectionPage() {
  useFactMutationSignals();
  const location = useLocation();
  const {reset} = useFactsPagination();
  useEffect(() => {
    reset();
  }, [location, reset]);

  const {revalidate} = useFactsQuery();
  useEffect(() => {
    revalidate();
  }, [revalidate]);
  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <FactsGrid />
      <SaveFact />
    </div>
  );
}
