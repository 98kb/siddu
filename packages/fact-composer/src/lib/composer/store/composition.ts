import {writable} from "svelte/store";

export const composition = writable("");
export const append = (text: string) => {
  composition.update(value => [value, text].filter(Boolean).join("\n"));
};
