import {writable} from "svelte/store";
import type {Fact} from "@repo/facts-db";

export const facts = writable<Fact[]>([]);
