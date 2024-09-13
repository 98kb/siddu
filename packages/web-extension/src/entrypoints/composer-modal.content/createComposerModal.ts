import {ComposerModal} from "@repo/fact-composer";
import {FactsService, TRPCService} from "@repo/facts-service";
import {Reader} from "fp-ts/lib/Reader";
import {createChromeRuntimeClient} from "@repo/facts-service-trpc";

const db = new FactsService(
  table => new TRPCService(table, createChromeRuntimeClient()),
);

export const createComposerModal: Reader<
  HTMLElement,
  ComposerModal
> = container => {
  return new ComposerModal({
    target: container,
    props: {db},
  });
};
