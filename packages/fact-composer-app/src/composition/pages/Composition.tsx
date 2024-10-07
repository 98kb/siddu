import {Fact} from "@repo/facts-db";
import {Button} from "~/components/ui/button";
import {FactList} from "../features/FactList";
import {Textarea} from "~/components/ui/textarea";
import {useAtom} from "jotai";
import {compositionAtom} from "../stores/compositionAtom";
import {useCallback} from "react";

export function Composition() {
  const {composition, setComposition, appendComposition} = useComposition();
  return (
    <div className="flex h-full gap-4 @container px-4">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end">
          <Button>OK</Button>
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
    ({content}: Fact) =>
      setComposition($composition =>
        [$composition, content].filter(Boolean).join("\n"),
      ),
    [setComposition],
  );
  return {composition, setComposition, appendComposition} as const;
}
