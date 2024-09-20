import {DbClient} from "../../DbClient";
import {createCollectionsRouter} from "./createCollectionsRouter";
import {createFactsRouter} from "./createFactsRouter";
import {router} from "../lib/trpc";

export const createAppRouter = (db: DbClient) =>
  router({
    facts: createFactsRouter(db.facts),
    collections: createCollectionsRouter(db.collections),
  });
