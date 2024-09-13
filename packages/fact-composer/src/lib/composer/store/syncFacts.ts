import {facts} from "./facts";
import type {FactsService} from "@repo/facts-service";

export const syncFacts = (db: FactsService) => () => {
  const fetchFacts = async () => facts.set(await db.facts.getAll());
  return db.facts.onMutation(fetchFacts).unsubscribe;
};
