import {Dialog, DialogContent} from "~/components/ui/dialog";
import {DbClient} from "@repo/facts-db";
import {ComposerNav} from "./components/ComposerNav";
import {useState} from "react";
import {TooltipProvider} from "~/components/ui/tooltip";
import {MemoryRouter, Route, Routes} from "react-router-dom";

type TProps = {
  db?: DbClient;
};

export function ComposerModal({db}: TProps) {
  console.log(db);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MemoryRouter>
      <TooltipProvider>
        <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="flex gap-0 h-full rounded-lg overflow-y-scroll overflow-x-visible p-0 min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]">
            <ComposerNav />
            <Routes>
              <Route path="/collection" element={<div>Collection</div>} />
              <Route path="/composition" element={<div>Composition</div>} />
              <Route path="/labels" element={<div>Labels</div>} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </MemoryRouter>
  );
}
