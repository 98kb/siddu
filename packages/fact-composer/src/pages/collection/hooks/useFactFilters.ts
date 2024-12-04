import {useCallback, useMemo} from "react";
import {FactSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {FactFilters} from "../lib/FactFilters";
import {useLocation} from "react-router-dom";

export function useFactFilters() {
  const location = useLocation();
  const filters = useMemo<FactFilters>(() => {
    const search = new URLSearchParams(location.search);
    const labelId = search.get("labelId") ?? undefined;
    const isDeleted = search.has("isDeleted");
    return {labelId, isDeleted};
  }, [location.search]);

  // eslint-disable-next-line complexity
  const toFiltersSearch = useCallback((filters: FactFilters) => {
    const params = new URLSearchParams();
    if (filters.labelId?.length) {
      params.set("labelId", filters.labelId);
    }
    if (filters.isDeleted) {
      params.set("isDeleted", "1");
    }
    return params.toString();
  }, []);

  const applyFilters = useCallback(
    (facts: FactSchema[]) => {
      const predicates: Reader<FactSchema, boolean>[] = [
        fact => Boolean(fact.isDeleted) === Boolean(filters.isDeleted),
        fact =>
          filters.labelId
            ? fact.labels.some(label => filters.labelId === label._id)
            : true,
      ];
      return facts.filter(fact => predicates.every(test => test(fact)));
    },
    [filters],
  );

  return {
    toFiltersSearch,
    applyFilters,
    filters,
  };
}
