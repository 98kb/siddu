import {Button} from "~/components/ui/button";
import {FactList} from "../features/FactList";
import {Textarea} from "~/components/ui/textarea";
import {useAtom, useAtomValue} from "jotai";
import {compositionAtom} from "../stores/compositionAtom";
import {useCallback} from "react";
import {inputElAtom} from "~/pages/app/stores/inputElAtom";
import {appendToInput} from "~/pages/app/appendToInput";
import {FactSchema} from "@repo/collection-service-defs";

export function Composition() {
  const {composition, setComposition, appendComposition} = useComposition();
  const submit = useCompositionSubmit(composition);
  return (
    <div className="flex h-full gap-4 @container px-4">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end">
          <Button onClick={submit}>OK</Button>
        </div>
        <Textarea
          borderless
          className="w-full flex-grow"
          placeholder="Type or select a fact to start composing..."
          value={composition}
          onInput={e => setComposition(e.currentTarget.value)}
        />
      </div>
      <div className="w-full @lg:w-9/12 h-full py-2 px-3">
        <FactList onClick={appendComposition} />
      </div>
    </div>
  );
}

function useComposition() {
  const [composition, setComposition] = useAtom(compositionAtom);
  const appendComposition = useCallback(
    ({content}: FactSchema) =>
      setComposition($composition =>
        [$composition, content].filter(Boolean).join("\n"),
      ),
    [setComposition],
  );
  return {composition, setComposition, appendComposition} as const;
}

function useCompositionSubmit(composition: string) {
  const inputEl = useAtomValue(inputElAtom);
  return () => {
    if (inputEl) {
      appendToInput(composition, inputEl);
    }
  };
}
