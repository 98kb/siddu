import {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useFactApi} from "./useFactApi";
import {useFacts} from "./useFacts";

export function useFactActions() {
  const {
    createFact: create,
    updateFact,
    archiveFact: archive,
    restoreFact: restore,
  } = useFactApi();
  const {mergeFact} = useFacts();
  const createFact = useCallback(
    async (fact: InsertFactSchema) => {
      const insertedFact = await create(fact);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      insertedFact && mergeFact(insertedFact);
      return insertedFact;
    },
    [create, mergeFact],
  );
  const saveOrUpdateFact = useCallback(
    async (fact: FactSchema | InsertFactSchema) => {
      if ("_id" in fact) {
        const updatedFact = await updateFact(fact);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        updatedFact && mergeFact(updatedFact);
        return updatedFact;
      } else {
        return createFact(fact);
      }
    },
    [mergeFact, createFact, updateFact],
  );
  const archiveFact = useCallback(
    async (fact: FactSchema) => {
      const archivedFact = await archive(fact._id);
      if (archivedFact) {
        mergeFact(archivedFact);
      }
      return archivedFact;
    },
    [mergeFact, archive],
  );

  const restoreFact = useCallback(
    async (fact: FactSchema) => {
      const restoredFact = await restore(fact._id);
      if (restoredFact) {
        mergeFact(restoredFact);
      }
      return restoredFact;
    },
    [mergeFact, restore],
  );
  return {saveOrUpdateFact, archiveFact, restoreFact};
}
