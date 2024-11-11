import {IconButton} from "~/components/IconButton";
import {Trash2Icon} from "lucide-react";
import {ActionItem} from "../components/ActionItem";
import {useState} from "react";
import {ConfirmButtons} from "~/components/ConfirmButtons";

type TProps = {
  onDelete: () => Promise<void>;
};

export function DeleteBackupAction({onDelete}: TProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <ActionItem
      label="Delete Backup"
      subtext="This action cannot be undone"
      className="group"
    >
      {isDeleting ? (
        <div className="flex gap-3">
          <ConfirmButtons
            size="icon"
            onConfirm={onDelete}
            onCancel={() => setIsDeleting(false)}
          />
        </div>
      ) : (
        <IconButton tooltip="Delete" onClick={() => setIsDeleting(true)}>
          <Trash2Icon />
        </IconButton>
      )}
    </ActionItem>
  );
}
