import {useAtom} from "jotai";
import {factsAtom} from "../stores/factsAtom";
import {useCallback} from "react";
import {FactSchema} from "@repo/collection-service-defs";
import {useFactFilters} from "./useFactFilters";

export function useFacts() {
  const [facts, setFacts] = useAtom(factsAtom);
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
  return {facts, setFacts, mergeFact};
}
