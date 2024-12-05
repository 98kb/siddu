import {useAtom, atom, useSetAtom} from "jotai";
import {useAddFactTrigger} from "./useAddFactTrigger";
import {inputElAtom} from "../stores/inputElAtom";
import {useCompositionTrigger} from "./useCompositionTrigger";
import {useCallback} from "react";

export const isModalOpenAtom = atom(false);

export function useComposer() {
  useCompositionTriggerHandler();
  useAddFactTrigger();
  const [isOpen, setIsOpen] = useAtom(isModalOpenAtom);
  const closeComposer = useCallback(() => setIsOpen(false), [setIsOpen]);
  return {isOpen, setIsOpen, closeComposer};
}

function useCompositionTriggerHandler() {
  const setInputEl = useSetAtom(inputElAtom);
  useCompositionTrigger(event => {
    setInputEl(event.target as HTMLTextAreaElement);
  });
}
