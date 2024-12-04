import {PaginationSchema} from "@repo/collection-service-defs";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {useCallback, useMemo} from "react";
import {minmax} from "~/lib/minmax";

const pageSize = 10;
const totalAtom = atom(pageSize);
const pageAtom = atom(0);
const totalPagesAtom = atom(get => Math.ceil(get(totalAtom) / pageSize));

export function useFactsPagination() {
  const page = useAtomValue(pageAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const {reset, jump} = useFactsPaginationControls();
  const nextPage = useCallback(() => jump(1), [jump]);
  const prevPage = useCallback(() => jump(-1), [jump]);
  const pagination = useMemo<PaginationSchema>(
    () => ({
      offset: toOffset(page),
      limit: toLimit(toOffset(page)),
    }),
    [page],
  );
  return {pagination, nextPage, prevPage, total, setTotal, reset};
}

function useFactsPaginationControls() {
  const setPage = useSetAtom(pageAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const jump = useCallback(
    (delta: number) => setPage(page => minmax(page + delta, 0, totalPages)),
    [setPage, totalPages],
  );
  const reset = useCallback(() => setPage(0), [setPage]);
  return {jump, reset};
}

const toOffset = (page: number) => page * pageSize;
const toLimit = (offset: number) => offset + pageSize;
