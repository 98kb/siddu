import {writable} from "svelte/store";
import type {Label} from "@repo/facts-db";

export const labels = writable<Label[]>([]);
