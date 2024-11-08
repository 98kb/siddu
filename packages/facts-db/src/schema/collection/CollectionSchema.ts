import {BaseSchema} from "../core/BaseSchemas";
import {InsertCollectionSchema} from "./InsertCollectionSchema";
import {z} from "zod";

export const CollectionSchema = z.object({
  ...BaseSchema.shape,
  ...InsertCollectionSchema.shape,
});
