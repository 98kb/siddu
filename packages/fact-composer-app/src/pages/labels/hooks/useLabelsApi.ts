import {LabelSchema, LabelsQuerySchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelsApi() {
  const collection = useCollection();
  const toPaginatedLabels = useCallback(
    async (query: LabelsQuerySchema) =>
      collection?.labels.paginatedList.query(query),
    [collection],
  );

  const deleteIfOrphan = useCallback(
    (_id: LabelSchema["_id"]) =>
      collection?.labels.softDeleteIfOrphan.mutate({_id}),
    [collection],
  );

  const toLabels = useCallback(
    async (query: LabelsQuerySchema) => collection?.labels.list.query(query),
    [collection],
  );
  return {toPaginatedLabels, deleteIfOrphan, toLabels};
}
