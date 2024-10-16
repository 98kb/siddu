import {IO} from "fp-ts/lib/IO";

export function createDebounce(timeout = 300) {
  let timer: NodeJS.Timeout;
  let isDebouncing = false;
  return (fn: IO<void>) => {
    if (isDebouncing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
        isDebouncing = false;
      }, timeout);
    } else {
      fn();
      isDebouncing = true;
      timer = setTimeout(() => {
        isDebouncing = false;
      }, timeout);
    }
  };
}
