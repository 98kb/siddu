import {useAtom} from "jotai";
import {factFiltersAtom} from "../stores/factFiltersAtom";
import {Label} from "@repo/facts-db";
import {useCallback} from "react";

export function useFactFilters() {
  const [filters, setFilters] = useAtom(factFiltersAtom);

  const setLabel = useCallback(
    (label: Label) => {
      setFilters({archived: false, label});
    },
    [setFilters],
  );

  const setArchivedOnly = useCallback(
    (archived: boolean) => {
      setFilters({archived});
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
