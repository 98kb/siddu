import {derived, writable} from "svelte/store";
import {identity} from "fp-ts/function";

export type Routes =
  | "composition"
  | "labels"
  | "collection"
  | "marketplace"
  | "settings"
  | "account";

const route = writable<Routes>("composition");

export const activeRoute = derived(route, identity);
export const setActiveRoute = (r: Routes) => route.set(r);
