import {ImportFactSchema} from "./ImportFactSchema";
import {z} from "zod";

export type ImportFact = z.infer<typeof ImportFactSchema>;
