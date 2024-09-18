import {z} from "zod";

// TODO: Add title property
export const InsertFactSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
});
