import {InsertFactSchema} from "./InsertFactSchema";
import {z} from "zod";

export const FactSchema = z.object({
  id: z.number(),
  ...InsertFactSchema.shape,
});
