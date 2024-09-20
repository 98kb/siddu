import {facts} from "./facts";
import type {DbClient} from "@repo/facts-db";

export const syncFacts = (db: DbClient) => () => {
  const fetchFacts = async () => facts.set(await db.facts.getAll());
  fetchFacts();
  return db.facts.onMutation(fetchFacts).unsubscribe;
};
