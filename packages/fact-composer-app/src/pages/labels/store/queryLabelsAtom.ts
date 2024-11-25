import {LabelSchema} from "@repo/collection-service-defs";
import {atom} from "jotai";

export const queryLabelsAtom = atom<LabelSchema[]>([]);
