import {
  FactSchema,
  FactsQuerySchema,
  type IFactsRepository,
  InsertFactSchema,
} from "@repo/collection-service-defs";
import {getItem} from "../middleware/getItem";
import {publicProcedure, router} from "../lib/trpc";
import {z} from "zod";

export const createFactsRouter = (facts: IFactsRepository) =>
  router({
    create: publicProcedure
      .input(InsertFactSchema)
      .output(FactSchema)
      .mutation(({input}) => facts.create(input)),
    get: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .output(FactSchema)
      .use(getItem(facts))
      .query(({ctx}) => ctx.item as FactSchema),
    update: publicProcedure
      .input(
        z.object({
          ...FactSchema.partial().shape,
          ...FactSchema.pick({_id: true}).shape,
        }),
      )
      .output(FactSchema)
      .mutation(({input: {_id, ...changes}}) => facts.update(_id, changes)),
    delete: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .mutation(({input}) => facts.delete(input._id)),
    list: publicProcedure
      .input(FactsQuerySchema)
      .output(FactSchema.array())
      .query(({input}) => facts.list(input)),
  });
