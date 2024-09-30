import {Dialog, DialogContent} from "~/components/ui/dialog";
import {DbClient} from "@repo/facts-db";
import {ComposerNav} from "./components/ComposerNav";
import {useState} from "react";
import {TooltipProvider} from "~/components/ui/tooltip";

type TProps = {
  db?: DbClient;
};

export function ComposerModal({db}: TProps) {
  console.log(db);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <TooltipProvider>
      <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex gap-0 h-full rounded-lg overflow-y-scroll overflow-x-visible p-0 min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]">
          <ComposerNav />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
