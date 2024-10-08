import {useAtom} from "jotai";
import {atom} from "jotai";

export const isModalOpenAtom = atom(false);

export function useComposer() {
  return useAtom(isModalOpenAtom);
}
