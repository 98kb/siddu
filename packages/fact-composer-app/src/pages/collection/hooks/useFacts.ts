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
        let factIndex = $facts.findIndex($fact => $fact._id === fact._id);
        const found = factIndex !== -1;
        factIndex = found ? factIndex : 0;
        const deleteCount = found ? 1 : 0;
        $facts.splice(factIndex, deleteCount, fact);
        return applyFilters($facts);
      });
    },
    [setFacts, applyFilters],
  );
  return {facts, setFacts, mergeFact};
}
