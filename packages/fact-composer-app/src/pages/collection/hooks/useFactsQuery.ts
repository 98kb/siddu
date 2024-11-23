import {useCallback, useEffect} from "react";
import {useCollection} from "./useCollection";
import {useFactFilters} from "./useFactFilters";
import {useFacts} from "./useFacts";

export function useFactsQuery() {
  const collection = useCollection();
  const {filters} = useFactFilters();
  const {setFacts} = useFacts();
  const refreshFacts = useCallback(
    () =>
      collection?.facts.list
        .query({
          pagination: {limit: 99, offset: 0},
          isDeleted: filters.archived,
          labelIds: [filters.labelId].filter(Boolean).map(String),
        })
        ?.then(setFacts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, filters],
  );

  useEffect(() => {
    refreshFacts();
  }, [refreshFacts]);

  return {
    refreshFacts,
  };
}
