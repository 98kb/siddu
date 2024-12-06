import {Reader} from "fp-ts/lib/Reader";
import {ComponentProps} from "react";

type TProps = ComponentProps<"span"> & {
  el: HTMLTextAreaElement | HTMLInputElement | HTMLElement | null;
};

export function InputLabel({el, ...props}: TProps) {
  const label =
    getLabelQueries
      .map(query => query(el))
      .filter(Boolean)
      .at(0) ?? document.title;
  return <span {...props}>{label}</span>;
}

const getLabelQueries: Reader<
  HTMLTextAreaElement | HTMLInputElement | HTMLElement | null,
  string | undefined | null
>[] = [
  el => el?.getAttribute("aria-label"),
  // eslint-disable-next-line complexity
  el => {
    const elId = el?.getAttribute("id");
    if (elId) {
      return document.querySelector(`label[for=${elId}]`)?.textContent;
    }
  },
  // eslint-disable-next-line complexity
  el => el?.parentElement?.querySelector("label")?.textContent,
  el => el?.getAttribute("placeholder"),
  el => el?.getAttribute("name"),
];
