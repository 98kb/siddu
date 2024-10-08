import {DbClient} from "@repo/facts-db";
import {MemoryRouter} from "react-router-dom";
import {FactsDbContext} from "~/context/FactsDbContext";
import {ComposerModal} from "./features/ComposerModal";
import {useState} from "react";
import {useCompositionTrigger} from "./hooks/useCompositionTrigger";

type TProps = {
  db: DbClient;
};

export function Composer({db}: TProps) {
  const [isOpen, setIsOpen] = useState(false);
  useCompositionTrigger(() => setIsOpen(true));
  return (
    <FactsDbContext.Provider value={db}>
      <MemoryRouter>
        <ComposerModal open={isOpen} onOpenChange={setIsOpen} />
      </MemoryRouter>
    </FactsDbContext.Provider>
  );
}
