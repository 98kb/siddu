import {Fact} from "@repo/facts-db";
import {ArchiveRestoreIcon, ArchiveXIcon} from "lucide-react";
import {ComponentProps} from "react";
import {IconButton} from "~/components/IconButton";
import {Button} from "~/components/ui/button";
import {useFactsDb} from "~/db/hooks/useFactsDb";

type TProps = {
  fact: Fact;
  onClickPropagation?: ComponentProps<typeof Button>["onClick"];
};

export function FactCardActions({fact, onClickPropagation}: TProps) {
  const db = useFactsDb();

  return (
    <div className="flex gap-2">
      {fact.isDeleted ? (
        <IconButton
          tooltip="Restore"
          size="icon-sm"
          openDelay={50}
          onClick={event => {
            db?.facts.restore(fact.id);
            onClickPropagation?.(event);
          }}
        >
          <ArchiveRestoreIcon />
        </IconButton>
      ) : (
        <IconButton
          tooltip="Archive"
          size="icon-sm"
          openDelay={50}
          onClick={event => {
            db?.facts.softDelete(fact.id);
            onClickPropagation?.(event);
          }}
        >
          <ArchiveXIcon />
        </IconButton>
      )}
    </div>
  );
}
