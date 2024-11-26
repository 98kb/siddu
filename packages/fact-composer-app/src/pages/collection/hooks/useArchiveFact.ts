import {FactSchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {emitFactArchived} from "../signals/factArchived";
import {emitFactRestored} from "../signals/factRestored";
import {useCollection} from "./useCollection";

export function useArchiveFact() {
  const {softDelete, restore} = useApi();
  const archiveFact = useCallback(
    async (fact: FactSchema) => {
      const archivedFact = await softDelete(fact._id);
      emitFactArchived(archivedFact);
      return archivedFact;
    },
    [softDelete],
  );

  const restoreFact = useCallback(
    async (fact: FactSchema) => {
      const restoredFact = await restore(fact._id);
      emitFactRestored(restoredFact);
      return restoredFact;
    },
    [restore],
  );
  return {archiveFact, restoreFact};
}

function useApi() {
  const collection = useCollection();
  const softDelete = useCallback(
    (factId: FactSchema["_id"]) =>
      collection?.facts.softDelete.mutate({_id: factId}),
    [collection],
  );
  const restore = useCallback(
    (factId: FactSchema["_id"]) =>
      collection?.facts.restore.mutate({_id: factId}),
    [collection],
  );
  return {
    softDelete,
    restore,
  };
}
