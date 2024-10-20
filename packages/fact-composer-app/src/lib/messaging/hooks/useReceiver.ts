import {useCallback, useEffect} from "react";
import {MessagePayload} from "../MessagePayload";
import {Reader} from "fp-ts/lib/Reader";
import {Message} from "../Message";

export function useReceiver<T extends keyof MessagePayload>(
  type: T,
  callback: Reader<MessagePayload[T], void>,
) {
  const cb = useCallback(
    (message: Message<T>) => {
      if (message.type === type) {
        callback(message.payload);
      }
    },
    [callback, type],
  );

  useEffect(() => {
    chrome.runtime.onMessage.addListener(cb);
    return () => chrome.runtime.onMessage.removeListener(cb);
  }, [cb]);
}
