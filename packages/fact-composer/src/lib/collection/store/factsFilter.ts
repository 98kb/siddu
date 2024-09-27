import {writable} from "svelte/store";
import type {Label} from "@repo/facts-db";

type FactsFilter = {
  labels: Label[];
};

export const factsFilter = writable<FactsFilter>({
  labels: [],
});
