import {OrderBySchema} from "./OrderBySchema";
import {PaginationSchema} from "./PaginationSchema";
import {z} from "zod";

export const QuerySchema = z.object({
  pagination: PaginationSchema,
  orderBy: OrderBySchema.optional(),
});

export type QuerySchema = z.infer<typeof QuerySchema>;
