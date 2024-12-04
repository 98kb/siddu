import {
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelsApi() {
  const collection = useCollection();
  const listPaginatedLabels = useCallback(
    async (query: LabelsQuerySchema) =>
      collection?.labels.paginatedList.query(query),
    [collection],
  );

  const deleteIfOrphan = useCallback(
    (_id: LabelSchema["_id"]) =>
      collection?.labels.softDeleteIfOrphan.mutate({_id}),
    [collection],
  );

  const listLabels = useCallback(
    async (query: LabelsQuerySchema) => collection?.labels.list.query(query),
    [collection],
  );
  const createLabel = useCallback(
    (label: InsertLabelSchema) => collection?.labels.create.mutate(label),
    [collection],
  );
  const softDeleteLabel = useCallback(
    (_id: LabelSchema["_id"]) => collection?.labels.softDelete.mutate({_id}),
    [collection],
  );
  return {
    listPaginatedLabels,
    deleteIfOrphan,
    listLabels,
    softDeleteLabel,
    createLabel,
  };
}
