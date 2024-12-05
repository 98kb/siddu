import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {Route, Routes, useLocation} from "react-router-dom";
import {CollectionPage} from "~/pages/collection/pages/CollectionPage";
import {cn} from "~/lib/utils";
import {Composition} from "~/pages/composition/pages/Composition";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {MarketplacePage} from "~/pages/marketplace/page/Marketplace";
import {SettingsPage} from "~/pages/settings/pages/SettingsPage";
import {Navbar} from "~/pages/app/features/Navbar";
import {Close} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import {useComposer} from "../hooks/useComposer";
import {useEffect} from "react";

export function ComposerModal() {
  const location = useLocation();
  const {isOpen, setIsOpen} = useComposer();
  useEffect(() => {
    setIsOpen(location.pathname !== "/");
  }, [location, setIsOpen]);
  return (
    <>
      <Navbar />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "flex gap-0 h-full rounded-lg p-0",
            "overflow-hidden",
            "min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]",
          )}
        >
          <VisuallyHidden.Root>
            <DialogDescription>Composer</DialogDescription>
          </VisuallyHidden.Root>
          <div className="flex flex-col w-full h-full">
            <h1 className="p-4 capitalize">
              <DialogTitle>{location.pathname}</DialogTitle>
            </h1>
            <Routes>
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/composition" element={<Composition />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
          <Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={close}
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Close>
        </DialogContent>
      </Dialog>
    </>
  );
}
