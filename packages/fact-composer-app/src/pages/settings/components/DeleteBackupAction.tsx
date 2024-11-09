import {IconButton} from "~/components/IconButton";
import {ActionItem} from "./ActionItem";
import {Trash2Icon} from "lucide-react";

type TProps = {
  file: {
    id: string;
    name: string;
  };
  onDelete: (file: {id: string; name: string}) => Promise<void>;
};

export function DeleteBackupAction({file, onDelete}: TProps) {
  const [, timestamp] = file.name.split(".");
  const time = new Date(+timestamp).toLocaleString();
  return (
    <ActionItem
      key={file.id}
      label="Delete Backup"
      subtext={`Last modified: ${time}`}
      className="group"
    >
      <div className="flex gap-2">
        <IconButton
          tooltip="Delete"
          className="opacity-0 group-hover:opacity-100"
          onClick={() => onDelete(file)}
        >
          <Trash2Icon />
        </IconButton>
      </div>
    </ActionItem>
  );
}
