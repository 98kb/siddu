import {Label} from "@repo/facts-db";
import {useEffect, useState} from "react";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {LabelsTable} from "../features/LabelsTable";

export function LabelsPage() {
  const db = useFactsDb();
  const [labels, setLabels] = useState<Label[]>([]);
  useEffect(() => {
    db?.labels.getAll().then(setLabels);
  }, [db]);

  return <LabelsTable labels={labels} />;
}
