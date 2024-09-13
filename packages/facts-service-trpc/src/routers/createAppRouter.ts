import {FactsService} from "@repo/facts-service";
import {createFactsRouter} from "./createFactsRouter";
import {router} from "../lib/trpc";

export const createAppRouter = (db: FactsService) =>
  router({facts: createFactsRouter(db.facts)});
