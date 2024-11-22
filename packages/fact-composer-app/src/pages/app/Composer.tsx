import {IAuthService} from "@repo/chrome-auth-service";
import {MemoryRouter} from "react-router-dom";
import {ComposerModal} from "./features/ComposerModal";
import {useCompositionTrigger} from "./hooks/useCompositionTrigger";
import {useSetAtom} from "jotai";
import {compositionAtom} from "~/pages/composition/stores/compositionAtom";
import {useComposer} from "./hooks/useComposer";
import {AuthContext} from "~/auth/AuthContext";
import {BackupClient} from "@repo/facts-db-backup";
import {BackupContext} from "~/db/context/BackupContext";
import {TooltipProvider} from "~/components/ui/tooltip";
import {CollectionClient} from "@repo/collection-service-trpc-factory";
import {CollectionContext} from "../collection/context/CollectionContext";

type TProps = {
  auth?: IAuthService;
  backup?: BackupClient;
  collection?: CollectionClient;
};

export function Composer({auth, backup, collection}: TProps) {
  const [isOpen, setIsOpen] = useComposer();
  const setComposition = useSetAtom(compositionAtom);
  useCompositionTrigger(() => {
    setComposition("");
    setIsOpen(true);
  });
  return (
    <AuthContext.Provider value={auth}>
      <BackupContext.Provider value={backup}>
        <CollectionContext.Provider value={collection}>
          <TooltipProvider>
            <MemoryRouter>
              <ComposerModal open={isOpen} onOpenChange={setIsOpen} />
            </MemoryRouter>
          </TooltipProvider>
        </CollectionContext.Provider>
      </BackupContext.Provider>
    </AuthContext.Provider>
  );
}
