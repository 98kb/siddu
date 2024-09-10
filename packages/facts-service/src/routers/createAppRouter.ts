import {FactsDB} from "@repo/facts-db/dist/FactsDB";
import {createFactsRouter} from "./createFactsRouter";
import {router} from "../lib/trpc";

export const createAppRouter = (db: FactsDB) =>
  router({facts: createFactsRouter(db.facts)});
