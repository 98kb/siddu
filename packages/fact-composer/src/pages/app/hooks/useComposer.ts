import {useAtom, atom} from "jotai";
import {useAddFactTrigger} from "./useAddFactTrigger";
import {useCallback} from "react";

export const isModalOpenAtom = atom(false);

export function useComposer() {
  useAddFactTrigger();
  const [isOpen, setIsOpen] = useAtom(isModalOpenAtom);
  const closeComposer = useCallback(() => setIsOpen(false), [setIsOpen]);
  return {isOpen, setIsOpen, closeComposer};
}
