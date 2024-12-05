import {useEffect} from "react";
import {useNavbar} from "../hooks/useNavbar";
import {Reader} from "fp-ts/lib/Reader";
import {flow} from "fp-ts/lib/function";
import {filter, fold, of} from "fp-ts/lib/Option";
import {isInputable} from "~/lib/isInputable";

type TProps = {
  children: React.ReactNode;
};
export default function ShowNavbarOnInputFocus({children}: TProps) {
  const {show} = useNavbar();

  useEffect(() => {
    const showIfInputable: Reader<FocusEvent, void> = flow(
      event => of(event.target as HTMLElement),
      filter(isInputable),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fold(() => {}, show),
    );
    document.addEventListener("focusin", showIfInputable);
    return () => document.removeEventListener("focusin", showIfInputable);
  }, [show]);

  return children;
}
