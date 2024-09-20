import {ComposerModal} from "@repo/fact-composer";
import {DbClient, TRPCService, createChromeRuntimeClient} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";

const db = new DbClient(
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
