import {CollectionNav} from "../features/CollectionNav";
import {Outlet, useLocation} from "react-router-dom";
import {useFactMutationSignals} from "../hooks/useFactMutationSignals";
import {useFactsPagination} from "../hooks/useFactsPagination";
import {useEffect} from "react";
import {SaveFact} from "../features/SaveFact";
import {ErrorBoundary} from "react-error-boundary";
import {GlobalErrorFallback} from "~/components/GlobalErrorFallback";

export function CollectionPage() {
  useFactMutationSignals();
  const location = useLocation();
  const {reset} = useFactsPagination();
  useEffect(() => {
    reset();
  }, [location, reset]);
  return (
    <div className="flex w-full h-full">
      <CollectionNav />
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <Outlet />
        <SaveFact />
      </ErrorBoundary>
    </div>
  );
}
