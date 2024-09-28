import Collection from "$lib/collection/Collection.svelte";
import Composition from "$lib/composition/Composition.svelte";
import Labels from "$lib/labels/Labels.svelte";
import type {SvelteComponent} from "svelte";

export const routes = {
  composition: Composition as typeof SvelteComponent,
  collection: Collection as typeof SvelteComponent,
  labels: Labels as typeof SvelteComponent,
} as const;
