import {Reader} from "fp-ts/lib/Reader";
import {atom, useAtom} from "jotai";
import {useCallback} from "react";
import {useKeydown} from "~/lib/hooks/useKeydown";

const isVisibleAtom = atom(false);

export function useNavbar() {
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), []);
  useKeydown({
    trigger: isToggleTrigger,
    callback: toggleVisibility,
  });
  return {isVisible};
}

const isToggleTrigger: Reader<KeyboardEvent, boolean> = event =>
  event.key === "." && event.ctrlKey && !isInputTarget(event);

const isInputTarget: Reader<KeyboardEvent, boolean> = event =>
  event.target instanceof HTMLInputElement ||
  event.target instanceof HTMLTextAreaElement ||
  (event.target as HTMLElement).contentEditable === "true";
