import {FilterSchema} from "../lib/FilterSchema";
import {IAdapter} from "../../adapters/IAdapter";
import {InsertLabelSchema} from "../../schema/label/InsertLabelSchema";
import {LabelSchema} from "../../schema/label/LabelSchema";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createLabelsRouter = (labels: IAdapter<"labels">) =>
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
        const id = await labels.add(input);
        return {...input, id};
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
    delete: publicProcedure
      .input(LabelSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await labels.delete(input.id);
      }),
    deleteAll: publicProcedure.mutation(async () => {
      await labels.deleteAll();
    }),
  });
