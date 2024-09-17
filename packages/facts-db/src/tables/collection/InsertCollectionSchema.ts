import {z} from "zod";

export const InsertCollectionSchema = z.object({
  name: z.string().min(1),
});
