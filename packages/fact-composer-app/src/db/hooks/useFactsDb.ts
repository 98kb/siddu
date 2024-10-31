import {useContext} from "react";
import {FactsDbContext} from "~/db/context/FactsDbContext";

export function useFactsDb() {
  const db = useContext(FactsDbContext);
  return db;
}
