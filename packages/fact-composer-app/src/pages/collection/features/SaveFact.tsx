import {FactEditor} from "../components/FactEditor";
import {useCallback} from "react";
import {FactEditorToolbar} from "./FactEditorToolbar";
import {
  type FactSchema,
  type InsertFactSchema,
} from "@repo/collection-service-defs";
import {useFactActions} from "../hooks/useFactActions";
import {useSelectedFact} from "../hooks/useSelectedFacts";
import {
  LabelsEditor,
  TChangePayload,
} from "~/pages/labels/components/LabelsEditor";
import {useLabelActions} from "~/pages/labels/hooks/useLabelActions";

export function SaveFact() {
  const {selectedFact, clearSelectedFact} = useSelectedFact();
  const {saveFact} = useSaveFact();
  const {updateLabels} = useUpdateFactLabels();

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

function useSaveFact() {
  const {selectedFact, setSelectedFact} = useSelectedFact();
  const {saveOrUpdateFact} = useFactActions();
  const saveFact = useCallback(
    async (fact: Partial<FactSchema | InsertFactSchema>) =>
      selectedFact &&
      setSelectedFact(await saveOrUpdateFact({...selectedFact, ...fact})),
    [selectedFact, setSelectedFact, saveOrUpdateFact],
  );
  return {
    saveFact,
  };
}

function useUpdateFactLabels() {
  const {removeIfOrphan} = useLabelActions();
  const {selectedFact} = useSelectedFact();
  const {saveFact} = useSaveFact();
  const updateLabels = useCallback(
    async ({labels, removed}: TChangePayload) => {
      if (selectedFact) {
        await saveFact({labels});
        await removeIfOrphan(removed);
      }
    },
    [saveFact, selectedFact, removeIfOrphan],
  );
  return {updateLabels};
}
