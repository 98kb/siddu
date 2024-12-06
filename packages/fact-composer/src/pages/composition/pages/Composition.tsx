import {Button} from "~/components/ui/button";
import {FactList} from "../features/FactList";
import {Textarea} from "~/components/ui/textarea";
import {useAtomValue} from "jotai";
import {inputElAtom} from "~/pages/app/stores/inputElAtom";
import {appendToInput} from "~/pages/app/appendToInput";
import {useComposition} from "../hooks/useComposition";
import {useComposer} from "~/pages/app/hooks/useComposer";
import {InputLabel} from "../components/InputLabel";

export function Composition() {
  const inputEl = useAtomValue(inputElAtom);
  const {composition, setComposition, appendComposition} = useComposition();
  const submit = useCompositionSubmit(composition);
  return (
    <div className="flex h-full gap-4 @container px-4">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between">
          {inputEl && (
            <>
              <InputLabel el={inputEl} className="text-sm text-gray-500" />
              <Button onClick={submit}>Paste</Button>
            </>
          )}
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

function useCompositionSubmit(composition: string) {
  const inputEl = useAtomValue(inputElAtom);
  const {closeComposer} = useComposer();
  return () => {
    if (inputEl) {
      appendToInput(composition, inputEl);
      closeComposer();
    }
  };
}
