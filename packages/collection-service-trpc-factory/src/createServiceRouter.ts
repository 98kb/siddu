import {createFactsRouter} from "./routers/createFactsRouter";
import {createLabelsRouter} from "./routers/createLabelsRouter";
import {router} from "./lib/trpc";
import type {
  IFactsRepository,
  ILabelsRepository,
} from "@repo/collection-service-defs";

export const createServiceRouter = (
  facts: IFactsRepository,
  labels: ILabelsRepository,
) =>
  router({
    facts: createFactsRouter(facts),
    labels: createLabelsRouter(labels),
  });
