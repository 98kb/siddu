import {InsertFactSchema} from "./InsertFactSchema";
import {TimeStampSchema} from "../core/TimeStampSchemas";
import {z} from "zod";

export const FactSchema = z.object({
  id: z.number(),
  ...TimeStampSchema.shape,
  ...InsertFactSchema.shape,
});
