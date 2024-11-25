import {
  type ILabelsRepository,
  InsertLabelSchema,
  LabelSchema,
  LabelsQuerySchema,
  PaginatedLabels,
} from "@repo/collection-service-defs";
import {getItem} from "../middleware/getItem";
import {publicProcedure, router} from "../lib/trpc";
import {z} from "zod";

export const createLabelsRouter = (labels: ILabelsRepository) =>
  router({
    create: publicProcedure
      .input(InsertLabelSchema)
      .output(LabelSchema)
      .mutation(({input}) => labels.create(input)),
    get: publicProcedure
      .input(LabelSchema.pick({_id: true}))
      .output(LabelSchema)
      .use(getItem(labels))
      .query(({ctx}) => ctx.item as LabelSchema),
    update: publicProcedure
      .input(
        z.object({
          ...InsertLabelSchema.partial().shape,
          ...LabelSchema.pick({_id: true}).shape,
        }),
      )
      .output(LabelSchema)
      .mutation(({input: {_id, ...changes}}) => labels.update(_id, changes)),
    delete: publicProcedure
      .input(LabelSchema.pick({_id: true}))
      .mutation(({input}) => labels.delete(input._id)),
    list: publicProcedure
      .input(LabelsQuerySchema)
      .output(LabelSchema.array())
      .query(({input}) => labels.list(input)),
    paginatedList: publicProcedure
      .input(LabelsQuerySchema)
      .output(PaginatedLabels)
      .query(({input}) => labels.paginatedList(input)),
    count: publicProcedure.output(z.number()).query(() => labels.count()),
    softDelete: publicProcedure
      .input(LabelSchema.pick({_id: true}))
      .mutation(({input}) =>
        labels.update(input._id, {deletedAt: Date.now(), isDeleted: true}),
      ),
    softDeleteIfOrphan: publicProcedure
      .input(LabelSchema.pick({_id: true}))
      .mutation(({input}) => labels.softDeleteIfOrphan(input._id)),
    restore: publicProcedure
      .input(LabelSchema.pick({_id: true}))
      .mutation(({input}) => labels.update(input._id, {isDeleted: false})),
  });
