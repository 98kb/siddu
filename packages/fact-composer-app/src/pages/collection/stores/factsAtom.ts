import {FactSchema} from "@repo/collection-service-defs";
import {atom} from "jotai";

export const factsAtom = atom<FactSchema[]>([]);
