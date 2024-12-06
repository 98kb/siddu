import {useEffect} from "react";
import {useNavbar} from "../hooks/useNavbar";
import {Reader} from "fp-ts/lib/Reader";
import {useSetAtom} from "jotai";
import {inputElAtom} from "../stores/inputElAtom";
import {isInputable} from "~/lib/isInputable";

type TProps = {
  children: React.ReactNode;
};

export default function ShowNavbarOnInputFocus({children}: TProps) {
  const {show} = useNavbar();
  const setInput = useSetAtom(inputElAtom);

  useEffect(() => {
    const emitFocusSignal: Reader<FocusEvent, void> = event => {
      const el = event.target as HTMLElement;
      if (isInputable(el) && document.contains(el)) {
        setInput(event.target as HTMLElement);
        show();
      }
    };
    document.addEventListener("focusin", emitFocusSignal);
    return () => document.removeEventListener("focusin", emitFocusSignal);
  }, [show]);

  return children;
}
