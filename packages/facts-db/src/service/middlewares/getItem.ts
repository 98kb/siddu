import {IAdapter} from "../../adapters/IAdapter";
import {NotFound} from "../errors/NotFound";
import {Tables} from "../../schema/Tables";
import {middleware} from "../lib/trpc";

export const getItem = <T extends keyof Tables>(adapter: IAdapter<T>) =>
  middleware(async ({input, next}) => {
    const {id} = input as {id: number};
    const item = await adapter.get(id);
    if (!item) {
      throw new NotFound(adapter.options.entity, id);
    }
    return next({ctx: {item}});
  });
