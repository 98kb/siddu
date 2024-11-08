import {FilterSchema} from "../lib/FilterSchema";
import {InsertLabelSchema} from "../../schema/label/InsertLabelSchema";
import {LabelSchema} from "../../schema/label/LabelSchema";
import {LabelsManager} from "../../entities/LabelsManager";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createLabelsRouter = (labels: LabelsManager) =>
  router({
    onMutation$: publicProcedure.subscription(function () {
      return observable(observer => {
        // eslint-disable-next-line max-nested-callbacks
        const sub = labels.onMutation(() => {
          observer.next({});
        });
        return () => sub.unsubscribe();
      });
    }),

    create: publicProcedure
      .input(InsertLabelSchema)
      .output(LabelSchema)
      .mutation(async ({input}) => {
        return await labels.add(input);
      }),
    createMany: publicProcedure
      .input(LabelSchema.array())
      .output(LabelSchema.array())
      .mutation(async ({input}) => {
        return await labels.addMany(input);
      }),
    put: publicProcedure
      .input(LabelSchema.partial().required({id: true}))
      .mutation(async ({input}) => {
        await labels.put(input.id, input);
      }),
    get: publicProcedure
      .input(LabelSchema.pick({id: true}))
      .output(LabelSchema)
      .use(getItem(labels))
      .query(({ctx}) => ctx.item),
    list: publicProcedure
      .input(FilterSchema)
      .output(LabelSchema.array())
      .query(async () => {
        return labels.getAll();
      }),
    softDelete: publicProcedure
      .input(LabelSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await labels.softDelete(input.id);
      }),
    delete: publicProcedure
      .input(LabelSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await labels.delete(input.id);
      }),
    deleteAll: publicProcedure.mutation(async () => {
      await labels.deleteAll();
    }),
  });
