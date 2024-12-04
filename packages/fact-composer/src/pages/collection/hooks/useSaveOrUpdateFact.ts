import {useCallback} from "react";
import {
  FactSchema,
  InsertFactSchema,
  UpdateFactSchema,
} from "@repo/collection-service-defs";
import {emitFactCreated} from "../signals/factCreated";
import {emitFactUpdated} from "../signals/factUpdated";
import {useCollection} from "./useCollection";

export function useSaveOrUpdateFact() {
  const {createFact, updateFact} = useApi();
  const saveOrUpdateFact = useCallback(
    async (payload: FactSchema | InsertFactSchema) => {
      if ("_id" in payload) {
        const fact = await updateFact(payload);
        emitFactUpdated(fact);
        return fact;
      } else {
        const fact = await createFact(payload);
        emitFactCreated(fact);
        return fact;
      }
    },
    [createFact, updateFact],
  );
  return {saveOrUpdateFact};
}

function useApi() {
  const collection = useCollection();
  const createFact = useCallback(
    (factData: InsertFactSchema) => collection?.facts.create.mutate(factData),
    [collection],
  );
  const updateFact = useCallback(
    (fact: UpdateFactSchema) => collection?.facts.update.mutate(fact),
    [collection],
  );
  return {
    createFact,
    updateFact,
  };
}
