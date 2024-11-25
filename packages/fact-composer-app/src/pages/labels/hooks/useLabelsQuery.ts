import {useAtom} from "jotai";
import {useCallback, useEffect} from "react";
import {useLabelsApi} from "./useLabelsApi";
import {queryLabelsAtom} from "../store/queryLabelsAtom";

export function useLabelsQuery() {
  const {toLabels} = useLabelsApi();
  const [labels, setLabels] = useAtom(queryLabelsAtom);
  const fetchLabels = useCallback(
    async () =>
      toLabels({
        pagination: {limit: 99, offset: 0},
        isDeleted: false,
      }).then($labels => $labels && setLabels($labels)),
    [toLabels, setLabels],
  );
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return {
    labels,
  };
}
