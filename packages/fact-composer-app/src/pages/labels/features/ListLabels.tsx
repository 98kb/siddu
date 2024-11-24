import {LabelsTable} from "../organism/LabelsTable";
import {useLabelActions} from "../hooks/useLabelActions";
import {useCallback, useEffect, useState} from "react";
import {LabelSchema} from "@repo/collection-service-defs";
import {useLabelsApi} from "../hooks/useLabelsApi";

export function ListLabels() {
  const {softDeleteLabel} = useLabelActions();
  const {labels} = useListLabels();

  return <LabelsTable labels={labels} onDelete={softDeleteLabel} />;
}

// eslint-disable-next-line max-statements
function useListLabels() {
  const {toPaginatedLabels} = useLabelsApi();
  const limit = 2;
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [labels, setLabels] = useState<LabelSchema[]>([]);
  const nextPage = useCallback(() => {
    setOffset($offset => $offset + 1);
  }, []);
  const prevPage = useCallback(() => {
    setOffset($offset => $offset - 1);
  }, []);
  useEffect(() => {
    toPaginatedLabels({
      pagination: {limit, offset},
      isDeleted: false,
      // eslint-disable-next-line complexity
    }).then(result => {
      setLabels(result?.list ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [offset, toPaginatedLabels]);
  return {
    total,
    labels,
    nextPage,
    prevPage,
  };
}
