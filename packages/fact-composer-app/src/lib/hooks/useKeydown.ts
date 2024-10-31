import {Reader} from "fp-ts/lib/Reader";
import {useCallback, useEffect} from "react";

type Options = {
  trigger: Reader<KeyboardEvent, boolean>;
  callback: Reader<KeyboardEvent, void>;
};

export function useKeydown({trigger, callback}: Options) {
  const onKeydown = useCallback<Reader<KeyboardEvent, void>>(
    event => {
      if (trigger(event)) {
        callback(event);
      }
    },
    [callback, trigger],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });
}
