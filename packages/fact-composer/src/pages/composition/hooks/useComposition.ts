import {useAtom} from "jotai";
import {compositionAtom} from "../stores/compositionAtom";
import {useCallback} from "react";
import {FactSchema} from "@repo/collection-service-defs";

export function useComposition() {
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
