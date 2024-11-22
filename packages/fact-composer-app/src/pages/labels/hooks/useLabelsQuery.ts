import {LabelSchema} from "@repo/collection-service-defs";
import {useCallback, useEffect, useState} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelsQuery() {
  const collection = useCollection();
  const [labels, setLabels] = useState<LabelSchema[]>([]);
  const fetchLabels = useCallback(
    async () =>
      collection?.labels.list
        .query({
          pagination: {limit: 99, offset: 0},
          isDeleted: false,
        })
        .then(setLabels),
    [collection],
  );
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return {
    labels,
  };
}
