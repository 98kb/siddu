import {ImportFactSchema} from "@repo/facts-db";
import {z} from "zod";

export const CollectionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  facts: z.array(ImportFactSchema),
});
