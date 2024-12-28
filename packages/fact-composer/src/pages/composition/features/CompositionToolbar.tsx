import {Button} from "~/components/ui/button";
import {InputLabel} from "../components/InputLabel";
import {InputElement} from "~/types/InputElement";
import {useCallback, useState} from "react";
import {CopyCheckIcon, CopyIcon} from "lucide-react";
import {IconButton} from "~/components/IconButton";

type TProps = {
  inputEl: InputElement;
  composition: string;
};

export function CompositionToolbar({inputEl, composition}: TProps) {
  return (
    <div className="flex justify-between items-center px-3">
      <InputLabel
        el={inputEl}
        className="text-sm text-gray-500 font-semibold"
      />
      <CopyButton text={composition} />
    </div>
  );
}

function CopyButton({text}: {text: string}) {
  const [isCopied, setIsCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, [text]);
  const Icon = isCopied ? CopyCheckIcon : CopyIcon;
  return (
    <span className="inline-flex items-center gap-2">
      {isCopied && <span className="text-sm text-gray-500">Copied</span>}
      <IconButton variant="outline" size="icon-md" onClick={copy}>
        <Icon />
      </IconButton>
    </span>
  );
}
