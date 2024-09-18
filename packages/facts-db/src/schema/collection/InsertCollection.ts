import {InsertCollectionSchema} from "./InsertCollectionSchema";
import {z} from "zod";

export type InsertCollection = z.infer<typeof InsertCollectionSchema>;
