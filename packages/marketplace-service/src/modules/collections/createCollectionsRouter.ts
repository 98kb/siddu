import {CollectionService} from "./services/CollectionService";
import {publicProcedure} from "@repo/facts-db";
import {router} from "../../lib/trpc";

const collections = new CollectionService();

export const createCollectionsRouter = () =>
  router({
    list: publicProcedure.query(() => collections.list()),
  });
