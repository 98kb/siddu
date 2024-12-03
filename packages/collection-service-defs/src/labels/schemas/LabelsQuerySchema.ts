import {BaseSchema} from "../../common/schema/BaseSchemas";
import {QuerySchema} from "../../common/schema/QuerySchema";
import {z} from "zod";

export const LabelsQuerySchema = z.object({
  ...QuerySchema.shape,
  query: z.string().optional(),
  isDeleted: z.boolean().optional(),
  exclude: z.array(BaseSchema.shape._id).optional(),
});

export type LabelsQuerySchema = z.infer<typeof LabelsQuerySchema>;
