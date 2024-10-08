import {InsertLabelSchema} from "../label/InsertLabelSchema";
import {z} from "zod";

export const ImportFactSchema = z.object({
  content: z.string().min(1),
  labels: z.array(InsertLabelSchema),
});
