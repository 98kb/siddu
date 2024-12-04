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
    (fact?: FactSchema | InsertFactSchema) =>
      canSelect(fact) && setSelectedFact(fact),
    [setSelectedFact],
  );
  const isSelected = useCallback(
    (fact: FactSchema) => {
      if (!selectedFact || !("_id" in selectedFact)) {
        return false;
      }
      return fact._id === selectedFact._id;
    },
    [selectedFact],
  );
  return {
    selectedFact,
    clearSelectedFact,
    selectFact,
    isSelected,
  };
}

function canSelect(fact?: FactSchema | InsertFactSchema): boolean {
  if (!fact) {
    return true;
  }
  return isNotDeleted(fact) || isInsertSchema(fact);
}

const isNotDeleted = (fact: FactSchema | InsertFactSchema) =>
  "_id" in fact && !fact?.isDeleted;
const isInsertSchema = (fact: FactSchema | InsertFactSchema) =>
  !("_id" in fact);
