import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {useCallback} from "react";
import {minmax} from "~/lib/minmax";

const totalAtom = atom(10);
const limitAtom = atom(10);
const offsetAtom = atom(0);

export function useFactsPagination() {
  const [total, setTotal] = useAtom(totalAtom);
  const limit = useAtomValue(limitAtom);
  const offset = useAtomValue(offsetAtom);
  const {reset, jump} = useFactsPaginationControls();
  const nextPage = useCallback(() => jump(10), [jump]);
  const prevPage = useCallback(() => jump(-10), [jump]);
  return {limit, offset, nextPage, prevPage, total, setTotal, reset};
}

function useFactsPaginationControls() {
  const setOffset = useSetAtom(offsetAtom);
  const setLimit = useSetAtom(limitAtom);
  const total = useAtomValue(totalAtom);
  const jump = useCallback(
    (delta: number) => {
      setOffset($offset => minmax($offset + delta, 0, total));
      setLimit($limit => minmax($limit + delta, Math.abs(delta), total));
    },
    [total, setOffset, setLimit],
  );
  const reset = useCallback(() => {
    setLimit(10);
    setOffset(0);
  }, [setLimit, setOffset]);
  return {jump, reset};
}
