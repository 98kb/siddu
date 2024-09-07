import {filter, fromEvent, map} from "rxjs";

export const requestComposer$ = fromEvent<KeyboardEvent>(
  document,
  "keydown",
).pipe(
  filter(event => event.key === "." && event.ctrlKey),
  filter(
    event =>
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement,
  ),
  map(event => event.target as HTMLInputElement | HTMLTextAreaElement),
);
