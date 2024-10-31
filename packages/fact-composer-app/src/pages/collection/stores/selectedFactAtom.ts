import {Fact, InsertFact} from "@repo/facts-db";
import {atom} from "jotai";

export const selectedFactAtom = atom<Fact | InsertFact | undefined>(undefined);
