import {FactEditor} from "../components/FactEditor";
import {useCallback} from "react";
import {FactEditorToolbar} from "./FactEditorToolbar";
import {
  type FactSchema,
  type InsertFactSchema,
} from "@repo/collection-service-defs";
import {useSelectedFact} from "../hooks/useSelectedFacts";
import {
  LabelsEditor,
  TChangePayload,
} from "~/pages/labels/components/LabelsEditor";
import {useSaveOrUpdateFact} from "../hooks/useSaveOrUpdateFact";
import {useLabelsApi} from "~/pages/labels/hooks/useLabelsApi";

export function SaveFact() {
  const {deleteIfOrphan} = useLabelsApi();
  const {selectedFact, selectFact, clearSelectedFact} = useSelectedFact();
  const {saveOrUpdateFact} = useSaveOrUpdateFact();
  const saveFact = useCallback(
    async (fact: Partial<FactSchema | InsertFactSchema>) =>
      selectedFact &&
      selectFact(await saveOrUpdateFact({...selectedFact, ...fact})),
    [selectedFact, selectFact, saveOrUpdateFact],
  );
  const updateLabels = useCallback(
    async ({labels, removed}: TChangePayload) => {
      if (selectedFact) {
        await saveFact({labels});
        await deleteIfOrphan(removed);
        // TODO: emit signal
      }
    },
    [saveFact, selectedFact, deleteIfOrphan],
  );

  return (
    selectedFact && (
      <div className="flex flex-col h-full max-w-[25vw] min-w-[25vw] border-l p-3 pb-0">
        <FactEditorToolbar
          fact={selectedFact}
          onClose={clearSelectedFact}
          onChange={saveFact}
        />
        <div className="flex flex-col w-full grow gap-4">
          <div className="flex gap-2 flex-wrap pt-2">
            <LabelsEditor
              labels={selectedFact.labels}
              onChange={updateLabels}
            />
          </div>
          <FactEditor fact={selectedFact} onChange={saveFact} />
        </div>
      </div>
    )
  );
}
