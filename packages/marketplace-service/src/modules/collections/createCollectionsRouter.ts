import {Collection} from "./models/Collection";
import {CollectionSchema} from "./schemas/CollectionSchema";
import {publicProcedure} from "@repo/facts-db";
import {router} from "../../lib/trpc";
import {z} from "zod";

export const createCollectionsRouter = () =>
  router({
    list: publicProcedure.output(z.array(CollectionSchema)).query(() => {
      return Collection.find();
    }),
  });
