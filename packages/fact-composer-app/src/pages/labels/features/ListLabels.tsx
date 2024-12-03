import {LabelsTable} from "../organism/LabelsTable";
import {useLabelActions} from "../hooks/useLabelActions";
import {useCallback, useEffect, useState} from "react";
import {LabelSchema, PaginationSchema} from "@repo/collection-service-defs";
import {useLabelsApi} from "../hooks/useLabelsApi";
import {EasyPagination} from "~/components/EasyPagination";
import {usePagination} from "~/lib/hooks/usePagination";

export function ListLabels() {
  const {softDeleteLabel} = useLabelActions();
  const {labels, nextPage, prevPage, limit, offset, total} = useListLabels({
    offset: 0,
    limit: 8,
  });

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <LabelsTable labels={labels} onDelete={softDeleteLabel} />
      <EasyPagination
        className="w-full justify-between items-center px-4 box-border"
        limit={limit}
        offset={offset}
        total={total}
        onNext={nextPage}
        onPrevious={prevPage}
      />
    </div>
  );
}

function useListLabels(pagination: PaginationSchema) {
  const {listPaginatedLabels: toPaginatedLabels} = useLabelsApi();
  const {offset, limit, jump, total, setTotal} = usePagination(pagination);
  const [labels, setLabels] = useState<LabelSchema[]>([]);
  const nextPage = useCallback(
    () => jump(pagination.limit),
    [jump, pagination.limit],
  );
  const prevPage = useCallback(
    () => jump(-pagination.limit),
    [jump, pagination.limit],
  );
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    toPaginatedLabels({
      pagination: {limit, offset},
      isDeleted: false,
    })
      // eslint-disable-next-line complexity
      .then(result => {
        setLabels(result?.list ?? []);
        setTotal(Number(result?.total));
      });
  }, [offset, toPaginatedLabels, limit, setTotal]);
  return {
    limit,
    offset,
    total,
    labels,
    nextPage,
    prevPage,
  };
}
