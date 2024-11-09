import {ActionItem} from "./ActionItem";
import {IconButton} from "~/components/IconButton";
import {RefreshCwIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import {Task} from "fp-ts/lib/Task";

type TProps = {
  loading: boolean;
  onSync: Task<void>;
};

export function DbSyncAction({loading, onSync}: TProps) {
  return (
    <ActionItem
      label="Sync Collection"
      subtext="Your data will be stored in your own Google Drive"
    >
      <IconButton tooltip="sync" onClick={onSync}>
        <RefreshCwIcon className={cn(loading && "animate-spin")} />
      </IconButton>
    </ActionItem>
  );
}
