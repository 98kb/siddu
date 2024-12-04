import {useSetAtom} from "jotai";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {selectedFactAtom} from "~/pages/collection/stores/selectedFactAtom";
import {useReceiver} from "~/lib/messaging/hooks/useReceiver";
import {isModalOpenAtom} from "./useComposer";
import {useCollection} from "~/pages/collection/hooks/useCollection";

export function useAddFactTrigger() {
  const navigate = useNavigate();
  const setFact = useSetAtom(selectedFactAtom);
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const collection = useCollection();
  const handleAddFactRequest = useCallback(
    async (content: string) => {
      const fact = await collection?.facts.create.mutate({content, labels: []});
      setFact(fact);
      setIsModalOpen(true);
      navigate("/collection");
    },
    [collection, navigate, setFact, setIsModalOpen],
  );
  useReceiver("addFact", handleAddFactRequest);
}
