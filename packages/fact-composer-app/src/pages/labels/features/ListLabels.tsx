import {Label} from "@repo/facts-db";
import {useEffect, useState} from "react";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {LabelsTable} from "../organism/LabelsTable";

export function ListLabels() {
  const db = useFactsDb();
  const [labels, setLabels] = useState<Label[]>([]);
  useEffect(() => {
    db?.labels.getAll().then(setLabels);
  }, [db]);

  return (
    <LabelsTable
      labels={labels}
      onDelete={async labelId => {
        await db?.labels.delete(labelId);
        await db?.labels.getAll().then(setLabels);
      }}
    />
  );
}
