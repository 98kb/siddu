import { concat } from "./concat";

const joinLines = concat("\n");

export function appendToInput(
  input: HTMLInputElement | HTMLTextAreaElement,
  content: string
) {
  input.value = joinLines(input.value, content);
}
