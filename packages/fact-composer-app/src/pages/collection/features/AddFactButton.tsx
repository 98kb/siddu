import {useSetAtom} from "jotai";
import {PlusIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {selectedFactAtom} from "../stores/selectedFactAtom";
import {ComponentProps} from "react";

type TProps = Exclude<ComponentProps<typeof Button>, "onClick">;

export function AddFactButton(props: TProps) {
  const setSelectedFact = useSetAtom(selectedFactAtom);
  return (
    <Button
      onClick={() => setSelectedFact({content: "", labels: []})}
      {...props}
    >
      <div className="inline-flex gap-1 items-center justify-center">
        <PlusIcon size="15" />
        <span>Add Fact</span>
      </div>
    </Button>
  );
}
