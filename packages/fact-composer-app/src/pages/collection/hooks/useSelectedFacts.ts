import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {useCallback} from "react";
import {FactSchema} from "@repo/collection-service-defs";

export function useSelectedFact() {
  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const clearSelectedFact = useCallback(
    () => setSelectedFact(undefined),
    [setSelectedFact],
  );
  const selectFact = useCallback(
    (fact: FactSchema) => {
      if (!fact.isDeleted) {
        setSelectedFact(fact);
      }
    },
    [setSelectedFact],
  );
  return {
    selectedFact,
    clearSelectedFact,
    selectFact,
  };
}
