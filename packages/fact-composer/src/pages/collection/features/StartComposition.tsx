import {FactSchema} from "@repo/collection-service-defs";
import {PencilRulerIcon} from "lucide-react";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {IconButton} from "~/components/IconButton";
import {useComposition} from "~/pages/composition/hooks/useComposition";

type TProps = {
  fact: FactSchema;
};

export function StartComposition({fact}: TProps) {
  const {startComposition} = useStartComposition(fact);
  return (
    <IconButton tooltip="Compose" onClick={startComposition} size="icon">
      <PencilRulerIcon className="h-4 w-4" />
    </IconButton>
  );
}

function useStartComposition(fact: FactSchema) {
  const navigate = useNavigate();
  const {setComposition} = useComposition();
  const startComposition = useCallback(() => {
    setComposition(fact.content);
    navigate("/composition");
  }, [setComposition, navigate, fact]);
  return {startComposition};
}
