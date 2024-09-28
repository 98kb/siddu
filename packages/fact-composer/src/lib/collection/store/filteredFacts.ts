import {derived} from "svelte/store";
import {facts} from "$lib/store/facts";
import {factsFilter} from "./factsFilter";
import {filterFactsByLabels} from "../filterFactsByLabels";

export const filteredFacts = derived(
  [facts, factsFilter],
  ([$facts, $filter]) => {
    return filterFactsByLabels($facts, $filter.labels);
  },
);
