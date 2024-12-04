import {useSetAtom} from "jotai";
import {factsAtom} from "../stores/factsAtom";
import {useFactFilters} from "./useFactFilters";
import {useCallback, useEffect} from "react";
import {FactSchema} from "@repo/collection-service-defs";
import {bind} from "@react-rxjs/core";
import {factUpdated$} from "../signals/factUpdated";
import {factCreated$} from "../signals/factCreated";
import {useFactsQuery} from "./useFactsQuery";
import {merge} from "rxjs";
import {factArchived$} from "../signals/factArchived";
import {factRestored$} from "../signals/factRestored";

const [useAreFactsStale] = bind(
  merge(factCreated$, factArchived$, factRestored$),
  undefined,
);
const [useUpdatedFact] = bind(factUpdated$, undefined);

export function useFactMutationSignals() {
  useStaleFactsSignal();
  useFactUpdatedSignal();
}

function useStaleFactsSignal() {
  const {revalidate} = useFactsQuery();
  const areFactsStale = useAreFactsStale();
  useEffect(() => {
    if (areFactsStale) {
      revalidate();
    }
  }, [areFactsStale, revalidate]);
}

function useFactUpdatedSignal() {
  const setFacts = useSetAtom(factsAtom);
  const {applyFilters} = useFactFilters();
  const mergeFact = useCallback(
    (fact: FactSchema) => {
      setFacts($facts => {
        // eslint-disable-next-line max-nested-callbacks
        const factIndex = $facts.findIndex($fact => $fact._id === fact._id);
        const found = factIndex !== -1;
        if (found) {
          $facts.splice(factIndex, 1, fact);
        }
        return applyFilters($facts);
      });
    },
    [setFacts, applyFilters],
  );
  const updatedFact = useUpdatedFact();
  useEffect(() => {
    if (updatedFact) {
      mergeFact(updatedFact);
    }
  }, [updatedFact, mergeFact]);
}
