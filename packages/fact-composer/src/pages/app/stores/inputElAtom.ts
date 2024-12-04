import {atom} from "jotai";

export const inputElAtom = atom<
  null | HTMLTextAreaElement | HTMLInputElement | HTMLElement
>(null);
