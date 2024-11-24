import {InsertLabelSchema, LabelSchema} from "@repo/collection-service-defs";
import {Reader} from "fp-ts/lib/Reader";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelActions() {
  const collection = useCollection();
  const addLabel = useCallback<
    Reader<InsertLabelSchema, Promise<LabelSchema> | undefined>
  >(label => collection?.labels.create.mutate(label), [collection]);
  const softDeleteLabel = useCallback<
    Reader<LabelSchema["_id"], Promise<LabelSchema | undefined> | undefined>
  >(
    labelId => collection?.labels.softDelete.mutate({_id: labelId}),
    [collection],
  );
  return {addLabel, softDeleteLabel};
}
