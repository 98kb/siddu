import type {SvelteComponent} from "svelte";

export type SwitchRoutes = {
  [key: string]: typeof SvelteComponent;
};
