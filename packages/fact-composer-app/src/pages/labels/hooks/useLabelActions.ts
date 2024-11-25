import {InsertLabelSchema, LabelSchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelActions() {
  const collection = useCollection();
  const addLabel = useCallback(
    (label: InsertLabelSchema) => collection?.labels.create.mutate(label),
    [collection],
  );
  const softDeleteLabel = useCallback(
    (_id: LabelSchema["_id"]) => collection?.labels.softDelete.mutate({_id}),
    [collection],
  );
  return {addLabel, softDeleteLabel};
}
