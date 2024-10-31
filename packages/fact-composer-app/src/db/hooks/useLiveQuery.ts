import {DbClient} from "@repo/facts-db";
import {Task} from "fp-ts/lib/Task";
import {useEffect, useState} from "react";
import {useFactsDb} from "./useFactsDb";

export function useLiveQuery<R, E extends keyof DbClient>(
  entity: E,
  query: Task<R[] | undefined>,
) {
  const db = useFactsDb();
  const [items, setItems] = useState<R[]>([]);
  useEffect(() => {
    query().then(items => setItems(items ?? []));
    const sub = db?.[entity].onMutation(async () => {
      setItems((await query()) ?? []);
    });
    return sub?.unsubscribe;
  }, [query, db, entity]);
  return items;
}
