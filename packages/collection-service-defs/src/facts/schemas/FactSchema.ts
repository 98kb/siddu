import {BaseSchema} from "../../common/schema/BaseSchemas";
import {InsertFactSchema} from "./InsertFactSchema";
import {z} from "zod";

export const FactSchema = z.object({
  ...BaseSchema.shape,
  ...InsertFactSchema.shape,
});

export type FactSchema = z.infer<typeof FactSchema>;
