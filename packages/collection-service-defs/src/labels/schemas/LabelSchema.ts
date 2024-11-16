import {BaseSchema} from "../../common/schema/BaseSchemas";
import {InsertLabelSchema} from "./InsertLabelSchema";
import {z} from "zod";

export const LabelSchema = z.object({
  ...BaseSchema.shape,
  ...InsertLabelSchema.shape,
});

export type LabelSchema = z.infer<typeof LabelSchema>;
