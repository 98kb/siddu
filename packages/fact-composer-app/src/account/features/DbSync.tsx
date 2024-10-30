import {IconButton} from "~/components/IconButton";
import {RefreshCcw} from "lucide-react";
import {useBackup} from "~/db/hooks/useBackup";
import {cn} from "~/lib/utils";

// TODO: how to decide when to restore and when to backup?
export function DbSync() {
  const {isBusy, backup, restore} = useBackup();
  const sync = async () => {
    await restore();
    await backup();
  };
  return (
    <div className="flex items-center w-full justify-around">
      <div className="inline-flex flex-col">
        Sync Facts
        <small className="text-gray-500">
          Your data will be store in your own Google Drive
        </small>
      </div>
      <IconButton tooltip="Sync Facts" side="left" onClick={sync}>
        <RefreshCcw className={cn(isBusy && "animate-spin")} />
      </IconButton>
    </div>
  );
}
