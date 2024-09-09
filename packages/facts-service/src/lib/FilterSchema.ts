import {z} from "zod";

export const FilterSchema = z.object({
  limit: z.number().int().positive(),
  offset: z.number().int().min(0),
});
