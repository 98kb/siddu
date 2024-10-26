import {DbClient} from "@repo/facts-db";
import {AuthClient} from "@repo/chrome-auth-service";
import {MemoryRouter} from "react-router-dom";
import {FactsDbContext} from "~/context/FactsDbContext";
import {ComposerModal} from "./features/ComposerModal";
import {useCompositionTrigger} from "./hooks/useCompositionTrigger";
import {useSetAtom} from "jotai";
import {compositionAtom} from "~/composition/stores/compositionAtom";
import {useComposer} from "./hooks/useComposer";
import {AuthContext} from "~/auth/AuthContext";

type TProps = {
  db: DbClient;
  auth?: AuthClient;
};

export function Composer({auth, db}: TProps) {
  const [isOpen, setIsOpen] = useComposer();
  const setComposition = useSetAtom(compositionAtom);
  useCompositionTrigger(() => {
    setComposition("");
    setIsOpen(true);
  });
  return (
    <AuthContext.Provider value={auth}>
      <FactsDbContext.Provider value={db}>
        <MemoryRouter>
          <ComposerModal open={isOpen} onOpenChange={setIsOpen} />
        </MemoryRouter>
      </FactsDbContext.Provider>
    </AuthContext.Provider>
  );
}
