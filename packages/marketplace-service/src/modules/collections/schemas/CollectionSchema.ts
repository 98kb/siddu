import {z} from "zod";

export const CollectionSchema = z.object({
  _id: z.string(),
  name: z.string(),
});
