import {CollectionSchema} from "./CollectionSchema";
import {z} from "zod";

export type Collection = z.infer<typeof CollectionSchema>;
