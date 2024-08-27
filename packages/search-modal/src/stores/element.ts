import {writable} from "svelte/store";

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const element = writable<InputElement|undefined>(undefined);
