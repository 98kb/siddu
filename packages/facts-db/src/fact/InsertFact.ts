import {InsertFactSchema} from "./InsertFactSchema";
import {z} from "zod";

export type InsertFact = z.infer<typeof InsertFactSchema>;
