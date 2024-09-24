import {LabelSchema} from "../label/LabelSchema";
import {z} from "zod";

export const InsertFactSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
  labels: z.array(LabelSchema),
});
