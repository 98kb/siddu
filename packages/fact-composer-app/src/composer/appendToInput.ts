export function appendToInput(
  text: string,
  input: HTMLElement | HTMLInputElement | HTMLTextAreaElement,
) {
  if (
    input instanceof HTMLInputElement ||
    input instanceof HTMLTextAreaElement
  ) {
    input.value += text;
  } else {
    input.innerText += text;
  }
  input.dispatchEvent(new Event("input", {bubbles: true}));
  input.dispatchEvent(new Event("change", {bubbles: true}));
}
