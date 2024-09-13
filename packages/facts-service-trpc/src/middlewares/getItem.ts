import {IAdapter} from "@repo/facts-service";
import {NotFound} from "../errors/NotFound";
import {Tables} from "@repo/facts-db/dist/Tables";
import {middleware} from "../lib/trpc";

export const getItem = <T extends keyof Tables>(adapter: IAdapter<T>) =>
  middleware(async ({input, next}) => {
    const {id} = input as {id: number};
    const item = await adapter.get(id);
    if (!item) {
      throw new NotFound(adapter.entity, id);
    }
    return next({ctx: {item}});
  });
