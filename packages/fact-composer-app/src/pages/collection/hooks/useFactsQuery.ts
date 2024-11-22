import {useCallback, useEffect, useState} from "react";
import {useCollection} from "./useCollection";
import {type FactSchema} from "@repo/collection-service-defs";
import {useFactFilters} from "./useFactFilters";

export function useFactsQuery() {
  const collection = useCollection();
  const {filters} = useFactFilters();
  const [facts, setFacts] = useState<FactSchema[]>([]);
  const refreshFacts = useCallback(
    () =>
      collection?.facts.list.query({
        pagination: {limit: 99, offset: 0},
        isDeleted: filters.archived,
        labelIds: filters.labelId ? [String(filters.labelId)] : [],
      }),
    [collection, filters],
  );

  useEffect(() => {
    refreshFacts()?.then(setFacts);
  }, [refreshFacts]);

  return {
    facts,
    refreshFacts,
  };
}
