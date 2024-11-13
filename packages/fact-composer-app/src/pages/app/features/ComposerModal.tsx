import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {ComposerNav} from "./ComposerNav";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {CollectionPage} from "~/pages/collection/pages/CollectionPage";
import {cn} from "~/lib/utils";
import {Header} from "../components/Header";
import {Composition} from "~/pages/composition/pages/Composition";
import {useCompositionTrigger} from "../hooks/useCompositionTrigger";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {useSetAtom} from "jotai";
import {inputElAtom} from "../stores/inputElAtom";
import {useAddFactTrigger} from "../hooks/useAddFactTrigger";
import {MarketplacePage} from "~/pages/marketplace/page/Marketplace";
import {ComponentProps} from "react";
import {SettingsPage} from "~/pages/settings/pages/SettingsPage";
import {FactsPage} from "~/pages/collection/pages/FactsPage";
import {ListLabels} from "~/pages/labels/features/ListLabels";

type TProps = ComponentProps<typeof Dialog>;

export function ComposerModal(props: TProps) {
  const location = useLocation();
  useCompositionTriggerHandler();
  useAddFactTrigger();
  return (
    <Dialog modal {...props}>
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
            <Route path="/collection" element={<CollectionPage />}>
              <Route index element={<FactsPage />} />
              <Route path="labels" element={<ListLabels />} />
            </Route>
            <Route path="/composition" element={<Composition />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/settings" element={<SettingsPage />} />
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
