import {DbClient} from "@repo/facts-db";
import {useContext} from "react";
import {FactsDbContext} from "~/context/FactsDbContext";

export function useFactsDb() {
  const db = useContext(FactsDbContext);
  return db as DbClient;
}
