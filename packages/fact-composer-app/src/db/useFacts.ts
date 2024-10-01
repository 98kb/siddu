import {Fact} from "@repo/facts-db";
import {useCallback, useEffect, useState} from "react";
import {useFactsDb} from "./useFactsDb";

export function useFacts() {
  const db = useFactsDb();
  const [facts, setFacts] = useState<Fact[]>([]);
  const [cacheBuster, setCacheBuster] = useState("");
  useEffect(() => {
    db?.facts.getAll().then(setFacts);
  }, [db, cacheBuster]);

  const deleteFact = useCallback(
    (fact: Fact) => {
      db?.facts.delete(fact.id).then(() => {
        setCacheBuster(Date.now().toString());
      });
    },
    [db],
  );
  return {facts, deleteFact};
}
