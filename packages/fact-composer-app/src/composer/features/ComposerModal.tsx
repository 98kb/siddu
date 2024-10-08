import {Dialog, DialogContent, DialogDescription} from "~/components/ui/dialog";
import {ComposerNav} from "./ComposerNav";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Collection} from "~/collection/pages/Collection";
import {cn} from "~/lib/utils";
import {Header} from "../components/Header";
import {Composition} from "~/composition/pages/Composition";
import {Reader} from "fp-ts/lib/Reader";
import {useCompositionTrigger} from "../hooks/useCompositionTrigger";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {DialogTitle} from "@radix-ui/react-dialog";

type TProps = {
  open: boolean;
  onOpenChange: Reader<boolean, void>;
};

export function ComposerModal({open, onOpenChange}: TProps) {
  const location = useLocation();
  const navigate = useNavigate();
  useCompositionTrigger(() => navigate("/composition"));
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex gap-0 h-full rounded-lg p-0",
          "overflow-hidden",
          "min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]",
        )}
      >
        <VisuallyHidden.Root>
          <DialogDescription>Composer</DialogDescription>
          <DialogTitle>{location.pathname}</DialogTitle>
        </VisuallyHidden.Root>
        <ComposerNav />
        <div className="flex flex-col w-full h-full">
          <h1 className="p-4 capitalize border-b">
            <Header location={location} />
          </h1>
          <Routes>
            <Route path="/collection" element={<Collection />} />
            <Route path="/composition" element={<Composition />} />
            <Route path="/labels" element={<div>Labels</div>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </DialogContent>
    </Dialog>
  );
}
