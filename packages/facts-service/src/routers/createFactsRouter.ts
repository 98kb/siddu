/* eslint-disable max-nested-callbacks */
import {Fact, FactSchema, InsertFactSchema, as$} from "@repo/facts-db";
import {FilterSchema} from "../lib/FilterSchema";
import {Tables} from "@repo/facts-db/dist/Tables";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createFactsRouter = (table: Tables["facts"]) =>
  router({
    all$: publicProcedure.subscription(function () {
      const all$ = as$(() => table.toArray());
      return observable<Fact[]>(observer => {
        const sub = all$.subscribe(observer.next);
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
      .query(async ({input}) => {
        return table.offset(input.offset).limit(input.limit).toArray();
      }),
    update: publicProcedure
      .input(FactSchema)
      .output(FactSchema)
      .use(getItem(table))
      .mutation(async ({input}) => {
        const payload = {...input};
        await table.update(payload.id, payload);
        return payload;
      }),
    delete: publicProcedure
      .input(FactSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await table.delete(input.id);
      }),
  });
