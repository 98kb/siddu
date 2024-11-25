import {useCallback} from "react";
import {useFactFilters} from "./useFactFilters";
import {useFactApi} from "./useFactApi";
import {PaginationSchema} from "@repo/collection-service-defs";

export function useFactsQuery() {
  const {filters} = useFactFilters();
  const {listPaginatedFacts} = useFactApi();
  const fetchFacts = useCallback(
    (pagination: PaginationSchema) =>
      listPaginatedFacts({
        pagination,
        orderBy: {
          key: "createdAt",
        },
        isDeleted: filters.archived,
        labelIds: [filters.labelId].filter(Boolean).map(String),
      }),
    [listPaginatedFacts, filters],
  );
  return {fetchFacts};
}
