import {Fact, InsertFact, Label} from "@repo/facts-db";
import {Reader} from "fp-ts/lib/Reader";
import {useEffect, useState} from "react";
import {Textarea} from "~/components/ui/textarea";
import {LabelsEditor} from "~/labels/components/LabelsEditor";
import {createDebounce} from "~/lib/createDebounce";

type TProps = {
  fact: Fact | InsertFact;
  onChange: Reader<Fact | InsertFact, void>;
};

const debounce = createDebounce(300);

export function FactEditor({fact, onChange}: TProps) {
  const [content, setContent] = useState(fact.content);
  useEffect(() => {
    setContent(fact.content);
  }, [fact.content]);

  const updateContent = (content: string) => {
    setContent(content);
    debounce(() => onChange({...fact, content}));
  };
  const updateLabels = (labels: Label[]) => onChange({...fact, labels});

  return (
    <div className="flex flex-col w-full h-full gap-4 px-3 py-4">
      <div className="flex gap-2 flex-wrap">
        <LabelsEditor labels={fact.labels} onChange={updateLabels} />
      </div>
      <Textarea
        autoFocus
        borderless
        className="w-full py-4 px-1 min-h-[120px] grow"
        placeholder="Add a Fact..."
        value={content}
        onInput={e => updateContent(e.currentTarget.value)}
      />
    </div>
  );
}
