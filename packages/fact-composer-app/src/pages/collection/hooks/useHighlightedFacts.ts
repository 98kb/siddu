import {useMemo} from "react";
import {useSelectedFact} from "./useSelectedFacts";

export function useHighlightedFacts() {
  const {selectedFact} = useSelectedFact();
  return useMemo(
    () => (selectedFact && "_id" in selectedFact ? [selectedFact] : []),
    [selectedFact],
  );
}
