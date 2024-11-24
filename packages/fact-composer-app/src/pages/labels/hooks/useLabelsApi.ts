import {LabelsQuerySchema} from "@repo/collection-service-defs";
import {useCallback} from "react";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useLabelsApi() {
  const collection = useCollection();
  const toPaginatedLabels = useCallback(
    async (query: LabelsQuerySchema) =>
      collection?.labels.paginatedList.query(query),
    [collection],
  );

  return {toPaginatedLabels};
}
