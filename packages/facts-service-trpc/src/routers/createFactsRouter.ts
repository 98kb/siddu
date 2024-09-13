/* eslint-disable max-nested-callbacks */
import {FactSchema, InsertFactSchema} from "@repo/facts-db";
import {FilterSchema} from "../lib/FilterSchema";
import {IAdapter} from "@repo/facts-service";
import {Tables} from "@repo/facts-db/dist/Tables";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createFactsRouter = <T extends keyof Tables>(table: IAdapter<T>) =>
  router({
    onMutation$: publicProcedure.subscription(function () {
      return observable(observer => {
        const sub = table.onMutation(() => {
          observer.next({});
        });
        return () => sub.unsubscribe();
      });
    }),

    create: publicProcedure
      .input(InsertFactSchema)
      .output(FactSchema)
      .mutation(async ({input}) => {
        const id = await table.add(input);
        return {...input, id};
      }),
    get: publicProcedure
      .input(FactSchema.pick({id: true}))
      .output(FactSchema)
      .use(getItem(table))
      .query(({ctx}) => ctx.item),
    list: publicProcedure
      .input(FilterSchema)
      .output(FactSchema.array())
      .query(async () => {
        return table.getAll();
      }),
    delete: publicProcedure
      .input(FactSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await table.delete(input.id);
      }),
    deleteAll: publicProcedure.mutation(async () => {
      await table.deleteAll();
    }),
  });
