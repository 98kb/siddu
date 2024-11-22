import {LabelsTable} from "../organism/LabelsTable";
import {useLabelsQuery} from "../hooks/useLabelsQuery";
import {useLabelActions} from "../hooks/useLabelActions";

export function ListLabels() {
  const {softDeleteLabel} = useLabelActions();
  const {labels} = useLabelsQuery();

  return <LabelsTable labels={labels} onDelete={softDeleteLabel} />;
}
