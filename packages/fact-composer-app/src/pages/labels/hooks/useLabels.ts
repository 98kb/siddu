import {InsertLabel} from "@repo/facts-db";
import {useCallback} from "react";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {useLiveQuery} from "~/db/hooks/useLiveQuery";

export function useLabels() {
  const db = useFactsDb();
  const fetchLabels = useCallback(
    async () => db?.labels.getAll(label => !label.isDeleted),
    [db],
  );
  const labels = useLiveQuery("labels", fetchLabels);
  const addLabel = useCallback(
    (label: InsertLabel) => db?.labels.add(label),
    [db],
  );
  return {labels, addLabel};
}
