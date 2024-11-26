import {atom, useAtom} from "jotai";
import {useCallback} from "react";
import {FactSchema, LabelSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {FactFilters} from "../lib/FactFilters";

const factFiltersAtom = atom<FactFilters>({});

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

  const applyFilters = useCallback(
    (facts: FactSchema[]) => {
      const predicates: Reader<FactSchema, boolean>[] = [
        fact => Boolean(fact.isDeleted) === Boolean(filters.archived),
        fact =>
          filters.labelId
            ? fact.labels.some(label => label._id === filters.labelId)
            : true,
      ];
      return facts.filter(fact => predicates.every(test => test(fact)));
    },
    [filters],
  );

  return {
    applyFilters,
    filters,
    setLabel,
    resetFilters,
    setArchivedOnly,
  };
}
