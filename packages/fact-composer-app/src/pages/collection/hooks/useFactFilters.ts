import {useAtom} from "jotai";
import {factFiltersAtom} from "../stores/factFiltersAtom";
import {useCallback} from "react";
import {LabelSchema} from "@repo/collection-service-defs";

export function useFactFilters() {
  const [filters, setFilters] = useAtom(factFiltersAtom);

  const setLabel = useCallback(
    (labelId?: LabelSchema["_id"]) => {
      setFilters($filters => ({...$filters, labelId}));
    },
    [setFilters],
  );

  const setArchivedOnly = useCallback(
    (archived: boolean) => {
      setFilters($filters => ({...$filters, archived}));
    },
    [setFilters],
  );

  const resetFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  return {
    filters,
    setLabel,
    resetFilters,
    setArchivedOnly,
  };
}
