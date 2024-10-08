import {useKeydown} from "~/hooks/useKeydown";
import {isCompositionTrigger} from "../triggers/isCompositionTrigger";
import {Reader} from "fp-ts/lib/Reader";

export function useCompositionTrigger(callback: Reader<KeyboardEvent, void>) {
  useKeydown({
    trigger: isCompositionTrigger,
    callback,
  });
}
