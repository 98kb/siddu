import {Reader} from "fp-ts/lib/Reader";

export const isInputable: Reader<HTMLElement, boolean> = el =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLTextAreaElement ||
  el.contentEditable === "true";
