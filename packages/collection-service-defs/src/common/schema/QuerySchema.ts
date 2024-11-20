import {PaginationSchema} from "./PaginationSchema";
import {z} from "zod";

export const QuerySchema = z.object({
  pagination: PaginationSchema,
});

export type QuerySchema = z.infer<typeof QuerySchema>;
