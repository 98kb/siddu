import {Fact, InsertFact} from "@repo/facts-db";
import {FactEditor} from "../components/FactEditor";
import {useFactsDb} from "~/db/useFactsDb";
import {useEffect, useState} from "react";
import {FactEditorToolbar} from "../components/FactEditorToolbar";
import {IO} from "fp-ts/lib/IO";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  fact: Fact | InsertFact;
  onChange: Reader<Fact | InsertFact, void>;
  onClose: IO<void>;
};

export function SaveFact({fact: factProp, onChange, onClose}: TProps) {
  const [fact, setFact] = useState(factProp);
  useEffect(() => {
    setFact(factProp);
  }, [factProp]);
  const db = useFactsDb();

  // eslint-disable-next-line complexity
  const saveOrUpdateFact = async (fact: Fact | InsertFact) => {
    if ("id" in fact) {
      await db?.facts.put(fact.id, fact);
      onChange(fact);
    } else {
      const insertedFact = await db?.facts.add(fact);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      insertedFact && onChange(insertedFact);
    }
    setFact(fact);
  };

  return (
    <div className="flex flex-col">
      <FactEditorToolbar
        fact={fact}
        onArchive={factId => db?.facts.delete(factId)}
        onClose={onClose}
        onChange={saveOrUpdateFact}
      />
      <FactEditor fact={fact} onChange={saveOrUpdateFact} />;
    </div>
  );
}
