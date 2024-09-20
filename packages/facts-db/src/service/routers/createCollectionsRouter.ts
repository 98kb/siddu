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
        const id = await collections.add(input);
        return {...input, id};
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
