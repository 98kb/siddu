import {InsertCollectionSchema} from "./InsertCollectionSchema";
import {z} from "zod";

export const CollectionSchema = z.object({
  id: z.number(),
  ...InsertCollectionSchema.shape,
});
