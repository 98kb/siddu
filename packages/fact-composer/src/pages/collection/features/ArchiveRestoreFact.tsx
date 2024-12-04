import {ArchiveRestoreButton} from "~/components/ArchiveRestoreButton";
import {ComponentProps, useCallback} from "react";
import {FactSchema} from "@repo/collection-service-defs";
import {useArchiveFact} from "../hooks/useArchiveFact";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  fact: FactSchema;
  size?: ComponentProps<typeof ArchiveRestoreButton>["size"];
  onClick?: Reader<FactSchema, void>;
};

export function ArchiveRestoreFact({fact, size, onClick}: TProps) {
  const canRestore = Boolean(fact.isDeleted);
  const {toggleArchive} = useArchiveFact();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      onClick?.(fact);
      // TODO: resolve coupling
      // setting a timeout to allow the animation to complete
      setTimeout(() => toggleArchive(fact), 90);
    },
    [onClick, toggleArchive, fact],
  );
  return (
    <ArchiveRestoreButton
      size={size}
      onClick={handleClick}
      restore={canRestore}
    />
  );
}
