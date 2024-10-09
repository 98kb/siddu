import {createCollectionsRouter} from "./modules/collections/createCollectionsRouter";
import {router} from "./lib/trpc";

export const createAppRouter = () =>
  router({
    collections: createCollectionsRouter(),
  });
