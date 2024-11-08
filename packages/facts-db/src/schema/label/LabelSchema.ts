import {BaseSchema} from "../core/BaseSchemas";
import {InsertLabelSchema} from "./InsertLabelSchema";
import {z} from "zod";

export const LabelSchema = z.object({
  ...BaseSchema.shape,
  ...InsertLabelSchema.shape,
});
