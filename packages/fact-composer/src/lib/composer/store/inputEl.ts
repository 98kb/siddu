import {readable} from "svelte/store";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const inputEl = readable<InputElement | undefined>(undefined, set => {
  document.addEventListener("keydown", event => {
    const input = event.target as HTMLInputElement;
    isTrigger(event) && isInput(event) && set(input);
  });
});

const isTrigger = (event: KeyboardEvent) => event.key === "." && event.ctrlKey;
const isInput = (event: KeyboardEvent) =>
  event.target instanceof HTMLInputElement ||
  event.target instanceof HTMLTextAreaElement;
