import {Reader} from "fp-ts/lib/Reader";

export const isCompositionTrigger: Reader<KeyboardEvent, boolean> = event =>
  event.key === "." && event.ctrlKey && isInputTarget(event);

const isInputTarget: Reader<KeyboardEvent, boolean> = event =>
  event.target instanceof HTMLInputElement ||
  event.target instanceof HTMLTextAreaElement ||
  (event.target as HTMLElement).contentEditable === "true";
