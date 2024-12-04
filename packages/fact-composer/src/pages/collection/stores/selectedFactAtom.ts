import type {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";
import {atom} from "jotai";

export const selectedFactAtom = atom<FactSchema | InsertFactSchema | undefined>(
  undefined,
);
