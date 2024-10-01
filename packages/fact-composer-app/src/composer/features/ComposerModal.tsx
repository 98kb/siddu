import {Dialog, DialogContent} from "~/components/ui/dialog";
import {ComposerNav} from "./ComposerNav";
import {Route, Routes, useLocation} from "react-router-dom";
import {Collection} from "~/collection/pages/Collection";
import {Reader} from "fp-ts/lib/Reader";
import {cn} from "~/lib/utils";
import {Header} from "../components/Header";

type TProp = {
  open: boolean;
  onOpenChange: Reader<boolean, void>;
};

export function ComposerModal({open, onOpenChange}: TProp) {
  const location = useLocation();

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex gap-0 h-full rounded-lg p-0",
          "overflow-y-scroll overflow-x-visible",
          "min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]",
        )}
      >
        <ComposerNav />
        <div className="flex flex-col w-full h-full">
          <h1 className="p-4 capitalize border-b">
            <Header location={location} />
          </h1>
          <Routes>
            <Route path="/collection" element={<Collection />} />
            <Route path="/composition" element={<div>Composition</div>} />
            <Route path="/labels" element={<div>Labels</div>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </DialogContent>
    </Dialog>
  );
}
