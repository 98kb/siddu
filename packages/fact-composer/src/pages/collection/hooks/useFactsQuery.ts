import {useCallback, useMemo} from "react";
import {useFactFilters} from "./useFactFilters";
import {useFactsPagination} from "./useFactsPagination";
import {useAtom} from "jotai";
import {factsAtom} from "../stores/factsAtom";
import {FactsQuerySchema} from "@repo/collection-service-defs";
import {useCollection} from "./useCollection";
import {useSafeTask} from "~/lib/hooks/useSafeTask";

export function useFactsQuery() {
  const [facts, setFacts] = useAtom(factsAtom);
  const {setTotal} = useFactsPagination();
  const {fetchFacts} = useFetchFacts();
  const revalidate = useCallback(async () => {
    const result = await fetchFacts();
    setFacts(result.list);
    setTotal(result.total);
  }, [fetchFacts, setFacts, setTotal]);
  return {facts, revalidate};
}

function useFetchFacts() {
  const {paginatedList} = useApi();
  const {filters} = useFactFilters();
  const {pagination} = useFactsPagination();
  const query = useMemo<FactsQuerySchema>(() => {
    return {
      pagination,
      orderBy: {
        key: "createdAt",
        desc: true,
      },
      isDeleted: filters.isDeleted,
      labelIds: [filters.labelId].filter(Boolean) as string[],
    };
  }, [pagination, filters]);
  const fetchFacts = useSafeTask(async () => {
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
    (query: FactsQuerySchema) => {
      return collection?.facts.paginatedList.query(query);
    },
    [collection],
  );

  return {
    paginatedList,
  };
}
