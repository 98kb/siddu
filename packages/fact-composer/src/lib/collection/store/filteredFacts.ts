import {derived} from "svelte/store";
import {facts} from "$lib/store/facts";
import {factsFilter} from "./factsFilter";

export const filteredFacts = derived(
  [facts, factsFilter],
  ([$facts, $filter]) => {
    if ($filter.labels.length === 0) {
      return $facts;
    }
    const matchEveryFilterLabel = (factLabelIds: number[]) =>
      $filter.labels
        .map(({id}) => id)
        .every(filterLabelId => factLabelIds.includes(filterLabelId));
    return $facts.filter(fact =>
      matchEveryFilterLabel(fact.labels.map(({id}) => id)),
    );
  },
);
