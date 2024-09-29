import {Dialog, DialogContent} from "~/components/ui/dialog";
import {DbClient} from "@repo/facts-db";

type TProps = {
  db: DbClient;
};

export function ComposerModal({db}: TProps) {
  return (
    <Dialog>
      <DialogContent className="flex gap-0 h-full rounded-lg overflow-y-scroll overflow-x-visible p-0 min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]"></DialogContent>
    </Dialog>
  );
}
