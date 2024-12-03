import {NotFound} from "../errors/NotFound";
import {middleware} from "../lib/trpc";
import type {
  IFactsRepository,
  ILabelsRepository,
} from "@repo/collection-service-defs";

export const getItem = (repository: IFactsRepository | ILabelsRepository) =>
  middleware(async ({input, next}) => {
    const id = (input as {_id: string})._id;
    const item = await repository.get(id);
    if (!item) {
      throw new NotFound();
    }
    return next({ctx: {item}});
  });
