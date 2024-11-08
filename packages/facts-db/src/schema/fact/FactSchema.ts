import {BaseSchema} from "../core/BaseSchemas";
import {InsertFactSchema} from "./InsertFactSchema";
import {z} from "zod";

export const FactSchema = z.object({
  ...BaseSchema.shape,
  ...InsertFactSchema.shape,
});
