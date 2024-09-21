import {InsertLabelSchema} from "./InsertLabelSchema";
import {z} from "zod";

export const LabelSchema = z.object({
  id: z.number(),
  ...InsertLabelSchema.shape,
});
