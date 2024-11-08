import {InsertLabelSchema} from "./InsertLabelSchema";
import {TimeStampSchema} from "../core/TimeStampSchemas";
import {z} from "zod";

export const LabelSchema = z.object({
  id: z.number(),
  ...TimeStampSchema.shape,
  ...InsertLabelSchema.shape,
});
