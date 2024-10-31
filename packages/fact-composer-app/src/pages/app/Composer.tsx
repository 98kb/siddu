import {DbClient} from "@repo/facts-db";
import {IAuthService} from "@repo/chrome-auth-service";
import {MemoryRouter} from "react-router-dom";
import {FactsDbContext} from "~/db/context/FactsDbContext";
import {ComposerModal} from "./features/ComposerModal";
import {useCompositionTrigger} from "./hooks/useCompositionTrigger";
import {useSetAtom} from "jotai";
import {compositionAtom} from "~/pages/composition/stores/compositionAtom";
import {useComposer} from "./hooks/useComposer";
import {AuthContext} from "~/auth/AuthContext";
import {BackupClient} from "@repo/facts-db-backup";
import {BackupContext} from "~/db/context/BackupContext";

type TProps = {
  db: DbClient;
  auth?: IAuthService;
  backup?: BackupClient;
};

export function Composer({auth, backup, db}: TProps) {
  const [isOpen, setIsOpen] = useComposer();
  const setComposition = useSetAtom(compositionAtom);
  useCompositionTrigger(() => {
    setComposition("");
    setIsOpen(true);
  });
  return (
    <AuthContext.Provider value={auth}>
      <FactsDbContext.Provider value={db}>
        <BackupContext.Provider value={backup}>
          <MemoryRouter>
            <ComposerModal open={isOpen} onOpenChange={setIsOpen} />
          </MemoryRouter>
        </BackupContext.Provider>
      </FactsDbContext.Provider>
    </AuthContext.Provider>
  );
}
