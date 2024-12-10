import {Task} from "fp-ts/lib/Task";
import {useCallback} from "react";
import {useError} from "react-use";

export function useSafeTask<T>(
  task: Task<T>,
  deps: Parameters<typeof useCallback>[1],
): Task<T> {
  const throwError = useError();
  return useCallback(
    (async () => {
      try {
        return (await task()) as T;
      } catch (thrown) {
        throwError(thrown as Error);
      }
    }) as Task<T>,
    [throwError, ...deps],
  );
}
