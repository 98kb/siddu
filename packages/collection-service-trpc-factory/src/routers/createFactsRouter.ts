import {
  FactSchema,
  FactsQuerySchema,
  type IFactsRepository,
  InsertFactSchema,
  PaginatedFacts,
  UpdateFactSchema,
} from "@repo/collection-service-defs";
import {getItem} from "../middleware/getItem";
import {publicProcedure, router} from "../lib/trpc";

export const createFactsRouter = (facts: IFactsRepository) =>
  router({
    create: publicProcedure
      .input(InsertFactSchema)
      .output(FactSchema)
      .mutation(async ({input}) => facts.create(input)),
    get: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .output(FactSchema)
      .use(getItem(facts))
      .query(({ctx}) => ctx.item as FactSchema),
    update: publicProcedure
      .input(UpdateFactSchema)
      .output(FactSchema)
      .mutation(
        async ({input: {_id, ...changes}}) => facts.update(_id, changes) as any,
      ),
    delete: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .mutation(({input}) => facts.delete(input._id)),
    list: publicProcedure
      .input(FactsQuerySchema)
      .output(FactSchema.array())
      .query(({input}) => facts.list(input)),
    paginatedList: publicProcedure
      .input(FactsQuerySchema)
      .output(PaginatedFacts)
      .query(({input}) => facts.paginatedList(input)),
    softDelete: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .mutation(({input}) =>
        facts.update(input._id, {deletedAt: Date.now(), isDeleted: true}),
      ),
    restore: publicProcedure
      .input(FactSchema.pick({_id: true}))
      .mutation(({input}) => facts.update(input._id, {isDeleted: false})),
  });
