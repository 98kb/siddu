import {ComposerModal} from "@repo/fact-composer";
import {ORM} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";
import {RuntimeAdapter} from "@repo/facts-db-adapter";
import {requestComposer$} from "./requestComposer$";

const facts = new ORM(new RuntimeAdapter());

export const createComposerModal: Reader<
  HTMLElement,
  ComposerModal
> = container => {
  return new ComposerModal({
    target: container,
    props: {facts, hookElement$: requestComposer$},
  });
};
