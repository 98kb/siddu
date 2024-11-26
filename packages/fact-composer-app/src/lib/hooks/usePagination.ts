import {PaginationSchema} from "@repo/collection-service-defs";
import {useCallback, useState} from "react";
import {minmax} from "../minmax";

type TOpts = PaginationSchema;

export function usePagination(initial: TOpts) {
  const [total, setTotal] = useState(initial.limit);
  const [limit, setLimit] = useState(initial.limit);
  const [offset, setOffset] = useState(initial.offset);
  const jump = useCallback(
    (delta: number) => {
      setOffset($offset => minmax($offset + delta, 0, total));
      setLimit($limit => minmax($limit + delta, Math.abs(delta), total));
    },
    [total],
  );
  const reset = useCallback(() => {
    setLimit(initial.limit);
    setOffset(initial.offset);
  }, [initial.limit, initial.offset]);
  return {limit, offset, jump, total, setTotal, reset};
}

/**
 * - collection facts
 * - pagination
 * - query filters
 * - signals
 */
