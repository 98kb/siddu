import {Reader} from "fp-ts/lib/Reader";
import {useEffect, useState} from "react";
import {Textarea} from "~/components/ui/textarea";
import {createDebounce} from "~/lib/createDebounce";
import type {FactSchema, InsertFactSchema} from "@repo/collection-service-defs";

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

  return (
    <Textarea
      autoFocus
      borderless
      className="w-full pb-4 px-1 min-h-[120px] grow"
      placeholder="Add a Fact..."
      value={content}
      onInput={updateContent}
    />
  );
}
