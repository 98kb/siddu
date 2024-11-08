import {InsertCollectionSchema} from "./InsertCollectionSchema";
import {TimeStampSchema} from "../core/TimeStampSchemas";
import {z} from "zod";

export const CollectionSchema = z.object({
  id: z.number(),
  ...TimeStampSchema.shape,
  ...InsertCollectionSchema.shape,
});
