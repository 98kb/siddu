import {IAuthService} from "@repo/chrome-auth-service";
import {MemoryRouter} from "react-router-dom";
import {ComposerModal} from "./features/ComposerModal";
import {AuthContext} from "~/auth/AuthContext";
import {BackupClient} from "@repo/collection-service-dexie-backup";
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
  return (
    <AuthContext.Provider value={auth}>
      <BackupContext.Provider value={backup}>
        <CollectionContext.Provider value={collection}>
          <TooltipProvider>
            <MemoryRouter>
              <ComposerModal />
            </MemoryRouter>
          </TooltipProvider>
        </CollectionContext.Provider>
      </BackupContext.Provider>
    </AuthContext.Provider>
  );
}
