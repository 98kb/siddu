import {ArchiveRestoreButton} from "~/components/ArchiveRestoreButton";
import {ComponentProps, useCallback} from "react";
import {FactSchema} from "@repo/collection-service-defs";
import {useArchiveFact} from "../hooks/useArchiveFact";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  fact: FactSchema;
  size?: ComponentProps<typeof ArchiveRestoreButton>["size"];
  onChange?: Reader<FactSchema | undefined, void>;
};

export function ArchiveRestoreFact({fact, size, onChange}: TProps) {
  const {archiveFact, restoreFact} = useArchiveFact();

  const archive = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      onChange?.(await archiveFact(fact));
    },
    [archiveFact, fact, onChange],
  );

  const restore = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      onChange?.(await restoreFact(fact));
    },
    [restoreFact, fact, onChange],
  );
  return (
    <ArchiveRestoreButton
      size={size}
      onArchive={archive}
      onRestore={restore}
      restore={Boolean(fact.isDeleted)}
    />
  );
}
