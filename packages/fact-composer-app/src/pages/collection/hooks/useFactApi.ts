import {useCallback} from "react";
import {useCollection} from "./useCollection";
import {
  type UpdateFactSchema,
  type InsertFactSchema,
  type FactSchema,
  FactsQuerySchema,
} from "@repo/collection-service-defs";

export function useFactApi() {
  const collection = useCollection();
  const createFact = useCallback(
    (factData: InsertFactSchema) => collection?.facts.create.mutate(factData),
    [collection],
  );
  const updateFact = useCallback(
    (fact: UpdateFactSchema) => collection?.facts.update.mutate(fact),
    [collection],
  );
  const archiveFact = useCallback(
    (factId: FactSchema["_id"]) =>
      collection?.facts.softDelete.mutate({_id: factId}),
    [collection],
  );
  const restoreFact = useCallback(
    (factId: FactSchema["_id"]) =>
      collection?.facts.restore.mutate({_id: factId}),
    [collection],
  );
  const listPaginatedFacts = useCallback(
    (query: FactsQuerySchema) => collection?.facts.paginatedList.query(query),
    [collection],
  );

  return {
    createFact,
    updateFact,
    archiveFact,
    restoreFact,
    listPaginatedFacts,
  };
}
