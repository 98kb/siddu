import {NotFound} from "../errors/NotFound";
import {Tables} from "@repo/facts-db/dist/Tables";
import {middleware} from "../lib/trpc";

export const getItem = <T extends keyof Tables>(table: Tables[T]) =>
  middleware(async ({input, next}) => {
    const {id} = input as {id: number};
    const item = await table.get(id);
    if (!item) {
      throw new NotFound(table.name, id);
    }
    return next({input, ctx: {item}});
  });
