import {Dialog, DialogContent, DialogDescription} from "~/components/ui/dialog";
import {ComposerNav} from "./ComposerNav";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Collection} from "~/collection/pages/Collection";
import {cn} from "~/lib/utils";
import {Header} from "../components/Header";
import {Composition} from "~/composition/pages/Composition";
import {useCompositionTrigger} from "../hooks/useCompositionTrigger";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useSetAtom} from "jotai";
import {inputElAtom} from "../stores/inputElAtom";
import {useComposer} from "../hooks/useComposer";
import {useAddFactTrigger} from "../hooks/useAddFactTrigger";
import {MarketplacePage} from "~/marketplace/page/Marketplace";

export function ComposerModal() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useComposer();
  useCompositionTriggerHandler();
  useAddFactTrigger();
  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
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
            <Route path="/composition/labels" element={<div>Labels</div>} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function useCompositionTriggerHandler() {
  const navigate = useNavigate();
  const setInputEl = useSetAtom(inputElAtom);
  useCompositionTrigger(event => {
    setInputEl(event.target as HTMLTextAreaElement);
    navigate("/composition");
  });
}
