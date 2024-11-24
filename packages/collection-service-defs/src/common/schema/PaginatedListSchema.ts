import {z} from "zod";

export const toPaginatedListSchema = <T extends z.ZodObject<any>>(
  itemSchema: T,
) =>
  z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    list: z.array(itemSchema),
  });

export type PaginatedListSchema<T> = {
  total: number;
  limit: number;
  offset: number;
  list: T[];
};
