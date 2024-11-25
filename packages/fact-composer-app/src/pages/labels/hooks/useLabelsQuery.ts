import {useAtom} from "jotai";
import {useCallback, useEffect} from "react";
import {useLabelsApi} from "./useLabelsApi";
import {queryLabelsAtom} from "../store/queryLabelsAtom";

export function useLabelsQuery() {
  const {listLabels} = useLabelsApi();
  const [labels, setLabels] = useAtom(queryLabelsAtom);
  const fetchLabels = useCallback(
    async () =>
      listLabels({
        pagination: {limit: 99, offset: 0},
        isDeleted: false,
      }).then($labels => $labels && setLabels($labels)),
    [listLabels, setLabels],
  );
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return {
    labels,
  };
}
