import {FactEditor} from "../components/FactEditor";
import {useCallback} from "react";
import {FactEditorToolbar} from "./FactEditorToolbar";
import type {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";
import {useFactActions} from "../hooks/useFactActions";
import {useSelectedFact} from "../hooks/useSelectedFacts";

export function SaveFact() {
  const {saveOrUpdateFact} = useFactActions();
  const {selectedFact, clearSelectedFact, setSelectedFact} = useSelectedFact();
  const onSave = useCallback(
    async (fact: FactSchema | InsertFactSchema) => {
      const savedFact = await saveOrUpdateFact(fact);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      savedFact && setSelectedFact(savedFact);
    },
    [setSelectedFact, saveOrUpdateFact],
  );

  return (
    selectedFact && (
      <div className="flex flex-col h-full max-w-[25vw] min-w-[25vw] border-l p-3 pb-0">
        <FactEditorToolbar
          fact={selectedFact}
          onClose={clearSelectedFact}
          onChange={onSave}
        />
        <FactEditor fact={selectedFact} onChange={onSave} />
      </div>
    )
  );
}
