import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {useCallback} from "react";
import {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";

export function useSelectedFact() {
  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const clearSelectedFact = useCallback(
    () => setSelectedFact(undefined),
    [setSelectedFact],
  );
  const selectFact = useCallback(
    // eslint-disable-next-line complexity
    (fact: FactSchema | undefined | InsertFactSchema) => {
      const isValidFact = fact && "_id" in fact && !fact?.isDeleted;
      const isInsert = fact && !("_id" in fact);
      const isUndefined = fact === undefined;
      if (isValidFact || isInsert || isUndefined) {
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
