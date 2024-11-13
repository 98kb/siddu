import {useLiveQuery} from "~/db/hooks/useLiveQuery";
import {useFactFilters} from "./useFactFilters";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {useCallback} from "react";
import {Fact, Label} from "@repo/facts-db";
import {FactFilters} from "../lib/FactFilters";

const filterByLabel = (labelId: Label["id"]) => (fact: Fact) =>
  fact.labels.some(({id}) => id === labelId);

const createFactsQuery = (filters: FactFilters) => {
  const predicates = [
    (fact: Fact) => Boolean(fact.isDeleted) === Boolean(filters.archived),
  ];
  if (filters.labelId) {
    predicates.push(filterByLabel(filters.labelId));
  }
  return (fact: Fact) => predicates.every(f => f(fact));
};

export function useFacts() {
  const db = useFactsDb();
  const {filters} = useFactFilters();
  const factsQuery = useCallback(
    async () => db?.facts.getAll(createFactsQuery(filters)),
    [db, filters],
  );

  return useLiveQuery("facts", factsQuery);
}
