import {FactSchema, InsertFactSchema, as$} from "@repo/facts-db";
import {FilterSchema} from "./FilterSchema";
import {Tables} from "@repo/facts-db/dist/Tables";
import {getItem} from "../middlewares/getItem";
import {publicProcedure, router} from "./trpc";

export const createCrudRouter = <T extends keyof Tables>(table: Tables[T]) =>
  router({
    all$: publicProcedure.subscription(() => as$(() => table.toArray())),
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
