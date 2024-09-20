import {readable} from "svelte/store";

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLElement;

export const inputEl = readable<InputElement | undefined>(undefined, set => {
  document.addEventListener("keydown", event => {
    const input = event.target as InputElement;
    isTrigger(event) && isEditable(event) && set(input);
  });
});

export const appendText = (el: InputElement, text: string) => {
  if (isInput(el)) {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    input.value = [input.value, text].filter(Boolean).join("");
    // Trigger input event to notify any listeners of the change
    el.dispatchEvent(new Event("input", {bubbles: true}));
  } else if (isContentEditable(el)) {
    el.innerHTML += text;
  }
};

const isInput = (el: HTMLElement): boolean =>
  el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;

const isContentEditable = (el: HTMLElement): boolean => {
  return el.contentEditable === "true";
};

const isTrigger = (event: KeyboardEvent) => event.key === "." && event.ctrlKey;
const isEditable = (event: KeyboardEvent) =>
  event.target instanceof HTMLInputElement ||
  event.target instanceof HTMLTextAreaElement ||
  isContentEditable(event.target as HTMLElement);
