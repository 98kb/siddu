import {useAtom} from "jotai";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {useCallback} from "react";

export function useSelectedFact() {
  const [selectedFact, setSelectedFact] = useAtom(selectedFactAtom);
  const clearSelectedFact = useCallback(
    () => setSelectedFact(undefined),
    [setSelectedFact],
  );
  return {
    selectedFact,
    clearSelectedFact,
    setSelectedFact,
  };
}
