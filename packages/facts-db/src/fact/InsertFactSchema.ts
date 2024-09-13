import {z} from "zod";

// TODO: Add title property
export const InsertFactSchema = z.object({
  content: z.string().min(1),
});
