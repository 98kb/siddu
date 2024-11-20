import {z} from "zod";

export const PaginationSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

export type PaginationSchema = z.infer<typeof PaginationSchema>;
