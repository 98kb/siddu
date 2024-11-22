import {FactEditor} from "../components/FactEditor";
import {useCallback, useEffect, useState} from "react";
import {FactEditorToolbar} from "../components/FactEditorToolbar";
import {IO} from "fp-ts/lib/IO";
import {Reader} from "fp-ts/lib/Reader";
import {useFactActions} from "../hooks/useFactActions";
import type {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";

type TProps = {
  fact: FactSchema | InsertFactSchema;
  onChange: Reader<FactSchema | InsertFactSchema, void>;
  onClose: IO<void>;
};

export function SaveFact({fact: factProp, onChange, onClose}: TProps) {
  const {createFact, updateFact, archiveFact} = useFactActions();
  const [fact, setFact] = useState(factProp);
  useEffect(() => {
    setFact(factProp);
  }, [factProp]);

  const saveOrUpdateFact = useCallback(
    async (fact: FactSchema | InsertFactSchema) => {
      if ("_id" in fact) {
        await updateFact(fact);
        onChange(fact);
      } else {
        const insertedFact = await createFact(fact);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        insertedFact && onChange(insertedFact);
      }
      setFact(fact);
    },
    [onChange, createFact, updateFact],
  );

  return (
    <div className="flex flex-col h-full">
      <FactEditorToolbar
        fact={fact}
        onArchive={archiveFact}
        onClose={onClose}
        onChange={saveOrUpdateFact}
      />
      <FactEditor fact={fact} onChange={saveOrUpdateFact} />
    </div>
  );
}
