import {Reader} from "fp-ts/lib/Reader";
import {useCallback, useEffect, useState} from "react";
import {Textarea} from "~/components/ui/textarea";
import {LabelsEditor} from "~/pages/labels/components/LabelsEditor";
import {createDebounce} from "~/lib/createDebounce";
import type {
  FactSchema,
  InsertFactSchema,
  LabelSchema,
} from "@repo/collection-service-defs";

type TProps = {
  fact: FactSchema | InsertFactSchema;
  onChange: Reader<FactSchema | InsertFactSchema, void>;
};

const debounce = createDebounce(300);

export function FactEditor({fact, onChange}: TProps) {
  const [content, setContent] = useState(fact.content);
  useEffect(() => {
    setContent(fact.content);
  }, [fact.content]);

  const updateContent = ({
    currentTarget,
  }: React.FormEvent<HTMLTextAreaElement>) => {
    const $content = currentTarget.value;
    setContent($content);
    debounce(() => onChange({...fact, content: $content}));
  };
  const updateLabels = useCallback(
    (labels: LabelSchema[]) => onChange({...fact, labels}),
    [onChange, fact],
  );

  return (
    <div className="flex flex-col w-full grow gap-4">
      <div className="flex gap-2 flex-wrap pt-2">
        <LabelsEditor labels={fact.labels} onChange={updateLabels} />
      </div>
      <Textarea
        autoFocus
        borderless
        className="w-full pb-4 px-1 min-h-[120px] grow"
        placeholder="Add a Fact..."
        value={content}
        onInput={updateContent}
      />
    </div>
  );
}
