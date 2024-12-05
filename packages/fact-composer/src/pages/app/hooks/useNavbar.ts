import {Reader} from "fp-ts/lib/Reader";
import {atom, useAtom} from "jotai";
import {useCallback} from "react";
import {useKeydown} from "~/lib/hooks/useKeydown";
import {isInputable} from "~/lib/isInputable";

const isVisibleAtom = atom(false);

export function useNavbar() {
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), []);
  useKeydown({
    trigger: isToggleTrigger,
    callback: toggleVisibility,
  });
  const show = useCallback(() => setIsVisible(true), []);
  return {isVisible, show};
}

const isToggleTrigger: Reader<KeyboardEvent, boolean> = event =>
  event.key === "." &&
  event.ctrlKey &&
  !isInputable(event.target as HTMLElement);
