import {useContext} from "react";
import {FactsDbContext} from "~/context/FactsDbContext";

export function useFactsDb() {
  const db = useContext(FactsDbContext);
  return db;
}
