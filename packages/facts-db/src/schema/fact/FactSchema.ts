import {InsertFactSchema} from "./InsertFactSchema";
import {LabelSchema} from "../label/LabelSchema";
import {z} from "zod";

export const FactSchema = z.object({
  id: z.number(),
  labels: z.array(LabelSchema).optional(),
  ...InsertFactSchema.shape,
});
