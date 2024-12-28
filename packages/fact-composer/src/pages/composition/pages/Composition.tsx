import {FactList} from "../features/FactList";
import {Textarea} from "~/components/ui/textarea";
import {useComposition} from "../hooks/useComposition";
import {CompositionToolbar} from "../features/CompositionToolbar";
import {useAtomValue} from "jotai";
import {inputElAtom} from "~/pages/app/stores/inputElAtom";

export function Composition() {
  const inputEl = useAtomValue(inputElAtom);
  const {composition, setComposition, appendComposition} = useComposition();
  return (
    <div className="flex h-full gap-4 @container px-4">
      <div className="flex flex-col gap-2 w-full h-full">
        <CompositionToolbar inputEl={inputEl} composition={composition} />
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
