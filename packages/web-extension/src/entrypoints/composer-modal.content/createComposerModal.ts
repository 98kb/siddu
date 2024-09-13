import {ComposerModal} from "@repo/fact-composer";
import {FactsService, createMemoryAdapter} from "@repo/facts-service";
import {Reader} from "fp-ts/lib/Reader";

const db = new FactsService(createMemoryAdapter);

export const createComposerModal: Reader<
  HTMLElement,
  ComposerModal
> = container => {
  return new ComposerModal({
    target: container,
    props: {db},
  });
};
