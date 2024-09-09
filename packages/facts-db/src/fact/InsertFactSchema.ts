import {z} from "zod";

export const InsertFactSchema = z.object({
  content: z.string().min(1),
});
