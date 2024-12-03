import {QuerySchema} from "../../common/schema/QuerySchema";
import {z} from "zod";

export const FactsQuerySchema = z.object({
  ...QuerySchema.shape,
  query: z.string().optional(),
  isDeleted: z.boolean().optional(),
  labelIds: z.array(z.string()).optional(),
});

export type FactsQuerySchema = z.infer<typeof FactsQuerySchema>;
