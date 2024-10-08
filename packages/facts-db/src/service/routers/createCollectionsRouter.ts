import {CollectionSchema} from "../../schema/collection/CollectionSchema";
import {FilterSchema} from "../lib/FilterSchema";
import {IAdapter} from "../../adapters/IAdapter";
import {InsertCollectionSchema} from "../../schema/collection/InsertCollectionSchema";
import {getItem} from "../middlewares/getItem";
import {observable} from "@trpc/server/observable";
import {publicProcedure, router} from "../lib/trpc";

export const createCollectionsRouter = (collections: IAdapter<"collections">) =>
  router({
    onMutation$: publicProcedure.subscription(function () {
      return observable(observer => {
        // eslint-disable-next-line max-nested-callbacks
        const sub = collections.onMutation(() => {
          observer.next({});
        });
        return () => sub.unsubscribe();
      });
    }),

    create: publicProcedure
      .input(InsertCollectionSchema)
      .output(CollectionSchema)
      .mutation(async ({input}) => {
        return await collections.add(input);
      }),
    createMany: publicProcedure
      .input(InsertCollectionSchema.array())
      .output(CollectionSchema.array())
      .mutation(async ({input}) => {
        return await collections.addMany(input);
      }),
    put: publicProcedure
      .input(CollectionSchema.partial().required({id: true}))
      .mutation(async ({input}) => {
        await collections.put(input.id, input);
      }),
    get: publicProcedure
      .input(CollectionSchema.pick({id: true}))
      .output(CollectionSchema)
      .use(getItem(collections))
      .query(({ctx}) => ctx.item),
    list: publicProcedure
      .input(FilterSchema)
      .output(CollectionSchema.array())
      .query(async () => {
        return collections.getAll();
      }),
    delete: publicProcedure
      .input(CollectionSchema.pick({id: true}))
      .mutation(async ({input}) => {
        await collections.delete(input.id);
      }),
    deleteAll: publicProcedure.mutation(async () => {
      await collections.deleteAll();
    }),
  });
