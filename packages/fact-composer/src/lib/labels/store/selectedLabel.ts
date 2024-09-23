import {writable} from "svelte/store";
import type {Label} from "@repo/facts-db";

export const selectedLabel = writable<Label | undefined>(undefined);
