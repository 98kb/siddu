import {InsertLabelSchema} from "./InsertLabelSchema";
import {z} from "zod";

export type InsertLabel = z.infer<typeof InsertLabelSchema>;
