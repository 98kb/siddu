import {useSetAtom} from "jotai";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {selectedFactAtom} from "~/collection/stores/selectedFactAtom";
import {useReceiver} from "~/lib/messaging/hooks/useReceiver";
import {isModalOpenAtom} from "./useComposer";
import {useFactsDb} from "~/db/useFactsDb";

export function useAddFactTrigger() {
  const navigate = useNavigate();
  const setFact = useSetAtom(selectedFactAtom);
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const db = useFactsDb();
  const handleAddFactRequest = useCallback(
    async (content: string) => {
      const fact = await db?.facts.add({content, labels: []});
      setFact(fact);
      setIsModalOpen(true);
      navigate("/collection");
    },
    [navigate, setFact, setIsModalOpen, db],
  );
  useReceiver("addFact", handleAddFactRequest);
}
