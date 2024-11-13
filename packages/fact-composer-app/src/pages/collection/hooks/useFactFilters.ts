import {useAtom} from "jotai";
import {factFiltersAtom} from "../stores/factFiltersAtom";
import {Label} from "@repo/facts-db";
import {useCallback} from "react";

export function useFactFilters() {
  const [filters, setFilters] = useAtom(factFiltersAtom);

  const setLabel = useCallback(
    (labelId?: Label["id"]) => {
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
