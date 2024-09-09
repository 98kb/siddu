import {FactsDB} from "@repo/facts-db/dist/FactsDB";
import {createCrudRouter} from "./lib/createCrudRouter";
import {router} from "./lib/trpc";

export const createRouter = (db: FactsDB) =>
  router({facts: createCrudRouter(db.facts)});
