import {ArchiveRestoreIcon, ArchiveXIcon} from "lucide-react";
import {ComponentProps, useCallback} from "react";
import {IconButton} from "~/components/IconButton";
import {Button} from "~/components/ui/button";
import {useFactActions} from "../hooks/useFactActions";
import type {FactSchema} from "@repo/collection-service-defs";

type TProps = {
  fact: FactSchema;
  onClickPropagation?: ComponentProps<typeof Button>["onClick"];
};

export function FactCardActions({fact, onClickPropagation}: TProps) {
  const {archiveFact, restoreFact} = useFactActions();

  const archive = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      archiveFact(fact._id);
      onClickPropagation?.(event);
    },
    [onClickPropagation, archiveFact, fact],
  );

  const restore = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      restoreFact(fact._id);
      onClickPropagation?.(event);
    },
    [onClickPropagation, restoreFact, fact],
  );

  return (
    <div className="flex gap-2">
      {fact.isDeleted ? (
        <IconButton
          tooltip="Restore"
          size="icon-sm"
          openDelay={50}
          onClick={restore}
        >
          <ArchiveRestoreIcon />
        </IconButton>
      ) : (
        <IconButton
          tooltip="Archive"
          size="icon-sm"
          openDelay={50}
          onClick={archive}
        >
          <ArchiveXIcon />
        </IconButton>
      )}
    </div>
  );
}
