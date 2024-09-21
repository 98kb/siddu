import {z} from "zod";

export const InsertLabelSchema = z.object({
  name: z.string().min(1),
});
