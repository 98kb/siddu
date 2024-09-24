import {writable} from "svelte/store";
import type {Fact, InsertFact} from "@repo/facts-db";

export const selectedFact = writable<Fact | InsertFact>({content: "", id: 0});
