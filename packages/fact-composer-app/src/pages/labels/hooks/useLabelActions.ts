import {InsertLabelSchema, LabelSchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";
import {useLabelsApi} from "./useLabelsApi";
import {useSetAtom} from "jotai";
import {queryLabelsAtom} from "../store/queryLabelsAtom";

export function useLabelActions() {
  const collection = useCollection();
  const {createLabel, deleteIfOrphan} = useLabelsApi();
  const setLabels = useSetAtom(queryLabelsAtom);
  const addLabel = useCallback(
    async (label: InsertLabelSchema) => {
      const newLabel = await createLabel(label);
      if (newLabel) {
        setLabels(labels => [...labels, newLabel]);
      }
      return newLabel;
    },
    [createLabel, setLabels],
  );
  const softDeleteLabel = useCallback(
    (_id: LabelSchema["_id"]) => collection?.labels.softDelete.mutate({_id}),
    [collection],
  );
  const removeIfOrphan = useCallback(
    async (id: LabelSchema["_id"]) => {
      const isOrphan = await deleteIfOrphan(id);
      // eslint-disable-next-line max-nested-callbacks
      isOrphan && setLabels(labels => labels.filter(label => label._id !== id));
    },
    [deleteIfOrphan, setLabels],
  );
  return {addLabel, softDeleteLabel, removeIfOrphan};
}
