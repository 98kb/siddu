/* eslint-disable max-nested-callbacks */
/* eslint-disable max-nested-callbacks */
import {FactSchema} from "../../schema/fact/FactSchema";
import {FactsManager} from "../../entities/FactsManager";
import {FilterSchema} from "../lib/FilterSchema";
import {InsertFactSchema} from "../../schema/fact/InsertFactSchema";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createFactsRouter = (facts: FactsManager) =>
  router({
    onMutation$: publicProcedure.subscription(function () {
      return observable(observer => {
        const sub = facts.onMutation(() => {
          observer.next({});
        });
        return () => sub.unsubscribe();
      });
    }),

    create: publicProcedure
      .input(InsertFactSchema)
      .output(FactSchema)
      .mutation(async ({input}) => {
        return await facts.add(input);
      }),
    createMany: publicProcedure
      .input(FactSchema.array())
      .output(FactSchema.array())
      .mutation(async ({input}) => {
        return await facts.addMany(input);
      }),
    get: publicProcedure
      .input(FactSchema.pick({id: true}))
      .output(FactSchema)
      .use(getItem(facts))
      .query(({ctx}) => ctx.item),
    put: publicProcedure
      .input(FactSchema.partial().required({id: true}))
      .mutation(async ({input}) => {
        await facts.put(input.id, input);
      }),
    list: publicProcedure
      .input(FilterSchema)
      .output(FactSchema.array())
      .query(async () => {
        return facts.getAll();
      }),
    softDelete: publicProcedure
      .input(FactSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await facts.softDelete(input.id);
      }),
    delete: publicProcedure
      .input(FactSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await facts.delete(input.id);
      }),
    deleteAll: publicProcedure.mutation(async () => {
      await facts.deleteAll();
    }),
  });
