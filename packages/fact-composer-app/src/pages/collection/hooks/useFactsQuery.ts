import {useCallback, useMemo} from "react";
import {useFactFilters} from "./useFactFilters";
import {useFactsPagination} from "./useFactsPagination";
import {useSetAtom} from "jotai";
import {factsAtom} from "../stores/factsAtom";
import {FactsQuerySchema} from "@repo/collection-service-defs";
import {useCollection} from "./useCollection";

export function useFactsQuery() {
  const setFacts = useSetAtom(factsAtom);
  const {setTotal} = useFactsPagination();
  const {fetchFacts} = useFetchFacts();
  const revalidate = useCallback(async () => {
    const result = await fetchFacts();
    setFacts(result.list);
    setTotal(result.total);
  }, [fetchFacts, setFacts, setTotal]);
  return {revalidate};
}

function useFetchFacts() {
  const {paginatedList} = useApi();
  const {filters} = useFactFilters();
  const {offset, limit} = useFactsPagination();
  const query = useMemo(
    () => ({
      pagination: {offset, limit},
      orderBy: {
        key: "createdAt",
        desc: true,
      },
      isDeleted: filters.archived,
      labelIds: [filters.labelId].filter(Boolean).map(String),
    }),
    [offset, limit, filters],
  );
  const fetchFacts = useCallback(async () => {
    const result = await paginatedList(query);
    return (
      result ?? {
        list: [],
        total: 0,
      }
    );
  }, [query, paginatedList]);
  return {fetchFacts};
}

function useApi() {
  const collection = useCollection();
  const paginatedList = useCallback(
    (query: FactsQuerySchema) => collection?.facts.paginatedList.query(query),
    [collection],
  );

  return {
    paginatedList,
  };
}
