import {useFactsDb} from "~/db/hooks/useFactsDb";
import {LabelsTable} from "../organism/LabelsTable";
import {useLabels} from "../hooks/useLabels";

export function ListLabels() {
  const db = useFactsDb();
  const {labels} = useLabels();

  return (
    <LabelsTable
      labels={labels}
      onDelete={async labelId => {
        await db?.labels.softDelete(labelId);
      }}
    />
  );
}
