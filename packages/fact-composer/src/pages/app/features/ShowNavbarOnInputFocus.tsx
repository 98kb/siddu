import {useEffect} from "react";
import {useNavbar} from "../hooks/useNavbar";
import {Reader} from "fp-ts/lib/Reader";
import {useSetAtom} from "jotai";
import {inputElAtom} from "../stores/inputElAtom";
import {rootId} from "~/const/rootId";
import {identity, LazyArg, pipe} from "fp-ts/lib/function";
import {filter, fold, fromNullable} from "fp-ts/lib/Option";

type TProps = {
  children: React.ReactNode;
};

export default function ShowNavbarOnInputFocus({children}: TProps) {
  const {show} = useNavbar();
  const setInput = useSetAtom(inputElAtom);

  useEffect(() => {
    const emitFocusSignal: Reader<FocusEvent, void> = event => {
      pipe(
        fromNullable(document.getElementById(rootId)),
        filter(rootEl => !rootEl.contains(event.target as HTMLElement)),
        fold(identity as LazyArg<void>, () => {
          setInput(event.target as HTMLElement);
          show();
        }),
      );
    };
    document.addEventListener("focusin", emitFocusSignal);
    return () => document.removeEventListener("focusin", emitFocusSignal);
  }, [show]);

  return children;
}
